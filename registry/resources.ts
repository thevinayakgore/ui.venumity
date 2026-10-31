// registry/resources.ts
import { toKebabCase } from "@/utils/slug-kebab";
import { ResourceCategory, ResourcePage } from "../types";

export const RESOURCES: ResourceCategory[] = [
  {
    name: "Animation Libraries",
    slug: "animations",
    icon: "sparkles",
    description: "Animation tools for interactive and motion-rich interfaces.",
    pages: [
      {
        title: "Framer Motion",
        contentPath: "/registry/reso/animations/framer-motion.md",
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
      },
      {
        title: "GSAP",
        contentPath: "/registry/reso/animations/gsap.md",
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
      },
    ],
  },
  {
    name: "Framework Guides",
    slug: "frameworks",
    description: "Framework guides, best practices, and ecosystem resources.",
    icon: "layout",
    pages: [
      {
        title: "Next.js",
        contentPath: "/registry/reso/frameworks/next-js.md",
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
      },
      {
        title: "React",
        contentPath: "/registry/reso/frameworks/react.md",
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
      },
    ],
  },
  {
    name: "Tutorials",
    slug: "tutorials",
    description: "Step-by-step tutorials and real-world implementation guides.",
    icon: "graduation-cap",
    pages: [
      {
        title: "Sanity CMS",
        contentPath: "/registry/reso/tutorials/sanity-cms.md",
        description:
          "A step-by-step Sanity CMS tutorial explaining schema design, content modeling, GROQ queries, and integration with modern frontend frameworks.",
        officialUrl: "https://www.sanity.io/",
        tags: ["sanity", "headlesscms", "content", "groq", "backend"],
      },
      {
        title: "Strapi",
        contentPath: "/registry/reso/tutorials/strapi.md",
        description:
          "A complete Strapi CMS guide covering API creation, authentication, content types, and integration with frontend applications.",
        officialUrl: "https://strapi.io/",
        tags: ["strapi", "headlesscms", "api", "cms", "backend"],
      },
      {
        title: "Frontend",
        newItem: true,
        contentPath: "/registry/reso/tutorials/frontend.md",
        description:
          "A practical guide to modern frontend development. Learn React, Next.js, component architecture, responsive UI, state management, performance optimization, and accessibility.",
        officialUrl: "https://nextjs.org/docs",
        tags: [
          "ui",
          "design",
          "frontend",
          "typescript",
          "components",
          "responsive",
          "performance",
          "accessibility",
        ],
      },
      {
        title: "Backend",
        newItem: true,
        contentPath: "/registry/reso/tutorials/backend.md",
        description:
          "A practical guide to backend development for modern web applications. Learn APIs, authentication, server-side logic, databases, caching, security, and deployment using Node.js, Next.js, and related tools.",
        officialUrl: "https://nextjs.org/docs",
        tags: [
          "backend",
          "api",
          "rest",
          "graphql",
          "nodejs",
          "nextjs",
          "authentication",
          "security",
          "serverless",
        ],
      },
      {
        title: "Database",
        newItem: true,
        contentPath: "/registry/reso/tutorials/database.md",
        description:
          "A practical guide to databases for web applications. Learn relational and NoSQL databases, data modeling, queries, migrations, indexing, ORM usage, and database-backed features in Next.js apps.",
        officialUrl: "https://www.prisma.io/docs",
        tags: [
          "database",
          "sql",
          "postgresql",
          "mongodb",
          "prisma",
          "drizzle",
          "orm",
          "data-modeling",
          "migrations",
        ],
      },
      {
        title: "Hosting",
        contentPath: "/registry/reso/tutorials/hosting.md",
        description:
          "A practical guide to hosting and deploying modern web applications. Learn the differences between static, serverless, and VPS hosting, and how to deploy Next.js apps on platforms like Vercel, Netlify, and AWS.",
        officialUrl: "https://vercel.com/docs",
        tags: [
          "hosting",
          "deployment",
          "nextjs",
          "vercel",
          "netlify",
          "aws",
          "ci/cd",
          "devops",
        ],
      },
      {
        title: "Deployment",
        contentPath: "/registry/reso/tutorials/deployment.md",
        description:
          "A practical guide to hosting and deploying modern web applications. Learn the differences between static, serverless, and VPS hosting, and how to deploy Next.js apps on platforms like Vercel, Netlify, and AWS.",
        officialUrl: "https://vercel.com/docs",
        tags: [
          "hosting",
          "deployment",
          "nextjs",
          "vercel",
          "netlify",
          "aws",
          "ci/cd",
          "devops",
        ],
      },
    ],
  },
  {
    name: "Cheat Sheets",
    slug: "cheat-sheets",
    description: "Quick references and practical syntax guides.",
    icon: "file-text",
    pages: [
      {
        title: "JavaScript ES6+",
        contentPath: "/registry/reso/cheat-sheets/javascript-es6.md",
        description:
          "A concise JavaScript ES6+ cheat sheet covering modern syntax, language features, and commonly used patterns for efficient development.",
        tags: ["javascript", "es6", "syntax", "reference", "cheatsheet"],
      },
      {
        title: "TypeScript",
        contentPath: "/registry/reso/cheat-sheets/typescript.md",
        description:
          "A practical TypeScript cheat sheet covering types, interfaces, generics, and common patterns for building scalable and type-safe applications.",
        tags: ["typescript", "javascript", "types", "reference", "cheatsheet"],
      },
      {
        title: "Git Commands",
        contentPath: "/registry/reso/cheat-sheets/git-commands.md",
        description:
          "100s of handy Git commands in this cheat sheet covering essential commands, workflows, and tips for effective version control and collaboration.",
        tags: ["git", "versioncontrol", "commands", "reference", "cheatsheet"],
      },
      {
        title: "C++",
        contentPath: "/registry/reso/cheat-sheets/c++.md",
        description:
          "A comprehensive C++ cheat sheet covering syntax, standard libraries, common idioms, and best practices for efficient C++ programming.",
        tags: ["c++", "cpp", "syntax", "reference", "cheatsheet"],
      },
    ],
  },
];

// (Helper functions remain exactly the same)
export function getAllResources(): ResourceCategory[] {
  return RESOURCES;
}

export function getCategoryBySlug(slug: string): ResourceCategory | undefined {
  return RESOURCES.find((cat) => cat.slug === slug);
}

export function getPageByTitle(
  categorySlug: string,
  pageTitle: string,
): ResourcePage | undefined {
  const category = getCategoryBySlug(categorySlug);
  if (!category) return undefined;

  return category.pages.find((page) => page.title === pageTitle);
}

export function getAllCategories() {
  return RESOURCES.map((category) => ({
    id: category.slug,
    label: category.name,
    slug: category.slug,
    description: category.description,
    icon: category.icon,
  }));
}

export function getAllResourcePathSlugs(): string[][] {
  const paths: string[][] = [];
  RESOURCES.forEach((cat) => {
    cat.pages.forEach((page) => {
      paths.push([cat.slug, toKebabCase(page.title)]);
    });
  });
  return paths;
}

export function resolveResourceBySlug(slugPath: string): {
  category: ResourceCategory;
  page: ResourcePage;
} | null {
  const parts = slugPath.split("/").filter(Boolean);
  if (parts.length !== 2) return null;

  const [catSlug, pageSlug] = parts;
  const category = getCategoryBySlug(catSlug);
  if (!category) return null;

  const page = category.pages.find((p) => toKebabCase(p.title) === pageSlug);

  if (!page) return null;
  return { category, page };
}
