// app/components/cards-data.ts
import { COMPONENTS } from "@/registry/components";
import { toKebabCase } from "@/utils/slug-kebab";
import {
  getSubcategoryTags,
  getSubcategoryTechs,
  getCategoryCardThumbnailPath,
} from "@/registry/component-utils";

export interface CategoryCard {
  id: string;
  title: string;
  thumbnail?: string;
  description: string;
  type: "category" | "subcategory";
  parentCategory?: string;
  path: string;
  itemCount: number;
  tags: string[];
  techs?: string[];
}

export function getCategoryCards(): CategoryCard[] {
  const cards: CategoryCard[] = [];

  COMPONENTS.forEach((category) => {
    // Every category has subcategories — iterate them
    category.subcategories.forEach((subcategory) => {
      const itemCount = subcategory.items?.length || 0;
      if (itemCount === 0) return; // Skip empty subcategories

      const catSlug = toKebabCase(category.name);
      const subSlug = toKebabCase(subcategory.name);
      const path = `/${catSlug}/${subSlug}`;

      // Prefer subcategory-level tags/techs; fall back to computed
      const allTags =
        (subcategory.tags && subcategory.tags.length > 0
          ? subcategory.tags
          : getSubcategoryTags(catSlug, subSlug)) || [];

      const allTechs =
        (subcategory.techs && subcategory.techs.length > 0
          ? subcategory.techs
          : getSubcategoryTechs(catSlug, subSlug)) || [];

      const description =
        subcategory.description ||
        `${itemCount} component${itemCount !== 1 ? "s" : ""} for ${subcategory.name.toLowerCase()}`;

      const thumbnailPath = getCategoryCardThumbnailPath(subcategory);

      cards.push({
        id: `${catSlug}-${subSlug}`,
        title: subcategory.name,
        description,
        type: "subcategory",
        parentCategory: category.name,
        path,
        itemCount,
        tags: allTags,
        techs: allTechs,
        thumbnail: thumbnailPath || undefined,
      });
    });
  });

  return [...cards].sort((a, b) =>
    a.title.toLowerCase().localeCompare(b.title.toLowerCase()),
  );
}