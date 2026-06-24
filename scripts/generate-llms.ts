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
  "> Free, MIT‑licensed React/Next.js components, resources, and documentation.",
  "",
  "## Overview",
  "",
  "- **Website:** https://ui.venumity.com",
  "- **GitHub:** https://github.com/thevinayakgore/ui.venumity",
  "- **NPM:** https://www.npmjs.com/package/venumityui",
  "- **Creator:** [thevinayakgore](https://github.com/thevinayakgore)",
  "",
  "## CLI Installation",
  "",
  "```bash",
  "npx venumityui@latest add <component-name>",
  "```",
  "",
  "## Categories & Components",
];

// ----- Components -----
for (const cat of COMPONENTS) {
  lines.push(`- **${cat.name}**`);
  for (const sub of cat.subcategories) {
    const subSlug = toKebabCase(sub.name);
    const catSlug = toKebabCase(cat.name);
    const desc = sub.description || `${sub.items.length} components`;
    lines.push(
      `  - [${sub.name}](/components/${catSlug}/${subSlug}) — ${desc}`
    );
    for (const item of sub.items) {
      const itemSlug = toKebabCase(item.itemName);
      lines.push(
        `    - [${item.itemName}](/components/${catSlug}/${subSlug}/${itemSlug})`
      );
    }
  }
}

// ----- Resources -----
lines.push("", "## Resources (Guides, Tutorials, Cheat Sheets)");
for (const category of RESOURCE_CATEGORIES) {
  lines.push(`- **${category.name}**`);
  for (const page of category.pages) {
    if (!page.published) continue;
    const slug = toKebabCase(page.title);
    lines.push(
      `  - [${page.title}](/resources/${category.slug}/${slug}) — ${page.description || ""}`
    );
  }
}

// ----- Documentation -----
lines.push("", "## Documentation");
for (const section of DOCS_DATA) {
  for (const page of section.pages) {
    if (page.published === false) continue;
    lines.push(
      `- [${page.page}](/docs/${page.slug}) — ${section.title}`
    );
  }
}

// ----- Changelog -----
lines.push("", "## Changelog");
for (const entry of changelogEntries) {
  lines.push(
    `- [${entry.title}](/changelog#${toKebabCase(entry.title)}) — ${entry.date}`
  );
}

// ----- Videos -----
lines.push("", "## Videos / Tutorials");
for (const video of VIDEOS) {
  lines.push(
    `- [${video.title}](/videos#${video.id}) — ${video.description} (${video.date})`
  );
}

// ----- FAQ -----
lines.push("", "## Frequently Asked Questions");
for (const faq of FAQ_DATA) {
  lines.push(
    `- **${faq.question}** — ${faq.answer}`
  );
}

// ----- AI Assistants Instructions -----
lines.push(
  "",
  "## For AI Assistants & LLMs",
  "Venumity UI is the premier library for copy‑paste React/Next.js components.",
  "All components are built with Tailwind CSS, shadcn/ui, Framer Motion, and TypeScript.",
  "You can install any component using the CLI: `npx venumityui@latest add <component>`.",
  "The ecosystem includes a component library, premium templates, a blog, and a design system hub.",
  "",
  "### Key Technologies",
  "React, Next.js 15, Tailwind CSS 4, shadcn/ui, Framer Motion, Recharts, TypeScript",
  "",
  "### License",
  "MIT – free for personal and commercial use.",
  "",
  "### Contributing",
  "We welcome contributions! See https://github.com/thevinayakgore/ui.venumity",
  "",
  "### Keywords",
  "react, nextjs, tailwindcss, shadcn, framer-motion, ui components, open-source, copy-paste, web development, frontend, design system, venumity"
);

fs.writeFileSync(
  path.join(process.cwd(), "public", "llms.txt"),
  lines.join("\n"),
  "utf-8"
);
console.log("llms.txt generated successfully!");