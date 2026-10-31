// registry/site/docs.ts
import { toKebabCase } from "@/utils/slug-kebab";

export interface DocsPage {
  page: string;
  tags?: string[];
  newItem?: boolean;
}

export interface DocsSection {
  title: string;
  icon: string;
  pages: DocsPage[];
}

/* -------------------------------------------------------------------------- */
/*                               Docs Registry                                */
/* -------------------------------------------------------------------------- */

export const DOCS_DATA: DocsSection[] = [
  {
    title: "Documents",
    icon: "Terminal",
    pages: [
      {
        page: "Introduction",
        tags: ["docs", "start", "intro", "library", "react"],
      },
      {
        page: "Overview",
        newItem: true,
        tags: [
          "guide",
          "structure",
          "components",
          "opensource",
          "pullrequest",
          "contributing",
        ],
      },
      {
        page: "Add Resources",
        tags: [
          "resources",
          "learning",
          "developer",
          "tutorials",
          "community",
          "collaboration",
        ],
      },
      {
        page: "CLI Guide",
        tags: [
          "cli",
          "tools",
          "command",
          "terminal",
          "productivity",
          "installation",
        ],
      },
      {
        page: "Contributors",
        newItem: true,
      },
    ],
  },
];

// Helper function to get page by slug
export function getPageBySlug(slug: string): DocsPage | undefined {
  for (const section of DOCS_DATA) {
    const page = section.pages.find((p) => toKebabCase(p.page) === slug);
    if (page) return page;
  }
  return undefined;
}

// Helper function to get section for a page
export function getSectionForPage(slug: string): DocsSection | undefined {
  for (const section of DOCS_DATA) {
    const page = section.pages.find((p) => toKebabCase(p.page) === slug);
    if (page) return section;
  }
  return undefined;
}

// Helper to get navigation (prev/next pages)
export function getPageNavigation(slug: string): {
  prevPage: DocsPage | null;
  nextPage: DocsPage | null;
  section: DocsSection | null;
} {
  const allPages = DOCS_DATA.flatMap((s) => s.pages);
  const currentIndex = allPages.findIndex((p) => toKebabCase(p.page) === slug);

  return {
    prevPage: currentIndex > 0 ? allPages[currentIndex - 1] : null,
    nextPage:
      currentIndex < allPages.length - 1 ? allPages[currentIndex + 1] : null,
    section: getSectionForPage(slug) || null,
  };
}
