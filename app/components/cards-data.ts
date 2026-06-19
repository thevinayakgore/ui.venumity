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
    if (category.subcategories.length > 0) {
      category.subcategories.forEach((subcategory) => {
        const itemCount = subcategory.items?.length || 0;
        const path = `/${toKebabCase(category.name)}/${toKebabCase(subcategory.name)}`;

        const allTags =
          subcategory.tags ||
          getSubcategoryTags(
            toKebabCase(category.name),
            toKebabCase(subcategory.name),
          ) ||
          [];

        const allTechs =
          subcategory.techs ||
          getSubcategoryTechs(
            toKebabCase(category.name),
            toKebabCase(subcategory.name),
          ) ||
          [];

        const description =
          subcategory.description ||
          `${itemCount} component${itemCount !== 1 ? "s" : ""} for ${subcategory.name.toLowerCase()}`;

        const thumbnailPath = getCategoryCardThumbnailPath(subcategory);

        cards.push({
          id: `${category.name}-${subcategory.name}`,
          title: subcategory.name,
          description,
          type: "subcategory",
          parentCategory: category.name,
          path,
          itemCount,
          tags: allTags,
          techs: allTechs,
          thumbnail: thumbnailPath,
        });
      });
    }
  });

  return [...cards].sort((a, b) =>
    a.title.toLowerCase().localeCompare(b.title.toLowerCase()),
  );
}
