// utils/code-extractor.ts

/**
 * Extracts the Demo code from a component file
 * NOW SHOWS THE COMPLETE CODE AS-IS (no extraction, no filtering)
 */
export function getCodeTabContent(sourceCode: string): string {
  return sourceCode;
}

/**
 * Extracts the Full Snippet from a component file
 * Includes everything - imports, interfaces, data arrays, all functions
 */
export function getFullSnippet(sourceCode: string): string {
  const lines = sourceCode.split("\n");

  const cleanedLines = lines.filter((line) => {
    const trimmed = line.trim();
    if (/^\/\/\s*=+\s*$/.test(trimmed)) return false;
    if (trimmed.includes("Full Snippet") || trimmed.includes("Full Demo"))
      return false;
    return true;
  });

  let resultLines = [...cleanedLines];

  for (let i = resultLines.length - 1; i >= 0; i--) {
    const trimmed = resultLines[i].trim();
    if (trimmed === "export {" || trimmed.startsWith("export {")) {
      resultLines = resultLines.slice(0, i);
      break;
    }
  }

  return resultLines.join("\n").trim();
}

/**
 * Extracts the CLI command code (returns as-is)
 */
export function getCLICode(sourceCode: string): string {
  return sourceCode;
}

/** Remove shadcn/ui imports from code (for demo display) */
export function filterShadcnImports(code: string): string {
  const lines = code.split("\n");
  const filtered = lines.filter((line) => {
    const trimmed = line.trim();
    if (
      trimmed.startsWith("import ") &&
      /from\s+["']@\/components\/ui\//.test(trimmed)
    ) {
      return false;
    }
    return true;
  });
  return filtered.join("\n");
}

/** Extract external npm dependencies - Excludes Next.js, React, and related packages */
export function extractDependencies(code: string): string[] {
  const importRegex =
    /import\s+(?:{[^}]*}|\* as \w+|\w+)\s+from\s+["']([^"']+)["']/g;
  const deps = new Set<string>();
  let match;

  const excludePackages = new Set([
    "react",
    "react-dom",
    "react/jsx-runtime",
    "@types/react",
    "@types/react-dom",
    "next",
    "next-themes",
    "nextjs",
    "next-theme",
    "@next",
    "@next/",
    "next/navigation",
    "next/image",
    "next/link",
    "next/headers",
    "next/cache",
    "next/script",
    "next/font",
    "next/font/google",
    "next/font/local",
    "next/og",
    "next/sitemap",
    "next/route",
    "next/middleware",
    "@react",
    "@react-",
  ]);

  while ((match = importRegex.exec(code)) !== null) {
    const mod = match[1];
    if (mod.startsWith(".") || mod.startsWith("@/")) continue;

    const pkg = mod.startsWith("@")
      ? mod.split("/").slice(0, 2).join("/")
      : mod.split("/")[0];

    if (excludePackages.has(pkg)) continue;
    if (excludePackages.has(mod)) continue;
    if (/next/i.test(pkg)) continue;
    if (pkg.startsWith("@types/")) continue;

    deps.add(pkg);
  }

  return Array.from(deps)
    .filter((pkg) => {
      if (excludePackages.has(pkg)) return false;
      if (/next/i.test(pkg)) return false;
      if (pkg.startsWith("@types/")) return false;
      return true;
    })
    .sort();
}

export function extractNamedExports(code: string): string[] {
  const regex = /import\s+\{\s*([^}]+)\s*\}\s+from\s+["'][^"']+["']/g;
  const names = new Set<string>();
  let match: RegExpExecArray | null;
  while ((match = regex.exec(code)) !== null) {
    match[1]
      .split(",")
      .map((s) => s.trim().split(/\s+as\s+/)[0])
      .filter(Boolean)
      .forEach((n) => names.add(n));
  }
  return Array.from(names);
}
