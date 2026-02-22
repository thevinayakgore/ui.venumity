import { MetadataRoute } from "next";
import { COMPONENTS } from "@/registry/components";
import { toKebabCase } from "@/utils/slug-kebab";
import { website } from "@/lib/brand";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = website || "https://ui.venumity.com";
  const pages: MetadataRoute.Sitemap = [];

  // Homepage
  pages.push({
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 1.0,
  });

  // Components listing
  pages.push({
    url: `${baseUrl}/components`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.9,
  });

  // Subcategories and components
  COMPONENTS.forEach((category) => {
    category.subcategories.forEach((subcategory) => {
      const subPath = `/${toKebabCase(category.name)}/${toKebabCase(subcategory.name)}`;
      pages.push({
        url: `${baseUrl}/components${subPath}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      });

      subcategory.items.forEach((item) => {
        const itemPath = `${subPath}/${toKebabCase(item.itemName)}`;
        pages.push({
          url: `${baseUrl}/components${itemPath}`,
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 0.7,
        });
      });
    });
  });

  return pages;
}