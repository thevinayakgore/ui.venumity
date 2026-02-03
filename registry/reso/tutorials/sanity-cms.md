# Headless CMS for Modern Applications

Sanity is a headless CMS built with JavaScript that provides real-time collaboration, structured content, and a customizable editing environment.

**Key Features:**

- Real-time collaborative editing
- Structured content with GROQ
- Customizable Studio (React-based)
- Asset management with image optimization
- Powerful APIs
- Portable Text for rich content

---

## Getting Started

### 1. Installation & Setup

```bash
# Install Sanity CLI globally
npm install -g @sanity/cli

# Create new Sanity project
sanity init

# Navigate to project directory
cd my-sanity-project

# Install dependencies
npm install

# Start the development studio
sanity start
```

**Project Structure:**

```
my-sanity-project/
├── schemas/          # Content schemas
│   ├── index.js
│   ├── post.js
│   └── author.js
├── plugins/          # Custom plugins
├── static/           # Static files
├── sanity.json       # Configuration
└── package.json
```

### 2. Configuration

**sanity.json:**

```json
{
  "root": true,
  "project": {
    "name": "My Sanity Project"
  },
  "api": {
    "projectId": "your-project-id",
    "dataset": "production"
  },
  "plugins": [
    "@sanity/base",
    "@sanity/default-layout",
    "@sanity/default-login",
    "@sanity/desk-tool"
  ],
  "env": {
    "development": {
      "plugins": ["@sanity/vision"]
    }
  }
}
```

---

## Creating Schemas

### 1. Basic Schema

**schemas/post.js:**

```javascript
export default {
  name: "post",
  title: "Blog Post",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "author" }],
    },
    {
      name: "mainImage",
      title: "Main image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: { type: "category" } }],
    },
    {
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
    },
    {
      name: "body",
      title: "Body",
      type: "blockContent",
    },
  ],
  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "mainImage",
    },
    prepare(selection) {
      const { author } = selection;
      return Object.assign({}, selection, {
        subtitle: author && `by ${author}`,
      });
    },
  },
};
```

### 2. Schema Types

**Basic Types:**

```javascript
// String
{ name: 'title', type: 'string' }

// Text (multi-line)
{ name: 'description', type: 'text' }

// Number
{ name: 'price', type: 'number' }

// Boolean
{ name: 'featured', type: 'boolean' }

// Date
{ name: 'publishedAt', type: 'datetime' }

// URL
{ name: 'website', type: 'url' }

// Email
{ name: 'email', type: 'email' }
```

**Complex Types:**

```javascript
// Array of strings
{
  name: 'tags',
  type: 'array',
  of: [{type: 'string'}],
  options: {
    layout: 'tags'
  }
}

// Reference to another document
{
  name: 'author',
  type: 'reference',
  to: [{type: 'author'}]
}

// Image with hotspot
{
  name: 'image',
  type: 'image',
  options: {
    hotspot: true
  },
  fields: [
    {
      name: 'alt',
      type: 'string',
      title: 'Alternative text'
    },
    {
      name: 'caption',
      type: 'string',
      title: 'Caption'
    }
  ]
}

// File upload
{
  name: 'file',
  type: 'file',
  fields: [
    {
      name: 'description',
      type: 'string',
      title: 'Description'
    }
  ]
}
```

### 3. Rich Text (Portable Text)

**schemas/blockContent.js:**

```javascript
export default {
  title: "Block Content",
  name: "blockContent",
  type: "array",
  of: [
    {
      title: "Block",
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H1", value: "h1" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "Quote", value: "blockquote" },
      ],
      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
          { title: "Code", value: "code" },
        ],
        annotations: [
          {
            title: "URL",
            name: "link",
            type: "object",
            fields: [
              {
                title: "URL",
                name: "href",
                type: "url",
              },
            ],
          },
        ],
      },
    },
    {
      type: "image",
      options: { hotspot: true },
    },
    {
      type: "code",
      options: {
        languageAlternatives: [
          { title: "JavaScript", value: "javascript" },
          { title: "HTML", value: "html" },
          { title: "CSS", value: "css" },
        ],
      },
    },
  ],
};
```

---

## Querying Data with GROQ

### 1. Basic Queries

```javascript
// Simple query - all posts
const query = `*[_type == "post"]`;

// With field selection
const query = `*[_type == "post"]{
  _id,
  title,
  slug,
  "authorName": author->name,
  mainImage
}`;
```

### 2. Filtering and Sorting

```javascript
// Filter by published date
const query = `*[_type == "post" && publishedAt < now()] | order(publishedAt desc)`;

// Multiple conditions
const query = `*[_type == "post" && category->slug.current == $slug]`;

// Limit and offset (pagination)
const query = `*[_type == "post"] | order(publishedAt desc) [0...10]`;
```

### 3. Joins and References

```javascript
// Get posts with author details
const query = `*[_type == "post"]{
  title,
  "author": author->{
    name,
    image,
    bio
  },
  "categories": categories[]->{
    title,
    slug
  }
}`;
```

### 4. Advanced Queries

```javascript
// Count documents
const query = `count(*[_type == "post"])`;

// Group by category
const query = `*[_type == "post"] {
  "category": category->title,
  "count": count(*[_type == "post" && category._ref == ^.category._ref])
}`;

// Search with parameters
const query = `*[_type == "post" && title match $searchTerm]`;
```

---

## Client-Side Integration

### 1. Install Client

```bash
npm install @sanity/client
```

### 2. Setup Client

```javascript
import sanityClient from "@sanity/client";

const client = sanityClient({
  projectId: "your-project-id",
  dataset: "production",
  apiVersion: "2023-05-03", // Use current date
  useCdn: true, // Set to false for real-time updates
});
```

### 3. Fetch Data

```javascript
// Basic fetch
async function getPosts() {
  const query = `*[_type == "post"]`;
  const posts = await client.fetch(query);
  return posts;
}

// With parameters
async function getPostBySlug(slug) {
  const query = `*[_type == "post" && slug.current == $slug][0]`;
  const post = await client.fetch(query, { slug });
  return post;
}

// Real-time listener
const subscription = client.listen('*[_type == "post"]').subscribe((update) => {
  console.log("Update received:", update);
});

// Clean up
subscription.unsubscribe();
```

### 4. Image URLs

```javascript
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(client);

function urlFor(source) {
  return builder.image(source);
}

// Usage
const imageUrl = urlFor(post.mainImage)
  .width(800)
  .height(600)
  .quality(80)
  .url();
```

---

## Next.js Integration

### 1. Setup in Next.js

```javascript
// lib/sanity.js
import { createClient } from "next-sanity";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2023-05-03",
  useCdn: process.env.NODE_ENV === "production",
});
```

### 2. Fetch in Next.js

**app/page.js:**

```javascript
import { client } from "@/lib/sanity";

async function getPosts() {
  const query = `*[_type == "post"] | order(publishedAt desc)`;
  const posts = await client.fetch(query);
  return posts;
}

export default async function HomePage() {
  const posts = await getPosts();

  return (
    <div>
      {posts.map((post) => (
        <article key={post._id}>
          <h2>{post.title}</h2>
          {/* Render content */}
        </article>
      ))}
    </div>
  );
}
```

### 3. Server Side Rendering

**app/blog/[slug]/page.js:**

```javascript
import { client } from "@/lib/sanity";

export async function generateStaticParams() {
  const query = `*[_type == "post" && defined(slug.current)]{
    "slug": slug.current
  }`;
  const posts = await client.fetch(query);

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPost({ params }) {
  const { slug } = params;

  const query = `*[_type == "post" && slug.current == $slug][0]`;
  const post = await client.fetch(query, { slug });

  return (
    <article>
      <h1>{post.title}</h1>
      {/* Render content */}
    </article>
  );
}
```

---

## Customizing the Studio

### 1. Desk Structure

**sanity.config.js:**

```javascript
import { structureTool } from "sanity/structure";

export default defineConfig({
  // ... other config
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Blog Posts")
              .child(
                S.documentList()
                  .title("Posts")
                  .filter('_type == "post"')
                  .defaultOrdering([
                    { field: "publishedAt", direction: "desc" },
                  ]),
              ),
            S.listItem()
              .title("Authors")
              .child(
                S.documentList().title("Authors").filter('_type == "author"'),
              ),
            S.divider(),
            S.listItem()
              .title("Settings")
              .child(
                S.documentList()
                  .title("Settings")
                  .filter('_type == "settings"'),
              ),
          ]),
    }),
  ],
});
```

### 2. Custom Input Components

**schemas/customField.js:**

```javascript
import React from "react";

const ColorPicker = React.forwardRef((props, ref) => {
  return (
    <div>
      <input
        type="color"
        ref={ref}
        value={props.value || "#000000"}
        onChange={(event) => props.onChange(event.target.value)}
      />
      <div>{props.value || "No color selected"}</div>
    </div>
  );
});

export default {
  name: "customColor",
  title: "Color",
  type: "string",
  components: {
    input: ColorPicker,
  },
};
```

### 3. Custom Preview

```javascript
{
  name: 'product',
  type: 'document',
  preview: {
    select: {
      title: 'name',
      media: 'image',
      price: 'price',
      stock: 'stock'
    },
    prepare({ title, media, price, stock }) {
      return {
        title,
        media,
        subtitle: `$${price} | ${stock} in stock`
      }
    }
  }
}
```

---

## Webhooks and Automation

### 1. Setup Webhook

**sanity.json:**

```json
{
  "api": {
    "webhooks": [
      {
        "name": "Rebuild Site",
        "url": "https://api.vercel.com/v1/integrations/deploy/prj_...",
        "on": ["create", "update", "delete"],
        "filter": "_type == 'post'"
      }
    ]
  }
}
```

### 2. Serverless Functions

**api/revalidate.js (Next.js):**

```javascript
export default async function handler(req, res) {
  // Check for secret token
  if (req.query.secret !== process.env.SANITY_WEBHOOK_SECRET) {
    return res.status(401).json({ message: "Invalid token" });
  }

  try {
    // Revalidate pages
    await res.revalidate("/blog");
    await res.revalidate(`/blog/${req.body.slug}`);

    return res.json({ revalidated: true });
  } catch (err) {
    return res.status(500).send("Error revalidating");
  }
}
```

---

## Best Practices

### 1. Schema Design

- Use clear, descriptive field names
- Add validation rules
- Set default values where appropriate
- Use references for relationships
- Implement proper previews

### 2. Performance

- Use CDN for published content
- Implement image optimization
- Use GROQ projections (select only needed fields)
- Cache queries when appropriate
- Monitor API usage

### 3. Security

- Use environment variables for tokens
- Implement proper CORS settings
- Use read tokens for public data
- Secure write tokens
- Regular backups

---

## Common Patterns

### 1. Singleton Document (Settings)

```javascript
// schemas/settings.js
export default {
  name: "settings",
  title: "Settings",
  type: "document",
  fields: [
    {
      name: "siteTitle",
      title: "Site Title",
      type: "string",
    },
    {
      name: "siteDescription",
      title: "Site Description",
      type: "text",
    },
    // ... other settings
  ],
};

// Query singleton
const query = `*[_type == "settings"][0]`;
```

### 2. Localization

```javascript
{
  name: 'title',
  type: 'object',
  fields: [
    {
      name: 'en',
      title: 'English',
      type: 'string'
    },
    {
      name: 'es',
      title: 'Spanish',
      type: 'string'
    }
  ]
}
```

### 3. Versioning

```javascript
import { defineDocumentAction } from "sanity";

export const publishWithVersion = defineDocumentAction({
  name: "publishWithVersion",
  useActionMessage: ({ snapshots }) => {
    return `Publish version ${snapshots.draft?._rev || "new"}`;
  },
  // ... implementation
});
```

---

## Resources

**Official Documentation:**

- [Sanity Docs](https://www.sanity.io/docs)
- [GROQ Documentation](https://www.sanity.io/docs/groq)
- [Studio Customization](https://www.sanity.io/docs/structure-builder)

**Community Resources:**

- [Sanity.io/community](https://www.sanity.io/community)
- [Awesome Sanity](https://github.com/sanity-io/awesome-sanity)
- [Example Projects](https://github.com/sanity-io/example-frontend-next-js)

**Tools:**

- [Sanity Vision](https://www.sanity.io/plugins/sanity-vision) - GROQ query tool
- [Sanity UI](https://www.sanity.io/ui) - Component library
- [Content Lake](https://www.sanity.io/docs/datastore) - Real-time backend

---

## Deployment

### 1. Deploy Studio

```bash
# Build and deploy
sanity deploy

# Deploy to custom domain
sanity deploy --name my-studio

# Get deployment URL
sanity deploy list
```

### 2. Environment Variables

```bash
# .env.local
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your-token
```

### 3. Vercel Deployment

```json
// vercel.json
{
  "env": {
    "NEXT_PUBLIC_SANITY_PROJECT_ID": "@sanity_project_id",
    "NEXT_PUBLIC_SANITY_DATASET": "@sanity_dataset"
  }
}
```
