#### Get up and running with Venu<span style="color:orange">mity</span> UI components and resources in your project.

---

## Method 1 - Install with the CLI (Recommended)

The CLI adds components instantly and handles all dependencies for you.

```bash
npx venumity@latest add button
```

### CLI Features

- Adds the component file directly to your `src/components/ui` folder
- Installs any required third‑party packages automatically
- Supports Tailwind CSS configuration updates
- Works with existing Next.js, Vite, or CRA projects

---

## Method 2 - Copy & Paste Individual Components

1. Browse to the component page (e.g., `/components/button`)
2. Click the **“Copy Code”** button
3. Paste the code into your project’s component file
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

Some components use `framer-motion` and `lucide-react`. Install them once -

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

## Common Setup Issues

| Problem                     | Solution                                                     |
| --------------------------- | ------------------------------------------------------------ |
| **TypeScript errors**       | Ensure React 18+ and TypeScript 4.9+, import types correctly |
| **Component not rendering** | Check browser console; verify all dependencies installed     |
| **CLI not found**           | Use `npx` prefix; Node.js 18+ required                       |

---

## Testing Components

Test in isolation before integrating into your app -

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

## Updating Components

When we release updates -

- Check the [Changelog](/changelog) page for changelog notes (**Changelog** will be updated by **Admin** only)
- Compare your version with the latest code
- Update props or styles as needed
- Test thoroughly before deploying

---

## Need Help ?

- **Documentation** – Each component and resource has detailed usage pages
- **GitHub Issues** – [Report a bug or request a feature](https://github.com/thevinayakgore/ui.venumity/issues)
- **Email** – [thevinayakgore@gmail.com](mailto:thevinayakgore@gmail.com)
- **Community** – [GitHub Discussions](https://github.com/thevinayakgore/ui.venumity/discussions)
- **Quick Links** – [Components](/components) • [Resources](/resources) • [GitHub](https://github.com/thevinayakgore/ui.venumity)
