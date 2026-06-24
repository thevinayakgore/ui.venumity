// app/api/search/route.ts
import { NextRequest, NextResponse } from "next/server";
import { COMPONENTS } from "@/registry/components";
import { RESOURCE_CATEGORIES } from "@/registry/resources";
import { changelogEntries } from "@/registry/site/changelog";
import { DOCS_DATA } from "@/registry/site/docs";
import { FAQ_DATA } from "@/registry/site/faq";
import { VIDEOS } from "@/registry/site/videos";
import { toKebabCase } from "@/utils/slug-kebab";
import Fuse from "fuse.js";

// -------------------- Types --------------------
type SearchResult = {
  type: "component" | "resource" | "changelog" | "docs" | "faq" | "video";
  title: string;
  description?: string;
  url: string;
  category?: string;
  tags?: string[];
};

// -------------------- Search Index (built once) --------------------
type IndexItem = {
  id: string;
  text: string;
  title: string;
  description: string;
  url: string;
  category: string;
  tags: string[];
  type: SearchResult["type"];
};

function buildSearchIndex(): IndexItem[] {
  const items: IndexItem[] = [];

  // 1. Components
  COMPONENTS.forEach((category) => {
    category.subcategories.forEach((subcategory) => {
      subcategory.items.forEach((item) => {
        const displayName = item.itemName;
        const categoryName = category.name;
        const subcategoryName = subcategory.name;
        const description = subcategory.description || "";
        const tags = [...(item.tags || []), ...(subcategory.tags || [])];
        const text = [
          displayName,
          categoryName,
          subcategoryName,
          description,
          ...tags,
        ]
          .join(" ")
          .toLowerCase();

        items.push({
          id: `${categoryName}-${subcategoryName}-${displayName}`,
          text,
          title: displayName,
          description: description || `${categoryName} • ${subcategoryName}`,
          url: `/components/${toKebabCase(categoryName)}/${toKebabCase(subcategoryName)}#${toKebabCase(displayName)}`,
          category: categoryName,
          tags: tags.slice(0, 3),
          type: "component",
        });
      });
    });
  });

  // 2. Resources
  RESOURCE_CATEGORIES.forEach((cat) => {
    cat.pages.forEach((page) => {
      if (!page.published) return;
      const text = [
        page.title,
        page.description || "",
        ...(page.tags || []),
        cat.name,
      ]
        .join(" ")
        .toLowerCase();
      items.push({
        id: `resource-${cat.slug}-${page.title}`,
        text,
        title: page.title,
        description: page.description || `Resource from ${cat.name}`,
        url: `/resources/${cat.slug}/${toKebabCase(page.title)}`,
        category: cat.name,
        tags: page.tags?.slice(0, 3) || [],
        type: "resource",
      });
    });
  });

  // 3. Changelog
  changelogEntries.forEach((entry) => {
    const text = [entry.title, entry.date].join(" ").toLowerCase();
    items.push({
      id: `changelog-${entry.title.substring(0, 20)}`,
      text,
      title: entry.title,
      description: `Changelog entry from ${entry.date}`,
      url: `/changelog#${toKebabCase(entry.title)}`,
      category: "Changelog",
      tags: ["changelog", "update"],
      type: "changelog",
    });
  });

  // 4. Docs
  DOCS_DATA.forEach((section) => {
    section.pages.forEach((page) => {
      if (page.published === false) return;
      const text = [page.page, ...(page.tags || []), section.title]
        .join(" ")
        .toLowerCase();
      items.push({
        id: `docs-${page.slug}`,
        text,
        title: page.page,
        description: `Documentation from ${section.title}`,
        url: `/docs/${page.slug}`,
        category: section.title,
        tags: page.tags?.slice(0, 3) || [],
        type: "docs",
      });
    });
  });

  // 5. FAQ
  FAQ_DATA.forEach((faq) => {
    const text = [faq.question, faq.answer].join(" ").toLowerCase();
    items.push({
      id: `faq-${faq.question.substring(0, 20)}`,
      text,
      title: faq.question,
      description: faq.answer.substring(0, 100) + "...",
      url: "/faq",
      category: "FAQ",
      tags: ["faq", "help"],
      type: "faq",
    });
  });

  // 6. Videos
  VIDEOS.forEach((video) => {
    const text = [video.title, video.description].join(" ").toLowerCase();
    items.push({
      id: `video-${video.id}`,
      text,
      title: video.title,
      description: video.description.substring(0, 100) + "...",
      url: `/videos#${video.id}`,
      category: "Video",
      tags: ["video", "tutorial"],
      type: "video",
    });
  });

  return items;
}

// Build index once (server startup)
const searchIndex = buildSearchIndex();

// Fuse instance for fuzzy search (fallback)
const fuse = new Fuse(searchIndex, {
  keys: ["text"],
  threshold: 0.6,
  includeScore: true,
  includeMatches: true,
  ignoreLocation: true,
  useExtendedSearch: true,
  shouldSort: true,
  findAllMatches: true,
  minMatchCharLength: 1,
});

// -------------------- Cache (in-memory with TTL) --------------------
const cache = new Map<string, { results: SearchResult[]; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

function getCached(query: string): SearchResult[] | null {
  const entry = cache.get(query);
  if (!entry) return null;
  if (Date.now() - entry.timestamp > CACHE_TTL) {
    cache.delete(query);
    return null;
  }
  return entry.results;
}

function setCache(query: string, results: SearchResult[]) {
  cache.set(query, { results, timestamp: Date.now() });
}

// -------------------- GET handler --------------------
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q")?.trim() || "";

  if (!query) {
    return NextResponse.json({ results: [] });
  }

  // 1. Check cache
  const cached = getCached(query);
  if (cached) {
    return NextResponse.json({
      results: cached,
      total: cached.length,
      query,
      cached: true,
    });
  }

  const queryLower = query.toLowerCase();

  // ============================================================
  // STEP 1: Find EXACT component name matches (case-insensitive)
  // AND also find matches where the title starts with the query
  // ============================================================
  const exactMatches: SearchResult[] = [];
  const startsWithMatches: SearchResult[] = [];

  // Search through all components
  COMPONENTS.forEach((category) => {
    category.subcategories.forEach((subcategory) => {
      subcategory.items.forEach((item) => {
        const displayName = item.itemName;
        const categoryName = category.name;
        const subcategoryName = subcategory.name;
        const description = subcategory.description || "";
        const tags = [...(item.tags || []), ...(subcategory.tags || [])];

        const titleLower = displayName.toLowerCase();

        // Exact match (case-insensitive) - highest priority
        if (titleLower === queryLower) {
          exactMatches.push({
            type: "component",
            title: displayName,
            description: description || `${categoryName} • ${subcategoryName}`,
            url: `/components/${toKebabCase(categoryName)}/${toKebabCase(subcategoryName)}#${toKebabCase(displayName)}`,
            category: categoryName,
            tags: tags.slice(0, 3),
          });
        }
        // Starts with match - second priority (only if no exact match)
        else if (
          exactMatches.length === 0 &&
          titleLower.startsWith(queryLower)
        ) {
          startsWithMatches.push({
            type: "component",
            title: displayName,
            description: description || `${categoryName} • ${subcategoryName}`,
            url: `/components/${toKebabCase(categoryName)}/${toKebabCase(subcategoryName)}#${toKebabCase(displayName)}`,
            category: categoryName,
            tags: tags.slice(0, 3),
          });
        }
      });
    });
  });

  // ============================================================
  // STEP 2: If we have exact or starts-with matches, return ONLY those
  // (no fuzzy search for components when we have a good match)
  // ============================================================
  if (exactMatches.length > 0) {
    setCache(query, exactMatches.slice(0, 20));
    return NextResponse.json({
      results: exactMatches.slice(0, 20),
      total: exactMatches.length,
      query,
      cached: false,
      matchType: "exact",
    });
  }

  if (startsWithMatches.length > 0) {
    setCache(query, startsWithMatches.slice(0, 20));
    return NextResponse.json({
      results: startsWithMatches.slice(0, 20),
      total: startsWithMatches.length,
      query,
      cached: false,
      matchType: "starts-with",
    });
  }

  // ============================================================
  // STEP 3: If no component matches, run fuzzy search for ALL content
  // ============================================================
  const rawResults = fuse.search(query);

  // Filter results with a lower threshold for better relevance
  const filteredResults = rawResults
    .filter(({ score }) => (score || 0) < 0.7) // Only include reasonably good matches
    .map(({ item }) => ({
      type: item.type,
      title: item.title,
      description: item.description,
      url: item.url,
      category: item.category,
      tags: item.tags,
    }))
    .slice(0, 20);

  setCache(query, filteredResults);

  return NextResponse.json({
    results: filteredResults,
    total: filteredResults.length,
    query,
    cached: false,
    matchType: "fuzzy",
  });
}
