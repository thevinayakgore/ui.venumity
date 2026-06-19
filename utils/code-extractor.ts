// utils/code-extractor.ts

/**
 * Extracts the Demo code from a component file
 * NOW SHOWS THE COMPLETE CODE AS-IS (no extraction, no filtering)
 */
export function getCodeTabContent(sourceCode: string): string {
  // Just return the full source code as-is
  return sourceCode;
}

/**
 * Extracts the Full Snippet from a component file
 * Includes everything - imports, interfaces, data arrays, all functions
 */
export function getFullSnippet(sourceCode: string): string {
  const lines = sourceCode.split("\n");

  // Remove separator lines and comment lines
  const cleanedLines = lines.filter((line) => {
    const trimmed = line.trim();
    // Remove separator lines
    if (/^\/\/\s*=+\s*$/.test(trimmed)) return false;
    // Remove "Full Snippet" and "Full Demo" comment lines
    if (trimmed.includes("Full Snippet") || trimmed.includes("Full Demo"))
      return false;
    return true;
  });

  // Remove the final export block at the end
  let resultLines = [...cleanedLines];

  // Find and remove the final export block at the end
  for (let i = resultLines.length - 1; i >= 0; i--) {
    const trimmed = resultLines[i].trim();
    if (trimmed === "export {" || trimmed.startsWith("export {")) {
      resultLines = resultLines.slice(0, i);
      break;
    }
  }

  const fullSnippet = resultLines.join("\n").trim();

  return fullSnippet;
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
  // Match both import styles:
  // 1. import something from "package"
  // 2. import { something } from "package"
  // 3. import * as something from "package"
  const importRegex =
    /import\s+(?:{[^}]*}|\* as \w+|\w+)\s+from\s+["']([^"']+)["']/g;
  const deps = new Set<string>();
  let match;

  // Packages to exclude (these are already installed or part of the framework)
  const excludePackages = new Set([
    // React
    "react",
    "react-dom",
    "react/jsx-runtime",
    "@types/react",
    "@types/react-dom",

    // Next.js
    "next",
    "next-themes",
    "nextjs",
    "next-theme",
    "next-themes",
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

    // Other framework internals
    "@react",
    "@react-",
  ]);

  while ((match = importRegex.exec(code)) !== null) {
    const mod = match[1];

    // Skip local imports and internal imports
    if (mod.startsWith(".") || mod.startsWith("@/")) continue;

    // Extract the package name
    const pkg = mod.startsWith("@")
      ? mod.split("/").slice(0, 2).join("/")
      : mod.split("/")[0];

    // Skip if package is in exclude list
    if (excludePackages.has(pkg)) continue;
    if (excludePackages.has(mod)) continue;

    // Skip if package name contains "next" (case insensitive)
    if (/next/i.test(pkg)) continue;

    // Skip if package is a type definition
    if (pkg.startsWith("@types/")) continue;

    deps.add(pkg);
  }

  // Remove any remaining excluded packages (safety check)
  const result = Array.from(deps).filter((pkg) => {
    if (excludePackages.has(pkg)) return false;
    if (/next/i.test(pkg)) return false;
    if (pkg.startsWith("@types/")) return false;
    return true;
  });

  // Return sorted dependencies
  return result.sort();
}
