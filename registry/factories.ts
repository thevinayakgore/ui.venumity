// registry/factories.ts
import { toKebabCase } from "@/utils/slug-kebab";
import type { PropDefinition } from "@/types/components";
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

/* ─────────────────────────────────────────────────────────────
   PRIMITIVES
   ───────────────────────────────────────────────────────────── */
export function createPrimitives(
  data: {
    category: string;
    icon: string;
    description?: string;
    thumbnail?: string;
    tags?: string[];
    techs?: string[];
    subcategories: {
      name: string;
      description?: string;
      thumbnail?: string;
      tags?: string[];
      techs?: string[];
      newItem?: boolean;
      usage?: string;
      props?: PropDefinition[];
      /** NEW — kebab-case file names present in the folder but not
       *  declared in `items`. Rendered under "More Examples". */
      moreExamples?: string[];
      items: {
        itemName: string;
        description?: string;
        tags?: string[];
        video?: string;
        githubUsername?: string;
      }[];
    }[];
  }[],
): PrimitiveCategory[] {
  return data.map((cat) => {
    const catSlug = toKebabCase(cat.category);

    return {
      name: cat.category,
      slug: catSlug,
      icon: cat.icon,
      description: cat.description,
      thumbnail: cat.thumbnail,
      tags: cat.tags || [],
      techs: cat.techs || [],
      subcategories: cat.subcategories.map((sub): PrimitiveSubcategory => {
        const subSlug = toKebabCase(sub.name);
        return {
          name: sub.name,
          slug: subSlug,
          description: sub.description,
          thumbnail: sub.thumbnail,
          tags: sub.tags || [],
          techs: sub.techs || [],
          newItem: sub.newItem,
          usage: sub.usage,
          props: sub.props || [],
          moreExamples: sub.moreExamples,
          items: sub.items.map((item): PrimitiveItem => {
            const itemSlug = toKebabCase(item.itemName);
            const folderPath = `${catSlug}/${subSlug}`;
            return {
              ...item,
              slug: itemSlug,
              category: catSlug,
              subcategory: subSlug,
              folderPath,
              filePath: `${folderPath}/${itemSlug}.tsx`,
            };
          }),
        };
      }),
    };
  });
}

/* ─────────────────────────────────────────────────────────────
   COMPONENTS
   ───────────────────────────────────────────────────────────── */
export function createComponents(
  data: {
    category: string;
    icon: string;
    description?: string;
    thumbnail?: string;
    tags?: string[];
    techs?: string[];
    subcategories: {
      name: string;
      description?: string;
      thumbnail?: string;
      tags?: string[];
      techs?: string[];
      newItem?: boolean;
      /** default "variant" */
      kind?: "variant" | "multi";
      props?: PropDefinition[];
      /** NEW — kebab-case file names present in the folder but not
       *  declared in `items`. Rendered under "More Examples". */
      moreExamples?: string[];
      items: { itemName: string; githubUsername?: string }[];
    }[];
  }[],
): ComponentCategory[] {
  return data.map((cat) => {
    const catSlug = toKebabCase(cat.category);
    return {
      name: cat.category,
      slug: catSlug,
      icon: cat.icon,
      description: cat.description,
      thumbnail: cat.thumbnail,
      tags: cat.tags || [],
      techs: cat.techs || [],
      subcategories: cat.subcategories.map((sub): ComponentSubcategory => {
        const subSlug = toKebabCase(sub.name);
        const kind = sub.kind ?? "variant";
        return {
          name: sub.name,
          slug: subSlug,
          description: sub.description,
          thumbnail: sub.thumbnail,
          tags: sub.tags || [],
          techs: sub.techs || [],
          newItem: sub.newItem,
          kind,
          props: kind === "variant" ? sub.props || [] : undefined,
          moreExamples: sub.moreExamples,
          items: sub.items.map((item): ComponentItem => {
            const itemSlug = toKebabCase(item.itemName);
            if (kind === "multi") {
              const folderPath = `${catSlug}/${subSlug}/${itemSlug}`;
              return {
                ...item,
                slug: itemSlug,
                category: catSlug,
                subcategory: subSlug,
                kind: "multi",
                folderPath,
                filePath: `${folderPath}/index.tsx`,
              };
            }
            const folderPath = `${catSlug}/${subSlug}`;
            return {
              ...item,
              slug: itemSlug,
              category: catSlug,
              subcategory: subSlug,
              kind: "variant",
              folderPath,
              filePath: `${folderPath}/${itemSlug}.tsx`,
            };
          }),
        };
      }),
    };
  });
}