# Introduction to React + Vite

Vite is a modern frontend build tool that provides fast development experience with minimal configuration.

#### Key Features

- Instant server start
- Hot Module Replacement (HMR)
- Optimized builds
- Plugin system
- TypeScript support out of the box

---

## Getting Started

### Installation

```bash
npm create vite@latest my-app -- --template react
cd my-app
npm install
npm run dev
```

**Project Structure**

```
my-app/
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── App.css
│   └── components/
├── public/
├── index.html
├── vite.config.js
└── package.json
```

---

## Core Concepts

### 1. Project Setup

**vite.config.js**

```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: "dist",
    sourcemap: true,
  },
});
```

**Main Entry Point**

```jsx
// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
```

---

### 2. Development Server

**Fast Refresh**
Vite automatically updates modules without full page reload:

```javascript
// Edit and save - updates instantly
function Counter() {
  const [count, setCount] = useState(0);

  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
}
```

**Environment Variables**

```javascript
// .env
VITE_API_URL=https://api.example.com

// In code
const apiUrl = import.meta.env.VITE_API_URL;
```

---

### 3. Building for Production

```bash
# Development
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

**Build Output**

```
dist/
├── assets/
│   ├── index-[hash].js
│   └── index-[hash].css
├── index.html
└── vite-manifest.json
```

---

### 4. Routing with React Router

**Installation**

```bash
npm install react-router-dom
```

**Basic Setup**

```jsx
// src/main.jsx
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
```

**Route Configuration**

```jsx
// src/App.jsx
import { Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/users/:id" element={<User />} />
      </Routes>
    </>
  );
}
```

---

### 5. State Management Options

**Using Context API**

```jsx
// src/context/ThemeContext.jsx
import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
```

**Using Zustand (Lightweight)**

```bash
npm install zustand
```

```jsx
// src/store/useStore.js
import { create } from "zustand";

const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  reset: () => set({ count: 0 }),
}));

// In component
function Counter() {
  const { count, increment } = useStore();
  return <button onClick={increment}>{count}</button>;
}
```

---

### 6. API Integration

**Using Fetch**

```jsx
import { useState, useEffect } from "react";

function DataFetcher() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.example.com/data")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  return <div>{JSON.stringify(data)}</div>;
}
```

**Using SWR (React Hooks for Data Fetching)**

```bash
npm install swr
```

```jsx
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

function Profile() {
  const { data, error } = useSWR("/api/user", fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return <div>Hello {data.name}!</div>;
}
```

---

## Advanced Features

### 1. Code Splitting

**Dynamic Imports**

```jsx
import { lazy, Suspense } from "react";

const HeavyComponent = lazy(() => import("./HeavyComponent"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
    </Suspense>
  );
}
```

->

### 2. Environment Configuration

**Multiple Environments**

```javascript
// vite.config.js
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV),
    },
  };
});
```

**.env files**

```
.env                # loaded in all cases
.env.local          # loaded in all cases, ignored by git
.env.[mode]         # only loaded in specified mode
.env.[mode].local   # only loaded in specified mode, ignored by git
```

->

### 3. Custom Plugins

**Creating a simple plugin**

```javascript
// vite-plugin-example.js
export default function myPlugin() {
  return {
    name: 'my-plugin',
    transform(code, id) {
      if (id.endsWith('.custom')) {
        // Transform code
        return code.replace('__VERSION__', '1.0.0');
      }
    },
  };
}

// In vite.config.js
import myPlugin from './vite-plugin-example';

export default defineConfig({
  plugins: [myPlugin()],
});
```

---

### 4. CSS Handling

**CSS Modules**

```css
/* Button.module.css */
.button {
  background: blue;
  color: white;
}
```

```jsx
import styles from "./Button.module.css";

function Button() {
  return <button className={styles.button}>Click</button>;
}
```

**CSS-in-JS Libraries**

```bash
npm install @emotion/react @emotion/styled
```

```jsx
import styled from "@emotion/styled";

const RedButton = styled.button`
  background: red;
  color: white;
`;

function App() {
  return <RedButton>Styled Button</RedButton>;
}
```

---

## Performance Optimization

### 1. Bundle Analysis

```bash
npm install rollup-plugin-visualizer
```

```javascript
// vite.config.js
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [visualizer()],
});
```

->

### 2. Preloading Critical Assets

```html
<!-- index.html -->
<link rel="preload" href="/src/main.jsx" as="script" />
```

->

### 3. Lazy Loading Routes

```jsx
import { lazy } from "react";
import { Routes, Route } from "react-router-dom";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Suspense>
  );
}
```

---

## Testing Setup

### 1. Unit Testing with Vitest

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom
```

**vitest.config.js**

```javascript
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/test/setup.js",
  },
});
```

**Test Example**

```jsx
// Button.test.jsx
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./Button";

test("button click works", () => {
  const handleClick = vi.fn();
  render(<Button onClick={handleClick}>Click me</Button>);

  fireEvent.click(screen.getByText(/click me/i));
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

---

## Deployment

### 1. Static Hosting (Netlify, Vercel, GitHub Pages)

```bash
npm run build
# Upload dist/ folder
```

**Netlify Configuration (netlify.toml)**

```yaml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

->

### 2. Docker Deployment

```dockerfile
# Dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

---

## Best Practices

### Do :

- Use TypeScript for better type safety
- Implement code splitting for large apps
- Use environment variables for configuration
- Add proper error boundaries
- Implement loading states
- Use React.lazy for route-based code splitting

### Avoid :

- Large bundle sizes
- Blocking the main thread
- Missing error handling
- Hard-coded configuration
- Unoptimized images

---

## Common Patterns

### 1. Custom Hook Pattern

```jsx
// src/hooks/useLocalStorage.js
import { useState } from "react";

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}
```

->

### 2. Compound Component Pattern

```jsx
function Tabs({ children }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div>
      {React.Children.map(children, (child, index) =>
        React.cloneElement(child, {
          isActive: index === activeIndex,
          onClick: () => setActiveIndex(index),
        }),
      )}
    </div>
  );
}

function Tab({ isActive, onClick, children }) {
  return (
    <button
      onClick={onClick}
      style={{ fontWeight: isActive ? "bold" : "normal" }}
    >
      {children}
    </button>
  );
}
```

---

## Resources

**Official Documentation :**

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [React Router](https://reactrouter.com/)

**Community Resources :**

- [Vite Awesome](https://github.com/vitejs/awesome-vite)
- [React Patterns](https://reactpatterns.com/)
- [Vite Recipes](https://github.com/vitejs/vite/tree/main/docs/guide)

**Tools & Libraries :**

- [React Query](https://tanstack.com/query) - Data fetching
- [Zustand](https://github.com/pmndrs/zustand) - State management
- [Vitest](https://vitest.dev/) - Testing framework
- [Storybook](https://storybook.js.org/) - Component development

---

## Quick Reference

### Next.js Commands

```bash
npx create-next-app@latest      # Create new app
npm run dev                     # Development server
npm run build                   # Production build
npm start                       # Production server
npm run lint                    # Run ESLint
```

### Vite Commands

```bash
npm create vite@latest          # Create new app
npm run dev                     # Development server
npm run build                   # Production build
npm run preview                 # Preview production build
npm run lint                    # Run ESLint
```

### File Extensions

- `.jsx` / `.tsx` - React components with JSX
- `.js` / `.ts` - JavaScript/TypeScript files
- `.module.css` - CSS Modules
- `.scss` / `.sass` - Sass files

---

## Migration Tips

### From CRA to Vite

- Install Vite and plugins
- Move index.html to root
- Update import paths
- Configure environment variables
- Update scripts in package.json

### From Pages Router to App Router (Next.js)

- Create app/ directory
- Migrate pages to app/
- Update data fetching methods
- Implement Server Components
- Update navigation and routing

---

This guide covers the essential concepts for both frameworks. Remember that the best choice depends on your specific project requirements :

- **Choose Next.js** if you need SSR, SEO optimization, or API routes
- **Choose Vite + React** if you want faster builds, more flexibility, or a SPA

Both frameworks have excellent documentation and active communities for further learning.
