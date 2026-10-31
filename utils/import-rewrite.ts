// utils/import-rewrite.ts

/**
 * Rewrite imports in a source file so they point to the FLAT
 * user-facing path: @/components/venumity/<subcategory-slug>
 *
 * (KEEP AS IS - Used for Primitive Pages)
 */
export function rewriteVenumityImports(
  code: string,
  subcategorySlug: string,
): string {
  const target = `@/components/venumity/${subcategorySlug}`;

  // 1. Project-internal absolute imports
  let out = code.replace(/@\/components\/venumity\/[^"']+/g, () => target);

  // 2. Sibling relative imports (./something or ../something)
  out = out.replace(
    /from\s+["'](?:\.\.?\/)+[^"']+["']/g,
    () => `from "${target}"`,
  );

  return out;
}

/**
 * Rewrite imports for COMPONENT PAGES.
 * It simply cuts the extra folder words and returns the last segment.
 *
 * Input  : import { Button } from "@/components/venumity/primitives/actions/button";
 * Output : import { Button } from "@/components/venumity/button";
 */
// utils/import-rewrite.ts

// utils/import-rewrite.ts

export function rewriteComponentImports(
  code: string,
  componentSubcategorySlug: string,
): string {
  // 1. Handle absolute primitive/component imports
  let out = code.replace(
    /from\s+["']@\/components\/venumity\/(?:primitives|components)\/([^"']+)["']/g,
    (_match, fullPath) => {
      let cleanPath = fullPath.replace(/\/index(\.tsx?)?$/, "");
      cleanPath = cleanPath.replace(/\.tsx?$/, "");

      const parts = cleanPath.split("/").filter(Boolean);
      const flatSlug = parts[parts.length - 1];

      return `from "@/components/venumity/${flatSlug}"`;
    },
  );

  // 2. Handle the component's own relative imports
  const selfTarget = `@/components/venumity/${componentSubcategorySlug}`;
  out = out.replace(
    /from\s+["'](?:\.\.?\/)+[^"']+["']/g,
    () => `from "${selfTarget}"`,
  );

  return out;
}