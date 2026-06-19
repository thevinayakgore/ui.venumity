// registry/site/docs.ts
export interface DocsPage {
  page: string;
  slug: string;
  contentPath: string; // Path to .md file in registry/docs/
  tags?: string[];
  published?: boolean;
}

export interface DocsSection {
  title: string;
  type: "docs";
  icon: string;
  pages: DocsPage[];
}

/* -------------------------------------------------------------------------- */
/*                               Docs Registry                                */
/* -------------------------------------------------------------------------- */

export const DOCS_DATA: DocsSection[] = [
  {
    title: "Documents",
    type: "docs",
    icon: "Terminal",
    pages: [
      {
        page: "Getting Started",
        slug: "getting-started",
        contentPath: "/registry/docs/getting-started.md", // Add /
        published: true,
        tags: ["docs", "starter"],
      },
      {
        page: "Introduction",
        slug: "introduction",
        contentPath: "/registry/docs/introduction.md", // Add /
        published: true,
        tags: ["docs", "intro"],
      },
      {
        page: "Installation",
        slug: "installation",
        contentPath: "/registry/docs/installation.md", // Add /
        published: true,
        tags: ["setup"],
      },
      {
        page: "Add Resources",
        slug: "add-resources",
        contentPath: "/registry/docs/add-resources.md", // Add /
        published: true,
        tags: ["resource", "learningmaterials", "buildtogether"],
      },
    ],
  },
];

// Helper function to get page by slug
export function getPageBySlug(slug: string): DocsPage | undefined {
  for (const section of DOCS_DATA) {
    const page = section.pages.find(
      (p) => p.slug === slug && p.published !== false,
    );
    if (page) return page;
  }
  return undefined;
}

// Helper function to get section for a page
export function getSectionForPage(slug: string): DocsSection | undefined {
  for (const section of DOCS_DATA) {
    const page = section.pages.find((p) => p.slug === slug);
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
  const allPages = DOCS_DATA.flatMap((s) =>
    s.pages.filter((p) => p.published !== false),
  );
  const currentIndex = allPages.findIndex((p) => p.slug === slug);

  return {
    prevPage: currentIndex > 0 ? allPages[currentIndex - 1] : null,
    nextPage:
      currentIndex < allPages.length - 1 ? allPages[currentIndex + 1] : null,
    section: getSectionForPage(slug) || null,
  };
}
