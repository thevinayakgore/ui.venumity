// registry/site/changelog.ts
export interface ChangelogLink {
  name: string;
  href: string;
}

export interface ChangelogItem {
  title: string;
  date: string;
  covers?: string[];
  gallery?: string[];
  links?: ChangelogLink[];
}

export interface ChangelogCategory {
  year: string;
  items: ChangelogItem[];
}

export const CHANGELOGS: ChangelogCategory[] = [
  {
    year: "2026",
    items: [
      {
        title:
          "🎉 Major Release : New Primitives, Components & Resources with completely reimagined Architecture",
        date: "Nov-02-2026",
        covers: ["redesign", "primitives", "resources"],
        gallery: [
          "audio",
          "attachment",
          "backend",
          "skeleton",
          "gemini-style-chat-shell",
          "lessons",
        ],
        links: [
          {
            name: "Primitives",
            href: "/primitives",
          },
          {
            name: "Components",
            href: "/components",
          },
          {
            name: "npm version v1.0.5",
            href: "https://www.npmjs.com/package/venumityui",
          },
        ],
      },
      {
        title: "🚀 New in CLI v1.0.4 - Multi–Package Manager Support",
        date: "Sep-26-2026",
        covers: ["npm-cli-update", "cli-update"],
        links: [
          {
            name: "CLI Documentation",
            href: "https://www.npmjs.com/package/venumityui",
          },
          {
            name: "Components",
            href: "/components",
          },
        ],
      },
      {
        title: "🚀 Venumity UI CLI v1.0.0",
        date: "Jun-19-2026",
        covers: ["cli-release", "cli-bar", "compo-list", "cli-help"],
        links: [
          {
            name: "CLI Documentation",
            href: "https://www.npmjs.com/package/venumityui",
          },
        ],
      },
      {
        title: "🎨 Site Redesign, SEO & llms.txt Added",
        date: "Jun-19-2026",
        covers: [
          "site-design-1",
          "site-design-2",
          "site-design-3",
          "site-design-4",
        ],
        links: [
          {
            name: "Live Website",
            href: "https://ui.venumity.com",
          },
          {
            name: "llms.txt",
            href: "/llms.txt",
          },
        ],
      },
      {
        title: "🧩 122+ New Components",
        date: "Jun-19-2026",
        covers: ["components-page", "real-time-filterable-table"],
        links: [
          {
            name: "Browse All Components",
            href: "/components",
          },
          {
            name: "Resources",
            href: "/resources",
          },
        ],
      },
      {
        title: "🔎 Component Search & Advanced Filtering",
        date: "May-28-2026",
        covers: ["site-searchbar"],
      },
      {
        title: "🧭 New Background-Effect Components",
        date: "Apr-21-2026",
        covers: ["gradient-spotlight-1"],
        links: [
          {
            name: "Navbar",
            href: "/components?category=navbar",
          },
          {
            name: "Background Effects",
            href: "/components?category=background-effects",
          },
        ],
      },
      {
        title: "📱 Full Site Responsiveness",
        date: "Apr-5-2026",
      },
      {
        title: "💰 Pricing Table Components",
        date: "Mar-11-2026",
        covers: ["pricing-table-2", "tiered-pricing-card"],
        links: [
          {
            name: "Pricing Table Components",
            href: "/components?category=pricing",
          },
        ],
      },
      {
        title: "🚀 Venumity UI - Initial Launch",
        date: "Jan-26-2026",
        covers: ["brand-logo"],
        links: [
          {
            name: "Website",
            href: "https://ui.venumity.com",
          },
          {
            name: "github/ui.venumity",
            href: "https://github.com/thevinayakgore/ui.venumity",
          },
          {
            name: "Components",
            href: "https://ui.venumity.com/components",
          },
          {
            name: "Docs",
            href: "https://ui.venumity.com/docs/introduction",
          },
        ],
      },
    ],
  },
];
