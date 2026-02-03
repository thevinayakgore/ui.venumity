# Quick Installation

Refer this page to install frameworks and build projects in modern tech stacks and start building modern web apps for future.

---

## # Method 1 : Copy Individual Components

- Browse to the component you need
- Click the "Copy Code" button
- Paste into your project
- Adjust imports if needed

---

## # Method 2 : Using Our CLI (Coming Soon)

```bash
# Coming soon!
npx venumity add button
```

---

## # Method 3 : Manual Setup

##### 1. Create Components Directory

```bash
mkdir -p src/components/ui
```

##### 2. Copy Component Files

Copy the component `.tsx` file to your `src/components/ui` directory.

##### 3. Install Required Dependencies

Check the component's documentation for any required packages:

```bash
npm install framer-motion lucide-react
```

##### 4. Import and Use

```tsx
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return <Button>Get Started</Button>;
}
```

---

# Project Setup

#### Tailwind CSS Configuration

If you're using Tailwind CSS (recommended), add our colors to your `tailwind.config.js` :

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          500: "#3b82f6",
          600: "#2563eb",
        },
      },
    },
  },
};
```

---

#### TypeScript Configuration

For TypeScript projects, ensure you have these settings :

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

---

## Common Setup Issues

### CSS Not Loading ?

- Check Tailwind imports in your CSS file
- Ensure component classes aren't being purged
- Verify PostCSS configuration

### TypeScript Errors ?

- Make sure types are properly imported
- Check React version compatibility
- Verify TypeScript version (4.9+ recommended)

### Component Not Rendering ?

- Check console for error messages
- Verify all dependencies are installed
- Ensure proper import paths

## Testing Components

We recommend testing components in isolation first :

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

# Updating Components

When we update components :

- Check the component page for changelog
- Compare your version with the latest
- Update props or styles as needed
- Test thoroughly before deploying

---

## Need Help ?

- **Documentation** : Check component pages for specific usage
- **GitHub** : [Open an issue](https://github.com/thevinayakgore/ui.venumity/issues)
- **Email** : [thevinayakgore@gmail.com](mailto:thevinayakgore@gmail.com)
- **Community** : [GitHub Discussions](https://github.com/thevinayakgore/ui.venumity/discussions)
- **Quick Links** : [Components](/components) • [Resources](/resources) • [GitHub](https://github.com/thevinayakgore/ui.venumity)