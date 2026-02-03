# Introduction to Next.js

Next.js is a React framework that enables server-side rendering, static site generation, and API routes out of the box.

### Key Features

- Server-Side Rendering (SSR)
- Static Site Generation (SSG)
- API Routes
- File-based routing
- Built-in CSS and Sass support
- Image optimization

---

## Getting Started

### Installation

```bash
npx create-next-app@latest my-app
cd my-app
npm run dev
```

**Project Structure**

```
my-app/
├── app/              # App Router (Next.js 13+)
│   ├── layout.js
│   ├── page.js
│   └── api/
├── pages/            # Pages Router (legacy)
├── public/           # Static files
├── components/       # React components
└── package.json
```

---

## Core Concepts

### 1. Routing System

**App Router (Next.js 13+)**

```jsx
// app/page.js - Home page
export default function Home() {
  return <h1>Home Page</h1>;
}

// app/about/page.js - About page
export default function About() {
  return <h1>About Us</h1>;
}
```

**Dynamic Routes**

```jsx
// app/blog/[id]/page.js
export default function BlogPost({ params }) {
  return <h1>Blog Post : {params.id}</h1>;
}
```

**Navigation**

```jsx
import Link from "next/link";

export default function Nav() {
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      <Link href="/blog/123">Blog Post</Link>
    </nav>
  );
}
```

---

### 2. Data Fetching

**Server Components**

```jsx
// app/page.js - Server Component by default
async function getData() {
  const res = await fetch("https://api.example.com/data");
  return res.json();
}

export default async function Page() {
  const data = await getData();
  return <div>{data.name}</div>;
}
```

**Client Components**

```jsx
"use client";

import { useEffect, useState } from "react";

export default function ClientComponent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/data")
      .then((res) => res.json())
      .then(setData);
  }, []);

  return <div>{data?.name}</div>;
}
```

---

### 3. API Routes

**Create API endpoint**

```jsx
// app/api/users/route.js
export async function GET(request) {
  const users = [
    { id: 1, name: "John" },
    { id: 2, name: "Jane" },
  ];

  return Response.json(users);
}

export async function POST(request) {
  const body = await request.json();
  // Process data
  return Response.json({ success: true });
}
```

---

### 4. Rendering Strategies

**Static Site Generation (SSG)**

```jsx
// app/products/page.js
export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({
    id: product.id.toString(),
  }));
}

export default function ProductPage({ params }) {
  // Page will be statically generated
}
```

**Server-Side Rendering (SSR)**

```jsx
// app/dashboard/page.js
export const dynamic = "force-dynamic";

export default async function Dashboard() {
  const data = await getLiveData();
  return <div>{data}</div>;
}
```

---

### 5. Caching and Revalidation

```jsx
// Cache for 3600 seconds (1 hour)
fetch("https://api.example.com/data", {
  next: { revalidate: 3600 },
});

// Static with revalidation
export const revalidate = 3600;

// No caching
export const dynamic = "force-dynamic";
```

---

### 6. Middleware

**Create middleware**

```jsx
// middleware.js
import { NextResponse } from "next/server";

export function middleware(request) {
  // Redirect or modify requests
  if (!request.cookies.get("auth")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/dashboard/:path*",
};
```

---

## Advanced Features

### 1. Image Optimization

```jsx
import Image from "next/image";

export default function Profile() {
  return (
    <Image
      src="/profile.jpg"
      alt="Profile"
      width={500}
      height={500}
      priority
      sizes="(max-width: 768px) 100vw, 50vw"
    />
  );
}
```

### 2. Font Optimization

```jsx
// app/layout.js
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body>{children}</body>
    </html>
  );
}
```

### 3. SEO and Metadata

```jsx
// app/page.js
import { Metadata } from "next";

export const metadata = {
  title: "Home Page",
  description: "Welcome to our website",
  openGraph: {
    title: "Home Page",
    description: "Welcome to our website",
  },
};

export default function Home() {
  return <main>Content</main>;
}
```

---

## Deployment

**Vercel (Recommended)**

1. Push to GitHub
2. Import in Vercel
3. Automatic deployments

**Build and Export**

```bash
# Build for production
npm run build

# Start production server
npm start

# Export static site
npm run export
```

---

## Best Practices

### Do

- Use Server Components for data fetching
- Implement proper error boundaries
- Optimize images with next/image
- Use dynamic imports for large components
- Implement proper loading states

### Avoid

- Client-side only code in Server Components
- Large bundle sizes
- Blocking rendering with heavy computations
- Missing error handling

---

## Common Patterns

### Layout Pattern

```jsx
// app/layout.js
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

### Error Boundary

```jsx
// app/error.js
"use client";

export default function Error({ error, reset }) {
  return (
    <div>
      <h2>Something went wrong !</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
```

### Loading State

```jsx
// app/loading.js
export default function Loading() {
  return <div>Loading...</div>;
}
```
