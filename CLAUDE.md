# CLAUDE.md — Venumity UI

> Persistent context for Claude Code. Auto-generated — do not edit manually.

---

## Project Overview

Venumity UI is an **open-source, MIT-licensed React component library**.

- **Website:** https://ui.venumity.com
- **GitHub:** https://github.com/thevinayakgore/ui.venumity
- **Author:** Vinayak Gore (https://github.com/thevinayakgore)
- **License:** MIT
- **Components:** 124
- **Thumbnails:** 99

---

## Tech Stack

- Next.js (App Router)
- TypeScript (strict)
- Tailwind CSS
- shadcn/ui (Radix UI primitives)
- Framer Motion / motion
- Lucide React (icons)

---

## Project Structure

```
app/                        # Next.js App Router
components/site/            # Website UI (navbars, sidebars, sections)
components/ui/              # Base shadcn/ui primitives
components/venumity/        # Venumity UI components (the product)
registry/                   # Component + resource registry (data)
scripts/                    # Build + generation scripts
public/thumbnails/          # Component screenshots (.webp)
```

---

## Development Commands

```bash
npm run dev                 # Start dev server
npm run build               # Production build
npm run start               # Run production build
npm run lint                # ESLint
npm run generate-agents     # Regenerate AGENTS.md + CLAUDE.md + agent-index.json
npm run generate-thumbnails # Sync thumbnails from registry
```

---

## Conventions

- **Exports:** Prefer named exports for internal components. Default exports are OK for registry components.
- **Styling:** Tailwind utility classes + `cn()` from `@/lib/utils` for conditionals.
- **Animations:** Use `motion/react` (Framer Motion v12+) for all animations.
- **Icons:** Lucide React only.
- **TypeScript:** Strict mode on. Never use `any` — use `unknown` + type guards.
- **File naming:** kebab-case for files, PascalCase for React components.
- **Component paths:** `components/venumity/<category>/<subcategory>/<item>.tsx`.

---

## Component Registry

All **124** components are registered in `registry/components.ts`.

---

## Venumity UI Installation

To install any Venumity UI component in a user's Next.js project:

```bash
npx venumityui@latest add <component-slug>
```

The CLI is published on npm as **`venumityui`**. Always use `@latest`. Works with npm, pnpm, yarn, and bun.

---

## Component Categories

- **AI Features** (4)
- **Background Effects** (1)
- **Badges** (5)
- **Buttons** (2)
- **Cards** (1)
- **Charts** (36)
- **Commerce** (5)
- **Dashboards** (2)
- **Data Display** (10)
- **Feedbacks** (8)
- **Layouts** (6)
- **Loaders** (26)
- **Navigations** (4)
- **Sections** (14)

---

## Thumbnails

99 thumbnails at `https://ui.venumity.com/thumbnails/<slug>.webp`.
Gallery: https://ui.venumity.com/thumbnails

---
## FAQ (Quick Reference)

**Q:** What is Venumity UI?
**A:** Venumity UI is a modern component library featuring beautifully crafted UI components, sections, blocks, templates, and layouts designed for Next.js, React, Tailwind CSS, and modern web applications.

**Q:** What can I find on Venumity UI?
**A:** You can discover reusable UI components, landing page sections, animations, navigation systems, hero sections, testimonials, pricing blocks, footers, interactive elements, and other production-ready interface components.

**Q:** Are all components open source?
**A:** Yes. Venumity UI focuses on free and open-source components that you can inspect, customize, learn from, and use in your own projects.

**Q:** Are the components reusable and customizable?
**A:** Absolutely. Every component is built to be reusable, responsive, customizable, and easy to integrate into Next.js, React, and Tailwind CSS projects.

**Q:** Who is Venumity UI built for?
**A:** Venumity UI is designed for developers, designers, freelancers, startups, agencies, and creators who want to build beautiful interfaces faster.

**Q:** Are the components responsive?
**A:** Yes. Components and templates are designed with responsive layouts and adaptive design principles to work seamlessly across mobile, tablet, and desktop devices.

**Q:** Can I use Venumity UI for commercial projects?
**A:** Yes. The open-source components can be used in personal, freelance, startup, agency, and commercial projects according to the applicable license.

**Q:** Does Venumity UI focus on performance?
**A:** Performance is a key priority. Components are built with clean structures, optimized patterns, accessibility considerations, and scalable implementation practices.

**Q:** How often is Venumity UI updated?
**A:** New open-source components, sections, animations, improvements, and developer resources are added regularly to keep the library modern and useful.

---

## Reference Files

- `AGENTS.md` — tool-agnostic instructions for all AI agents
- `public/llms.txt` — machine-readable index at https://ui.venumity.com/llms.txt
- `public/llms-full.txt` — consolidated documentation
- `public/agent-index.json` — structured JSON index at https://ui.venumity.com/agent-index.json

---

_Generated on 2026-09-26._
