<div align="left">

# Venumity UI CLI ⚡

  <h3>⚡ The fastest way to add beautiful components to your Next.js project</h3>
  
  [![npm version](https://img.shields.io/npm/v/venumityui.svg)](https://www.npmjs.com/package/venumityui)
  [![npm downloads](https://img.shields.io/npm/dm/venumityui.svg)](https://www.npmjs.com/package/venumityui)
  [![MIT License](https://img.shields.io/npm/l/venumityui.svg)](LICENSE)
  
  <p>Copy, paste, customize, and launch your idea faster than ever! ✨</p>
</div>

---

## 📖 What is Venumity UI CLI?

The **Venumity UI CLI** is a powerful command-line tool that lets you install production-ready React components directly into your Next.js project with a single command.

Instead of manually copying files, managing dependencies, and configuring shadcn/ui components, the CLI handles everything for you:

- ✅ Downloads the component source code
- ✅ Detects and installs required npm dependencies
- ✅ Installs required shadcn/ui components
- ✅ Creates the proper folder structure
- ✅ Sets up your project if needed (Next.js + TypeScript + Tailwind)

**No more copy-paste errors. No more missing dependencies. Just one command and you're ready to ship.**

---

## 🚀 Quick Start

### Install a Component

```bash
npx venumityui@latest add profile-card-1
```

That's it! The CLI will:

1. Check if you have a Next.js project
2. Create one if needed (with TypeScript + Tailwind + shadcn/ui)
3. Download the component
4. Install all dependencies
5. Ready to use!

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

## 🎯 Commands

### Install Components - `add`

```bash
npx venumityui@latest add <component-name>
```

**Options -**
- Overwrite existing files - `--overwrite, -o`
- Install all available components - `--all`

**Examples -**

```bash
# Install a single component
npx venumityui@latest add profile-card-1

# Install a folder-based component (with all files)
npx venumityui@latest add personal-panel-1

# Install multiple components at once
npx venumityui@latest add profile-card-1 basic-accordion ai-chat-bot-1

# Install all components
npx venumityui@latest add --all

# Overwrite existing file
npx venumityui@latest add profile-card-1 --overwrite
```

---

### Browse Components - `list`

```bash
npx venumityui@latest list
```

**Options -**
- Filter by category - `--category, -c <category>`

**Examples -**

```bash
# List all components
npx venumityui@latest list

# List only card components
npx venumityui@latest list --category cards
```

---

### Find Components - `search`

```bash
npx venumityui@latest search <query>
```

**Examples -**

```bash
# Search by name
npx venumityui@latest search accordion

# Search by category
npx venumityui@latest search card

# Search by description
npx venumityui@latest search gradient
```

---

### Component Details - `info`

```bash
npx venumityui@latest info <component-name>
```

**Examples -**

```bash
npx venumityui@latest info profile-card-1
npx venumityui@latest info basic-accordion
npx venumityui@latest info ai-chat-bot-1
```

**Output -**
```
📋 Component Information

Name: Profile Card 1
Category: Cards
Subcategory: Profile Cards
Description: A professional profile card with avatar and stats
Dependencies: none
💡 Install: venumityui add profile-card-1
```

---

### List All Categories - `categories`

```bash
npx venumityui@latest categories
```

**Output -**
```
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

---

### List Subcategories - `subcategory`

```bash
npx venumityui@latest subcategory <category>
```

**Example -**

```bash
npx venumityui@latest subcategory cards
```

**Output -**
```
📂 Subcategories for "cards" (1 components):

  Profile Cards: 1 components
    • Profile Card 1
```

---

## 🧩 Component Types

### Single-File Components

Most components are single files:

```
components/ui/
  └── profile-card-1.tsx
```

**Import -**
```tsx
import ProfileCard1 from '@/components/ui/profile-card-1';
```

### Folder-Based Components

Some complex components have multiple files:

```
components/ui/
  └── personal-panel-1/
      ├── index.tsx
      ├── ui/
      │   ├── header.tsx
      │   ├── sidebar.tsx
      │   └── footer.tsx
      └── utils/
          └── helpers.ts
```

**Import -**
```tsx
import PersonalPanel1 from '@/components/ui/personal-panel-1';
```

---

## 🔧 Auto-Dependency Installation

One of the most powerful features of the Venumity CLI is **automatic dependency detection**:

### npm Dependencies

The CLI scans your component code and automatically installs any npm packages it finds:

```tsx
// If your component uses recharts
import { BarChart, Bar } from "recharts";
// → CLI runs: npm install recharts

// If your component uses date-fns
import { format } from "date-fns";
// → CLI runs: npm install date-fns
```

### shadcn/ui Dependencies

The CLI automatically installs required shadcn/ui components:

```tsx
// If your component imports these
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
// → CLI runs: npx shadcn@latest add button card avatar badge
```

**Example -** When you install `personal-panel-1`, the CLI will:
1. Detect `recharts` usage → Install via npm
2. Detect `chart` from shadcn/ui → Install via `npx shadcn@latest add chart`
3. Detect `card`, `button`, `avatar` → Install all of them

**No manual dependency management needed!**

---

## 🏗️ How It Works

### Under the Hood

**1. Project Detection**
   - CLI checks if you're in a Next.js project (looks for `package.json`)
   - If no project found, it prompts you to create one
   
**2. Project Setup (if needed)**
   - Creates Next.js app with TypeScript + Tailwind
   - Installs required dependencies
   - Initializes shadcn/ui

**3. Component Fetching**
   - Fetches component data from the Venumity API
   - Downloads the component source code

**4. Dependency Detection**
   - Scans all files (including folder-based components)
   - Detects npm packages and shadcn/ui components

**5. Installation**
   - Creates the folder structure
   - Writes component files
   - Installs all detected dependencies

**6. Ready to Use !**
   - Component is ready to import and use

---

## 💻 Example Workflow

### Complete Setup from Scratch

```bash
# 1. Create a new folder
mkdir my-project
cd my-project

# 2. Install a component (CLI will create the project)
npx venumityui@latest add profile-card-1

# CLI prompts:
# ? What is your project named? my-app
# ? Install motion (Framer Motion) for animations? yes

# 3. Wait for installation...
# ✓ Project created
# ✓ Profile Card 1 installed
# ✓ Dependencies installed

# 4. Start your project
cd my-app
npm run dev

# 5. Use the component
```

### Use in Your App

```tsx
// app/page.tsx
import ProfileCard1 from '@/components/ui/profile-card-1';

export default function Home() {
  return (
    <main>
      <ProfileCard1 />
    </main>
  );
}
```

---

## 📊 Component Categories

| Category | Description | Count |
|----------|-------------|-------|
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

## 🛠️ Tech Stack Behind the CLI

The CLI is built with modern tools:

- **Node.js** - Runtime environment
- **Commander** - CLI argument parsing
- **Chalk** - Terminal colors
- **Gradient-string** - Gradient logos
- **Inquirer** - Interactive prompts
- **Ora** - Spinner animations
- **Boxen** - Boxed messages
- **Execa** - Child process management
- **Fetch API** - Component registry communication

---

## 🤝 Contributing to the CLI

We welcome contributions to make the CLI better!

### How to Contribute

#### 1. Fork and Clone

```bash
# Fork the repository on GitHub
git clone https://github.com/YOUR_USERNAME/ui.venumity.git
cd ui.venumity
npm install
```

#### 2. Navigate to CLI Folder

```bash
cd cli
npm install
```

#### 3. Link Locally

```bash
# Link the CLI for local testing
npm link

# Now you can test commands locally
venumityui list
venumityui add profile-card-1
```

#### 4. Make Your Changes

Common improvements you can make:

- **Add new commands** - Create new functionality
- **Improve error messages** - Better user experience
- **Add new component detection** - Support more dependencies
- **Fix bugs** - Squash issues
- **Performance improvements** - Faster installation

#### 5. Test Your Changes

```bash
# Test with local link
venumityui add <component-name>

# Test in different scenarios
# - Empty folder (project creation)
# - Existing project (component installation)
# - Multiple components
# - Folder-based components
```

#### 6. Submit a Pull Request

```bash
git checkout -b feat/improve-cli
git add .
git commit -m "feat: improve CLI with better error messages"
git push origin feat/improve-cli
# Open a Pull Request on GitHub
```

### CLI Code Structure

```
cli/
├── bin/
│   └── venumity.js          # CLI entry point
├── src/
│   ├── index.js             # Main CLI logic
│   ├── commands/
│   │   ├── add.js           # Add command
│   │   ├── list.js          # List command
│   │   ├── search.js        # Search command
│   │   ├── info.js          # Info command
│   │   ├── categories.js    # Categories command
│   │   └── subcategory.js   # Subcategory command
│   ├── utils/
│   │   ├── api.js           # API client
│   │   ├── file-system.js   # File operations
│   │   └── project-manager.js # Project detection & creation
│   └── constants.js         # Registry metadata
├── package.json
└── README.md
```

### Areas We Need Help

| Area | Description | Difficulty |
|------|-------------|------------|
| **New Commands** | Add `update`, `remove`, or `doctor` | Medium |
| **Better Error Messages** | Improve user feedback | Easy |
| **Performance** | Faster component installation | Hard |
| **Dependency Detection** | Support more npm packages | Medium |
| **Tests** | Add unit and integration tests | Medium |
| **Documentation** | Improve CLI docs | Easy |

---

## 🔐 Privacy & Analytics

The CLI collects **anonymous usage data** to help us improve:

- Total downloads (via npm)
- Component installation counts

**We do NOT collect:**
- Personal information
- Project names or content
- File paths or code

**Opt-out option:**
```bash
# Use --no-analytics flag
npx venumityui@latest add profile-card-1 --no-analytics
```

---

## ❓ Troubleshooting

### CLI not found

```bash
# Make sure you're using npx
npx venumityui@latest list

# Or install globally
npm install -g venumityui
venumityui list
```

### Component not found

```bash
# Check the component name
npx venumityui@latest list

# Search for it
npx venumityui@latest search <partial-name>
```

### shadcn/ui components not installing

```bash
# Try manually
npx shadcn@latest add button card avatar badge
```

### Project creation fails

```bash
# Create manually
npx create-next-app@latest my-app --typescript --tailwind
cd my-app
npx shadcn@latest init
npm install class-variance-authority clsx tailwind-merge lucide-react
```

---

## 📚 Resources

- **Website**: [ui.venumity.com](https://ui.venumity.com)
- **Components**: [ui.venumity.com/components](https://ui.venumity.com/components)
- **GitHub**: [github.com/thevinayakgore/ui.venumity](https://github.com/thevinayakgore/ui.venumity)
- **NPM**: [npmjs.com/package/venumityui](https://npmjs.com/package/venumityui)
- **Issues**: [github.com/thevinayakgore/ui.venumity/issues](https://github.com/thevinayakgore/ui.venumity/issues)

---

## 📄 License

MIT © [The Vinayak Gore](https://github.com/thevinayakgore)

---

<div align="center">
  Made with ❤️ by <a href="https://github.com/thevinayakgore">The Vinayak Gore</a>
  <br />
  <sub>Built for the open-source community</sub>
</div>