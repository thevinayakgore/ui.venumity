# Venumity UI CLI

<div align="center">
  <h3>⚡ Install Venumity UI components with one command</h3>
  
  [![npm version](https://img.shields.io/npm/v/venumityui.svg)](https://www.npmjs.com/package/venumityui)
  [![npm downloads](https://img.shields.io/npm/dm/venumityui.svg)](https://www.npmjs.com/package/venumityui)
  [![MIT License](https://img.shields.io/npm/l/venumityui.svg)](LICENSE)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)
  [![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.3-38bdf8)](https://tailwindcss.com/)
  
  <p>Copy, paste, customize, and launch your idea faster than ever! ✨</p>
</div>

---

## 📦 Installation

### Use with npx (Recommended)

```bash
npx venumityui@latest <command>
```

### Global Installation

```bash
npm install -g venumityui
```

Then use:

```bash
venumityui <command>
```

---

## 🚀 Commands

### Add a Component

```bash
npx venumityui@latest add <component-name>
```

**Options:**
- `--overwrite, -o` - Overwrite existing files
- `--all` - Install all available components

**Examples:**

```bash
# Add a single component
npx venumityui@latest add profile-card-1

# Add a folder-based component (with all files)
npx venumityui@latest add personal-panel-1

# Add multiple components
npx venumityui@latest add profile-card-1 basic-accordion ai-chat-bot-1

# Install all available components
npx venumityui@latest add --all

# Overwrite existing file
npx venumityui@latest add profile-card-1 --overwrite
```

### List Components

```bash
npx venumityui@latest list
```

**Options:**
- `--category, -c <category>` - Filter by category

**Examples:**

```bash
# List all components
npx venumityui@latest list

# List components in a specific category
npx venumityui@latest list --category cards
```

### Search Components

```bash
npx venumityui@latest search <query>
```

**Examples:**

```bash
# Search by name
npx venumityui@latest search accordion

# Search by category
npx venumityui@latest search card

# Search by description
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

Shows all available categories with component counts:

```bash
📂 Available Categories (13 total):

  AI Features: 3 components
  Background Effects: 1 components
  Badges: 5 components
  Cards: 1 components
  Charts: 38 components
  Commerce: 7 components
  Dashboards: 2 components
  Data Display: 11 components
  Feedbacks: 8 components
  Layouts: 6 components
  Loaders: 29 components
  Navigations: 3 components
  Sections: 8 components
```

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

### Complete Setup

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

# 7. Use it in your React component
```

### Using the Component

**Single-file component:**
```tsx
// Import the component
import ProfileCard1 from '@/components/ui/profile-card-1';

// Use it in your component
export default function Page() {
  return <ProfileCard1 />;
}
```

**Folder-based component:**
```tsx
// Import from the folder
import PersonalPanel1 from '@/components/ui/personal-panel-1';

// Use it in your component
export default function Dashboard() {
  return <PersonalPanel1 />;
}
```

---

## 🏗️ Component Categories

| Category | Description | Components |
|----------|-------------|------------|
| AI Features | AI-powered components | 3 |
| Background Effects | Stunning backgrounds | 1 |
| Badges | Status and notification badges | 5 |
| Cards | Various card designs | 1 |
| Charts | Data visualization | 38 |
| Commerce | E-commerce components | 7 |
| Dashboards | Dashboard layouts | 2 |
| Data Display | Tables, grids, lists | 11 |
| Feedbacks | Alerts, toasts, popups | 8 |
| Layouts | Container, grid, masonry | 6 |
| Loaders | Loading animations | 29 |
| Navigations | Navbars, menus, footers | 3 |
| Sections | Hero, features, pricing | 8 |

**Total: 122+ components and growing!**

---

## 🔧 Auto-Dependency Installation

The CLI automatically detects and installs dependencies for your components:

### NPM Dependencies
Automatically detects and installs packages like:
- `recharts` - Charts and graphs
- `date-fns` - Date utilities
- `react-hook-form` - Form handling
- `zod` - Schema validation
- And many more...

### shadcn/ui Components
Automatically detects and installs required shadcn/ui components:
- `button`, `card`, `avatar`, `badge`
- `chart`, `dialog`, `dropdown-menu`
- `accordion`, `tabs`, `tooltip`
- And many more...

### Example
When you install `personal-panel-1`, the CLI will:
1. Detect `recharts` usage in the component files
2. Install `recharts` via npm
3. Detect `chart` from shadcn/ui
4. Install `chart` via `npx shadcn@latest add chart`

---

## 🛠️ Tech Stack

- **Node.js** - Runtime environment
- **Commander** - CLI argument parsing
- **Chalk** - Terminal colors
- **Gradient-string** - Gradient colors
- **Inquirer** - Interactive prompts
- **Ora** - Spinner animations
- **Boxen** - Boxed messages
- **FS-extra** - File operations

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

### How to Contribute

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

---

## 📄 License

MIT © [The Vinayak Gore](https://github.com/thevinayakgore)

---

## 💖 Support

- ⭐ Star this repository (ui.venumity)
- 👨‍💻 Follow [@thevinayakgore](https://github.com/thevinayakgore)
- 💬 Join our community discussions
- 🐛 Report issues on [GitHub Issues](https://github.com/thevinayakgore/ui.venumity/issues)

---

<div align="center">
  Made with ❤️ by <a href="https://github.com/thevinayakgore">The Vinayak Gore</a>
  <br />
  <sub>Built for the open-source community</sub>
</div>