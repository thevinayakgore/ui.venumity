## Lesson 1: What Is Next.js ?

Next.js is a full-stack React framework created by Vercel. It helps developers build websites and web applications that are fast, scalable, searchable, and easy to deploy.

React handles the user interface, while Next.js handles application-level concerns such as:

- Routing
- Server-side rendering
- Static generation
- Data fetching
- Caching
- API routes
- Image and font optimization
- Code splitting
- SEO metadata
- Deployment configuration

### React vs Next.js

| Feature | React | Next.js |
|---|---|---|
| Type | JavaScript UI library | React framework |
| Routing | Requires React Router or another library | Built-in file-system routing |
| Rendering | Mostly client-side by default | CSR, SSR, SSG, ISR, and streaming |
| SEO | Requires additional setup | Strong built-in support |
| API layer | Requires separate backend or custom setup | Route Handlers and Server Actions |
| Image optimization | Manual | Built-in `next/image` |
| Deployment | Manual configuration often required | Optimized for Vercel and many platforms |
| Full-stack capability | Limited by default | Built-in server capabilities |

### Simple example

```jsx
// app/page.jsx

export default function HomePage() {
  return (
    <main>
      <h1>Welcome to Next.js</h1>
      <p>Build modern full-stack React applications.</p>
    </main>
  );
}
```

In the App Router, files inside the `app` directory automatically become routes.

---

## Lesson 2: Why Next.js Is Important in the IT Industry

Next.js is popular because it solves common production problems that plain React applications often face: SEO, initial loading performance, routing, server data access, caching, and deployment complexity.

### Main reasons companies use Next.js

1. **Better SEO:** Server-rendered HTML helps search engines understand page content.
2. **Faster first paint:** HTML can be generated on the server before JavaScript fully loads.
3. **Built-in routing:** Developers do not need to configure routing manually.
4. **Flexible rendering:** Each route can use static generation, server rendering, or client rendering.
5. **Performance optimization:** Next.js optimizes images, fonts, scripts, and bundles.
6. **Full-stack development:** Developers can build frontend and backend logic in one project.
7. **React Server Components:** Server Components reduce the JavaScript sent to the browser. [91][97]
8. **Strong developer experience:** File-based routing, fast refresh, TypeScript support, and built-in conventions improve productivity.
9. **Enterprise readiness:** Suitable for marketing sites, SaaS products, dashboards, e-commerce platforms, and content-heavy applications.

### Common real-world use cases

| Use Case | Why Next.js Fits |
|---|---|
| Marketing website | Static generation and SEO |
| E-commerce store | Product pages, ISR, SEO, fast navigation |
| SaaS dashboard | Authentication, server data, client interactivity |
| Blog or documentation site | Static content and fast page loads |
| AI product | Streaming UI, server actions, API integration |
| Enterprise application | Scalable routing, caching, and team-based architecture |

---

## Lesson 3: Next.js Project Structure

A modern Next.js project using the App Router commonly looks like this:

```text
my-app/
 ├── app/
 │   ├── layout.jsx
 │   ├── page.jsx
 │   ├── globals.css
 │   ├── about/
 │   │   └── page.jsx
 │   ├── blog/
 │   │   ├── page.jsx
 │   │   └── [slug]/
 │   │       └── page.jsx
 │   └── dashboard/
 │       ├── layout.jsx
 │       └── page.jsx
 ├── components/
 ├── lib/
 ├── public/
 ├── next.config.js
 ├── package.json
 └── tsconfig.json
```

### Important folders and files

| Path | Purpose |
|---|---|
| `app/` | Contains routes, layouts, pages, and special files |
| `app/layout.jsx` | Root layout shared across the application |
| `app/page.jsx` | Home page route |
| `app/about/page.jsx` | `/about` route |
| `app/blog/[slug]/page.jsx` | Dynamic blog route |
| `components/` | Reusable UI components |
| `lib/` | Utilities, database clients, and helper functions |
| `public/` | Static assets such as images and icons |
| `next.config.js` | Next.js configuration |

---

## Lesson 4: App Router and File-Based Routing

The App Router is Next.js’s modern routing system. It uses folders to define URL segments and special files to define UI behavior.

Next.js’s App Router is file-system based and uses React features such as Server Components, Suspense, and Server Functions. [88]

### Basic routing

```text
app/
 ├── page.jsx          → /
 ├── about/page.jsx    → /about
 ├── contact/page.jsx  → /contact
```

### Dynamic routes

```text
app/blog/[slug]/page.jsx → /blog/my-first-post
```

```jsx
// app/blog/[slug]/page.jsx

export default async function BlogPost({ params }) {
  const { slug } = await params;

  return <h1>Blog post: {slug}</h1>;
}
```

### Nested routes

```text
app/dashboard/
 ├── layout.jsx
 ├── page.jsx              → /dashboard
 ├── settings/page.jsx     → /dashboard/settings
 └── analytics/page.jsx    → /dashboard/analytics
```

### Route groups

Route groups organize routes without affecting the URL.

```text
app/
 ├── (marketing)/
 │   ├── about/page.jsx
 │   └── pricing/page.jsx
 └── (dashboard)/
     ├── dashboard/page.jsx
     └── settings/page.jsx
```

Here, `(marketing)` and `(dashboard)` do not appear in the URL.

---

## Lesson 5: Layouts, Pages, and Special Files

The App Router provides special file conventions.

| File | Purpose |
|---|---|
| `layout.jsx` | Shared UI wrapper for a route and its children |
| `page.jsx` | Unique UI for a route |
| `loading.jsx` | Instant loading UI while route content loads |
| `error.jsx` | Error UI for a route segment |
| `not-found.jsx` | UI shown when a route is not found |
| `template.jsx` | Layout that re-mounts on navigation |
| `route.js` | API Route Handler |
| `global-error.jsx` | Global error boundary |

### Root layout

```jsx
// app/layout.jsx

export const metadata = {
  title: "My Next.js App",
  description: "A modern Next.js application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header>Header</header>
        {children}
        <footer>Footer</footer>
      </body>
    </html>
  );
}
```

### Page

```jsx
// app/about/page.jsx

export default function AboutPage() {
  return <h1>About Us</h1>;
}
```

### Loading UI

```jsx
// app/dashboard/loading.jsx

export default function Loading() {
  return <p>Loading dashboard...</p>;
}
```

### Error UI

```jsx
// app/dashboard/error.jsx

"use client";

export default function Error({ error, reset }) {
  return (
    <div>
      <h2>Something went wrong</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
```

---

## Lesson 6: Server Components and Client Components

In the App Router, components are **Server Components by default**. They run on the server and do not send their JavaScript to the browser. [91][97]

### Server Component

```jsx
// app/products/page.jsx

async function getProducts() {
  const response = await fetch("[https://api.example.com/products](https://api.example.com/products)");
  return response.json();
}

export default async function ProductsPage() {
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

### Benefits of Server Components

- Less client-side JavaScript.
- Direct access to databases, file systems, and internal services.
- Sensitive keys and secrets remain on the server.
- Better performance for data-heavy pages.
- Support for streaming and Suspense. [91][95]

### Client Component

Use `"use client"` when a component needs browser interactivity.

```jsx
// components/Counter.jsx

"use client";

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
```

### When to use Client Components

Use Client Components when you need:

- `useState`
- `useEffect`
- Event handlers such as `onClick`
- Browser APIs such as `localStorage`
- Third-party client-side libraries
- Real-time UI updates

### Server and Client boundary

A Server Component can render a Client Component, but a Client Component cannot directly import and render a Server Component.

```jsx
// Server Component
import Counter from "@/components/Counter";

export default function Page() {
  return (
    <div>
      <h1>Product Page</h1>
      <Counter />
    </div>
  );
}
```

---

## Lesson 7: Data Fetching in Next.js

In the App Router, Server Components can fetch data directly using `async/await`.

```jsx
// app/users/page.jsx

async function getUsers() {
  const response = await fetch("[https://jsonplaceholder.typicode.com/users](https://jsonplaceholder.typicode.com/users)");
  
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  return response.json();
}

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

### Fetching in parallel

```jsx
export default async function Dashboard() {
  const [usersRes, ordersRes] = await Promise.all([
    fetch("[https://api.example.com/users](https://api.example.com/users)"),
    fetch("[https://api.example.com/orders](https://api.example.com/orders)"),
  ]);

  const users = await usersRes.json();
  const orders = await ordersRes.json();

  return (
    <div>
      <p>Users: {users.length}</p>
      <p>Orders: {orders.length}</p>
    </div>
  );
}
```

### Database access

Server Components can query a database directly.

```jsx
import { db } from "@/lib/db";

export default async function PostsPage() {
  const posts = await db.post.findMany();

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
```

This avoids exposing database credentials to the browser because the code runs only on the server. [93][97]

---

## Lesson 8: Rendering Strategies

Next.js supports multiple rendering strategies. Choosing the right strategy improves performance, SEO, and user experience.

### Client-Side Rendering, CSR

The browser downloads JavaScript, then React renders the UI.

```text
Request page
   ↓
Download HTML shell
   ↓
Download JavaScript
   ↓
Render UI in browser
```

Best for highly interactive dashboards where SEO is not critical.

### Server-Side Rendering, SSR

The server renders HTML for every request.

```jsx
export const dynamic = "force-dynamic";

export default async function Page() {
  const data = await fetch("[https://api.example.com/live-data](https://api.example.com/live-data)", {
    cache: "no-store",
  }).then((res) => res.json());

  return <h1>{data.message}</h1>;
}
```

Best for personalized, frequently changing, or request-specific data.

### Static Site Generation, SSG

HTML is generated at build time.

```jsx
export default async function BlogPage() {
  const posts = await fetch("[https://api.example.com/posts](https://api.example.com/posts)").then((res) =>
    res.json()
  );

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
```

Best for blogs, documentation, landing pages, and content that rarely changes.

### Incremental Static Regeneration, ISR

Static pages are regenerated after a configured time interval.

```jsx
export const revalidate = 60;

export default async function ProductsPage() {
  const products = await fetch("[https://api.example.com/products](https://api.example.com/products)").then((res) =>
    res.json()
  );

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  );
}
```

This page is static but refreshes at most once every 60 seconds.

### Rendering comparison

| Strategy | When HTML Is Generated | Best For |
|---|---|---|
| CSR | In the browser | Highly interactive apps |
| SSR | On every request | Personalized or real-time data |
| SSG | During build | Blogs, docs, marketing pages |
| ISR | At build, then revalidated | Product pages, CMS content |

SSG builds HTML at build time, SSR renders on every request, ISR refreshes static HTML after a revalidation period, and CSR renders in the browser after JavaScript loads. [92]

---

## Lesson 9: Caching in Next.js

Caching stores the result of data fetching or computation so future requests can be served faster without repeating the work. [89]

### Fetch caching

```jsx
const data = await fetch("[https://api.example.com/products](https://api.example.com/products)", {
  next: {
    revalidate: 3600,
  },
});
```

This caches the response for one hour.

### No caching

```jsx
const data = await fetch("[https://api.example.com/user](https://api.example.com/user)", {
  cache: "no-store",
});
```

Use this for personalized or frequently changing data.

### Tag-based revalidation

```jsx
const data = await fetch("[https://api.example.com/products](https://api.example.com/products)", {
  next: {
    tags: ["products"],
  },
});
```

```js
import { revalidateTag } from "next/cache";

export async function POST() {
  revalidateTag("products");

  return Response.json({ revalidated: true });
}
```

### Path-based revalidation

```js
import { revalidatePath } from "next/cache";

export async function POST() {
  revalidatePath("/products");

  return Response.json({ revalidated: true });
}
```

### Important caching layers

| Cache | Purpose |
|---|---|
| Request memoization | Deduplicates identical fetch calls within one request |
| Data cache | Stores fetched data across requests |
| Full route cache | Stores rendered route output |
| Router cache | Stores visited route payloads in the browser |

Next.js provides caching mechanisms to avoid repeating expensive data-fetching and rendering work. [89][99]

---

## Lesson 10: Metadata and SEO

Next.js allows developers to define metadata directly in layouts and pages.

### Static metadata

```jsx
// app/about/page.jsx

export const metadata = {
  title: "About Us",
  description: "Learn more about our company and mission.",
};
```

### Dynamic metadata

```jsx
// app/blog/[slug]/page.jsx

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const post = await getPostBySlug(slug);

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
    },
  };
}
```

### SEO benefits

- Server-rendered HTML improves crawlability.
- Metadata improves search result presentation.
- Open Graph tags improve social sharing.
- Semantic HTML improves accessibility.
- Fast page loads improve user experience and ranking potential.

---

## Lesson 11: Images, Fonts, and Optimization

Next.js includes built-in optimization for images, fonts, and scripts.

### Image optimization

```jsx
import Image from "next/image";

export default function Profile() {
  return (
    <Image
      src="/profile.jpg"
      alt="User profile"
      width={500}
      height={500}
      priority
    />
  );
}
```

### Benefits of `next/image`

- Automatic responsive image generation.
- Lazy loading by default.
- Prevents layout shift through width and height.
- Optimizes modern image formats.
- Supports remote images with configuration.

### Remote images

```js
// next.config.js

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.example.com",
      },
    ],
  },
};
```

### Font optimization

```jsx
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body>{children}</body>
    </html>
  );
}
```

---

## Lesson 12: API Routes and Route Handlers

Next.js lets you create backend endpoints using Route Handlers.

```js
// app/api/users/route.js

import { NextResponse } from "next/server";

export async function GET() {
  const users = [
    { id: 1, name: "Aman" },
    { id: 2, name: "Riya" },
  ];

  return NextResponse.json(users);
}

export async function POST(request) {
  const body = await request.json();

  return NextResponse.json(
    {
      message: "User created",
      user: body,
    },
    {
      status: 201,
    }
  );
}
```

### Dynamic API route

```js
// app/api/users/[id]/route.js

export async function GET(request, { params }) {
  const { id } = await params;

  return NextResponse.json({
    message: `User ID: ${id}`,
  });
}
```

### When to use Route Handlers

Use Route Handlers when you need:

- A public API endpoint.
- Webhooks.
- Third-party API integration.
- Authentication callbacks.
- File uploads.
- Server-side processing.

For internal mutations from React components, Server Actions are often simpler.

---

## Lesson 13: Server Actions and Mutations

Server Actions allow Server Components to call server-side functions directly without manually creating API endpoints.

```jsx
// app/actions.js

"use server";

import { db } from "@/lib/db";

export async function createUser(formData) {
  const name = formData.get("name");
  const email = formData.get("email");

  await db.user.create({
    data: {
      name,
      email,
    },
  });
}
```

```jsx
// app/new-user/page.jsx

import { createUser } from "@/app/actions";

export default function NewUserPage() {
  return (
    <form action={createUser}>
      <input name="name" placeholder="Name" required />
      <input name="email" type="email" placeholder="Email" required />
      <button type="submit">Create User</button>
    </form>
  );
}
```

### Benefits

- No manual API endpoint required.
- Type-safe when using TypeScript.
- Works well with forms.
- Keeps sensitive logic on the server.
- Reduces client-side boilerplate.

---

## Lesson 14: Streaming and Suspense

Streaming allows the server to send parts of the UI as soon as they are ready instead of waiting for the entire page to render.

```jsx
import { Suspense } from "react";

async function RecentOrders() {
  const orders = await fetch("[https://api.example.com/orders](https://api.example.com/orders)").then((res) =>
    res.json()
  );

  return (
    <ul>
      {orders.map((order) => (
        <li key={order.id}>{order.title}</li>
      ))}
    </ul>
  );
}

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>

      <Suspense fallback={<p>Loading orders...</p>}>
        <RecentOrders />
      </Suspense>
    </div>
  );
}
```

### Benefits

- Users see static content immediately.
- Slow data sections load independently.
- Improves perceived performance.
- Works naturally with Server Components.

The App Router supports streaming through React Suspense and can progressively send UI to the browser. [88][95]

---

## Lesson 15: Authentication and Middleware

Next.js commonly uses middleware to protect routes, redirect users, add headers, or run logic before a request completes.

```js
// middleware.js

import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("token");

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
```

### Authentication patterns

| Pattern | Use Case |
|---|---|
| Session cookies | Traditional web applications |
| JWT tokens | APIs and mobile clients |
| OAuth | Google, GitHub, and social login |
| Auth libraries | NextAuth, Clerk, Supabase Auth, Firebase Auth |

### Best practices

- Store sensitive tokens in secure, HTTP-only cookies.
- Never expose secret keys to Client Components.
- Validate authentication on the server, not only in the UI.
- Protect both pages and API routes.
- Use role-based access control for sensitive operations.

---

## Lesson 16: Performance Optimization

Next.js includes many performance features, but developers still need to use them correctly.

### Key optimization techniques

- Use Server Components by default.
- Use Client Components only for interactivity.
- Use `next/image` instead of plain `<img>`.
- Use `next/font` instead of external font links.
- Use dynamic imports for heavy components.
- Use ISR or caching for stable content.
- Avoid fetching unnecessary data.
- Use streaming for slow data sections.
- Use proper cache invalidation.
- Avoid large client-side libraries.
- Use production builds for performance testing.

### Dynamic import

```jsx
import dynamic from "next/dynamic";

const HeavyChart = dynamic(() => import("@/components/HeavyChart"), {
  loading: () => <p>Loading chart...</p>,
});

export default function Analytics() {
  return <HeavyChart />;
}
```

### Avoid common mistakes

- Marking every component as `"use client"`.
- Fetching the same data repeatedly without caching.
- Passing large objects from Server Components to Client Components.
- Using client-side state for server data.
- Ignoring loading and error states.
- Adding too many third-party scripts.

Server Components can reduce client JavaScript because their code stays on the server, while Client Components should be used only where interactivity is required. [91][97]

---

## Lesson 17: Deployment

Next.js applications can be deployed to Vercel, AWS, Netlify, Docker-based environments, and traditional Node.js servers.

### Build and start

```bash
npm run build
npm start
```

### Environment variables

Create a `.env.local` file:

```env
DATABASE_URL=your_database_url
API_SECRET=your_secret_key
NEXT_PUBLIC_API_URL=[https://api.example.com](https://api.example.com)
```

### Environment variable rules

| Prefix | Availability |
|---|---|
| No prefix | Server-only |
| `NEXT_PUBLIC_` | Available in browser and server |

Never put secret keys in variables prefixed with `NEXT_PUBLIC_`.

---

## Lesson 18: Advantages of Next.js

### Technical advantages

- Built-in file-system routing.
- Supports SSR, SSG, ISR, CSR, and streaming.
- Server Components reduce client JavaScript.
- Built-in SEO and metadata support.
- Optimized images and fonts.
- API Routes and Server Actions enable full-stack development.
- Built-in caching and revalidation.
- Excellent developer experience.
- TypeScript support.
- Strong deployment ecosystem.

### Business advantages

- Faster time to market.
- Better SEO and discoverability.
- Improved performance and conversion potential.
- Lower infrastructure complexity.
- Suitable for small teams and large enterprises.
- Strong community and ecosystem.

---

## Lesson 19: Disadvantages and Limitations

Next.js is powerful, but it is not always the right choice.

| Limitation | Explanation |
|---|---|
| More complexity than plain React | Developers must understand rendering, caching, and server/client boundaries |
| Framework lock-in concerns | Some patterns are specific to Next.js |
| Learning curve | App Router, Server Components, and caching can confuse beginners |
| Caching complexity | Incorrect caching can cause stale data or unexpected behavior |
| Not ideal for every app | Simple internal tools may not need SSR or advanced rendering |
| Hosting considerations | Some features require Node.js-compatible hosting |
| Debugging complexity | Server and client code boundaries require careful architecture |
| Frequent evolution | New conventions and caching models require continuous learning |

### When not to use Next.js

Consider plain React, Vite, or another approach when:

- You are building a simple single-page internal tool.
- SEO is completely irrelevant.
- You do not need server rendering.
- Your team is new to React.
- You need a highly custom architecture that conflicts with framework conventions.

---

## Lesson 20: Most Important Interview Questions

### 1. What is Next.js?

Next.js is a React framework that provides routing, server rendering, static generation, API routes, caching, image optimization, and deployment tooling for building production-ready web applications.

### 2. What is the difference between React and Next.js?

React is a UI library, while Next.js is a full-stack React framework. React focuses on building components and UI; Next.js adds routing, rendering strategies, server capabilities, optimization, and deployment conventions.

### 3. What is the App Router?

The App Router is Next.js’s modern file-system-based routing system. It uses the `app` directory and supports Server Components, nested layouts, loading states, error boundaries, streaming, and Server Functions. [88]

### 4. What is the difference between the Pages Router and App Router?

| Pages Router | App Router |
|---|---|
| Uses `pages/` directory | Uses `app/` directory |
| Data fetching through `getServerSideProps`, `getStaticProps` | Data fetching in async Server Components |
| Client Components are default | Server Components are default |
| Layout support is limited | Nested layouts are first-class |
| No native streaming model | Supports streaming and Suspense |

### 5. What is a Server Component?

A Server Component runs only on the server. It can access databases, file systems, and secrets directly, and its JavaScript is not shipped to the browser. [91][93]

### 6. What is a Client Component?

A Client Component runs in the browser and can use React state, effects, event handlers, and browser APIs. It is created using the `"use client"` directive.

### 7. When should you use `"use client"`?

Use `"use client"` only when a component needs interactivity, such as `useState`, `useEffect`, `onClick`, browser APIs, or client-side libraries.

### 8. What is SSR?

Server-Side Rendering generates HTML on the server for every request. It is useful for personalized pages and frequently changing data.

### 9. What is SSG?

Static Site Generation creates HTML during the build process. It is useful for blogs, documentation, and marketing pages.

### 10. What is ISR?

Incremental Static Regeneration allows static pages to be regenerated after a specified revalidation period.

```jsx
export const revalidate = 60;
```

### 11. What is the difference between SSR and SSG?

| SSR | SSG |
|---|---|
| HTML generated per request | HTML generated at build time |
| Good for dynamic data | Good for static content |
| Higher server load | Lower runtime server load |
| Always fresh data | Fresh only after rebuild or revalidation |

### 12. What is hydration?

Hydration is the process where React attaches interactivity to server-rendered HTML in the browser.

### 13. What is streaming?

Streaming sends UI to the browser progressively as data becomes available, instead of waiting for the entire page to render.

### 14. What is Suspense used for in Next.js?

Suspense displays a fallback UI while a Server Component or async data-fetching section is loading.

### 15. What are dynamic routes?

Dynamic routes use URL parameters. For example, `app/blog/[slug]/page.jsx` handles URLs such as `/blog/react-guide`.

### 16. What is middleware in Next.js?

Middleware runs before a request is completed. It is commonly used for authentication, redirects, headers, and access control.

### 17. What are Route Handlers?

Route Handlers are backend API endpoints defined in files such as `app/api/users/route.js`.

### 18. What are Server Actions?

Server Actions are server-side functions that can be called directly from React components, especially for form submissions and mutations.

### 19. What is caching in Next.js?

Caching stores fetched data or rendered output so subsequent requests can be served faster without repeating the same work. [89]

### 20. What is `revalidatePath`?

`revalidatePath` invalidates the cached output of a specific route so the next request can render fresh content.

### 21. What is `revalidateTag`?

`revalidateTag` invalidates cached data associated with a specific cache tag.

### 22. What is `next/image`?

`next/image` is Next.js’s built-in image component. It optimizes images, supports responsive sizes, lazy loading, and layout-shift prevention.

### 23. What is `next/font`?

`next/font` optimizes font loading by self-hosting fonts and reducing layout shift.

### 24. What is prefetching?

Prefetching is a Next.js optimization where route data or payloads are fetched in advance when a link enters the viewport, improving client-side navigation speed. [88]

### 25. What is the difference between `getServerSideProps` and Server Components?

`getServerSideProps` belongs to the Pages Router and fetches data before rendering a page. In the App Router, Server Components can fetch data directly using `async/await`.

---

## Lesson 21: Senior-Level Interview Questions

### 1. How does Next.js decide whether a route is static or dynamic?

Next.js analyzes the route’s data-fetching behavior, dynamic APIs, cookies, headers, search parameters, and caching configuration. Routes using dynamic functions or uncached request-specific data are treated as dynamic.

### 2. What happens when a user navigates between App Router pages?

Next.js performs client-side navigation, fetches the required RSC payload, updates the route segment, preserves shared layouts, and hydrates only the necessary Client Components.

### 3. Why can Server Components improve performance?

They reduce client-side JavaScript because their code runs only on the server. They can also access data sources directly and avoid extra client-server API round trips. [91][97]

### 4. What is the difference between request memoization and data caching?

Request memoization prevents duplicate identical fetch calls within the same server request. Data caching stores fetch results across multiple requests until revalidated.

### 5. How would you handle authentication in Next.js?

Use secure HTTP-only cookies, validate sessions in middleware and Server Components, protect both pages and Route Handlers, and never expose secrets to Client Components.

### 6. How would you optimize a slow Next.js page?

Identify slow data fetches, use parallel requests, stream independent sections with Suspense, cache stable data, reduce Client Components, optimize images and fonts, and split heavy client-side bundles.

### 7. What is Partial Prerendering?

Partial Prerendering serves a fast static shell immediately and streams dynamic content into the page as it becomes available.

### 8. What is the difference between `cache: "no-store"` and `next: { revalidate: 60 }`?

`cache: "no-store"` fetches fresh data on every request. `next: { revalidate: 60 }` caches the response and refreshes it after 60 seconds.

### 9. How do Server Actions differ from API Routes?

Server Actions are called directly from React components and are ideal for mutations. Route Handlers expose HTTP endpoints and are better for public APIs, webhooks, and third-party integrations.

### 10. How would you structure a large Next.js application?

Use feature-based folders, separate Server Components from Client Components, centralize database and API clients, use reusable UI components, apply route-level code splitting, and define clear caching and data-fetching rules.

---

## Summary

Next.js is one of the most important frameworks in modern web development because it turns React into a production-ready full-stack application platform. It provides routing, server rendering, caching, streaming, SEO support, image optimization, API routes, and Server Components in a single framework. [88][89]

For beginners, the most important concepts are the App Router, Server and Client Components, rendering strategies, data fetching, caching, and deployment. For interviews, focus on SSR, SSG, ISR, hydration, streaming, Server Components, Server Actions, Route Handlers, and performance optimization.

This content is provided for learning purposes only. While we aim to keep it accurate and up to date, technologies evolve quickly. Please refer to the official Next.js documentation for the latest guidance.