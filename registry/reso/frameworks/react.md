## 1. Introduction to React.js

React.js is an open-source JavaScript **library** used to build interactive, component-based user interfaces. It was created by Facebook, now Meta, and is primarily focused on the **view layer** of an application.

React is not a complete framework like Angular. It does not enforce routing, state management, form handling, or API architecture. Instead, it provides a flexible component model and lets developers choose supporting tools such as React Router, Redux, TanStack Query, Vite, or Next.js.

React applications are built using independent, reusable pieces called **components**. A component describes a part of the UI and returns markup using JSX. [63]

### Example

```jsx
function Welcome({ name }) {
  return <h1>Hello, {name}</h1>;
}

export default function App() {
  return <Welcome name="Aman" />;
}
```

### Key characteristics

- **Declarative:** You describe what the UI should look like for a given state.
- **Component-based:** UI is divided into reusable building blocks.
- **Unidirectional data flow:** Data generally flows from parent to child through props.
- **JavaScript-centric:** React uses JavaScript and JSX rather than templates.
- **Ecosystem-driven:** Routing, forms, data fetching, and state management are handled by libraries.

---

## 2. Why React Is Widely Used in the IT Industry

React became one of the most adopted frontend technologies because it solves real product-development problems: reusable UI, predictable updates, faster development, strong hiring demand, and a mature ecosystem.

### Major reasons for adoption

| Reason                         | Technical Benefit                                                  |
| ------------------------------ | ------------------------------------------------------------------ |
| Component reusability          | Teams can build UI once and reuse it across pages and products     |
| Declarative UI                 | Easier to reason about UI based on current state                   |
| Virtual DOM and reconciliation | Reduces unnecessary direct DOM operations                          |
| Hooks                          | Enable reusable stateful logic in functional components            |
| Large ecosystem                | Routing, forms, testing, state, and SSR tools are mature           |
| Strong community               | Extensive documentation, tutorials, libraries, and hiring demand   |
| Cross-platform support         | React Native allows similar concepts for mobile apps               |
| Framework flexibility          | Can be used with Vite, Next.js, Remix, React Router, and more      |
| Enterprise scalability         | Suitable for dashboards, SaaS products, e-commerce, and large SPAs |

React is used by major companies including Meta, Netflix, Airbnb, Instagram, and Dropbox for building modern web applications. [69]

### Why companies prefer React

1. **Faster feature delivery:** Teams can work on independent components.
2. **Better maintainability:** Small components are easier to test and refactor.
3. **Predictable UI updates:** State-driven rendering reduces manual DOM manipulation.
4. **Talent availability:** React developers are widely available.
5. **Ecosystem maturity:** Production-ready libraries exist for almost every requirement.
6. **Modern rendering options:** React supports client rendering, SSR, static generation, and Server Components. [65]

---

## 3. React Architecture and Core Concepts

React follows a **component-driven architecture**. The UI is composed of components, components hold or receive state, and React updates the browser DOM when state changes.

### Core building blocks

```text
Application
 └── Pages / Routes
      └── Layout Components
           └── Feature Components
                └── UI Components
                     └── Atomic Elements
```

### Important concepts

| Concept               | Meaning                                                                |
| --------------------- | ---------------------------------------------------------------------- |
| Component             | Reusable function or class that returns UI                             |
| JSX                   | Syntax extension used to describe UI in JavaScript                     |
| Props                 | Read-only inputs passed from parent to child                           |
| State                 | Internal, changeable data owned by a component                         |
| Hooks                 | Functions that add state and lifecycle features to function components |
| Event handling        | User interactions handled through synthetic events                     |
| Conditional rendering | UI displayed based on conditions                                       |
| Lists and keys        | Rendering collections efficiently and predictably                      |
| Context               | Sharing data across component trees without prop drilling              |
| Reconciliation        | React process for updating the DOM efficiently                         |

React components are individual UI pieces, and Hooks allow components to use React features such as state and side effects. [63][64]

---

## 4. JSX and Rendering Model

JSX is a syntax extension that looks like HTML but compiles to JavaScript. It allows developers to write UI structure directly inside JavaScript.

### Example

```jsx
const name = "React";
const element = <h1>Hello, {name}</h1>;
```

Internally, this is transformed into something similar to:

```js
const element = React.createElement("h1", null, "Hello, ", name);
```

### JSX rules

- Return a single parent element.
- Use `className` instead of `class`.
- Use `htmlFor` instead of `for`.
- Close all tags, including `<img />`, `<br />`, and `<input />`.
- Use curly braces `{}` to embed JavaScript expressions.
- Use `key` when rendering lists.

### Conditional rendering

```jsx
function Status({ isLoading }) {
  if (isLoading) {
    return <p>Loading...</p>;
  }

  return <p>Data loaded successfully</p>;
}
```

### Rendering lists

```jsx
function UserList({ users }) {
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

### Why keys are important

Keys help React identify which items have changed, been added, or removed. Without stable keys, React may reuse the wrong DOM nodes and cause incorrect UI behavior.

Use a stable unique ID:

```jsx
<li key={user.id}>{user.name}</li>
```

Avoid using array index as a key when the list can be reordered, filtered, or updated.

---

## 5. Components, Props, and Composition

React supports two component types:

1. **Function components** — modern standard.
2. **Class components** — legacy but still found in older codebases.

### Function component

```jsx
function Button({ label, onClick }) {
  return <button onClick={onClick}>{label}</button>;
}
```

### Props

Props are read-only inputs passed from parent to child.

```jsx
function ProfileCard({ name, role, avatar }) {
  return (
    <div>
      <img src={avatar} alt={name} />
      <h3>{name}</h3>
      <p>{role}</p>
    </div>
  );
}
```

### Props are immutable

A child component must not modify its props:

```jsx
// Wrong
props.name = "New Name";
```

Instead, state changes should be handled by the owner of that state.

### Component composition

Composition means building complex UI from smaller components.

```jsx
function Card({ children }) {
  return <div className="card">{children}</div>;
}

function App() {
  return (
    <Card>
      <h2>Profile</h2>
      <p>User details</p>
    </Card>
  );
}
```

### Why composition matters

- Reduces duplication.
- Makes components reusable.
- Avoids deeply nested inheritance.
- Improves separation of concerns.
- Makes testing easier.

---

## 6. State Management and Hooks

Hooks were introduced in React 16.8 and allow function components to use state, lifecycle behavior, and other React features without classes. [66][74]

### useState

`useState` adds local state to a component.

```jsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
}
```

### Functional state update

Use the previous state when the next state depends on it.

```jsx
setCount((prevCount) => prevCount + 1);
```

This is safer in asynchronous or batched update scenarios.

### useEffect

`useEffect` handles side effects such as subscriptions, timers, logging, and manual DOM operations.

```jsx
import { useEffect, useState } from "react";

function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(id);
  }, []);

  return <p>Seconds: {seconds}</p>;
}
```

### Important hooks

| Hook               | Purpose                                   |
| ------------------ | ----------------------------------------- |
| `useState`         | Local component state                     |
| `useReducer`       | Complex state transitions                 |
| `useEffect`        | Side effects                              |
| `useLayoutEffect`  | Synchronous DOM measurements before paint |
| `useContext`       | Consume context values                    |
| `useRef`           | Mutable value or DOM reference            |
| `useMemo`          | Cache expensive computed values           |
| `useCallback`      | Cache function references                 |
| `useId`            | Generate stable unique IDs                |
| `useTransition`    | Mark non-urgent state updates             |
| `useDeferredValue` | Defer expensive UI updates                |

Hooks allow state and lifecycle behavior in functional components and help reuse stateful logic across components. [67][71]

### Rules of Hooks

1. Call hooks only at the top level.
2. Do not call hooks inside loops, conditions, or nested functions.
3. Call hooks only from React function components or custom hooks.
4. Use the same hook order in every render.

---

## 7. Virtual DOM, Reconciliation, and Rendering

React uses a **Virtual DOM** strategy to reduce expensive direct browser DOM operations. When state changes, React calculates the minimum required UI update and applies only the necessary changes to the real DOM. [70]

### Rendering flow

```text
State or props change
        ↓
Component re-renders
        ↓
React creates a new virtual UI tree
        ↓
React compares old and new trees
        ↓
React calculates minimal changes
        ↓
React updates the real DOM
```

### Reconciliation

Reconciliation is the process React uses to determine which parts of the UI need updating.

React compares elements using:

- Element type
- Key
- Props
- Component hierarchy

### Example

```jsx
function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>React</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

When `count` changes, React re-renders `App`, compares the new output with the previous output, and updates only the changed text node.

### Important interview point

React does not always update the real DOM immediately after every state update. React may batch multiple state updates and render once for better performance.

---

## 8. Side Effects, Data Fetching, and Lifecycle

A side effect is anything that affects something outside the component render process, such as API calls, subscriptions, timers, localStorage, or direct DOM manipulation.

### Data fetching example

```jsx
import { useEffect, useState } from "react";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isActive = true;

    async function fetchUsers() {
      try {
        setLoading(true);
        const response = await fetch("/api/users");
        const data = await response.json();

        if (isActive) {
          setUsers(data);
        }
      } catch (err) {
        if (isActive) {
          setError(err.message);
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    }

    fetchUsers();

    return () => {
      isActive = false;
    };
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

### useEffect dependency array

| Dependency array               | Behavior                      |
| ------------------------------ | ----------------------------- |
| `useEffect(callback)`          | Runs after every render       |
| `useEffect(callback, [])`      | Runs once after initial mount |
| `useEffect(callback, [value])` | Runs when `value` changes     |

### Cleanup function

Use cleanup to prevent memory leaks and stale updates.

```jsx
useEffect(() => {
  const controller = new AbortController();

  fetch("/api/data", { signal: controller.signal });

  return () => controller.abort();
}, []);
```

### Class component lifecycle mapping

| Class lifecycle        | Hook equivalent                            |
| ---------------------- | ------------------------------------------ |
| `componentDidMount`    | `useEffect(() => {}, [])`                  |
| `componentDidUpdate`   | `useEffect(() => {}, [dependency])`        |
| `componentWillUnmount` | Cleanup function returned from `useEffect` |

---

## 9. Performance Optimization

React is fast by default, but large applications can suffer from unnecessary renders, expensive calculations, large bundles, and poor data-fetching patterns.

### React.memo

Prevents re-rendering a component when its props have not changed.

```jsx
import { memo } from "react";

const UserCard = memo(function UserCard({ name }) {
  return <p>{name}</p>;
});
```

### useMemo

Caches the result of an expensive calculation.

```jsx
import { useMemo } from "react";

function ProductList({ products, query }) {
  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase()),
    );
  }, [products, query]);

  return (
    <ul>
      {filteredProducts.map((product) => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  );
}
```

### useCallback

Caches a function reference between renders.

```jsx
import { useCallback } from "react";

function Parent() {
  const handleClick = useCallback(() => {
    console.log("Clicked");
  }, []);

  return <Child onClick={handleClick} />;
}
```

### Common performance techniques

- Use stable and unique `key` values.
- Avoid creating objects, arrays, and functions inline when passed to memoized children.
- Split large components into smaller components.
- Use code splitting and lazy loading.
- Avoid unnecessary state.
- Keep state as close as possible to the components that need it.
- Use production builds for accurate performance testing.
- Use virtualization for long lists.
- Use Server Components to reduce client JavaScript where appropriate. [65][72]

### Lazy loading example

```jsx
import { lazy, Suspense } from "react";

const Dashboard = lazy(() => import("./Dashboard"));

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Dashboard />
    </Suspense>
  );
}
```

---

## 10. React Router and Application Architecture

React itself does not include routing. Applications commonly use React Router or framework-based routing such as Next.js.

### Basic React Router example

```jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import UserProfile from "./pages/UserProfile";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/users/:id" element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  );
}
```

### Dynamic route

```jsx
import { useParams } from "react-router-dom";

function UserProfile() {
  const { id } = useParams();

  return <h1>User ID: {id}</h1>;
}
```

### Recommended architecture

```text
src/
 ├── app/
 │    ├── routes/
 │    └── layout/
 ├── components/
 │    ├── ui/
 │    └── common/
 ├── features/
 │    ├── auth/
 │    ├── products/
 │    └── orders/
 ├── hooks/
 ├── services/
 ├── utils/
 └── types/
```

### Feature-based architecture benefits

- Better scalability.
- Clear ownership of modules.
- Easier onboarding.
- Reduced coupling between features.
- Easier testing.

---

## 11. Server-Side Rendering, SSR, and Server Components

React supports multiple rendering strategies. Choosing the correct one improves SEO, performance, and user experience.

### Client-Side Rendering, CSR

The browser downloads JavaScript, React builds the UI, and then the page becomes interactive.

```text
Browser requests page
      ↓
HTML shell loads
      ↓
JavaScript bundle downloads
      ↓
React renders UI
      ↓
Page becomes interactive
```

### Server-Side Rendering, SSR

The server generates HTML for each request and sends it to the browser. React then hydrates the page to make it interactive. SSR can improve first paint and SEO. [70][73]

```text
Browser requests page
      ↓
Server renders React components to HTML
      ↓
HTML is sent to browser
      ↓
JavaScript hydrates the page
      ↓
Page becomes interactive
```

### Static Site Generation, SSG

HTML is generated during build time. This is useful for blogs, documentation, marketing pages, and content that does not change frequently.

### React Server Components, RSC

Server Components render ahead of time in a server environment and do not ship their JavaScript to the browser. They can run during build time or per request. [65]

```jsx
// Server Component
async function ProductList() {
  const products = await getProducts();

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  );
}
```

### RSC benefits

- Less client-side JavaScript.
- Direct access to server-only data sources.
- Better default performance.
- Clear separation between server and client logic.

### RSC limitation

Server Components cannot use browser-only features such as `useState`, `useEffect`, event handlers, or direct DOM access. Interactive parts must be Client Components.

---

## 12. State Management at Scale

React state can be divided into different categories.

| State Type          | Example                            | Recommended Tool               |
| ------------------- | ---------------------------------- | ------------------------------ |
| Local UI state      | Modal open, input value            | `useState`                     |
| Server cache state  | API response                       | TanStack Query, SWR, RTK Query |
| Global client state | Theme, authenticated user          | Context, Zustand, Redux        |
| URL state           | Filters, page number, search query | Router state                   |
| Form state          | Field values, validation errors    | React Hook Form, Formik        |
| Complex state logic | Multi-step workflow                | `useReducer`                   |

### Context API

```jsx
import { createContext, useContext, useState } from "react";

const ThemeContext = createContext(null);

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

### useReducer

```jsx
import { useReducer } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      return state;
  }
}

export default function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <>
      <p>{state.count}</p>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
    </>
  );
}
```

### When to avoid Context for everything

Context is not a replacement for all state management. Frequent context updates can cause many consuming components to re-render. For server data, use a caching library; for complex global state, use a dedicated state library.

---

## 13. Testing React Applications

Testing ensures UI behavior remains correct after changes.

### Testing layers

| Type             | Purpose                                 |
| ---------------- | --------------------------------------- |
| Unit test        | Test individual functions or components |
| Integration test | Test component interaction              |
| End-to-end test  | Test complete user flows                |
| Snapshot test    | Detect unexpected UI changes            |

### Example using React Testing Library

```jsx
import { render, screen, fireEvent } from "@testing-library/react";
import Counter from "./Counter";

test("increments counter", () => {
  render(<Counter />);

  fireEvent.click(screen.getByRole("button", { name: /increment/i }));

  expect(screen.getByText(/count: 1/i)).toBeInTheDocument();
});
```

### Testing principles

- Test behavior, not implementation details.
- Query elements the way users interact with them.
- Prefer accessible roles and labels.
- Avoid testing internal state directly.
- Mock only external dependencies such as APIs.

---

## 14. Advantages of React

### Technical advantages

- Component-based architecture improves reuse and maintainability.
- Declarative UI makes code easier to understand.
- Virtual DOM and reconciliation reduce unnecessary DOM updates. [70]
- Hooks simplify stateful logic and side-effect handling. [66]
- Strong ecosystem for routing, state, testing, forms, and SSR.
- Supports modern rendering strategies including SSR and Server Components. [65]
- Large developer community and hiring market.
- React Native enables mobile development using similar concepts.
- Suitable for small apps as well as enterprise-scale products.

### Business advantages

- Faster development cycles.
- Lower long-term maintenance cost.
- Easier team collaboration.
- Strong availability of skilled developers.
- Mature third-party integrations.
- Good performance for interactive applications.

---

## 15. Disadvantages and Limitations of React

React is powerful, but it is not a complete solution by itself.

| Limitation                   | Explanation                                                                  |
| ---------------------------- | ---------------------------------------------------------------------------- |
| Not a full framework         | Routing, data fetching, forms, and global state require additional libraries |
| Fast-changing ecosystem      | Developers must keep up with evolving patterns and tools                     |
| JSX learning curve           | Beginners may find JSX, props, state, and rendering confusing                |
| Too much flexibility         | Poor architecture decisions can create inconsistent codebases                |
| SEO challenges in CSR        | Plain client-side rendering may require SSR or SSG for better SEO            |
| Bundle size risk             | Too many third-party libraries can increase JavaScript bundle size           |
| Boilerplate in large apps    | Complex state and API layers may require additional structure                |
| Performance misuse           | Unnecessary renders and poor memoization can reduce performance              |
| Hook misuse                  | Incorrect dependency arrays can cause bugs, stale data, or infinite loops    |
| Server Components complexity | RSC introduces a new mental model and server/client boundary rules           |

React’s component-rich ecosystem can take time to fully understand, and developers must make deliberate architectural decisions because React itself is intentionally unopinionated. [70]

---

## 16. Most Important Interview Questions

### 1. What is React?

React is a JavaScript library for building user interfaces using reusable, component-based architecture. It uses declarative rendering, meaning developers describe UI based on current state, and React updates the DOM efficiently. [63]

### 2. What is the difference between React and Angular?

| Feature          | React                   | Angular                             |
| ---------------- | ----------------------- | ----------------------------------- |
| Type             | Library                 | Full framework                      |
| Language         | JavaScript / TypeScript | TypeScript                          |
| Rendering        | Virtual DOM             | Real DOM with change detection      |
| Routing          | External library        | Built-in                            |
| State management | Flexible                | Built-in services and RxJS patterns |
| Learning curve   | Moderate                | Higher                              |
| Flexibility      | High                    | More opinionated                    |

### 3. What is JSX?

JSX is a syntax extension that lets developers write HTML-like markup inside JavaScript. It is compiled into JavaScript function calls and is not required to use React, though it is the standard approach.

### 4. What is the Virtual DOM?

The Virtual DOM is a lightweight in-memory representation of the real DOM. When state changes, React compares the new virtual tree with the previous one and updates only the required parts of the real DOM. [70]

### 5. What is reconciliation?

Reconciliation is React’s process of comparing the previous UI tree with the new UI tree and determining the minimum set of DOM updates required.

### 6. What are props?

Props are read-only inputs passed from a parent component to a child component. They allow components to be reusable and configurable.

### 7. What is state?

State is internal data managed by a component. When state changes, React re-renders the component and updates the UI.

### 8. What is the difference between state and props?

| Props                  | State                          |
| ---------------------- | ------------------------------ |
| Passed from parent     | Managed inside component       |
| Read-only              | Can be updated                 |
| Used for configuration | Used for dynamic data          |
| Immutable in child     | Updated using setter functions |

### 9. What are Hooks?

Hooks are functions that let function components use React features such as state, lifecycle behavior, context, refs, and memoization. [64][66]

### 10. What is `useState`?

`useState` adds local state to a function component.

```jsx
const [value, setValue] = useState(initialValue);
```

### 11. What is `useEffect`?

`useEffect` handles side effects after render, such as data fetching, subscriptions, timers, and manual DOM operations.

### 12. What is the dependency array in `useEffect`?

The dependency array tells React when to re-run the effect.

```jsx
useEffect(() => {
  // runs when userId changes
}, [userId]);
```

### 13. What is the difference between `useEffect` and `useLayoutEffect`?

| `useEffect`                                  | `useLayoutEffect`                                |
| -------------------------------------------- | ------------------------------------------------ |
| Runs asynchronously after paint              | Runs synchronously before browser paint          |
| Suitable for data fetching and subscriptions | Suitable for DOM measurements and layout changes |
| Preferred in most cases                      | Use only when necessary                          |

### 14. What is `useRef`?

`useRef` creates a mutable reference that persists across renders. It is commonly used for DOM access or storing values without triggering a re-render.

```jsx
const inputRef = useRef(null);
```

### 15. What is `useMemo`?

`useMemo` caches the result of an expensive calculation and recalculates it only when dependencies change.

### 16. What is `useCallback`?

`useCallback` caches a function reference between renders. It is useful when passing callbacks to memoized child components.

### 17. What are keys in React?

Keys are unique identifiers given to elements in a list. They help React identify items during reconciliation and avoid unnecessary DOM operations.

### 18. What is controlled and uncontrolled component?

A controlled component gets its value from React state, while an uncontrolled component stores its value in the DOM and is accessed using a ref. [73]

### 19. What is lifting state up?

Lifting state up means moving shared state to the closest common parent component so multiple child components can access and update it.

### 20. What is prop drilling?

Prop drilling occurs when props are passed through multiple intermediate components that do not need them. Context, composition, or state management libraries can reduce it.

### 21. What is Context API?

Context provides a way to share data across the component tree without manually passing props through every level.

### 22. What is React Fragment?

A Fragment groups multiple elements without adding an extra node to the DOM.

```jsx
<>
  <h1>Title</h1>
  <p>Description</p>
</>
```

### 23. What is conditional rendering?

Conditional rendering displays different UI based on conditions.

```jsx
{
  isLoggedIn ? <Dashboard /> : <Login />;
}
```

### 24. What is the difference between element and component?

An element is a plain object describing UI, while a component is a function or class that returns elements.

### 25. What is React StrictMode?

StrictMode is a development tool that highlights potential problems in an application. It may invoke some functions twice in development to help detect unsafe side effects.

---

## 17. Senior-Level Interview Questions

### 1. How does React batching work?

React can group multiple state updates into a single render cycle to avoid unnecessary DOM operations. This improves performance, especially when multiple updates occur inside event handlers or asynchronous functions.

### 2. When should you use `useMemo` and `useCallback`?

Use them only when there is a measurable performance issue or when reference stability is required.

- Use `useMemo` for expensive calculations.
- Use `useCallback` when a stable function reference prevents child re-renders.
- Do not apply them blindly to every variable or function.

### 3. Why can `useEffect` cause infinite loops?

An infinite loop can occur when an effect updates state that is also listed in its dependency array.

```jsx
useEffect(() => {
  setCount(count + 1);
}, [count]);
```

Each update changes `count`, which triggers the effect again.

### 4. What is stale closure?

A stale closure occurs when a callback captures an old value from a previous render.

```jsx
useEffect(() => {
  const id = setInterval(() => {
    setCount(count + 1);
  }, 1000);

  return () => clearInterval(id);
}, []);
```

Fix:

```jsx
setCount((prev) => prev + 1);
```

### 5. What is hydration?

Hydration is the process where React attaches event listeners and makes server-rendered HTML interactive on the client.

### 6. What is the difference between SSR and React Server Components?

| SSR                                        | React Server Components                                      |
| ------------------------------------------ | ------------------------------------------------------------ |
| Renders HTML on the server                 | Renders components in a server environment                   |
| JavaScript is sent to client for hydration | Server Component JavaScript is not shipped to client         |
| Entire page is hydrated                    | Client Components handle interactivity                       |
| Useful for SEO and first paint             | Useful for reducing client bundle and data-fetching overhead |

React Server Components run before bundling in a separate server environment and may execute at build time or per request. [65]

### 7. How do you prevent unnecessary re-renders?

- Use `React.memo` for pure components.
- Use `useMemo` for expensive derived data.
- Use `useCallback` for stable function references.
- Move state closer to where it is used.
- Avoid inline object and function creation where it causes re-renders.
- Split large components.
- Use proper keys in lists.
- Use Context carefully.

### 8. What is code splitting?

Code splitting divides JavaScript into smaller bundles that are loaded only when required. This reduces initial load time.

```jsx
const AdminPanel = lazy(() => import("./AdminPanel"));
```

### 9. What is error boundary?

An error boundary is a component that catches JavaScript errors in its child component tree and displays a fallback UI instead of crashing the whole application.

### 10. How would you architect a large React application?

Use feature-based folders, separate UI components from business logic, centralize API services, use typed contracts, apply route-level code splitting, use server caching for API data, and establish clear state ownership rules.

---

## 18. Best Practices

- Use function components and Hooks.
- Keep components small and focused.
- Use meaningful component and variable names.
- Avoid deeply nested components.
- Use composition instead of inheritance.
- Keep business logic separate from UI components.
- Use custom hooks for reusable logic.
- Use stable keys for lists.
- Handle loading, error, empty, and success states.
- Avoid storing derived data in state.
- Use TypeScript for large applications.
- Use lazy loading for heavy routes and components.
- Use server caching libraries for API data.
- Do not overuse Context, Redux, `useMemo`, or `useCallback`.
- Write tests for critical user flows.
- Use production builds for performance measurement.

---

## Summary

React is popular because it provides a practical, scalable, and flexible way to build modern user interfaces. Its component model, declarative rendering, Hooks, Virtual DOM strategy, and ecosystem make it suitable for everything from small dashboards to enterprise SaaS platforms. [63][64][70]

However, React is not a complete framework. Teams must choose and integrate tools for routing, data fetching, forms, and global state. The best React developers understand not only syntax, but also rendering behavior, state ownership, performance trade-offs, and modern server rendering patterns.
