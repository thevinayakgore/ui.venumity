// registry/site/changelog.ts
export interface ChangelogEntry {
  title: string;
  date: string;
  images?: string[];
  contentPath: string;
}

export const changelogEntries: ChangelogEntry[] = [
  {
    title: "New Navbar & Background-Effect Component ✨",
    date: "Apr-21-2025",
    images: ["/banner.png"],
    contentPath: "/registry/site/changelog/2026/new-navbar-background-effect",
  },
  {
    title: "Responsive Resources & Templates Pages 📱",
    date: "Apr-05-2026",
    contentPath: "/registry/site/changelog/2026/responsive-resources-templates",
  },
  {
    title: "Minor Component Updates & Refinements 🔧",
    date: "Mar-19-2026",
    contentPath:
      "/registry/site/changelog/2026/minor-component-updates-refinements",
  },
  {
    title: "Pricing Table Components 💰",
    date: "Mar-11-2026",
    contentPath: "/registry/site/changelog/2026/pricing-table-components",
  },
  {
    title: "Project Launch & CLI Introduction 🚀",
    date: "Feb-22-2026",
    images: ["/banner.png", "/banner.png"],
    contentPath:
      "/registry/site/changelog/2026/project-launch-cli-introduction",
  },
];
