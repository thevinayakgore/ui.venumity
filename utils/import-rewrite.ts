// utils/import-rewrite.ts
export interface RewriteOptions {
  /** Optional dynamic map of SymbolName -> slug (e.g. built from registry) */
  symbolToSlug?: Record<string, string>;
  /** Optional list/set of valid primitive/component slugs from the registry */
  knownSlugs?: Iterable<string>;
}

function toKebabSymbol(name: string): string {
  return name
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1-$2")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function extractPrimarySymbol(importClause: string): string | null {
  const cleaned = importClause.replace(/^type\s+/, "").trim();

  // Named imports: { Button, Foo as Bar } or { type Foo }
  const namedMatch = cleaned.match(/\{([^}]+)\}/);
  if (namedMatch) {
    const firstItem = namedMatch[1]
      .split(",")[0]
      .replace(/^type\s+/, "")
      .trim();
    if (!firstItem) return null;
    return firstItem.split(/\s+as\s+/i)[0].trim();
  }

  // Default or namespace import: Button or * as Foo
  const defaultPart = cleaned.split(",")[0].trim();
  if (!defaultPart) return null;
  if (defaultPart.startsWith("*")) {
    const nsMatch = defaultPart.match(/\*\s+as\s+(\w+)/i);
    return nsMatch ? nsMatch[1] : null;
  }
  return defaultPart;
}

function resolveSlugForImport(
  importClause: string,
  rawSubpath: string,
  currentSlug: string,
  symbolMap: Record<string, string>,
  knownSlugSet: Set<string>,
): string {
  const cleanPath = (rawSubpath || "")
    .replace(/^(?:primitives|components)\/?/, "")
    .replace(/\/index(\.tsx?)?$/, "")
    .replace(/\.tsx?$/, "");

  const parts = cleanPath.split("/").filter(Boolean);
  const lastPart = parts[parts.length - 1] || "";
  const primarySymbol = extractPrimarySymbol(importClause);

  // 1. Dynamic map (if provided by caller/registry)
  if (primarySymbol && symbolMap[primarySymbol]) {
    return symbolMap[primarySymbol];
  }

  // 2. If no subpath was specified, fall back to currentSlug (original behavior)
  if (!lastPart) {
    return currentSlug;
  }

  // 3. If importing a PascalCase symbol (like Button) from a mismatched folder
  // (like `profiles`), derive the slug from the symbol name
  if (primarySymbol && /^[A-Z]/.test(primarySymbol)) {
    const symbolSlug = toKebabSymbol(primarySymbol);
    if (symbolSlug) {
      // If `lastPart` doesn't already match or contain the symbol slug,
      // prefer `symbolSlug` (especially when `symbolSlug` is in knownSlugs or `lastPart` is clearly a section/group)
      const isMismatch =
        lastPart !== symbolSlug && !lastPart.endsWith(`-${symbolSlug}`);

      if (
        isMismatch &&
        (knownSlugSet.size === 0 || knownSlugSet.has(symbolSlug))
      ) {
        return symbolSlug;
      }
    }
  }

  // 4. Original fallback: keep trailing slug segment
  return lastPart;
}

/**
 * Rewrites Venumity imports to the flat user-facing path structure:
 * `@/components/venumity/<component-or-primitive-slug>`
 *
 * Examples:
 * - `@/components/venumity/primitives/actions/button` -> `@/components/venumity/button`
 * - `@/components/venumity/profiles` with `import { Button }` -> `@/components/venumity/button`
 * - `./badge` -> `@/components/venumity/badge`
 */
export function rewriteVenumityImports(
  code: string,
  currentSlug: string,
  options: RewriteOptions = {},
): string {
  const symbolMap = options.symbolToSlug || {};
  const knownSlugSet = new Set(options.knownSlugs || []);

  // 1. Rewrite `@/components/venumity/...` imports to flat structure
  let out = code.replace(
    /import\s+([\s\S]*?)\s+from\s+["']@\/components\/venumity\/?([^"']*)["']/g,
    (_fullMatch: string, importClause: string, rawSubpath: string) => {
      const resolvedSlug = resolveSlugForImport(
        importClause,
        rawSubpath,
        currentSlug,
        symbolMap,
        knownSlugSet,
      );
      return `import ${importClause} from "@/components/venumity/${resolvedSlug}"`;
    },
  );

  // Also handle bare `from "@/components/venumity/..."` without clause capture if ever matched
  out = out.replace(
    /from\s+["']@\/components\/venumity\/(?:primitives|components)?\/?([^"']+)["']/g,
    (_match: string, fullPath: string) => {
      const cleanPath = fullPath
        .replace(/\/index(\.tsx?)?$/, "")
        .replace(/\.tsx?$/, "");
      const parts = cleanPath.split("/").filter(Boolean);
      const flatSlug = parts[parts.length - 1] || currentSlug;
      return `from "@/components/venumity/${flatSlug}"`;
    },
  );

  // 2. Rewrite relative imports to flat `@/components/venumity/<slug>`
  out = out.replace(
    /import\s+([\s\S]*?)\s+from\s+["'](\.\.?\/[^"']*)["']/g,
    (_fullMatch: string, importClause: string, relPath: string) => {
      const cleanedRel = relPath
        .replace(/\/index(\.tsx?)?$/, "")
        .replace(/\.tsx?$/, "");
      const parts = cleanedRel
        .split("/")
        .filter((p) => p && p !== "." && p !== "..");
      const targetSlug = parts[parts.length - 1] || currentSlug;

      return `import ${importClause} from "@/components/venumity/${targetSlug}"`;
    },
  );

  return out;
}
