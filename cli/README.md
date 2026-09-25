<!-- cli/README.md -->
# Venumity UI CLI

<div align="center">
  <h3>⚡ Install Venumity UI components with one command</h3>
  
  [![npm version](https://img.shields.io/npm/v/venumityui.svg)](https://www.npmjs.com/package/venumityui)
  [![npm downloads](https://img.shields.io/npm/dm/venumityui.svg)](https://www.npmjs.com/package/venumityui)
  [![MIT License](https://img.shields.io/npm/l/venumityui.svg)](LICENSE)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)
  [![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-38bdf8)](https://tailwindcss.com/)
  
  <p>Copy, paste, customize, and launch your idea faster than ever! ✨</p>
</div>

---

## 📦 Installation

Works with **npm**, **pnpm**, **yarn**, and **bun**.

### Use without installing (Recommended)

```bash
# npm
npx venumityui@latest <command>

# pnpm
pnpm dlx venumityui@latest <command>

# yarn
yarn dlx venumityui@latest <command>

# bun
bunx venumityui@latest <command>
```

### Global Installation

```bash
# npm
npm install -g venumityui

# pnpm
pnpm add -g venumityui

# yarn
yarn global add venumityui

# bun
bun add -g venumityui
```

Then use:

```bash
venumityui <command>
```

> 💡 The CLI **auto-detects** your project's package manager (via lock files) and uses the right commands for installing npm + shadcn/ui dependencies.

---

## 🚀 Commands

### Add a Component

```bash
npx venumityui@latest add <component-name>
```

**Options:**

- `--overwrite, -o` — Overwrite existing files
- `--all` — Install all available components

**Examples:**

```bash
# Add a single component (npm)
npx venumityui@latest add profile-card-1

# Add a folder-based component
npx venumityui@latest add personal-panel-1

# Add multiple components
npx venumityui@latest add profile-card-1 basic-accordion

# Install all components
npx venumityui@latest add --all

# Same commands with pnpm
pnpm dlx venumityui@latest add profile-card-1

# Same commands with yarn
yarn dlx venumityui@latest add profile-card-1

# Same commands with bun
bunx venumityui@latest add profile-card-1
```

### List Components

```bash
npx venumityui@latest list
```

**Options:**

- `--category, -c <category>` — Filter by category

**Examples:**

```bash
npx venumityui@latest list
npx venumityui@latest list --category cards
```

### Search Components

```bash
npx venumityui@latest search <query>
```

**Examples:**

```bash
npx venumityui@latest search accordion
npx venumityui@latest search card
npx venumityui@latest search gradient
```

### Component Information

```bash
npx venumityui@latest info <component-name>
```

**Examples:**

```bash
npx venumityui@latest info profile-card-1
npx venumityui@latest info basic-accordion
npx venumityui@latest info ai-chat-bot-1
```

### List Categories

```bash
npx venumityui@latest categories
```

Shows all available categories with component counts.

### List Subcategories

```bash
npx venumityui@latest subcategory <category>
```

**Examples:**

```bash
npx venumityui@latest subcategory cards
npx venumityui@latest subcategory charts
```

### Help

```bash
npx venumityui@latest --help
npx venumityui@latest add --help
```

---

## 🎯 Example Workflow

```bash
# 1. Browse available components
npx venumityui@latest list

# 2. Search for specific components
npx venumityui@latest search card

# 3. Get details about a component
npx venumityui@latest info profile-card-1

# 4. Add the component to your project
npx venumityui@latest add profile-card-1

# 5. Add a folder-based component
npx venumityui@latest add personal-panel-1

# 6. Install all components at once
npx venumityui@latest add --all
```

### Using the Component

```tsx
// Single-file component
import ProfileCard1 from "@/components/ui/profile-card-1";

// Folder-based component
import PersonalPanel1 from "@/components/ui/personal-panel-1";

export default function Page() {
  return (
    <div>
      <ProfileCard1 />
      <PersonalPanel1 />
    </div>
  );
}
```

---

## 📦 Package Manager Support

The CLI auto-detects and uses the correct commands for:

| Package Manager | Install Command | Dlx Command | Run Command |
| --------------- | --------------- | ----------- | ----------- |
| **npm**         | `npm install`   | `npx`       | `npm run`   |
| **pnpm**        | `pnpm add`      | `pnpm dlx`  | `pnpm`      |
| **yarn**        | `yarn add`      | `yarn dlx`  | `yarn`      |
| **bun**         | `bun add`       | `bunx`      | `bun run`   |

**Detection order:**

1. User agent (how the CLI was invoked)
2. Lock file (`package-lock.json`, `pnpm-lock.yaml`, `yarn.lock`, `bun.lockb`)
3. Fallback to npm

---

## 🏗️ Component Categories

| Category           | Description                    | Components |
| ------------------ | ------------------------------ | ---------- |
| AI Features        | AI-powered components          | 3          |
| Background Effects | Stunning backgrounds           | 1          |
| Badges             | Status and notification badges | 5          |
| Cards              | Various card designs           | 1          |
| Charts             | Data visualization             | 38         |
| Commerce           | E-commerce components          | 7          |
| Dashboards         | Dashboard layouts              | 2          |
| Data Display       | Tables, grids, lists           | 11         |
| Feedbacks          | Alerts, toasts, popups         | 8          |
| Layouts            | Container, grid, masonry       | 6          |
| Loaders            | Loading animations             | 29         |
| Navigations        | Navbars, menus, footers        | 3          |
| Sections           | Hero, features, pricing        | 8          |

**Total: 122+ components and growing!**

---

## 🔧 Auto-Dependency Installation

The CLI automatically detects and installs dependencies for your components.

### NPM Dependencies

- `recharts`, `date-fns`, `react-hook-form`, `zod`, `axios`, `swr`, and more

### shadcn/ui Components

- `button`, `card`, `avatar`, `badge`, `chart`, `dialog`, `dropdown-menu`, and more

### Example

When you install `personal-panel-1`:

1. Detects `recharts` usage → installs it via your PM
2. Detects `chart` from shadcn/ui → runs `<pm> dlx shadcn@latest add chart`

---

## 🛠️ Tech Stack

- **Node.js** — Runtime
- **Commander** — CLI argument parsing
- **Chalk** — Terminal colors
- **Gradient-string** — Gradient header
- **Inquirer** — Interactive prompts
- **Ora** — Spinner animations
- **Boxen** — Boxed success messages

---

## 📚 Resources

- **Website**: [ui.venumity.com](https://ui.venumity.com)
- **Documentation**: [ui.venumity.com/docs](https://ui.venumity.com/docs)
- **Components**: [ui.venumity.com/components](https://ui.venumity.com/components)
- **GitHub**: [github.com/thevinayakgore/ui.venumity](https://github.com/thevinayakgore/ui.venumity)
- **NPM**: [npmjs.com/package/venumityui](https://npmjs.com/package/venumityui)

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](https://github.com/thevinayakgore/ui.venumity/blob/main/CONTRIBUTING.md).

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Commit and push
5. Open a Pull Request

---

## 📄 License

MIT © [The Vinayak Gore](https://github.com/thevinayakgore)

---

<div align="center">
  Made with ❤️ by <a href="https://github.com/thevinayakgore">The Vinayak Gore</a>
  <br />
  <sub>Built for the open-source community</sub>
</div>
