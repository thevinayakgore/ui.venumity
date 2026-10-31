// lib/library-cards.ts
import { toKebabCase } from "@/utils/slug-kebab";
import { COMPONENTS } from "@/registry/components";
import { PRIMITIVES } from "@/registry/primitives";
import {
  getSubcategoryTags,
  getThumbnailCandidates,
} from "@/registry/registry-utils";

export interface CategoryCard {
  id: string;
  path: string;
  title: string;
  tags: string[];
  itemCount: number;
  description: string;
  parentCategory?: string;
  thumbnailCandidates: string[];
  type: "category" | "subcategory";
}

// Loose shapes so we can handle both registries
type LooseSubcategory = {
  name: string;
  description?: string;
  tags?: string[];
  newItem?: boolean;
  icon?: string;
  items: Array<{ itemName: string }>;
};

type LooseCategory = {
  name: string;
  icon: string;
  tags?: string[];
  subcategories?: LooseSubcategory[];
  items?: Array<{ itemName: string }>;
  description?: string;
};

function buildFromSubcategories(
  registry: LooseCategory[],
  basePath: string,
): CategoryCard[] {
  const cards: CategoryCard[] = [];

  registry.forEach((category) => {
    if (!category.subcategories) return;

    category.subcategories.forEach((subcategory) => {
      const itemCount = subcategory.items?.length || 0;
      if (itemCount === 0) return;

      const catSlug = toKebabCase(category.name);
      const subSlug = toKebabCase(subcategory.name);
      const path = `${basePath}/${catSlug}/${subSlug}`;

      const allTags =
        subcategory.tags && subcategory.tags.length > 0
          ? subcategory.tags
          : getSubcategoryTags(catSlug, subSlug) || [];

      const description =
        subcategory.description ||
        `${itemCount} component${itemCount !== 1 ? "s" : ""} for ${subcategory.name.toLowerCase()}`;

      // ✅ Use the new array generator
      const thumbnailCandidates = getThumbnailCandidates(
        category.name,
        subcategory,
      );

      cards.push({
        id: `${catSlug}-${subSlug}`,
        title: subcategory.name,
        description,
        type: "subcategory",
        parentCategory: category.name,
        path,
        itemCount,
        tags: allTags,
        thumbnailCandidates,
      });
    });
  });

  return cards;
}

function sortCards(cards: CategoryCard[]): CategoryCard[] {
  return [...cards].sort((a, b) =>
    a.title.toLowerCase().localeCompare(b.title.toLowerCase()),
  );
}

// ─── Components (uses subcategories) ──────────────────────
export function getComponentCards(): CategoryCard[] {
  return sortCards(
    buildFromSubcategories(
      COMPONENTS as unknown as LooseCategory[],
      "/components",
    ),
  );
}

// ─── Primitives (now uses subcategories too) ──────────────
export function getPrimitiveCards(): CategoryCard[] {
  return sortCards(
    buildFromSubcategories(
      PRIMITIVES as unknown as LooseCategory[],
      "/primitives",
    ),
  );
}
