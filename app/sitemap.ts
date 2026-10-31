// app/sitemap.ts
import fs from "fs";
import path from "path";
import { MetadataRoute } from "next";
import { website } from "@/lib/brand";
import { FAQ_DATA } from "@/registry/site/faq";
import { VIDEOS } from "@/registry/site/videos";
import { toKebabCase } from "@/utils/slug-kebab";
import { DOCS_DATA } from "@/registry/site/docs";
import { RESOURCES } from "@/registry/resources";
import { COMPONENTS } from "@/registry/components";
import { PRIMITIVES } from "@/registry/primitives";
import { CHANGELOGS } from "@/registry/site/changelog";

// ─────────────────────────────────────────────────────────────
// Read thumbnail filenames directly from disk at build time
// ─────────────────────────────────────────────────────────────
function listAllThumbnails(): string[] {
  try {
    const dir = path.join(process.cwd(), "public", "thumbnails");
    if (!fs.existsSync(dir)) return [];
    return fs
      .readdirSync(dir, { withFileTypes: true })
      .filter(
        (entry) =>
          entry.isFile() &&
          entry.name.toLowerCase().endsWith(".webp") &&
          !entry.name.startsWith("."),
      )
      .map((entry) => entry.name.replace(/\.webp$/i, ""))
      .sort();
  } catch {
    return [];
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = (website || "https://ui.venumity.com").replace(/\/$/, "");
  const pages: MetadataRoute.Sitemap = [];

  // ============================================================
  // DATES
  // ============================================================
  const LAUNCH_DATE = new Date("2025-01-26");
  const TODAY = new Date();

  // ============================================================
  // STATIC PAGES — highest crawl priority
  // ============================================================
  const staticPages: Array<{
    path: string;
    priority: number;
    freq: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
    lastModified?: Date;
  }> = [
    { path: "", priority: 1.0, freq: "daily", lastModified: TODAY },
    { path: "/components", priority: 0.95, freq: "daily", lastModified: TODAY },
    { path: "/primitives", priority: 0.95, freq: "daily", lastModified: TODAY },
    { path: "/cli", priority: 0.9, freq: "weekly", lastModified: TODAY },
    { path: "/resources", priority: 0.9, freq: "weekly", lastModified: TODAY },
    { path: "/docs", priority: 0.9, freq: "weekly", lastModified: TODAY },
    { path: "/templates", priority: 0.85, freq: "weekly", lastModified: TODAY },
    { path: "/thumbnails", priority: 0.8, freq: "daily", lastModified: TODAY },
    { path: "/changelog", priority: 0.75, freq: "weekly", lastModified: TODAY },
    { path: "/videos", priority: 0.7, freq: "weekly", lastModified: TODAY },
    {
      path: "/contributors",
      priority: 0.7,
      freq: "weekly",
      lastModified: TODAY,
    },
    { path: "/faq", priority: 0.7, freq: "monthly", lastModified: LAUNCH_DATE },
    {
      path: "/legal/license",
      priority: 0.6,
      freq: "yearly",
      lastModified: LAUNCH_DATE,
    },
    {
      path: "/legal/privacy",
      priority: 0.6,
      freq: "yearly",
      lastModified: LAUNCH_DATE,
    },
    {
      path: "/legal/terms",
      priority: 0.6,
      freq: "yearly",
      lastModified: LAUNCH_DATE,
    },
    {
      path: "/legal/refund",
      priority: 0.5,
      freq: "yearly",
      lastModified: LAUNCH_DATE,
    },
  ];

  staticPages.forEach(({ path, priority, freq, lastModified }) => {
    pages.push({
      url: `${baseUrl}${path}`,
      lastModified: lastModified || TODAY,
      changeFrequency: freq,
      priority,
    });
  });

  // ============================================================
  // COMPONENT CATEGORIES / SUBCATEGORIES / ITEMS
  // ============================================================
  COMPONENTS.forEach((category) => {
    const catSlug = toKebabCase(category.name);

    category.subcategories.forEach((subcategory) => {
      const subSlug = toKebabCase(subcategory.name);

      // Subcategory listing page
      pages.push({
        url: `${baseUrl}/components/${catSlug}/${subSlug}`,
        lastModified: TODAY,
        changeFrequency: "weekly",
        priority: 0.85,
      });

      // Individual component pages
      subcategory.items.forEach((item) => {
        const itemSlug = toKebabCase(item.itemName);
        pages.push({
          url: `${baseUrl}/components/${catSlug}/${subSlug}/${itemSlug}`,
          lastModified: TODAY,
          changeFrequency: "weekly",
          priority: 0.8,
        });

        // Live preview page (route matches resolvePreviewBySlug)
        pages.push({
          url: `${baseUrl}/preview/${catSlug}/${subSlug}/${itemSlug}`,
          lastModified: TODAY,
          changeFrequency: "monthly",
          priority: 0.6,
        });
      });

      // Subcategory-level extra examples exposed by the registry
      (subcategory.moreExamples ?? []).forEach((example) => {
        pages.push({
          url: `${baseUrl}/preview/${catSlug}/${subSlug}/${toKebabCase(example)}`,
          lastModified: TODAY,
          changeFrequency: "monthly",
          priority: 0.55,
        });
      });
    });
  });

  // ============================================================
  // PRIMITIVE CATEGORIES / SUBCATEGORIES / ITEMS
  // ============================================================
  PRIMITIVES.forEach((category) => {
    const catSlug = toKebabCase(category.name);

    category.subcategories.forEach((subcategory) => {
      const subSlug = toKebabCase(subcategory.name);

      pages.push({
        url: `${baseUrl}/primitives/${catSlug}/${subSlug}`,
        lastModified: TODAY,
        changeFrequency: "weekly",
        priority: 0.85,
      });

      subcategory.items.forEach((item) => {
        const itemSlug = toKebabCase(item.itemName);
        pages.push({
          url: `${baseUrl}/primitives/${catSlug}/${subSlug}/${itemSlug}`,
          lastModified: TODAY,
          changeFrequency: "weekly",
          priority: 0.8,
        });

        pages.push({
          url: `${baseUrl}/preview/${catSlug}/${subSlug}/${itemSlug}`,
          lastModified: TODAY,
          changeFrequency: "monthly",
          priority: 0.6,
        });
      });

      (subcategory.moreExamples ?? []).forEach((example) => {
        pages.push({
          url: `${baseUrl}/preview/${catSlug}/${subSlug}/${toKebabCase(example)}`,
          lastModified: TODAY,
          changeFrequency: "monthly",
          priority: 0.55,
        });
      });
    });
  });

  // ============================================================
  // RESOURCES
  // ============================================================
  RESOURCES.forEach((cat) => {
    // Category listing page
    pages.push({
      url: `${baseUrl}/resources/${cat.slug}`,
      lastModified: TODAY,
      changeFrequency: "monthly",
      priority: 0.75,
    });

    cat.pages.forEach((page) => {
      pages.push({
        url: `${baseUrl}/resources/${cat.slug}/${toKebabCase(page.title)}`,
        lastModified: TODAY,
        changeFrequency: "monthly",
        priority: 0.7,
      });
    });
  });

  // ============================================================
  // DOCS
  // ============================================================
  DOCS_DATA.forEach((section) => {
    section.pages.forEach((page) => {
      pages.push({
        url: `${baseUrl}/docs/${toKebabCase(page.page)}`,
        lastModified: TODAY,
        changeFrequency: "monthly",
        priority: 0.75,
      });
    });
  });

  // ============================================================
  // CHANGELOG — flatten year groups → entries
  // ============================================================
  CHANGELOGS.forEach((group) => {
    group.items.forEach((entry) => {
      const entryDate = new Date(entry.date);
      pages.push({
        url: `${baseUrl}/changelog#${toKebabCase(entry.title)}`,
        lastModified: isNaN(entryDate.getTime()) ? LAUNCH_DATE : entryDate,
        changeFrequency: "yearly",
        priority: 0.5,
      });
    });
  });

  // ============================================================
  // VIDEOS
  // ============================================================
  VIDEOS.forEach((video) => {
    const videoDate = new Date(video.date);
    pages.push({
      url: `${baseUrl}/videos#${video.id}`,
      lastModified: isNaN(videoDate.getTime()) ? LAUNCH_DATE : videoDate,
      changeFrequency: "yearly",
      priority: 0.5,
    });
  });

  // ============================================================
  // FAQ
  // ============================================================
  FAQ_DATA.forEach((_, idx) => {
    pages.push({
      url: `${baseUrl}/faq#faq-${idx}`,
      lastModified: LAUNCH_DATE,
      changeFrequency: "yearly",
      priority: 0.5,
    });
  });

  // ============================================================
  // THUMBNAILS — every image gets its own indexable page
  // ============================================================
  const thumbnails = listAllThumbnails();
  thumbnails.forEach((name) => {
    pages.push({
      url: `${baseUrl}/thumbnails/${name}`,
      lastModified: TODAY,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  });

  return pages;
}
