// registry/site/changelog.ts
export interface ChangelogEntry {
  title: string;
  date: string;
  images?: string[];
  contentPath: string;
}

export const changelogEntries: ChangelogEntry[] = [
  {
    title: "🚀 Venumity UI CLI v1.0.0",
    date: "Jun-19-2026",
    images: ["/cli-release.png", "/cli-bar.png", "/compo-list.png", "/cli-help.png"],
    contentPath: "/registry/site/changelog/2026",
  },
  {
    title: "🎨 Site Redesign, SEO & llms.txt Added",
    date: "Jun-19-2026",
    images: ["/site-design-1.png", "/site-design-2.png", "/site-design-3.png", "/site-design-4.png"],
    contentPath: "/registry/site/changelog/2026",
  },
  {
    title: "🧩 122+ New Components",
    date: "Jun-19-2026",
    images: ["/components-page.png", "/real-time-filterable-table.png"],
    contentPath:
      "/registry/site/changelog/2026",
  },
  {
    title: "🔎 Component Search & Advanced Filtering",
    date: "May-28-2026",
    images: ["/site-searchbar.png"],
    contentPath:
      "/registry/site/changelog/2026",
  },
  {
    title: "🧭 New Background-Effect Components",
    date: "Apr-21-2026",
      images: ["/gradient-spotlight-1.png"],
    contentPath: "/registry/site/changelog/2026",
  },
  {
    title: "📱 Full Site Responsiveness",
    date: "Apr-5-2026",
    contentPath:
      "/registry/site/changelog/2026",
  },
  {
    title: "💰 Pricing Table Components",
    date: "Mar-11-2026",
    images: ["/pricing-table-2.png", "/tiered-pricing-card.png"],
    contentPath:
      "/registry/site/changelog/2026",
  },
  {
    title: "🚀 Venumity UI - Initial Launch",
    date: "Jan-26-2026",
    images: ["/brand-logo.png"],
    contentPath:
      "/registry/site/changelog/2026",
  },
];
