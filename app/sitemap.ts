// app/sitemap.ts
import { MetadataRoute } from "next";
import { COMPONENTS } from "@/registry/components";
import { toKebabCase } from "@/utils/slug-kebab";
import { website } from "@/lib/brand";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = website || "https://ui.venumity.com";
  const pages: MetadataRoute.Sitemap = [];

  // 1. Homepage
  pages.push({
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 1.0,
  });

  // 2. Main components listing page
  pages.push({
    url: `${baseUrl}/components`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  });

  // 3. Subcategory pages (e.g., /components/buttons/primary)
  COMPONENTS.forEach((category) => {
    category.subcategories.forEach((subcategory) => {
      const subcategoryPath = `/${toKebabCase(category.name)}/${toKebabCase(subcategory.name)}`;
      pages.push({
        url: `${baseUrl}/components${subcategoryPath}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      });

      // 4. Individual component pages
      subcategory.items.forEach((item) => {
        const componentPath = `${subcategoryPath}/${toKebabCase(item.itemName)}`;
        pages.push({
          url: `${baseUrl}/components${componentPath}`,
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 0.7,
        });
      });
    });
  });

  return pages;
}