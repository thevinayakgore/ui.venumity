# <img src="./public/logo.png" width="30" style="vertical-align: middle; margin-top: 5px;" /> Venu<span style="color:orange">mity</span> UI 🎉

**Beautiful, production-ready React components. Copy. Paste. Ship.**

[![GitHub stars](https://img.shields.io/github/stars/thevinayakgore/ui.venumity?style=flat&color=orange&label=Stars)](https://github.com/thevinayakgore/ui.venumity/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/thevinayakgore/ui.venumity?style=flat&color=blue&label=Forks)](https://github.com/thevinayakgore/ui.venumity/network)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/thevinayakgore/ui.venumity/blob/main/CONTRIBUTING.md)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://ui.venumity.com/legal/license)
[![Last Commit](https://img.shields.io/github/last-commit/thevinayakgore/ui.venumity?color=green&label=Last%20Commit)](https://github.com/thevinayakgore/ui.venumity/commits)

<br/>

![Venumity UI demo](./public/banner.png)

<!-- 💡 TIP : Replace banner.png above with an animated demo.gif of your best components -->

<br/>

> ⭐ **If Venumity UI saves you time, please star this repo** - it helps more developers discover it and motivates us to keep building. Takes 2 seconds and means a lot !

<br/>

[🌐 Live Site](https://ui.venumity.com) · [📦 Components](https://ui.venumity.com/components) · [📚 Docs](https://ui.venumity.com/docs/introduction) · [🧩 Templates](https://ui.venumity.com/templates) · [💬 Discussions](https://github.com/thevinayakgore/ui.venumity/discussions)

</div>

---

## 🛠️ Components we want - pick one and build it !

Want to contribute but don't know where to start ? Pick any unchecked component below, comment on its GitHub Issue so nobody duplicates work, then submit a PR !

| Status | Component | Difficulty | Issue |
|--------|-----------|------------|-------|
| ⬜ | Spotlight Card (mouse-tracking glow on hover) | Easy | [#open](https://github.com/thevinayakgore/ui.venumity/issues) |
| ⬜ | Aurora Background (animated gradient blobs) | Medium | [#open](https://github.com/thevinayakgore/ui.venumity/issues) |
| ⬜ | Typewriter / Text Reveal Effect | Easy | [#open](https://github.com/thevinayakgore/ui.venumity/issues) |
| ⬜ | Glowing Border Card | Easy | [#open](https://github.com/thevinayakgore/ui.venumity/issues) |
| ⬜ | Infinite Marquee (logo / text scroll row) | Easy | [#open](https://github.com/thevinayakgore/ui.venumity/issues) |
| ⬜ | Floating Blur Navbar | Medium | [#open](https://github.com/thevinayakgore/ui.venumity/issues) |
| ⬜ | Animated Counter (count-up on scroll) | Easy | [#open](https://github.com/thevinayakgore/ui.venumity/issues) |
| ⬜ | Command Palette (Cmd+K popup) | Hard | [#open](https://github.com/thevinayakgore/ui.venumity/issues) |
| ⬜ | Timeline Component | Easy | [#open](https://github.com/thevinayakgore/ui.venumity/issues) |
| ⬜ | Step Indicator / Stepper | Medium | [#open](https://github.com/thevinayakgore/ui.venumity/issues) |
| ⬜ | Floating Dock (macOS-style icon dock) | Medium | [#open](https://github.com/thevinayakgore/ui.venumity/issues) |
| ⬜ | Hero Section Block (full ready-to-paste section) | Medium | [#open](https://github.com/thevinayakgore/ui.venumity/issues) |
| ⬜ | Pricing Section Block | Medium | [#open](https://github.com/thevinayakgore/ui.venumity/issues) |
| ⬜ | Stats Section with Animated Numbers | Easy | [#open](https://github.com/thevinayakgore/ui.venumity/issues) |

> 💡 Don't see what you want to build ? [Open a Discussion](https://github.com/thevinayakgore/ui.venumity/discussions) and suggest a new component !

---

## ⚡ Why Venumity UI ?

Building modern web apps shouldn't be complicated. Venumity UI gives you **beautiful, functional React components** with clean minimal code that works right out of the box - no bloated dependencies, no complex configuration. Just copy, paste, and customize.

Perfect for SaaS dashboards, landing pages, portfolios, startups, and developers who want to ship faster without compromising on quality.

---

## 🔑 Key Features

### 🚀 Developer First
- ✅ Zero runtime dependencies
- ✅ TypeScript ready — full type safety
- ✅ Works with Next.js, React, and Vite
- ✅ Clean, readable source code

### 🎨 Design That Scales
- ✅ Built with Tailwind CSS
- ✅ Fully responsive — mobile first
- ✅ Dark mode support on every component
- ✅ Accessibility-first approach

### 📦 Easy Integration
- ✅ Copy-paste workflow — no install needed
- ✅ Works with any React framework
- ✅ Simple customization

---

## 🚀 Getting Started

**1. Browse** → **2. Copy** → **3. Paste** → **4. Customize**

```tsx
// Example: using the HoverButton component
import { HoverButton } from '@/components/ui/hover-button'

export default function MyPage() {
  return (
    <HoverButton variant="primary" size="lg">
      Hover Me
    </HoverButton>
  )
}
```

👉 **[Browse all components →](https://ui.venumity.com/components)**

---

## 🛠️ Tech Stack

| Tool | Purpose |
|------|---------|
| Next.js 15+ | Framework |
| Tailwind CSS v4+ | Styling |
| TypeScript | Type safety |
| Framer Motion | Animations |
| Lucide React | Icons |

---

## 🤝 How to Contribute

We welcome contributions from developers of all skill levels. Here is the exact step-by-step :

### Step 1 - Fork and clone

```bash
# Fork the repo on GitHub, then:
git clone https://github.com/YOUR_USERNAME/ui.venumity.git
cd ui.venumity
npm install
npm run dev
```

### Step 2 - Create your component file

```
/components/[category]/[your-component-name].tsx
```

For example, a spotlight card goes in :
```
/components/cards/spotlight-card.tsx
```

### Step 3 - Add it to the registry

Open `registry/components.ts` and add your component entry following the existing pattern.

### Step 4 - Add a thumbnail screenshot

Capture a **full-screen screenshot at 1280×800px** and save it to :
```
/public/thumbnails/[your-component-name].png
```

### Step 5 - Run and verify

```bash
npm run dev
# Check your component renders correctly at localhost:3000
```

### Step 6 - Submit your PR

```bash
git checkout -b feat/spotlight-card
git add .
git commit -m "feat: add spotlight card component"
git push origin feat/spotlight-card
# Then open a Pull Request on GitHub
```

**PR title format :** `feat: add [ComponentName] component`

> 📖 See the full [Contributing Guide](https://github.com/thevinayakgore/ui.venumity/blob/main/CONTRIBUTING.md) for detailed code style and quality standards.

### Contribution Areas

| Area | What to do |
|------|------------|
| 🐛 Bug fixes | Fix broken components or styling issues |
| ✨ New components | Build from the wishlist table above |
| 📚 Documentation | Improve component descriptions and examples |
| 🎨 Design updates | Improve visual quality of existing components |
| ♿ Accessibility | Add ARIA labels, keyboard nav, reduced motion |

---

## 📚 Resources

The **[Resources page](https://ui.venumity.com/resources)** is a curated learning hub for developers - framework guides, animation patterns, cheat sheets, and community-shared tips.

---

## 🌟 Who is it for ?

**Startups** - launch 60% faster with polished components ready on day one.

**Agencies** - deliver consistent quality across every client project.

**Developers** - clean TypeScript code you can actually read, understand, and own.

---

## 📄 License

Released under the **MIT License** - free to use commercially, modify, and distribute. The only restriction: don't resell components as-is.

See [LICENSE](https://ui.venumity.com/legal/license) for full details.

---

## 🤝 Contributors

Thanks to everyone who has helped build Venumity UI !

[![Contributors](https://contrib.rocks/image?repo=thevinayakgore/ui.venumity)](https://github.com/thevinayakgore/ui.venumity/graphs/contributors)

Want your avatar here ? [Pick a component from the wishlist above](#️-components-we-want--pick-one-and-build-it) and submit a PR !

---

## 📞 Get Help or Report Issues

| Channel | Link |
|---------|------|
| ⭐ GitHub Repo | [github.com/thevinayakgore/ui.venumity](https://github.com/thevinayakgore/ui.venumity) |
| 💬 Discussions | [GitHub Discussions](https://github.com/thevinayakgore/ui.venumity/discussions) |
| 🐛 Bug Reports | [GitHub Issues](https://github.com/thevinayakgore/ui.venumity/issues) |
| 🌐 Contact Page | [ui.venumity.com/contact](https://ui.venumity.com/contact) |
| 📧 Email | thevinayakgore@gmail.com |

---

<div align="center">

**Built with ❤️ by [Vinayak Gore](https://thevinayakgore.vercel.app)**

[GitHub](https://github.com/thevinayakgore) · [Twitter / X](https://twitter.com/thevinayakgore) · [Instagram](https://instagram.com/thevinayakgore) · [LinkedIn](https://linkedin.com/in/thevinayakgore) · [YouTube](https://youtube.com/@TheVinayakGore)

<br/>

**Venumity UI ⚡ - Ship beautiful interfaces faster.**

</div>