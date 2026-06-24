// app/sitemap.ts
import { MetadataRoute } from "next";
import { COMPONENTS } from "@/registry/components";
import { RESOURCE_CATEGORIES } from "@/registry/resources";
import { DOCS_DATA } from "@/registry/site/docs";
import { changelogEntries } from "@/registry/site/changelog";
import { VIDEOS } from "@/registry/site/videos";
import { FAQ_DATA } from "@/registry/site/faq";
import { toKebabCase } from "@/utils/slug-kebab";
import { website } from "@/lib/brand";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = website || "https://ui.venumity.com";
  const pages: MetadataRoute.Sitemap = [];

  // ============================================================
  // STATIC PAGES — fixed launch date
  // ============================================================
  const LAUNCH_DATE = new Date("2025-01-26"); // Your initial launch date

  const staticPages: Array<{
    path: string;
    priority: number;
    freq: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
    lastModified?: Date;
  }> = [
    { path: "", priority: 1.0, freq: "weekly", lastModified: LAUNCH_DATE },
    { path: "/components", priority: 0.9, freq: "daily", lastModified: LAUNCH_DATE },
    { path: "/resources", priority: 0.8, freq: "weekly", lastModified: LAUNCH_DATE },
    { path: "/docs", priority: 0.8, freq: "weekly", lastModified: LAUNCH_DATE },
    { path: "/changelog", priority: 0.7, freq: "weekly", lastModified: LAUNCH_DATE },
    { path: "/videos", priority: 0.7, freq: "monthly", lastModified: LAUNCH_DATE },
    { path: "/faq", priority: 0.7, freq: "monthly", lastModified: LAUNCH_DATE },
    { path: "/contributors", priority: 0.6, freq: "monthly", lastModified: LAUNCH_DATE },
    { path: "/cli", priority: 0.8, freq: "weekly", lastModified: LAUNCH_DATE },
  ];

  staticPages.forEach(({ path, priority, freq, lastModified }) => {
    pages.push({
      url: `${baseUrl}${path}`,
      lastModified: lastModified || LAUNCH_DATE,
      changeFrequency: freq,
      priority,
    });
  });

  // ============================================================
  // COMPONENTS — use today's date (they're updated when added)
  // ============================================================
  const TODAY = new Date();

  COMPONENTS.forEach((category) => {
    category.subcategories.forEach((subcategory) => {
      const subPath = `/${toKebabCase(category.name)}/${toKebabCase(subcategory.name)}`;
      pages.push({
        url: `${baseUrl}/components${subPath}`,
        lastModified: TODAY,
        changeFrequency: "weekly",
        priority: 0.8,
      });

      subcategory.items.forEach((item) => {
        const itemPath = `${subPath}/${toKebabCase(item.itemName)}`;
        pages.push({
          url: `${baseUrl}/components${itemPath}`,
          lastModified: TODAY,
          changeFrequency: "monthly",
          priority: 0.7,
        });
      });
    });
  });

  // ============================================================
  // RESOURCES — use page's contentPath date if available
  // ============================================================
  RESOURCE_CATEGORIES.forEach((cat) => {
    cat.pages.forEach((page) => {
      if (!page.published) return;

      // Try to extract date from contentPath or use launch date
      let lastModified: Date = LAUNCH_DATE;
      if (page.contentPath) {
        // If you have a way to get file modification date, use it here
        // For now, use today's date for recently published resources
        lastModified = TODAY;
      }

      pages.push({
        url: `${baseUrl}/resources/${cat.slug}/${toKebabCase(page.title)}`,
        lastModified,
        changeFrequency: "monthly",
        priority: 0.6,
      });
    });
  });

  // ============================================================
  // DOCS — use page's contentPath date if available
  // ============================================================
  DOCS_DATA.forEach((section) => {
    section.pages.forEach((page) => {
      if (page.published === false) return;
      pages.push({
        url: `${baseUrl}/docs/${page.slug}`,
        lastModified: TODAY, // or LAUNCH_DATE if older
        changeFrequency: "monthly",
        priority: 0.6,
      });
    });
  });

  // ============================================================
  // CHANGELOG — use the entry's date
  // ============================================================
  changelogEntries.forEach((entry) => {
    const entryDate = new Date(entry.date);
    pages.push({
      url: `${baseUrl}/changelog#${toKebabCase(entry.title)}`,
      lastModified: isNaN(entryDate.getTime()) ? LAUNCH_DATE : entryDate,
      changeFrequency: "yearly",
      priority: 0.5,
    });
  });

  // ============================================================
  // VIDEOS — use the video's date
  // ============================================================
  VIDEOS.forEach((video) => {
    const videoDate = new Date(video.date);
    pages.push({
      url: `${baseUrl}/videos#${video.id}`,
      lastModified: isNaN(videoDate.getTime()) ? LAUNCH_DATE : videoDate,
      changeFrequency: "yearly",
      priority: 0.4,
    });
  });

  // ============================================================
  // FAQ — use launch date (static content)
  // ============================================================
  FAQ_DATA.forEach((_, idx) => {
    pages.push({
      url: `${baseUrl}/faq#faq-${idx}`,
      lastModified: LAUNCH_DATE,
      changeFrequency: "yearly",
      priority: 0.4,
    });
  });

  return pages;
}