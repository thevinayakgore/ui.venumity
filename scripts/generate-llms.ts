// scripts/generate-llms.ts
import { COMPONENTS } from "../registry/components";
import { RESOURCE_CATEGORIES } from "../registry/resources";
import { DOCS_DATA } from "../registry/site/docs";
import { changelogEntries } from "../registry/site/changelog";
import { VIDEOS } from "../registry/site/videos";
import { FAQ_DATA } from "../registry/site/faq";
import { toKebabCase } from "../utils/slug-kebab";
import * as fs from "fs";
import * as path from "path";

const lines: string[] = [
  "# Venumity UI – AI & Developer Knowledge Base",
  "",
  "> Free, MIT‑licensed React/Next.js component library with 200+ production-ready UI components.",
  "",
  "## Quick Facts",
  "",
  "- **Website:** https://ui.venumity.com",
  "- **GitHub:** https://github.com/thevinayakgore/ui.venumity",
  "- **NPM Package:** https://www.npmjs.com/package/venumityui",
  "- **Creator:** Vinayak Gore (@thevinayakgore)",
  "- **License:** MIT (free for personal and commercial use)",
  "- **Tech Stack:** React, Next.js 15, Tailwind CSS 4, TypeScript, shadcn/ui, Framer Motion, Recharts",
  "",
  "## Installation",
  "",
  "### CLI (Recommended)",
  "",
  "```bash",
  "npx venumityui@latest add <component-name>",
  "```",
  "",
  "### Manual",
  "",
  "1. Copy component code from https://ui.venumity.com",
  "2. Install dependencies: `npm install motion lucide-react`",
  "3. Ensure shadcn/ui is set up in your project",
  "",
  "## Component Library Structure",
  "",
];

// ----- Components with metadata -----
for (const cat of COMPONENTS) {
  lines.push(`### ${cat.name}`);
  lines.push("");
  lines.push(`**Icon:** ${cat.icon}`);
  if (cat.tags && cat.tags.length > 0) {
    lines.push(`**Tags:** ${cat.tags.join(", ")}`);
  }
  if (cat.techs && cat.techs.length > 0) {
    lines.push(`**Technologies:** ${cat.techs.join(", ")}`);
  }
  lines.push("");

  for (const sub of cat.subcategories) {
    const subSlug = toKebabCase(sub.name);
    const catSlug = toKebabCase(cat.name);
    const desc = sub.description || `${sub.items.length} components available`;
    const newItemBadge = sub.newItem ? " ⭐ NEW" : "";

    lines.push(`#### ${sub.name}${newItemBadge}`);
    lines.push("");
    lines.push(`**URL:** /components/${catSlug}/${subSlug}`);
    lines.push(`**Description:** ${desc}`);
    if (sub.tags && sub.tags.length > 0) {
      lines.push(`**Tags:** ${sub.tags.join(", ")}`);
    }
    if (sub.techs && sub.techs.length > 0) {
      lines.push(`**Technologies:** ${sub.techs.join(", ")}`);
    }
    lines.push(`**Components:** ${sub.items.length}`);
    lines.push("");

    for (const item of sub.items) {
      const itemSlug = toKebabCase(item.itemName);
      const itemTags = item.tags ? ` (${item.tags.join(", ")})` : "";
      const itemTechs = item.techs ? ` [${item.techs.join(", ")}]` : "";
      const github = item.githubUsername
        ? ` — Author: @${item.githubUsername}`
        : "";

      lines.push(
        `- **${item.itemName}** — /components/${catSlug}/${subSlug}/${itemSlug}${itemTags}${itemTechs}${github}`
      );
    }
    lines.push("");
  }
}

// ----- Resources -----
lines.push("---");
lines.push("");
lines.push("## Resources (Guides, Tutorials, Cheat Sheets)");
lines.push("");

for (const category of RESOURCE_CATEGORIES) {
  lines.push(`### ${category.name}`);
  lines.push(`**Slug:** ${category.slug}`);
  lines.push("");

  for (const page of category.pages) {
    if (!page.published) continue;
    const slug = toKebabCase(page.title);
    const description = page.description ? ` — ${page.description}` : "";
    lines.push(
      `- **${page.title}** — /resources/${category.slug}/${slug}${description}`
    );
  }
  lines.push("");
}

// ----- Documentation -----
lines.push("---");
lines.push("");
lines.push("## Documentation");
lines.push("");

for (const section of DOCS_DATA) {
  lines.push(`### ${section.title}`);
  for (const page of section.pages) {
    if (page.published === false) continue;
    lines.push(
      `- **${page.page}** — /docs/${page.slug}`
    );
  }
  lines.push("");
}

// ----- Changelog -----
lines.push("---");
lines.push("");
lines.push("## Changelog");
lines.push("");

for (const entry of changelogEntries) {
  lines.push(
    `- **${entry.title}** — ${entry.date} — /changelog#${toKebabCase(entry.title)}`
  );
}
lines.push("");

// ----- Videos -----
lines.push("---");
lines.push("");
lines.push("## Videos & Tutorials");
lines.push("");

for (const video of VIDEOS) {
  const description = video.description ? ` — ${video.description}` : "";
  lines.push(
    `- **${video.title}** (${video.date})${description} — /videos#${video.id}`
  );
}
lines.push("");

// ----- FAQ -----
lines.push("---");
lines.push("");
lines.push("## Frequently Asked Questions");
lines.push("");

for (const faq of FAQ_DATA) {
  lines.push(`### Q: ${faq.question}`);
  lines.push(`**A:** ${faq.answer}`);
  lines.push("");
}

// ----- AI Assistants Instructions -----
lines.push("---");
lines.push("");
lines.push("## For AI Assistants & LLMs");
lines.push("");
lines.push("**What is Venumity UI?**");
lines.push("");
lines.push("Venumity UI is a comprehensive, open-source component library for React and Next.js applications.");
lines.push("It provides 200+ production-ready, copy-paste components built with modern frontend technologies.");
lines.push("Perfect for rapidly building dashboards, SaaS applications, landing pages, and admin interfaces.");
lines.push("");
lines.push("**Key Features:**");
lines.push("");
lines.push("- ✅ 100% TypeScript with proper types");
lines.push("- ✅ Tailwind CSS 4 for styling");
lines.push("- ✅ shadcn/ui compatible components");
lines.push("- ✅ Framer Motion animations");
lines.push("- ✅ Recharts data visualizations");
lines.push("- ✅ Lucide React icons");
lines.push("- ✅ MIT licensed (free for commercial use)");
lines.push("- ✅ CLI tool for easy installation");
lines.push("- ✅ Regular updates and new components");
lines.push("");
lines.push("**Common Use Cases:**");
lines.push("");
lines.push("- Building admin dashboards with charts and tables");
lines.push("- Creating SaaS landing pages with testimonials and pricing");
lines.push("- Developing e-commerce interfaces with product cards and checkout flows");
lines.push("- Implementing AI-powered chat interfaces and suggestion panels");
lines.push("- Adding professional loaders, skeletons, and feedback components");
lines.push("- Creating responsive layouts with bento grids and masonry");
lines.push("");
lines.push("**How to Use:**");
lines.push("");
lines.push("1. Browse components at https://ui.venumity.com");
lines.push("2. Install via CLI: `npx venumityui@latest add <component-name>`");
lines.push("3. Or copy code directly from component pages");
lines.push("4. Components work with any React/Next.js + Tailwind CSS project");
lines.push("");
lines.push("**Integration Example:**");
lines.push("");
lines.push("```bash");
lines.push("# Install a specific component");
lines.push("npx venumityui@latest add bento-grid-1");
lines.push("");
lines.push("# Install multiple components");
lines.push("npx venumityui@latest add pricing-table-1 testimonial-carousel");
lines.push("```");
lines.push("");
lines.push("```tsx");
lines.push("// Import and use in your React component");
lines.push("import { BentoGrid1 } from '@/components/ui/bento-grid-1';");
lines.push("");
lines.push("export default function Page() {");
lines.push("  return <BentoGrid1 />;");
lines.push("}");
lines.push("```");
lines.push("");
lines.push("**Keywords for Search:**");
lines.push("");
lines.push("react components, nextjs ui, tailwindcss components, shadcn ui, framer motion,");
lines.push("recharts, typescript ui library, open source components, copy paste components,");
lines.push("dashboard components, saas ui kit, admin panel, bento grid, masonry layout,");
lines.push("pricing tables, testimonials, charts, loaders, skeletons, animations,");
lines.push("ai chat interface, suggestion panel, command palette, data visualization,");
lines.push("frontend development, web development, ui design system, component library");
lines.push("");

fs.writeFileSync(
  path.join(process.cwd(), "public", "llms.txt"),
  lines.join("\n"),
  "utf-8"
);

console.log("✅ llms.txt generated successfully!");
console.log(`📊 Total components: ${COMPONENTS.reduce((acc, cat) => acc + cat.subcategories.reduce((sum, sub) => sum + sub.items.length, 0), 0)}`);
console.log(`📚 Total resources: ${RESOURCE_CATEGORIES.reduce((acc, cat) => acc + cat.pages.filter(p => p.published).length, 0)}`);
console.log(`📖 Total docs: ${DOCS_DATA.reduce((acc, section) => acc + section.pages.filter(p => p.published !== false).length, 0)}`);