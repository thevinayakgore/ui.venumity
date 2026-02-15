// utils/slug-kebab.ts 
/**
 * Convert a string to kebab-case
 * Handles special characters, numbers, and edge cases properly
 *
 * Examples:
 * - "Hello World" → "hello-world"
 * - "React 2.0 Components" → "react-2-0-components"
 * - "UI/UX Design" → "ui-ux-design"
 * - "API v2 Endpoints" → "api-v2-endpoints"
 * - "Some   Extra   Spaces" → "some-extra-spaces"
 */
export function toKebabCase(str: string): string {
  if (!str || typeof str !== "string") {
    return "";
  }

  return (
    str
      // Convert to lowercase
      .toLowerCase()
      // Replace special characters and spaces with hyphens
      .replace(/[^\w\s-]/g, " ") // Replace special chars with space
      .replace(/[\s_]+/g, " ") // Replace underscores and multiple spaces with single space
      .trim() // Trim whitespace
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/-+/g, "-")
  ); // Remove consecutive hyphens
}

/**
 * Convert a string to kebab-case specifically for URLs
 * More aggressive cleaning for URL-safe slugs
 */
export function toUrlSlug(str: string): string {
  if (!str || typeof str !== "string") {
    return "";
  }

  return (
    str
      .toLowerCase()
      // Remove all special characters except letters, numbers, spaces, and hyphens
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_]+/g, " ")
      .trim()
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
  );
}

/**
 * Convert a string to kebab-case preserving numbers as separate entities
 * Useful for version numbers like "v2.0" → "v2-0"
 */
export function toKebabCaseWithNumbers(str: string): string {
  if (!str || typeof str !== "string") {
    return "";
  }

  return (
    str
      .toLowerCase()
      // Insert hyphens between letters and numbers
      .replace(/([a-z])(\d)/g, "$1-$2")
      .replace(/(\d)([a-z])/g, "$1-$2")
      // Replace dots with hyphens for version numbers
      .replace(/\./g, "-")
      // Clean up special characters
      .replace(/[^\w\s-]/g, " ")
      .replace(/[\s_]+/g, " ")
      .trim()
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
  );
}
