<div align="center">

<img src="./vui-badge.png" width="250" alt="Venumity UI Logo" />

# Contributing to Venumity UI ⚡

**Thanks for wanting to contribute ! You're helping build something real.**

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/thevinayakgore/ui.venumity/blob/main/CONTRIBUTING.md)
[![Good First Issues](https://img.shields.io/github/issues/thevinayakgore/ui.venumity/good%20first%20issue?color=green&label=Good%20First%20Issues)](https://github.com/thevinayakgore/ui.venumity/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22)
[![GitHub Discussions](https://img.shields.io/github/discussions/thevinayakgore/ui.venumity?color=blue&label=Discussions)](https://github.com/thevinayakgore/ui.venumity/discussions)

</div>

---

## 📌 Before You Start - Read This

1. **Check open issues first** - someone might already be working on what you want to build. Comment on the issue to claim it.
2. **For new components** - open an issue or discussion before coding so we can align on scope.
3. **For bug fixes and doc improvements** - just go ahead and submit a PR directly.
4. **First time contributing to open source ?** Look for issues labeled [`good first issue`](https://github.com/thevinayakgore/ui.venumity/issues?q=label%3A%22good+first+issue%22) - they are small, well-scoped, and we will guide you through.

---

## 🧱 What You Can Contribute

| Type | What it means | Difficulty |
|------|--------------|------------|
| ✨ New component | Build a new UI component from the wishlist | Easy – Hard |
| 🐛 Bug fix | Fix a broken component or styling issue | Easy |
| 📚 Documentation | Improve component descriptions, examples, typos | Easy |
| ♿ Accessibility | Add ARIA labels, keyboard nav, reduced motion | Medium |
| 🎨 Design improvement | Better animation, hover states, responsive fixes | Medium |
| 🧩 New Block | A full ready-to-paste page section (Hero, Pricing, etc.) | Medium – Hard |

---

## 🚀 Full Setup Guide (First Time)

### Step 1 - Fork and clone

Click **Fork** on the top right of the GitHub repo page, then :

```bash
git clone https://github.com/YOUR_USERNAME/ui.venumity.git
cd ui.venumity
```

### Step 2 - Install dependencies

```bash
npm install
# or
pnpm install
```

### Step 3 - Add the upstream remote

This keeps your fork in sync with the main repo :

```bash
git remote add upstream https://github.com/thevinayakgore/ui.venumity.git
git remote -v  # verify both origin and upstream appear
```

### Step 4 - Sync before starting work

Always pull the latest changes before creating a new branch :

```bash
git pull upstream main
```

### Step 5 - Create your branch

```bash
git checkout -b feat/spotlight-card
# or for a bug fix:
git checkout -b fix/button-hover-state
```

### Step 6 - Start the dev server

```bash
npm run dev
# Open http://localhost:3000
```

---

## ✨ Adding a New Component (Step by Step)

This is the most detailed section - read all of it before you start coding.

### Step 1 - Find the right category folder

Components live here :

```
components/
└── venumity/
    └── [category]/
        └── [subcategory]/
            └── component.tsx
```

**Available categories :**

```
ai-features/
badges/
cards/
charts/
commerce/
dashboards/
data-display/
feedbacks/
layouts/
loaders/
navigations/
sections/
```

If your component doesn't fit any category, open a Discussion before creating a new one.

**Example - adding a Spotlight Card :**
```
components/venumity/cards/spotlight-cards/component.tsx
```

### Step 2 - Use this component template

Copy this starter and fill it in :

```tsx
"use client"

import { cn } from "@/lib/utils"
// Add your imports here

// ─── Types ──────────────────────────────────────────────────────────────────

interface SpotlightCardProps {
  children?: React.ReactNode
  className?: string
  // add your props here
}

// ─── Component ──────────────────────────────────────────────────────────────

const SpotlightCard = ({ children, className }: SpotlightCardProps) => {
  return (
    <div className={cn("relative overflow-hidden rounded-xl border", className)}>
      {children}
    </div>
  )
}

export default SpotlightCard
```

**Component rules :**

- ✅ TypeScript only - no `any` types, define proper interfaces
- ✅ Use Tailwind CSS for all styling - no inline style objects unless unavoidable
- ✅ Support dark mode - every color must have a dark variant (`dark:`)
- ✅ Mobile first - design for 375px width, then scale up
- ✅ Wrap Framer Motion animations in `prefers-reduced-motion` check
- ✅ Add `"use client"` directive if using hooks or browser APIs
- ✅ Export as default - named exports are fine for sub-components
- ❌ No hardcoded colors like `#ffffff` - use Tailwind color classes only
- ❌ No layout shifts during animation - only animate `transform` and `opacity`
- ❌ No external dependencies beyond what is already in the project

### Step 3 - Register your component

Open `registry/components.ts` and add your entry following the existing pattern :

```ts
{
  id: "spotlight-card",
  name: "Spotlight Card",
  category: "cards",
  subcategory: "spotlight-cards",
  description: "A card with a mouse-tracking spotlight glow on hover.",
  tags: ["card", "hover", "animation", "interactive"],
  path: "components/venumity/cards/spotlight-cards/component.tsx",
}
```

### Step 4 - Add a thumbnail screenshot

Take a **full-screen browser screenshot** of your component previewing correctly. Save it as :

```
public/thumbnails/spotlight-card.png
```

**Screenshot requirements :**
- Resolution : **1280 × 800px** (full browser window)
- Format : PNG
- File name : matches your component's `id` in the registry (kebab-case)
- Show the component in its default state — not mid-animation
- Dark mode screenshot is a bonus but not required

> The first screenshot you submit is used as the default thumbnail on component cards. The maintainer (@thevinayakgore) may later replace it with a better showcase image.

### Step 5 - Quality checklist before submitting

Go through this before opening your PR :

```
□ Component renders correctly in light mode
□ Component renders correctly in dark mode
□ Component is fully responsive — tested at 375px, 768px, 1280px
□ No TypeScript errors (run: npx tsc --noEmit)
□ No console errors or warnings
□ Animations respect prefers-reduced-motion
□ Keyboard accessible (tab order works, focus rings visible)
□ Component is registered in registry/components.ts
□ Thumbnail screenshot added to public/thumbnails/
□ File naming follows kebab-case convention
```

---

## 📬 Submitting Your Pull Request

### Commit your changes

```bash
git add .
git commit -m "feat: add spotlight card component"
git push origin feat/spotlight-card
```

### Commit message format

```
feat: add spotlight card component
fix: resolve button hover state on mobile
docs: improve bar chart component description
style: fix spacing in navbar component
refactor: simplify spinner animation logic
a11y: add keyboard navigation to modal component
```

### Open the PR on GitHub

1. Go to your fork on GitHub
2. Click **"Compare & pull request"**
3. Fill in the PR template (title, description, screenshots)
4. Reference the issue you are solving : `Closes #42`
5. Click **"Create Pull Request"**

### PR title format

```
feat: add [ComponentName] component
fix: [describe the fix]
docs: [describe the doc change]
```

### What to include in your PR description

```markdown
## What does this PR do ?
Added a Spotlight Card component with mouse-tracking glow effect.

## Screenshots
[Before / After or just the component preview]

## Checklist
- [x] TypeScript - no errors
- [x] Dark mode works
- [x] Responsive - tested mobile + desktop
- [x] Registered in registry/components.ts
- [x] Thumbnail added
- [x] No console errors

## Related issue
Closes #12
```

---

## 🐛 Reporting a Bug

1. Search existing issues first to avoid duplicates
2. [Open a new issue](https://github.com/thevinayakgore/ui.venumity/issues/new) with :
   - A clear title: `Bug: Spinner flickers on Safari`
   - Steps to reproduce
   - Expected vs actual behaviour
   - Screenshot or screen recording if possible
   - Your browser and OS

---

## 💡 Requesting a New Component or Feature

1. [Open a Discussion](https://github.com/thevinayakgore/ui.venumity/discussions)
2. Describe the component - what it looks like, what problem it solves
3. Link any reference (Dribbble, another library, a screenshot)
4. Wait for a maintainer to confirm before you start building

---

## 🎨 Code Style Reference

### Naming conventions

| Thing | Convention | Example |
|-------|-----------|---------|
| Component | `PascalCase` | `SpotlightCard` |
| File | `kebab-case` | `spotlight-card.tsx` |
| Variable / function | `camelCase` | `handleMouseMove` |
| Constant | `UPPER_SNAKE_CASE` | `DEFAULT_DURATION` |
| CSS class | Tailwind only | `bg-zinc-900 dark:bg-white` |

### File structure inside a component

```tsx
// 1. "use client" directive (if needed)
// 2. Imports (React, then external libs, then internal)
// 3. Types / interfaces
// 4. Constants (if any)
// 5. Main component function
// 6. Sub-components (if any)
// 7. Default export
```

---

## 🆘 Need Help ?

Stuck on something ? Here is where to ask :

| Channel | Use it for |
|---------|-----------|
| [GitHub Discussions](https://github.com/thevinayakgore/ui.venumity/discussions) | Questions, ideas, general chat |
| [GitHub Issues](https://github.com/thevinayakgore/ui.venumity/issues) | Bug reports, specific problems |
| PR comments | Questions about your specific contribution |
| Email : thevinayakgore@gmail.com | Anything else |

We review all PRs and respond to issues. You will not be ignored. 🙌

---

<br/>

<div align="center">

**Thanks for contributing to Venumity UI ⚡**

Every PR, issue, and suggestion - no matter how small - makes this library better for everyone.

**[Back to README →](./README.md)**

</div>