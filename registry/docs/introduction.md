# Welcome to Venu<span style="color:oklch(70.09% 0.20117 44.755)">mity</span> UI 🎉

**Venu<span style="color:oklch(70.09% 0.20117 44.755)">mity</span> UI** is a modern, open-source collection of **UI components** and **learning resources** built with React, TypeScript, and Tailwind CSS. Whether you're prototyping a startup idea, shipping a side project, or building a production app, our components and curated guides help you move faster with beautiful, accessible interfaces.

---

### What's Included

- **50+ Free Components** – MIT-licensed, copy-paste ready
- **Premium Templates** – Complete layouts and design systems ($0–$40)
- **Curated Resources** – Framework guides, cheat sheets, tutorials, and more
- **Zero Dependencies** – Minimal footprint, maximum flexibility
- **TypeScript Ready** – Full type definitions out of the box
- **Responsive by Default** – Every component works on mobile, tablet, and desktop

---

## Technology Stack

- **React 18+** – Modern React with hooks
- **TypeScript** – Full type safety
- **Tailwind CSS** – Utility-first styling
- **Framer Motion** – Smooth animations
- **Lucide React** – Consistent iconography
- **Next.js** (optional) – For documentation and examples

---

## File Structure

```text
components/
├── ui/         # Core components (Button, Card, Modal, etc.)
├── layout/     # Layout helpers
├── forms/      # Form elements and validation
└── examples/   # Ready-to-use usage examples
```

---

## Design Principles

- **Accessibility First** – All components follow WAI-ARIA guidelines
- **Performance Focused** – Minimal bundle size, optimised rendering
- **Consistent API** – Predictable props and behaviour
- **Clear Documentation** – Real-world examples for every use case
- **Learning by Doing** – Companion resource guides accelerate your learning

---

## Customisation Levels

- **Level 1** – Adjust props (colors, sizes, variants)
- **Level 2** – Modify CSS classes
- **Level 3** – Fork and rewrite component logic
- **Level 4** – Use as inspiration for your own custom components

---

## Quick Start Options

- **Copy & Paste** – Browse components → click "Copy Code" → paste directly into your project
- **CLI Tool** – Add components in seconds from the command line
- **Manual Setup** – Clone individual files from GitHub when you need full control
- **Learning Resources** – Dive into guides for frameworks, animations, CMS, and cheat sheets

---

## Method 1 - Install with the CLI (Recommended)

The CLI adds components instantly and handles all dependencies for you.

```bash
npx venumity@latest add button
```

### CLI Features

- Adds the component file directly to your `src/components/ui` folder
- Installs any required third-party packages automatically
- Supports Tailwind CSS configuration updates
- Works with existing Next.js, Vite, or CRA projects

---

## Method 2 - Copy & Paste Individual Components

1. Browse to the component page (e.g., `/components/button`)
2. Click the **“Copy Code”** button
3. Paste the code into your project's component file
4. Adjust imports if necessary

This method gives you full visibility and control - no CLI required.

---

## Method 3 - Manual Setup (for full customisation)

#### 1. Create your components directory

```bash
mkdir -p src/components/ui
```

#### 2. Copy the component file

Download the `.tsx` file from our repository and place it inside `src/components/ui`.

#### 3. Install required dependencies

Some components use `framer-motion` and `lucide-react`. Install them once:

```bash
npm install framer-motion lucide-react
```

Check individual component docs for any extra packages.

#### 4. Import and use

```tsx
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return <Button>Get Started</Button>;
}
```

---

## Setting up Resources (Learning Materials)

If you want to **contribute** a new resource article, follow the detailed guide on the [How to contribute resources ?](/docs/add-resources).  
All resource pages live under `/registry/reso/` and are registered in `registry/resources.ts`.

---

## Testing Components

Test in isolation before integrating into your app:

```tsx
// test-component.tsx
import { Button } from "./button";

export default function TestPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">Component Test</h1>
      <Button variant="primary">Test Button</Button>
    </div>
  );
}
```

---

## Common Setup Issues

| Problem                     | Solution                                                     |
| --------------------------- | ------------------------------------------------------------ |
| **TypeScript errors**       | Ensure React 18+ and TypeScript 4.9+, import types correctly |
| **Component not rendering** | Check browser console; verify all dependencies installed     |
| **CLI not found**           | Use `npx` prefix; Node.js 18+ required                       |

---

## Updating Components

When we release updates:

- Check the [Changelog](/changelog) page for changelog notes (**Changelog** will be updated by **Admin** only)
- Compare your version with the latest code
- Update props or styles as needed
- Test thoroughly before deploying

---

## Community & Feedback

On every **component** and **resource** page you'll find a handy **right-hand sidebar** that lets you:

- 🐛 **Report an Issue** – Found a bug? Let us know instantly
- 💡 **Request a Feature** – Suggest a new component, resource, or improvement
- ✏️ **Edit This Page** – Contribute directly to the documentation or resource
- 📤 **Share This Page** – Spread the knowledge with your team or on social media

We welcome:

- Bug reports and fixes
- New component ideas
- Documentation improvements
- Accessibility enhancements
- New resource guides (frameworks, cheat sheets, tutorials)

Your feedback shapes the future of Venu<span style="color:oklch(70.09% 0.20117 44.755)">mity</span> UI. Every suggestion, report, and contribution helps the entire community.

---

## Need Help ?

- **Documentation** – Each component and resource has detailed usage pages
- **GitHub Issues** – [Report a bug or request a feature](https://github.com/thevinayakgore/ui.venumity/issues)
- **Email** – [thevinayakgore@gmail.com](mailto:thevinayakgore@gmail.com)
- **Community** – [GitHub Discussions](https://github.com/thevinayakgore/ui.venumity/discussions)
- **Quick Links** – [Components](/components) • [Resources](/resources) • [GitHub](https://github.com/thevinayakgore/ui.venumity)
