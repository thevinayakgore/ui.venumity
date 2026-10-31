// registry/registry-utils.ts
import { COMPONENTS } from "./components";
import { PRIMITIVES } from "./primitives";
import * as LucideIcons from "lucide-react";
import type { ResolvedPreview } from "@/types";
import type { LucideIcon } from "lucide-react";
import { toKebabCase } from "@/utils/slug-kebab";
import type {
  PrimitiveCategory,
  PrimitiveItem,
  PrimitiveSubcategory,
} from "@/types/primitives";
import type {
  ComponentCategory,
  ComponentItem,
  ComponentSubcategory,
} from "@/types/components";

/* -------------------------------------------------------------------------- */
/*                              Thumbnails                                    */
/* -------------------------------------------------------------------------- */

/**
 * Returns a prioritized list of possible thumbnail paths.
 * 1. Explicit thumbnail prop
 * 2. First item's name/slug
 * 3. Subcategory name/slug
 * 4. Category name/slug
 */
export function getThumbnailCandidates(
  categoryName?: string,
  subcategory?: {
    name?: string;
    slug?: string;
    items?: Array<{ itemName?: string; slug?: string }>;
    thumbnail?: string;
  },
): string[] {
  const candidates: string[] = [];

  // 1. Explicit thumbnail on the subcategory (if it exists)
  if (subcategory?.thumbnail) {
    candidates.push(toKebabCase(subcategory.thumbnail));
  }

  // 2. First available item in the subcategory
  if (subcategory?.items && subcategory.items.length > 0) {
    const firstItem = subcategory.items[0];
    if (firstItem.slug) candidates.push(toKebabCase(firstItem.slug));
    if (firstItem.itemName) candidates.push(toKebabCase(firstItem.itemName));
  }

  // 3. Subcategory slug or name
  if (subcategory?.slug) candidates.push(toKebabCase(subcategory.slug));
  if (subcategory?.name) candidates.push(toKebabCase(subcategory.name));

  // 4. Category name (fallback)
  if (categoryName) {
    candidates.push(toKebabCase(categoryName));
  }

  // Dedupe and drop any empty values, then prefix with /thumbnails/ and .webp
  const unique = Array.from(new Set(candidates.filter(Boolean)));
  return unique.map((c) => `/thumbnails/${c}.webp`);
}

export function getOGThumbnailPath(itemName: string): string {
  return `/thumbnails/${toKebabCase(itemName)}.webp`;
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

// ── COMPONENTS ────────────────────────────────────────────
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

export function getComponentByPath(path: string): ComponentItem | null {
  const parts = path.split("/").filter(Boolean);
  for (const category of COMPONENTS) {
    for (const subcategory of category.subcategories) {
      for (const item of subcategory.items) {
        if (item.folderPath && toKebabCase(item.folderPath) === path)
          return item;
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

export function getCategoryTags(categoryName: string): string[] {
  const category = getCategory(categoryName);
  if (!category) return [];
  const allTags = new Set<string>();
  if (category.tags) category.tags.forEach((tag) => allTags.add(tag));
  category.subcategories.forEach((sub) => {
    if (sub.tags) sub.tags.forEach((tag) => allTags.add(tag));
  });
  return Array.from(allTags);
}

export function getSubcategoryTags(
  categoryName: string,
  subcategoryName: string,
): string[] {
  const sub = getSubcategory(categoryName, subcategoryName);
  if (!sub) return [];
  const allTags = new Set<string>();
  if (sub.tags) sub.tags.forEach((tag) => allTags.add(tag));
  return Array.from(allTags);
}

export function findComponentBySlugPath(
  slugPath: string,
): ComponentItem | null {
  for (const category of COMPONENTS) {
    for (const sub of category.subcategories) {
      for (const item of sub.items) {
        if (item.folderPath) {
          const kebabFolderPath = toKebabCase(item.folderPath);
          const kebabSlugPath = toKebabCase(slugPath);
          if (kebabFolderPath === kebabSlugPath) return item;
          const folderParts = item.folderPath.split("/");
          if (folderParts.length >= 3) {
            const simplified = folderParts.slice(1).join("/");
            if (toKebabCase(simplified) === kebabSlugPath) return item;
          }
        }
      }
    }
  }
  return null;
}

export function getComponentDisplayName(componentPath: string): string {
  return getComponentByPath(componentPath)?.itemName ?? "";
}

export function getComponentFolderPath(componentPath: string): string | null {
  return getComponentByPath(componentPath)?.folderPath ?? null;
}

export function getAllPaths(): string[] {
  const paths: string[] = [];
  COMPONENTS.forEach((cat) => {
    const catSlug = toKebabCase(cat.name);
    cat.subcategories.forEach((sub) => {
      const subSlug = toKebabCase(sub.name);
      paths.push(`${catSlug}/${subSlug}`);
      sub.items.forEach((item) => {
        paths.push(`${catSlug}/${subSlug}/${toKebabCase(item.itemName)}`);
      });
    });
  });
  return paths;
}

export function resolvePrimitiveBySlug(slugPath: string): {
  category: PrimitiveCategory;
  subcategory: PrimitiveSubcategory;
  item: PrimitiveItem;
} | null {
  const parts = slugPath.split("/").filter(Boolean);
  if (parts.length < 2) return null;
  const [catSlug, subSlug] = parts;
  const category = getPrimitiveCategory(catSlug);
  if (!category) return null;
  const subcategory = getPrimitiveSubcategory(catSlug, subSlug);
  if (!subcategory) return null;
  const itemSlug = parts[2];
  const item = itemSlug
    ? (subcategory.items.find((i) => i.slug === itemSlug) ??
      subcategory.items[0])
    : subcategory.items[0];
  return { category, subcategory, item };
}

// ... (rest of the existing resolvePreviewBySlug, primitives, and GitHub utils remain untouched)

export function resolvePreviewBySlug(slugPath: string): ResolvedPreview | null {
  const parts = slugPath.split("/").filter(Boolean);
  if (parts.length < 2) return null;

  const firstKebab = toKebabCase(parts[0]);
  const middleKebab = parts.length >= 3 ? toKebabCase(parts[1]) : null;
  const lastKebab = toKebabCase(parts[parts.length - 1]);

  // ── PRIMITIVES: /preview/<category>/<subcategory>/<variant|demo> ──
  if (parts.length === 3) {
    const cat = PRIMITIVES.find((c) => toKebabCase(c.slug) === firstKebab);
    if (cat) {
      const sub = cat.subcategories.find(
        (s) => toKebabCase(s.slug) === middleKebab,
      );
      if (sub) {
        // 1. Registered item
        const item = sub.items.find((i) => toKebabCase(i.slug) === lastKebab);
        if (item) {
          return {
            itemName: item.itemName,
            description:
              sub.description ||
              `Live preview of ${item.itemName} from the ${sub.name} collection in ${cat.name}.`,
            category: cat.slug,
            subcategory: sub.slug,
            categoryName: cat.name,
            subcategoryName: sub.name,
            slugPath: `${cat.slug}/${sub.slug}/${item.slug}`,
            source: "primitives",
          };
        }

        // 2. More Examples (declared in subcategory.moreExamples)
        const moreExamples = sub.moreExamples ?? [];
        if (moreExamples.some((f) => toKebabCase(f) === lastKebab)) {
          const fileName =
            moreExamples.find((f) => toKebabCase(f) === lastKebab) ?? lastKebab;
          const niceName = fileName
            .split("-")
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
            .join(" ");
          return {
            itemName: niceName,
            description:
              sub.description ||
              `Additional ${sub.name.toLowerCase()} example from the ${cat.name} collection.`,
            category: cat.slug,
            subcategory: sub.slug,
            categoryName: cat.name,
            subcategoryName: sub.name,
            slugPath: `${cat.slug}/${sub.slug}/${lastKebab}`,
            source: "primitives",
          };
        }

        // 3. Special case: "demo"
        if (lastKebab === "demo" && sub.items.length > 0) {
          const firstItem = sub.items[0];
          return {
            itemName: firstItem.itemName,
            description:
              sub.description ||
              `Live preview of the ${sub.name} demo from the ${cat.name} collection.`,
            category: cat.slug,
            subcategory: sub.slug,
            categoryName: cat.name,
            subcategoryName: sub.name,
            slugPath: `${cat.slug}/${sub.slug}/demo`,
            source: "primitives",
          };
        }
      }
    }
  }

  // ── COMPONENTS: /preview/<cat>/<sub>/<variant|demo> ──
  if (parts.length === 3) {
    const cat = COMPONENTS.find((c) => toKebabCase(c.name) === firstKebab);
    const sub = cat?.subcategories.find(
      (s) => toKebabCase(s.name) === middleKebab,
    );
    if (cat && sub) {
      // 1. Registered item
      const item = sub.items.find((i) => toKebabCase(i.itemName) === lastKebab);
      if (item) {
        return {
          itemName: item.itemName,
          description: sub.description || `Live preview of ${item.itemName}.`,
          category: toKebabCase(cat.name),
          subcategory: toKebabCase(sub.name),
          categoryName: cat.name,
          subcategoryName: sub.name,
          slugPath: `${toKebabCase(cat.name)}/${toKebabCase(sub.name)}/${toKebabCase(item.itemName)}`,
          source: "components",
        };
      }

      // 2. More Examples
      const moreExamples = sub.moreExamples ?? [];
      if (moreExamples.some((f) => toKebabCase(f) === lastKebab)) {
        const fileName =
          moreExamples.find((f) => toKebabCase(f) === lastKebab) ?? lastKebab;
        const niceName = fileName
          .split("-")
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" ");
        return {
          itemName: niceName,
          description:
            sub.description ||
            `Additional ${sub.name.toLowerCase()} example from the ${cat.name} collection.`,
          category: toKebabCase(cat.name),
          subcategory: toKebabCase(sub.name),
          categoryName: cat.name,
          subcategoryName: sub.name,
          slugPath: `${toKebabCase(cat.name)}/${toKebabCase(sub.name)}/${lastKebab}`,
          source: "components",
        };
      }

      // 3. Special case: "demo"
      if (lastKebab === "demo" && sub.items.length > 0) {
        const firstItem = sub.items[0];
        return {
          itemName: firstItem.itemName,
          description:
            sub.description ||
            `Live preview of the ${sub.name} demo from the ${cat.name} collection.`,
          category: toKebabCase(cat.name),
          subcategory: toKebabCase(sub.name),
          categoryName: cat.name,
          subcategoryName: sub.name,
          slugPath: `${toKebabCase(cat.name)}/${toKebabCase(sub.name)}/demo`,
          source: "components",
        };
      }
    }
  }

  return null;
}

// ── PRIMITIVES (nested: category → subcategory → items) ──
export function getPrimitiveCategory(slug: string): PrimitiveCategory | null {
  return (
    PRIMITIVES.find((c) => toKebabCase(c.slug) === toKebabCase(slug)) || null
  );
}

export function getPrimitiveSubcategory(
  categorySlug: string,
  subcategorySlug: string,
): PrimitiveSubcategory | null {
  const cat = getPrimitiveCategory(categorySlug);
  if (!cat) return null;
  return (
    cat.subcategories.find(
      (s) => toKebabCase(s.slug) === toKebabCase(subcategorySlug),
    ) || null
  );
}

export function getPrimitiveItem(
  categorySlug: string,
  subcategorySlug: string,
  itemSlug: string,
): PrimitiveItem | null {
  const sub = getPrimitiveSubcategory(categorySlug, subcategorySlug);
  if (!sub) return null;
  return (
    sub.items.find((i) => toKebabCase(i.slug) === toKebabCase(itemSlug)) || null
  );
}

export function getAllPrimitiveCategorySlugs(): string[] {
  return PRIMITIVES.map((c) => c.slug);
}

export function getAllPrimitivePathSlugs(): string[][] {
  const paths: string[][] = [];
  PRIMITIVES.forEach((cat) => {
    cat.subcategories.forEach((sub) => {
      paths.push([cat.slug, sub.slug]);
      sub.items.forEach((item) => {
        paths.push([cat.slug, sub.slug, item.slug]);
      });
    });
  });
  return paths;
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
