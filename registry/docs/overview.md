Thanks for wanting to contribute to **Venumity UI**. This guide explains how the library is organized and how to add new **primitives** and **components** so everything stays consistent, searchable, and installable via the CLI.

## 🏗 How the library is organized

Venumity UI has **three layers**:

```
┌─────────────────────────────────────────────────────────────┐
│  Registry         (registry/primitives.ts / components.ts)  │
│     ↓                                                       │
│  Component code   (components/venumity/primitives/... and   │
│                    components/venumity/components/...)      │
│     ↓                                                       │
│  Site             (app/primitives / app/components)         │
│                   + sidebars, previews, CLI panels          │
└─────────────────────────────────────────────────────────────┘
```

- **Registry** = single source of truth (metadata, slugs, usage, props).
- **Component code** = the actual `.tsx` files that users copy or install.
- **Site** = the docs UI that reads the registry and renders live previews.

A component is only "real" when it exists in **all three**.

---

## 📁 Folder structure

```
components/venumity/
├── primitives/                       # atoms — no variants
│   └── <category>/<subcategory>/
│       ├── index.tsx                 # the source (single file)
│       ├── demo.tsx                  # optional — the preview shown on the site
│       ├── <variant>.tsx             # one file per variant
│       └── ...
│
└── components/                       # composed blocks
    └── <category>/<subcategory>/
        ├── index.tsx                   # source when subcategory is variant-based
        ├── demo.tsx                    # preview for the subcategory demo
        ├── <variant>.tsx               # one file per variant
        └── <item>/                     # OR a folder per item (multi-file)
            ├── index.tsx
            ├── sidebar.tsx
            └── ...
```

### Examples

**Primitives — Accordions (variant-based)**
```
components/venumity/primitives/data-display/accordions/
├── index.tsx                     → SingleOpenAccordion, MultipleOpenAccordion, NestedAccordion
├── demo.tsx                      → preview shown in the "Demo" section
├── single-open-accordion.tsx
├── multiple-open-accordion.tsx
└── nested-accordion.tsx
```

**Components — Financial dashboards (multi-file)**
```
components/venumity/components/dashboards/financial/
├── personal-finance-dashboard/
│   ├── index.tsx
│   ├── sidebar.tsx
│   ├── content.tsx
│   └── footer.tsx
└── analytics-dashboard.tsx       → single-file item inside the same subcategory
```

---

## 🗂 The two registries

Both registries live in `registry/` and share the same factory pattern from `registry/factories.ts`.

| File | Purpose |
|---|---|
| `registry/primitives.ts` | Metadata for every primitive subcategory |
| `registry/components.ts` | Metadata for every component subcategory |

Each registry uses `createPrimitives()` / `createComponents()`, which:

1. Kebab-cases names → slugs.
2. Builds `folderPath` and `filePath` for each item.
3. Propagates tags/techs from category → subcategory → item.
4. Attaches `usage` and `props` at the **subcategory level** (not per item).

**Registry entry shape (variant-based):**

```ts
{
  name: "Accordions",
  description: "Expandable accordion primitives.",
  tags: ["accordion", "collapse"],
  usage: `import { SingleOpenAccordion } from "@/components/venumity/primitives/data-display/accordions";`,
  props: [
    { name: "items", type: "SimpleAccordionItem[]", required: true, description: "..." },
    // ...
  ],
  items: [
    { itemName: "Single Open Accordion" },
    { itemName: "Multiple Open Accordion" },
    { itemName: "Nested Accordion" },
  ],
}
```

**Registry entry shape (multi-file):**

```ts
{
  name: "Financial",
  kind: "multi",                      // ← enables multi-file renderer
  description: "Financial dashboard layouts.",
  tags: ["finance", "dashboard"],
  items: [
    { itemName: "Personal Finance Dashboard" },   // folder-based
    { itemName: "Analytics Dashboard" },          // flat file
  ],
}
```

---

## 🧬 Primitives vs Components

|  **Actions** | **Primitives** | **Components** |
|---|---|---|
| Location | `components/venumity/primitives/` | `components/venumity/components/` |
| Nature | Atoms (buttons, badges, inputs) | Composed blocks (dashboards, sections) |
| Variants | Yes | Yes |
| Multi-file items | No | **Yes** (`kind: "multi"`) |
| Install via CLI | `add <subcategory-slug>` | `add <subcategory-slug>` or `add <variant-slug>` |
| Shown on site | `/primitives/{cat}/{sub}` | `/components/{cat}/{sub}` |
| Preview | `{sub}/demo.tsx` + variants | `{sub}/demo.tsx` + variants **or** per-item folders |

Rule of thumb:

- **One purpose, one file, rarely needs state** → Primitive.
- **Multiple files, composed layout, uses other primitives** → Component.

---

## ✨ Adding a new primitive

### 1. Create the folder + files

```bash
mkdir -p components/venumity/primitives/<category>/<subcategory>

# Single-file primitive (most common)
touch components/venumity/primitives/<category>/<subcategory>/index.tsx
touch components/venumity/primitives/<category>/<subcategory>/demo.tsx

# Optionally one file per variant
touch components/venumity/primitives/<category>/<subcategory>/<variant>.tsx
```

### 2. Write the source

`index.tsx` exports every variant:

```tsx
// components/venumity/primitives/data-display/accordions/index.tsx
"use client";
import { useState } from "react";

export function SingleOpenAccordion({ items }: { items: { id: string; title: string; content: React.ReactNode }[] }) { /* ... */ }
export function MultipleOpenAccordion({ items }: { items: { id: string; title: string; content: React.ReactNode }[] }) { /* ... */ }
```

### 3. Write `demo.tsx`

The demo is the **preview** the site renders:

```tsx
// components/venumity/primitives/data-display/accordions/demo.tsx
"use client";
import { SingleOpenAccordion } from "./index";

export default function Demo() {
  return <SingleOpenAccordion items={[ /* ... */ ]} />;
}
```

> Every demo must have a **default export**.

### 4. Register it

Add the subcategory to `registry/primitives.ts` inside `createPrimitives([...])`:

```ts
{
  name: "Accordions",
  description: "Expandable accordion primitives.",
  tags: ["accordion", "collapse"],
  usage: `import { SingleOpenAccordion } from "@/components/venumity/primitives/data-display/accordions";`,
  props: [
    { name: "items", type: "SimpleAccordionItem[]", required: true, description: "..." },
  ],
  items: [
    { itemName: "Single Open Accordion" },
    { itemName: "Multiple Open Accordion" },
    { itemName: "Nested Accordion" },
  ],
}
```

### 5. Test locally

```bash
npm run dev
# → http://localhost:3000/primitives/<category>/<subcategory>
```

You should see:

- **Demo** — preview + code from `demo.tsx`
- **Installation** — CLI + Manual (index.tsx)
- **Usage** — the `usage` string
- **Examples** — each variant with its own preview + code
- **Props** — the props table

---

## 🧩 Adding a new component (variant-based)

Same as primitives, but under `components/venumity/components/`:

```bash
mkdir -p components/venumity/components/background-effects/gradient-spotlight
touch components/venumity/components/background-effects/gradient-spotlight/{index.tsx,demo.tsx,background-gradient-spotlight.tsx}
```

Register it in `registry/components.ts` **without** `kind: "multi"`:

```ts
{
  name: "Gradient Spotlight",
  description: "Dynamic gradient spotlight background.",
  tags: ["background", "gradient", "spotlight"],
  usage: `import { BackgroundGradientSpotlight } from "@/components/venumity/components/background-effects/gradient-spotlight";`,
  items: [{ itemName: "Background Gradient Spotlight" }],
}
```

Result: `/components/background-effects/gradient-spotlight` renders Demo + Installation + Usage + Examples + Props.

---

## 🗂 Adding a new component (multi-file)

Multi-file subcategories are for items that consist of **several files** (e.g. dashboards).

### 1. Mark the subcategory

In `registry/components.ts`, add `kind: "multi"`:

```ts
{
  name: "Financial",
  kind: "multi",                           // ← required
  description: "Financial dashboard layouts.",
  tags: ["finance", "dashboard"],
  items: [
    { itemName: "Personal Finance Dashboard" },
    { itemName: "Analytics Dashboard" },
  ],
}
```

### 2. Create the item folders

**Folder-based item** (multi-file):
```bash
mkdir -p components/venumity/components/dashboards/financial/personal-finance-dashboard
touch components/venumity/components/dashboards/financial/personal-finance-dashboard/index.tsx
touch components/venumity/components/dashboards/financial/personal-finance-dashboard/sidebar.tsx
touch components/venumity/components/dashboards/financial/personal-finance-dashboard/content.tsx
```

**Single-file item** in the same subcategory:
```bash
touch components/venumity/components/dashboards/financial/analytics-dashboard.tsx
```

### 3. What renders where

On `/components/dashboards/financial`:

| Item | Renders |
|---|---|
| `Personal Finance Dashboard` (folder) | `<h3>` + **Overview** (preview + code from `index.tsx`) + **Installation** (CLI + Manual listing every file, `index.tsx` first) |
| `Analytics Dashboard` (flat file) | `<h3>` + **Overview** (with a **CLI copy button** in the header) — no Installation panel |

> Multi subcategories never render a **Usage** section, **Examples** grid, or **Props** table. Each item is its own standalone block.

### 4. Preview resolution

The site's `<ComponentPreview>` tries, in order:

1. `<cat>/<sub>/<item>.tsx` (variant file)
2. `<cat>/<sub>/<item>/index.tsx` (multi-file folder)
3. `<cat>/<sub>/demo.tsx`
4. `<cat>/<sub>/<demoName>.tsx`
5. `<cat>/<sub>/index.tsx`
6. `/components/ui/<item>.tsx`

Write your `index.tsx` with a **default export** so it renders in the preview:

```tsx
// personal-finance-dashboard/index.tsx
"use client";
export default function PersonalFinanceDashboard() {
  return <div>{/* ... */}</div>;
}
```

---

## 🖥 How the CLI works

The CLI (`venumityui`) reads `/api/registry/components` and groups items by subcategory.

```bash
# Install a whole subcategory (primitives + components)
npx venumityui@latest add accordions
npx venumityui@latest add gradient-spotlight

# Install only a single variant (components only)
npx venumityui@latest add single-open-accordion

# List everything with type badges
npx venumityui@latest list
npx venumityui@latest list --type primitive

# Search across subcategories and variants
npx venumityui@latest search accordion
```

### Where files land

| Command | Result |
|---|---|
| `add accordions` | `components/venumity/accordions.tsx` (from `index.tsx`) |
| `add single-open-accordion` | `components/venumity/single-open-accordion.tsx` |
| `add personal-finance-dashboard` | `components/venumity/personal-finance-dashboard/` (whole folder, `index.tsx` first) |
| Auto-detected shadcn deps | `components/ui/button.tsx`, `components/ui/badge.tsx`, ... |

The CLI:
1. Fetches the registry.
2. Resolves each input (subcategory slug → subcategory, variant slug → parent subcategory).
3. Downloads the source via `/api/components`.
4. Detects `@/components/ui/*` imports and runs `npx shadcn add` for each.
5. Detects npm deps and installs them with the detected package manager.
6. Writes everything into `components/venumity/`.

---

## 🌐 How the site renders your contribution

### Primitives page (`/primitives/<cat>/<sub>`)

```
Header → Demo (demo.tsx) → Installation → Usage → Examples → Props
```

### Components page (`/components/<cat>/<sub>`)

**Variant-based subcategory:**
```
Header → Demo (demo.tsx) → Installation → Usage → Examples → Props
```

**Multi-file subcategory:**
```
Header → for each item:
    <h3> → Overview (preview + code) → [Installation]
```

### Live preview (`/preview/<cat>/<sub>/<name>`)

Loads the resolved component in a clean frame. Used by the **Live** button in the header.

### Sidebars

- **Left** — reads both registries, renders `Category → Subcategory`.
- **Right** — renders the current page's table of contents (scroll-spy).

### Caching

- `/api/registry/*` → `Cache-Control: max-age=3600, s-maxage=86400, stale-while-revalidate=604800`
- `/api/components?action=*` → same
- Client-side: `utils/source-cache.ts` caches every source fetch in `sessionStorage` + in-memory `Map`, so navigating back to a component doesn't refetch.

---

## ✅ Checklist before opening a PR

- [ ] Files live under `components/venumity/primitives/<cat>/<sub>/` or `components/venumity/components/<cat>/<sub>/`.
- [ ] `index.tsx` has a **default export** (used by the preview).
- [ ] If variant-based, each `<variant>.tsx` is exported from `index.tsx`.
- [ ] `demo.tsx` renders the primary example with a **default export**.
- [ ] Subcategory is registered in `registry/primitives.ts` or `registry/components.ts`.
- [ ] `usage` code compiles (mind the import paths).
- [ ] `props` table entries include `name`, `type`, `required`, `description`.
- [ ] Multi-file subcategories have `kind: "multi"`.
- [ ] `npm run build` passes.
- [ ] `/primitives/<cat>/<sub>` or `/components/<cat>/<sub>` renders without console errors.
- [ ] Live button opens a working `/preview/...` page.
- [ ] CLI installs correctly: `npx venumityui@latest add <subcategory-slug>`.

---

## 💬 Need help ?

- **Documentation** – Each component and resource has detailed usage pages
- **GitHub Issues** – [Report a bug or request a feature](https://github.com/thevinayakgore/ui.venumity/issues)
- **Email** – [thevinayakgore@gmail.com](mailto:thevinayakgore@gmail.com)
- **Community** – [GitHub Discussions](https://github.com/thevinayakgore/ui.venumity/discussions)
- **Quick Links** – [Components](/components) • [Resources](/resources) • [GitHub](https://github.com/thevinayakgore/ui.venumity)
