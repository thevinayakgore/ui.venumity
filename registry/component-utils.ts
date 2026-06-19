// registry/component-utils.ts
import * as LucideIcons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { COMPONENTS } from "./components";
import { toKebabCase } from "@/utils/slug-kebab";

// ==================== TYPE DEFINITIONS ====================
export interface ComponentItem {
  itemName: string;
  description?: string;
  tags?: string[];
  techs?: string[];
  video?: string;
  category: string;
  subcategory?: string;
  folderPath?: string;
  isFolderBased?: boolean;
  githubUsername?: string;
}

export interface ComponentSubcategory {
  name: string;
  description?: string;
  icon?: string;
  thumbnail?: string; // Only here - for category cards
  tags?: string[];
  techs?: string[];
  items: ComponentItem[];
}

export interface ComponentCategory {
  name: string;
  icon: string;
  tags?: string[];
  techs?: string[];
  subcategories: ComponentSubcategory[];
}

// ==================== ICON UTILS ====================
export function getLucideIcon(iconName: string) {
  const pascalIconName = iconName
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");

  type LucideIconName = keyof typeof LucideIcons;
  const icons = LucideIcons as unknown as Record<LucideIconName, LucideIcon>;

  return (
    icons[pascalIconName as LucideIconName] ??
    icons[iconName as LucideIconName] ??
    icons.Folder
  );
}

// ==================== PATH UTILS ====================
export function isSubcategoryPath(path: string): boolean {
  return path.split("/").filter(Boolean).length === 2;
}

export function getCategorySubcategoryFromPath(
  path: string,
): { category: string; subcategory: string } | null {
  const parts = path.split("/").filter(Boolean);
  if (parts.length !== 2) return null;
  return { category: parts[0], subcategory: parts[1] };
}

// ==================== COMPONENT GETTERS ====================
export function getComponentByPath(path: string): ComponentItem | null {
  const parts = path.split("/").filter(Boolean);

  for (const category of COMPONENTS) {
    for (const subcategory of category.subcategories) {
      for (const item of subcategory.items) {
        if (item.folderPath && toKebabCase(item.folderPath) === path) {
          return item;
        }
      }
    }
  }

  if (parts.length >= 3) {
    const [categoryName, subcategoryName, ...componentParts] = parts;
    const componentSlug = componentParts.join("/");

    const category = COMPONENTS.find(
      (c) => toKebabCase(c.name) === toKebabCase(categoryName),
    );
    if (!category) return null;

    const subcategory = category.subcategories.find(
      (s) => toKebabCase(s.name) === toKebabCase(subcategoryName),
    );
    if (!subcategory) return null;

    return (
      subcategory.items.find(
        (item) => toKebabCase(item.itemName) === toKebabCase(componentSlug),
      ) || null
    );
  }

  return null;
}

export function getSubcategoryItems(
  categoryName: string,
  subcategoryName: string,
): ComponentItem[] | null {
  const category = COMPONENTS.find(
    (c) => toKebabCase(c.name) === toKebabCase(categoryName),
  );
  if (!category) return null;

  const subcategory = category.subcategories.find(
    (s) => toKebabCase(s.name) === toKebabCase(subcategoryName),
  );
  return subcategory?.items || null;
}

export function getSubcategory(
  categoryName: string,
  subcategoryName: string,
): ComponentSubcategory | null {
  const category = COMPONENTS.find(
    (c) => toKebabCase(c.name) === toKebabCase(categoryName),
  );
  if (!category) return null;

  return (
    category.subcategories.find(
      (s) => toKebabCase(s.name) === toKebabCase(subcategoryName),
    ) || null
  );
}

export function getCategory(categoryName: string): ComponentCategory | null {
  return (
    COMPONENTS.find((c) => toKebabCase(c.name) === toKebabCase(categoryName)) ||
    null
  );
}

// ==================== TAGS & TECHS GETTERS ====================
export function getCategoryTags(categoryName: string): string[] {
  const category = getCategory(categoryName);
  if (!category) return [];

  const allTags = new Set<string>();
  if (category.tags) category.tags.forEach((tag) => allTags.add(tag));

  category.subcategories.forEach((subcategory) => {
    if (subcategory.tags) subcategory.tags.forEach((tag) => allTags.add(tag));
    subcategory.items.forEach((item) => {
      if (item.tags) item.tags.forEach((tag) => allTags.add(tag));
    });
  });

  return Array.from(allTags);
}

export function getCategoryTechs(categoryName: string): string[] {
  const category = getCategory(categoryName);
  if (!category) return [];

  const allTechs = new Set<string>();
  if (category.techs) category.techs.forEach((tech) => allTechs.add(tech));

  category.subcategories.forEach((subcategory) => {
    if (subcategory.techs)
      subcategory.techs.forEach((tech) => allTechs.add(tech));
    subcategory.items.forEach((item) => {
      if (item.techs) item.techs.forEach((tech) => allTechs.add(tech));
    });
  });

  return Array.from(allTechs);
}

export function getSubcategoryTags(
  categoryName: string,
  subcategoryName: string,
): string[] {
  const subcategory = getSubcategory(categoryName, subcategoryName);
  if (!subcategory) return [];

  const allTags = new Set<string>();
  if (subcategory.tags) subcategory.tags.forEach((tag) => allTags.add(tag));
  subcategory.items.forEach((item) => {
    if (item.tags) item.tags.forEach((tag) => allTags.add(tag));
  });

  return Array.from(allTags);
}

export function getSubcategoryTechs(
  categoryName: string,
  subcategoryName: string,
): string[] {
  const subcategory = getSubcategory(categoryName, subcategoryName);
  if (!subcategory) return [];

  const allTechs = new Set<string>();
  if (subcategory.techs)
    subcategory.techs.forEach((tech) => allTechs.add(tech));
  subcategory.items.forEach((item) => {
    if (item.techs) item.techs.forEach((tech) => allTechs.add(tech));
  });

  return Array.from(allTechs);
}

// ==================== SLUG HELPERS ====================
export function findComponentBySlugPath(
  slugPath: string,
): ComponentItem | null {
  for (const category of COMPONENTS) {
    for (const subcategory of category.subcategories) {
      for (const item of subcategory.items) {
        if (item.folderPath) {
          const kebabFolderPath = toKebabCase(item.folderPath);
          const kebabSlugPath = toKebabCase(slugPath);

          if (kebabFolderPath === kebabSlugPath) return item;

          const folderParts = item.folderPath.split("/");
          if (folderParts.length >= 3) {
            const simplifiedFolderPath = folderParts.slice(1).join("/");
            if (toKebabCase(simplifiedFolderPath) === kebabSlugPath)
              return item;
          }
        }
      }
    }
  }
  return null;
}

export function getComponentDisplayName(componentPath: string): string {
  const component = getComponentByPath(componentPath);
  return component ? component.itemName : "";
}

export function getComponentFolderPath(componentPath: string): string | null {
  const component = getComponentByPath(componentPath);
  return component?.folderPath || null;
}

// ==================== GITHUB UTILS ====================
export function getGitHubIssueUrl(
  componentPath: string,
  issueType: "feature" | "bug",
): string {
  const baseUrl = "https://github.com/thevinayakgore/ui.venumity/issues/new";
  const component = getComponentByPath(componentPath);
  const params = new URLSearchParams({
    labels: issueType === "feature" ? "enhancement" : "bug",
  });

  if (component) {
    const title = `[${issueType.toUpperCase()}] ${component.itemName} component`;
    params.set("title", title);
    params.set(
      "template",
      issueType === "feature" ? "feature-request.yml" : "bug-report.yml",
    );
    params.set("component-path", componentPath);
    params.set("component-name", component.itemName);
    params.set("component-category", component.category);
    if (component.subcategory) {
      params.set("component-subcategory", component.subcategory);
    }
  } else {
    params.set(
      "title",
      `[${issueType.toUpperCase()}] New ${issueType} request`,
    );
    params.set(
      "template",
      issueType === "feature" ? "feature-request.yml" : "bug-report.yml",
    );
  }

  return `${baseUrl}?${params.toString()}`;
}

// ==================== THUMBNAIL HELPERS ====================

/**
 * Get thumbnail path for category cards
 * Priority:
 * 1. Subcategory.thumbnail (custom thumbnail)
 * 2. First item's name (fallback)
 * Returns: /thumbnails/[thumbnail-name].png
 */
export function getCategoryCardThumbnailPath(
  subcategory: ComponentSubcategory,
): string {
  if (subcategory.thumbnail) {
    // Use custom thumbnail from subcategory
    return `/thumbnails/${toKebabCase(subcategory.thumbnail)}.png`;
  }

  if (subcategory.items && subcategory.items.length > 0) {
    // Use first item's name as fallback
    return `/thumbnails/${toKebabCase(subcategory.items[0].itemName)}.png`;
  }

  // No items, return empty string (will show default box)
  return "";
}

/**
 * Get thumbnail path for OG images (SEO)
 * Always uses the component item name
 * Returns: /thumbnails/[component-item-name].png
 */
export function getOGThumbnailPath(itemName: string): string {
  return `/thumbnails/${toKebabCase(itemName)}.png`;
}

export function getAllPaths(): string[] {
  const paths: string[] = [];
  COMPONENTS.forEach((cat) => {
    const catSlug = toKebabCase(cat.name);
    cat.subcategories.forEach((sub) => {
      const subSlug = toKebabCase(sub.name);
      // subcategory listing page
      paths.push(`${catSlug}/${subSlug}`);
      // individual component pages
      sub.items.forEach((item) => {
        const itemSlug = toKebabCase(item.itemName);
        paths.push(`${catSlug}/${subSlug}/${itemSlug}`);
      });
    });
  });
  return paths;
}
