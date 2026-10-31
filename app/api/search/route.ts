// app/api/search/route.ts
import Fuse from "fuse.js";
import { FAQ_DATA } from "@/registry/site/faq";
import { VIDEOS } from "@/registry/site/videos";
import { toKebabCase } from "@/utils/slug-kebab";
import { DOCS_DATA } from "@/registry/site/docs";
import { RESOURCES } from "@/registry/resources";
import { COMPONENTS } from "@/registry/components";
import { PRIMITIVES } from "@/registry/primitives";
import { CHANGELOGS } from "@/registry/site/changelog";
import { NextRequest, NextResponse } from "next/server";

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

export type SearchType =
  | "component"
  | "primitive"
  | "resource"
  | "changelog"
  | "docs"
  | "faq"
  | "video";

export interface SearchResult {
  type: SearchType;
  title: string;
  description?: string;
  url: string;
  category?: string;
  tags?: string[];
}

interface IndexItem {
  id: string;
  text: string;
  title: string;
  description: string;
  url: string;
  category: string;
  tags: string[];
  type: SearchType;
}

/* -------------------------------------------------------------------------- */
/*                              Build the index                               */
/* -------------------------------------------------------------------------- */

function buildSearchIndex(): IndexItem[] {
  const items: IndexItem[] = [];

  /* ---------- 1. Components ---------- */
  COMPONENTS.forEach((category) => {
    const catSlug = category.slug;
    const catName = category.name;

    category.subcategories.forEach((subcategory) => {
      const subSlug = subcategory.slug;
      const subName = subcategory.name;
      const subTags = subcategory.tags ?? [];

      subcategory.items.forEach((item) => {
        const itemSlug = item.slug;
        const displayName = item.itemName;

        const description =
          subcategory.description ||
          `${displayName} from ${catName} · ${subName}`;

        items.push({
          id: `component-${catSlug}-${subSlug}-${itemSlug}`,
          text: [displayName, catName, subName, description, ...subTags]
            .join(" ")
            .toLowerCase(),
          title: displayName,
          description,
          url: `/components/${catSlug}/${subSlug}#${itemSlug}`,
          category: catName,
          tags: subTags.slice(0, 3),
          type: "component",
        });
      });

      items.push({
        id: `component-sub-${catSlug}-${subSlug}`,
        text: [subName, catName, subcategory.description ?? "", ...subTags]
          .join(" ")
          .toLowerCase(),
        title: subName,
        description:
          subcategory.description ||
          `${subcategory.items.length} component${subcategory.items.length === 1 ? "" : "s"} in ${catName}`,
        url: `/components/${catSlug}/${subSlug}`,
        category: catName,
        tags: subTags.slice(0, 3),
        type: "component",
      });
    });
  });

  /* ---------- 2. Primitives ---------- */
  PRIMITIVES.forEach((category) => {
    const catSlug = category.slug;
    const catName = category.name;

    category.subcategories.forEach((subcategory) => {
      const subSlug = subcategory.slug;
      const subName = subcategory.name;
      const subTags = subcategory.tags ?? [];

      subcategory.items.forEach((item) => {
        const itemSlug = item.slug;
        const displayName = item.itemName;

        const description =
          subcategory.description ||
          `${displayName} from ${catName} · ${subName}`;

        items.push({
          id: `primitive-${catSlug}-${subSlug}-${itemSlug}`,
          text: [displayName, catName, subName, description, ...subTags]
            .join(" ")
            .toLowerCase(),
          title: displayName,
          description,
          url: `/primitives/${catSlug}/${subSlug}#${itemSlug}`,
          category: catName,
          tags: subTags.slice(0, 3),
          type: "primitive",
        });
      });

      items.push({
        id: `primitive-sub-${catSlug}-${subSlug}`,
        text: [subName, catName, subcategory.description ?? "", ...subTags]
          .join(" ")
          .toLowerCase(),
        title: subName,
        description:
          subcategory.description ||
          `${subcategory.items.length} primitive${subcategory.items.length === 1 ? "" : "s"} in ${catName}`,
        url: `/primitives/${catSlug}/${subSlug}`,
        category: catName,
        tags: subTags.slice(0, 3),
        type: "primitive",
      });
    });
  });

  /* ---------- 3. Resources ---------- */
  RESOURCES.forEach((cat) => {
    cat.pages.forEach((page) => {
      const pageSlug = toKebabCase(page.title);

      items.push({
        id: `resource-${cat.slug}-${pageSlug}`,
        text: [
          page.title,
          page.description ?? "",
          ...(page.tags ?? []),
          cat.name,
        ]
          .join(" ")
          .toLowerCase(),
        title: page.title,
        description: page.description || `Resource from ${cat.name}`,
        url: `/resources/${cat.slug}/${pageSlug}`,
        category: cat.name,
        tags: (page.tags ?? []).slice(0, 3),
        type: "resource",
      });
    });
  });

  /* ---------- 4. Changelog — flatten year groups ---------- */
  CHANGELOGS.forEach((group) => {
    group.items.forEach((entry) => {
      const anchor = toKebabCase(entry.title);
      items.push({
        id: `changelog-${anchor}`,
        text: [entry.title, entry.date].join(" ").toLowerCase(),
        title: entry.title,
        description: `Changelog entry · ${entry.date}`,
        url: `/changelog#${anchor}`,
        category: "Changelog",
        tags: ["changelog", "update"],
        type: "changelog",
      });
    });
  });

  /* ---------- 5. Docs — route from page.page ---------- */
  DOCS_DATA.forEach((section) => {
    section.pages.forEach((page) => {
      const slug = toKebabCase(page.page);
      items.push({
        id: `docs-${slug}`,
        text: [page.page, ...(page.tags ?? []), section.title]
          .join(" ")
          .toLowerCase(),
        title: page.page,
        description: `Documentation from ${section.title}`,
        url: `/docs/${slug}`,
        category: section.title,
        tags: (page.tags ?? []).slice(0, 3),
        type: "docs",
      });
    });
  });

  /* ---------- 6. FAQ ---------- */
  FAQ_DATA.forEach((faq) => {
    items.push({
      id: `faq-${toKebabCase(faq.question).slice(0, 40)}`,
      text: [faq.question, faq.answer].join(" ").toLowerCase(),
      title: faq.question,
      description:
        faq.answer.length > 100 ? `${faq.answer.slice(0, 100)}…` : faq.answer,
      url: "/faq",
      category: "FAQ",
      tags: ["faq", "help"],
      type: "faq",
    });
  });

  /* ---------- 7. Videos ---------- */
  VIDEOS.forEach((video) => {
    items.push({
      id: `video-${video.id}`,
      text: [video.title, video.description].join(" ").toLowerCase(),
      title: video.title,
      description:
        video.description.length > 100
          ? `${video.description.slice(0, 100)}…`
          : video.description,
      url: `/videos#${video.id}`,
      category: "Video",
      tags: ["video", "tutorial"],
      type: "video",
    });
  });

  return items;
}

/* -------------------------------------------------------------------------- */
/*                                Fuse setup                                  */
/* -------------------------------------------------------------------------- */

const searchIndex = buildSearchIndex();

const fuse = new Fuse(searchIndex, {
  keys: [
    { name: "title", weight: 3 },
    { name: "text", weight: 2 },
    { name: "tags", weight: 1.5 },
    { name: "category", weight: 1 },
  ],
  threshold: 0.4,
  distance: 100,
  minMatchCharLength: 2,
  includeScore: true,
  includeMatches: true,
  ignoreLocation: true,
  useExtendedSearch: false,
  shouldSort: true,
  findAllMatches: false,
  isCaseSensitive: false,
});

/* -------------------------------------------------------------------------- */
/*                                  Cache                                     */
/* -------------------------------------------------------------------------- */

const cache = new Map<string, { results: SearchResult[]; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000;

function getCached(key: string): SearchResult[] | null {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.timestamp > CACHE_TTL) {
    cache.delete(key);
    return null;
  }
  return entry.results;
}

function setCache(key: string, results: SearchResult[]) {
  cache.set(key, { results, timestamp: Date.now() });
}

/* -------------------------------------------------------------------------- */
/*                              GET handler                                   */
/* -------------------------------------------------------------------------- */

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const rawQuery = searchParams.get("q")?.trim() ?? "";
  const query = rawQuery;
  const queryLower = query.toLowerCase();
  const cacheKey = queryLower;

  if (!query) {
    return NextResponse.json({ results: [], total: 0, query: "" });
  }

  const cached = getCached(cacheKey);
  if (cached) {
    return NextResponse.json({
      results: cached,
      total: cached.length,
      query,
      cached: true,
    });
  }

  const exactMatches = searchIndex.filter(
    (item) => item.title.toLowerCase() === queryLower,
  );
  if (exactMatches.length > 0) {
    const results = exactMatches.slice(0, 20).map(toResult);
    setCache(cacheKey, results);
    return NextResponse.json({
      results,
      total: exactMatches.length,
      query,
      cached: false,
      matchType: "exact",
    });
  }

  const startsWithMatches = searchIndex.filter((item) =>
    item.title.toLowerCase().startsWith(queryLower),
  );
  if (startsWithMatches.length > 0) {
    const results = startsWithMatches.slice(0, 20).map(toResult);
    setCache(cacheKey, results);
    return NextResponse.json({
      results,
      total: startsWithMatches.length,
      query,
      cached: false,
      matchType: "starts-with",
    });
  }

  const raw = fuse.search(query);
  const results = raw
    .filter(({ score }) => (score ?? 0) < 0.55)
    .slice(0, 20)
    .map(({ item }) => toResult(item));

  setCache(cacheKey, results);

  return NextResponse.json({
    results,
    total: results.length,
    query,
    cached: false,
    matchType: "fuzzy",
  });
}

function toResult(item: IndexItem): SearchResult {
  return {
    type: item.type,
    title: item.title,
    description: item.description,
    url: item.url,
    category: item.category,
    tags: item.tags,
  };
}
