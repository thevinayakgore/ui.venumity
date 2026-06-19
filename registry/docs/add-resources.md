# 📚 How to Contribute Resources

Thank you for your interest in contributing to our resource library ! This guide will walk you through the complete process of adding your knowledge, whether it's a framework guide, cheat sheet, tutorial, or animation library reference.

---

## 🚀 Quick Overview

Contributing a resource involves **4 simple steps** -

1. **Fork & Star** the repository
2. **Write** your content as a Markdown file
3. **Register** it in the resources dataset
4. **Submit** a Pull Request

---

## 📋 Step-by-Step Guide

### Step 1 : Fork & Star the Repository

1. Visit our GitHub repository
2. Click the **Fork** button (top-right corner) to create your own copy
3. Click the **⭐ Star** button to support the project
4. Clone your forked repository to your device (laptop / desktop) -

```bash
git clone https://github.com/YOUR-USERNAME/ui.venumity.git
cd ui.venumity
```

5. Create a new branch for your contribution -

```bash
git checkout -b add-resource-[your-resource-name]
```

---

### Step 2 : Write Your Resource Content

Resources are stored as Markdown (`.md`) files organized by category.

#### 📁 Choose the Right Category Folder

Navigate to `/registry/reso/` and pick the folder that matches your resource:

| Folder | Category | Example Topics |
|--------|----------|----------------|
| `/registry/reso/frameworks/` | Framework Guides | Next.js, React, Vue, Svelte |
| `/registry/reso/animations/` | Animation Libraries | Framer Motion, GSAP, Lottie |
| `/registry/reso/tutorials/` | Tutorials | Sanity CMS, Strapi, Auth setups |
| `/registry/reso/cheat-sheets/` | Cheat Sheets | JavaScript, TypeScript, Git, C++ |

> **Don't see your category ?** You can propose a new one and mention it in your PR description.

#### ✍️ Create Your Markdown File

Create a new `.md` file inside the appropriate category folder. Use **kebab-case** for the filename (e.g., `next-js.md`, `framer-motion.md`).

**Example of resource writing structure for `/registry/reso/frameworks/react-hooks.md`:**

---

# React Hooks Guide

## Introduction

React Hooks revolutionized how we write components. This guide covers the most essential hooks you'll use daily.

## useState

The `useState` hook lets you add state to functional components.

```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

## useEffect

`useEffect` handles side effects like data fetching, subscriptions, and DOM manipulation.

```jsx
import { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(data => setUser(data));
  }, [userId]);

  if (!user) return <p>Loading...</p>;
  return <h1>{user.name}</h1>;
}
```

## useContext

Share data across components without prop drilling.

```jsx
const ThemeContext = createContext('light');

function ThemedButton() {
  const theme = useContext(ThemeContext);
  return <button className={theme}>Themed Button</button>;
}
```

## Best Practices

1. **Always provide dependency arrays** to `useEffect` to avoid infinite loops
2. **Extract complex logic** into custom hooks for reusability
3. **Use functional updates** when new state depends on previous state
4. **Keep hooks at the top level** — never call them inside loops, conditions, or nested functions

## Related Resources

- [Official React Hooks Documentation](https://react.dev/reference/react/hooks)
- [useHooks Collection](https://usehooks.com/)

**Tips for great resource content -**
- Use clear headings (`##`, `###`) to organize sections
- Include practical code examples with syntax highlighting
- Add "Best Practices" or "Common Pitfalls" sections
- Link to official documentation for further reading
- Keep it beginner-friendly but thorough

---

### Step 3 : Register Your Resource in the Dataset

Open `/registry/resources.ts` and add your page entry to the correct category array.

#### 📝 Understanding the Resource Page Interface

Each resource page has the following fields -

```tsx
export interface ResourcePage {
  title: string;           // Display title of your resource
  published: boolean;      // Set to true when ready
  contentPath: string;     // Path to your .md file (start with /)
  description?: string;    // Short description (shown on cards)
  officialUrl?: string;    // Link to official docs (if any)
  tags?: string[];         // Search tags (lowercase)
  coverImage?: string;     // Cover image path (optional)
  authorNames?: string[];  // GitHub username(s) - write your github username here if you updated or created this resource pgae
}
```

#### ✏️ Adding Your Entry

Find the matching category in the `RESOURCE_CATEGORIES` array and add your page object to its `pages` array.

**Example — Adding "React Hooks Guide" to the Frameworks category -**

```typescript
{
  name: "Framework Guides",
  slug: "frameworks",
  description: "Framework guides, best practices, and ecosystem resources.",
  order: 1,
  pages: [
    // ... existing pages
    {
      title: "React Hooks Guide",
      published: true,
      contentPath: "/registry/reso/frameworks/react-hooks.md",
      description:
        "A comprehensive guide to React Hooks covering useState, useEffect, useContext, custom hooks, and best practices for building modern React applications.",
      officialUrl: "https://react.dev/reference/react/hooks",
      tags: [
        "react",
        "hooks",
        "usestate",
        "useeffect",
        "javascript",
        "frontend",
      ],
      coverImage: "/covers/react-hooks.png",
      authorNames: ["your-github-username"],
    },
  ],
},
```

#### 📋 Field Checklist

| Field | Required | Notes |
|-------|----------|-------|
| `title` | ✅ Yes | Use clear, searchable titles |
| `published` | ✅ Yes | Set to `true` when ready for review |
| `contentPath` | ✅ Yes | Must start with `/` and match your file location |
| `description` | ✅ Yes | 1-2 sentences, appears on resource cards |
| `tags` | ✅ Yes | 5-7 lowercase keywords for search/filtering/SEO |
| `coverImage` | Optional | Add to `/public/covers/` if you create one |
| `officialUrl` | Optional | Link to official docs if applicable (Recommended) |
| `authorNames` | ✅ Yes | Your GitHub username for attribution |

---

### Step 4 : Submit Your Pull Request

1. **Stage and commit your changes -**

```bash
git add .
git commit -m "feat: add [Resource Title] resource page"
```

2. **Push to your fork -**

```bash
git push origin add-resource-[your-resource-name]
```

3. **Open a Pull Request -**
   - Go to the original repository on GitHub
   - Click **"Compare & pull request"**
   - Write a clear title - `Add [Resource Title] to [Category]`
   - In the description, briefly explain what your resource covers
   - Submit the PR

#### 📝 Example PR Description

```text
📚 Resource : React Hooks Guide
Added a comprehensive guide covering essential React Hooks.

What's included -
- useState with practical examples
- useEffect for side effects and data fetching
- useContext for state sharing
- Best practices and common pitfalls
- Links to official documentation

Category - Framework Guides
File - /registry/reso/frameworks/react-hooks.md
```

---

## 🎨 Adding a Cover Image (Optional)

To make your resource card visually appealing:

1. Create a cover image (recommended size: **1200×630px** or 16:9 ratio)
2. Save it in `/public/covers/` (use kebab-case, e.g., `react-hooks.png`)
3. Reference it in your registry entry: `coverImage: "/covers/react-hooks.png"`
4. Supported formats: PNG, JPG, WebP

> If no cover image is provided, a default placeholder will be used.

---

## ✅ Review Checklist

Before submitting, make sure:

- [ ] Your `.md` file is in the correct category folder
- [ ] The file uses kebab-case naming (e.g., `my-resource.md`)
- [ ] Content is well-structured with headings, code examples, and best practices
- [ ] Your entry in `registry/resources.ts` has all required fields
- [ ] `contentPath` matches your actual file location exactly
- [ ] Tags are lowercase and relevant
- [ ] `published` is set to `true`
- [ ] Your GitHub username is in `authorNames`
- [ ] You've tested that links and code examples work
- [ ] Your PR has a clear title and description

---

## 🤝 Need Help ?

- **Questions?** Open an issue with the `question` label
- **Not sure about category?** Mention it in your PR and we'll help
- **First time contributing?** Look for issues labeled `good first issue`

---

## 🎉 After Your PR is Merged

Once your Pull Request is reviewed and merged:

- Your resource will appear on the **/resources** page
- Your GitHub avatar will show as the author on the resource card
- Your name will be credited in the contributors section
- You've officially shared knowledge with the community ! 🚀

---

**Thank you for contributing to open knowledge ! Every resource helps someone learn and grow with this amazing community.** 💙