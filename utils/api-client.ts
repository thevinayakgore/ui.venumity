// utils/api-client.ts
import { toKebabCase } from "@/utils/slug-kebab";

export function extractComponentPath(
  slugPath: string,
): { category: string; componentPath: string } | null {
  const parts = slugPath.split("/").filter(Boolean);
  if (parts.length < 2) return null;
  return { category: parts[0], componentPath: parts.slice(1).join("/") };
}

// ── DEMO code (Overview → Code tab) ──────────────────────
export async function fetchDemoCode(
  category: string,
  subcategory: string,
  item: string,
): Promise<{
  code: string;
  isDemo: boolean;
  isFolder: boolean;
  files: { path: string; content: string }[];
} | null> {
  try {
    const params = new URLSearchParams({
      action: "demo",
      category: toKebabCase(category),
      subcategory: subcategory ? toKebabCase(subcategory) : "",
      item: toKebabCase(item),
    });
    const res = await fetch(`/api/components?${params}`);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

// ── SOURCE code (Manual tab) ─────────────────────────────
export async function fetchSourceCode(
  item: string,
  category?: string,
  subcategory?: string,
): Promise<{
  code: string;
  isFolder: boolean;
  files: { path: string; content: string }[];
  sourceType?: "ui" | "demo";
} | null> {
  try {
    const params = new URLSearchParams({
      action: "source",
      item: toKebabCase(item),
    });
    if (category) params.set("category", toKebabCase(category));
    if (subcategory) params.set("subcategory", toKebabCase(subcategory));

    const res = await fetch(`/api/components?${params}`);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

// ── List subcategory components ──────────────────────────
export async function fetchSubcategoryComponents(
  category: string,
  subcategory: string,
): Promise<Array<{ name: string; code: string; isFolder: boolean }> | null> {
  try {
    const params = new URLSearchParams({
      action: "list",
      category: toKebabCase(category),
      subcategory: toKebabCase(subcategory),
    });
    const res = await fetch(`/api/components?${params}`);
    if (!res.ok) return null;
    const data = await res.json();
    return data.components || [];
  } catch {
    return null;
  }
}

// ── Individual file (Manual sub-components) ──────────────
export async function fetchFileContent(
  filePath: string,
): Promise<{ content: string; name: string; path: string } | null> {
  try {
    const params = new URLSearchParams({
      action: "file",
      path: encodeURIComponent(filePath),
    });
    const res = await fetch(`/api/components?${params}`);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

// ── Check demo/source existence ──────────────────────────
export async function checkComponentExistence(
  category: string,
  subcategory: string,
  item: string,
): Promise<{ hasDemo: boolean; hasSource: boolean }> {
  try {
    const params = new URLSearchParams({
      action: "check",
      category: toKebabCase(category),
      subcategory: subcategory ? toKebabCase(subcategory) : "",
      item: toKebabCase(item),
    });
    const res = await fetch(`/api/components?${params}`);
    if (!res.ok) return { hasDemo: false, hasSource: false };
    return await res.json();
  } catch {
    return { hasDemo: false, hasSource: false };
  }
}