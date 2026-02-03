// registry/resources.ts
export interface ResourcePage {
  title: string;
  published: boolean;
  contentPath: string; // Path to .md file (relative from /app directory)
  description?: string;
  officialUrl?: string;
  tags?: string[];
  coverImage?: string;
}

export interface ResourceCategory {
  name: string;
  slug: string;
  description?: string;
  pages: ResourcePage[];
  order?: number;
}

export const RESOURCE_CATEGORIES: ResourceCategory[] = [
  {
    name: "Framework Guides",
    slug: "frameworks",
    description: "Framework guides, best practices, and ecosystem resources.",
    order: 1,
    pages: [
      {
        title: "Next.js",
        published: true,
        contentPath: "/registry/reso/frameworks/nextjs.md", // Add /
        description:
          "A comprehensive Next.js guide covering server components, routing, data fetching, performance optimization, and best practices for building scalable, production-ready web applications.",
        officialUrl: "https://nextjs.org/",
        tags: [
          "nextjs",
          "react",
          "servercomponents",
          "ssr",
          "ssg",
          "fullstack",
          "performance",
        ],
        coverImage: "/icons/nextjs.png",
      },
      {
        title: "React",
        published: true,
        contentPath: "/registry/reso/frameworks/react.md", // Add /
        description:
          "An in-depth React guide explaining core concepts such as components, hooks, state management, performance patterns, and modern best practices for building maintainable frontend applications.",
        officialUrl: "https://reactnative.dev/",
        tags: [
          "react",
          "frontend",
          "hooks",
          "statemanagement",
          "javascript",
          "ui",
        ],
        coverImage: "/icons/react.png",
      },
    ],
  },
  {
    name: "Animation Libraries",
    slug: "animations",
    description: "Animation tools for interactive and motion-rich interfaces.",
    order: 2,
    pages: [
      {
        title: "Framer Motion",
        published: true,
        contentPath: "/registry/reso/animations/framer-motion.md", // Add /
        description:
          "A practical guide to Framer Motion for building smooth, interactive animations and micro-interactions in modern React applications with minimal effort.",
        officialUrl: "https://motion.dev/",
        tags: [
          "framermotion",
          "animation",
          "react",
          "motiondesign",
          "microinteractions",
        ],
        coverImage: "/icons/motion.png",
      },
      {
        title: "GSAP",
        published: true,
        contentPath: "/registry/reso/animations/gsap.md", // Add /
        description:
          "A complete GSAP tutorial covering timelines, scroll-based animations, and advanced motion techniques for creating high-performance web animations.",
        officialUrl: "https://gsap.com/",
        tags: [
          "gsap",
          "animation",
          "timelines",
          "scrollanimations",
          "performance",
        ],
        coverImage: "/icons/gsap.png",
      },
    ],
  },
  {
    name: "Tutorials",
    slug: "tutorials",
    description: "Step-by-step tutorials and real-world implementation guides.",
    order: 3,
    pages: [
      {
        title: "Sanity CMS",
        published: true,
        contentPath: "/registry/reso/tutorials/sanity-cms.md", // Add /
        description:
          "A step-by-step Sanity CMS tutorial explaining schema design, content modeling, GROQ queries, and integration with modern frontend frameworks.",
        officialUrl: "https://www.sanity.io/",
        tags: ["sanity", "headlesscms", "content", "groq", "backend"],
        coverImage: "/icons/sanity.png",
      },
      {
        title: "Strapi",
        published: true,
        contentPath: "/registry/reso/tutorials/strapi.md", // Add /
        description:
          "A complete Strapi CMS guide covering API creation, authentication, content types, and integration with frontend applications.",
        officialUrl: "https://strapi.io/",
        tags: ["strapi", "headlesscms", "api", "cms", "backend"],
        coverImage: "/icons/strapi.png",
      },
    ],
  },
  {
    name: "Cheat Sheets",
    slug: "cheat-sheets",
    description: "Quick references and practical syntax guides.",
    order: 4,
    pages: [
      {
        title: "JavaScript ES6+",
        published: true,
        contentPath: "/registry/reso/cheat-sheets/javascript-es6.md", // Add /
        description:
          "A concise JavaScript ES6+ cheat sheet covering modern syntax, language features, and commonly used patterns for efficient development.",
        tags: ["javascript", "es6", "syntax", "reference", "cheatsheet"],
        coverImage: "/icons/javascript.png",
      },
      {
        title: "C++",
        published: true,
        contentPath: "/registry/reso/cheat-sheets/c++.md",
        description:
          "A comprehensive C++ cheat sheet covering syntax, standard libraries, common idioms, and best practices for efficient C++ programming.",
        tags: ["c++", "cpp", "syntax", "reference", "cheatsheet"],
        coverImage: "/icons/c++.png",
      },
      {
        title: "TypeScript",
        published: true,
        contentPath: "/registry/reso/cheat-sheets/typescript.md",
        description:
          "A practical TypeScript cheat sheet covering types, interfaces, generics, and common patterns for building scalable and type-safe applications.",
        tags: ["typescript", "javascript", "types", "reference", "cheatsheet"],
        coverImage: "/icons/typescript.png",
      },
      {
        title: "Git Commands",
        published: true,
        contentPath: "/registry/reso/cheat-sheets/git-commands.md",
        description:
          "100s of handy Git commands in this cheat sheet covering essential commands, workflows, and tips for effective version control and collaboration.",
        tags: ["git", "versioncontrol", "commands", "reference", "cheatsheet"],
        coverImage: "/icons/git.png",
      },
    ],
  },
];

// Helper function to get all categories
export function getAllResources(): ResourceCategory[] {
  return RESOURCE_CATEGORIES.sort((a, b) => (a.order || 0) - (b.order || 0));
}

// Helper function to get category by slug
export function getCategoryBySlug(slug: string): ResourceCategory | undefined {
  return RESOURCE_CATEGORIES.find((cat) => cat.slug === slug);
}

// Helper function to get page by title within a category
export function getPageByTitle(
  categorySlug: string,
  pageTitle: string,
): ResourcePage | undefined {
  const category = getCategoryBySlug(categorySlug);
  if (!category) return undefined;

  return category.pages.find(
    (page) => page.title === pageTitle && page.published,
  );
}

// Helper function to get all category display data
export function getAllCategories() {
  return RESOURCE_CATEGORIES.map((category) => ({
    id: category.slug,
    label: category.name,
    slug: category.slug,
    description: category.description,
  }));
}
