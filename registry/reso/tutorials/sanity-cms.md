## Lesson 1 : What Is Sanity CMS ?

Sanity is a headless CMS and content platform. It provides:

- A customizable editing interface called **Sanity Studio**
- A cloud content storage system called the **Content Lake**
- A query language called **GROQ**
- Portable Text for structured rich-text content
- APIs for delivering content to websites, apps, and other channels

A headless CMS manages content in the backend but does not control how the frontend displays it. The frontend fetches content through an API and renders it using its own UI framework. [131][133]

### Traditional CMS vs Headless CMS

| Traditional CMS | Headless CMS |
|---|---|
| Content and frontend are tightly coupled | Content and frontend are separated |
| Usually controls themes and templates | Developer builds the frontend |
| Content often tied to one website | Content can be delivered to web, mobile, and other channels |
| Limited frontend flexibility | Full frontend flexibility |
| Example: WordPress | Example: Sanity, Contentful, Strapi |

Sanity stores content as structured data rather than HTML blobs, allowing the same content to be reused across websites, apps, and other digital channels. [136][138]

### Simple architecture

```text
Content Editors
      ↓
Sanity Studio
      ↓
Sanity Content Lake
      ↓
GROQ API
      ↓
Next.js / React / Mobile App
      ↓
User Interface
```

---

## Lesson 2 : Core Sanity Concepts

Before building with Sanity, you need to understand its main building blocks.

| Concept | Meaning |
|---|---|
| Project | A Sanity workspace containing datasets, schemas, and Studio configuration |
| Dataset | A separate content database, commonly `production` and `development` |
| Content Lake | Sanity’s cloud-hosted content storage |
| Schema | Code-defined structure for content types |
| Document | A content entry created from a schema |
| Studio | Customizable editing interface for content editors |
| GROQ | Sanity’s query language for fetching structured content |
| Portable Text | Sanity’s structured rich-text format |
| Reference | A link from one document to another |
| Asset | Uploaded media such as images or files |

### Example content model

```text
Post
 ├── title
 ├── slug
 ├── author → Reference to Author
 ├── mainImage → Image
 ├── publishedAt → Date
 ├── categories → Array of References
 └── body → Portable Text
```

---

## Lesson 3 : Creating a Sanity Project

Create a new Sanity project using the Sanity CLI.

```bash
npm create sanity@latest
```

Follow the prompts:

1. Choose a project name.
2. Select a dataset name, usually `production`.
3. Choose a dataset visibility setting.
4. Select a project template.
5. Install dependencies.

### Typical project structure

```text
my-sanity-app/
 ├── sanity/
 │   ├── schemaTypes/
 │   │   ├── post.js
 │   │   ├── author.js
 │   │   └── index.js
 │   ├── schema.js
 │   └── structure.js
 ├── app/
 ├── components/
 ├── lib/
 ├── sanity.config.js
 ├── sanity.cli.js
 ├── package.json
 └── next.config.js
```

### Environment variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-10-01
```

Never expose private tokens or write tokens using the `NEXT_PUBLIC_` prefix.

---

## Lesson 4 : Sanity Studio

Sanity Studio is the content-editing interface. It is built with React and can be customized using code.

### Running Studio locally

```bash
npm run dev
```

By default, Studio is usually available at:

```text
http://localhost:3000/studio
```

### Studio features

- Create, edit, publish, and delete documents.
- Preview content while editing.
- Upload images and files.
- Manage references between documents.
- Collaborate in real time.
- Customize fields, validation, and structure.

Sanity Studio is highly customizable, and developers define its structure and fields in code. [140][142]

---

## Lesson 5 : Defining Schemas

Schemas define the structure of your content. In Sanity, schemas are written in JavaScript or TypeScript and stored in version control.

### Basic post schema

```js
// sanity/schemaTypes/post.js

import { defineField, defineType } from "sanity";

export const post = defineType({
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "author" }],
    }),
    defineField({
      name: "mainImage",
      title: "Main Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [
        {
          type: "block",
        },
        {
          type: "image",
        },
      ],
    }),
  ],
});
```

### Author schema

```js
// sanity/schemaTypes/author.js

import { defineField, defineType } from "sanity";

export const author = defineType({
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "text",
    }),
    defineField({
      name: "avatar",
      title: "Avatar",
      type: "image",
    }),
  ],
});
```

### Register schemas

```js
// sanity/schemaTypes/index.js

import { post } from "./post";
import { author } from "./author";

export const schemaTypes = [post, author];
```

### Common field types

| Type | Use |
|---|---|
| `string` | Short text |
| `text` | Long text |
| `number` | Numeric value |
| `boolean` | True or false |
| `date` | Date only |
| `datetime` | Date and time |
| `url` | Web URL |
| `slug` | URL-friendly identifier |
| `image` | Image asset |
| `file` | File asset |
| `reference` | Link to another document |
| `array` | List of values or objects |
| `object` | Reusable nested content structure |

---

## Lesson 6 : GROQ Queries

GROQ, or **Graph-Relational Object Queries**, is Sanity’s query language. It lets developers fetch exactly the content they need in a predictable JSON shape. [136][144]

### Fetch all posts

```js
const query = `*[_type == "post"]`;
```

### Fetch selected fields

```js
const query = `*[_type == "post"]{
  title,
  slug,
  publishedAt
}`;
```

### Fetch a single post by slug

```js
const query = `*[_type == "post" && slug.current == $slug][0]{
  title,
  body,
  publishedAt
}`;
```

### Fetch referenced author data

```js
const query = `*[_type == "post"]{
  title,
  slug,
  author->{
    name,
    bio,
    avatar
  }
}`;
```

The `->` syntax resolves a reference and fetches fields from the referenced document.

### Sort and limit

```js
const query = `*[_type == "post"] | order(publishedAt desc)[0...10]{
  title,
  slug,
  publishedAt
}`;
```

### Count documents

```js
const query = `count(*[_type == "post"])`;
```

### GROQ operators

| Operator | Meaning |
|---|---|
| `*` | All documents |
| `[_type == "post"]` | Filter by document type |
| `[0]` | Return the first result |
| `[0...10]` | Return a range of results |
| `order()` | Sort results |
| `->` | Resolve a reference |
| `defined()` | Check whether a field exists |
| `match()` | Search text |
| `count()` | Count matching documents |

---

## Lesson 7 : Connecting Sanity with Next.js

Sanity provides official integration support for Next.js through the `next-sanity` library. It supports typed GROQ queries, fetching in App Router or Pages Router, and Studio embedding. [130]

### Install dependencies

```bash
npm install next-sanity @sanity/image-url
```

### Create Sanity client

```js
// lib/sanity/client.js

import { createClient } from "next-sanity";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  useCdn: true,
});
```

### Fetch posts in a Server Component

```jsx
// app/posts/page.jsx

import { client } from "@/lib/sanity/client";

const postsQuery = `*[_type == "post"] | order(publishedAt desc){
  title,
  "slug": slug.current,
  publishedAt
}`;

export default async function PostsPage() {
  const posts = await client.fetch(postsQuery);

  return (
    <main>
      <h1>Posts</h1>

      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <a href={`/posts/${post.slug}`}>{post.title}</a>
          </li>
        ))}
      </ul>
    </main>
  );
}
```

### Fetch a single post

```jsx
// app/posts/[slug]/page.jsx

import { client } from "@/lib/sanity/client";

const postQuery = `*[_type == "post" && slug.current == $slug][0]{
  title,
  body,
  publishedAt,
  author->{
    name,
    bio
  }
}`;

export default async function PostPage({ params }) {
  const { slug } = await params;

  const post = await client.fetch(postQuery, { slug });

  if (!post) {
    return <h1>Post not found</h1>;
  }

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.author?.name}</p>
    </article>
  );
}
```

---

## Lesson 8 : Portable Text

Sanity does not store rich text as HTML. It stores rich text as **Portable Text**, a structured JSON format that can be rendered in any frontend. [132][139]

### Portable Text example

```json
[
  {
    "_type": "block",
    "_key": "block1",
    "style": "normal",
    "children": [
      {
        "_type": "span",
        "_key": "span1",
        "text": "Sanity stores rich text as structured data."
      }
    ]
  }
]
```

### Install Portable Text renderer

```bash
npm install @portabletext/react
```

### Render Portable Text

```jsx
import { PortableText } from "@portabletext/react";

export default function PostBody({ value }) {
  return (
    <div className="prose">
      <PortableText value={value} />
    </div>
  );
}
```

### Custom Portable Text components

```jsx
import { PortableText } from "@portabletext/react";

const components = {
  types: {
    image: ({ value }) => (
      <img
        src={value.asset.url}
        alt={value.alt || "Sanity image"}
        className="rounded-xl my-6"
      />
    ),
  },
  marks: {
    link: ({ value, children }) => (
      <a
        href={value.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline"
      >
        {children}
      </a>
    ),
  },
  block: {
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold mt-8 mb-4">{children}</h2>
    ),
    normal: ({ children }) => (
      <p className="text-base leading-7 mb-4">{children}</p>
    ),
  },
};

export default function CustomPortableText({ value }) {
  return <PortableText value={value} components={components} />;
}
```

Portable Text is returned as structured JSON, and developers can customize how each block, mark, or custom type is rendered in React. [132][143]

---

## Lesson 9 : Working with Images

Sanity stores images as assets and provides an image URL builder for transformations.

### Install image URL builder

```bash
npm install @sanity/image-url
```

### Create image URL helper

```js
// lib/sanity/image.js

import imageUrlBuilder from "@sanity/image-url";
import { client } from "./client";

const builder = imageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}
```

### Display an image

```jsx
import Image from "next/image";
import { urlFor } from "@/lib/sanity/image";

export default function PostImage({ image, alt }) {
  return (
    <Image
      src={urlFor(image).width(1200).height(675).url()}
      alt={alt || ""}
      width={1200}
      height={675}
      className="rounded-xl object-cover"
    />
  );
}
```

### Image transformations

```js
urlFor(image).width(800).height(450).url();
urlFor(image).format("webp").quality(80).url();
urlFor(image).crop("entropy").url();
urlFor(image).fit("crop").width(600).height(600).url();
```

---

## Lesson 10 : References and Relationships

References connect documents. For example, a post can reference an author, and a category can be referenced by many posts.

### Reference field

```js
defineField({
  name: "author",
  title: "Author",
  type: "reference",
  to: [{ type: "author" }],
});
```

### Query reference data

```js
const query = `*[_type == "post"]{
  title,
  author->{
    name,
    avatar
  }
}`;
```

### Multiple references

```js
defineField({
  name: "categories",
  title: "Categories",
  type: "array",
  of: [
    {
      type: "reference",
      to: [{ type: "category" }],
    },
  ],
});
```

### Query multiple references

```js
const query = `*[_type == "post"]{
  title,
  categories[]->{
    title,
    slug
  }
}`;
```

---

## Lesson 11 : Drafts, Publishing, and Preview

Sanity separates draft and published content. Editors can preview unpublished changes before making them public.

### Draft documents

Draft documents have IDs beginning with `drafts.`.

```text
drafts.post-123
post-123
```

### Published query

```js
*[_type == "post" && !defined(_id.startsWith("drafts."))]
```

### Preview drafts

For preview functionality, use Sanity’s preview perspective or draft mode in Next.js. This allows editors to view unpublished changes in the real frontend before publishing. [143]

### Basic draft mode flow

```text
Editor updates content in Studio
        ↓
Preview link opens Next.js draft route
        ↓
Next.js enables draft mode
        ↓
Sanity returns draft content
        ↓
Editor previews unpublished content
```

---

## Lesson 12 : Webhooks and Revalidation

When content changes in Sanity, your Next.js site may need to refresh cached pages. Webhooks can trigger revalidation.

### Basic flow

```text
Editor publishes content
        ↓
Sanity sends webhook
        ↓
Next.js API route receives request
        ↓
Next.js revalidates cached route
        ↓
Updated content appears on website
```

### Revalidation API route

```js
// app/api/revalidate/route.js

import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request) {
  const secret = request.headers.get("x-sanity-secret");

  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  revalidatePath("/posts");
  revalidatePath("/");

  return NextResponse.json({
    revalidated: true,
    now: Date.now(),
  });
}
```

### ISR with Sanity

```jsx
export const revalidate = 60;

export default async function PostsPage() {
  const posts = await client.fetch(postsQuery);

  return (
    <main>
      <h1>Posts</h1>
    </main>
  );
}
```

This page is cached and refreshed at most once every 60 seconds.

---

## Lesson 13 : Sanity Client Options

| Option | Meaning |
|---|---|
| `projectId` | Sanity project ID |
| `dataset` | Dataset name, such as `production` |
| `apiVersion` | API version used for queries |
| `useCdn` | Uses Sanity’s CDN for faster read queries |
| `token` | Authentication token for private data or writes |
| `perspective` | Controls draft or published content view |

### CDN vs no CDN

```js
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  useCdn: false,
});
```

Use `useCdn: false` when you need the freshest content, such as draft previews or immediate post-publish updates. Use `useCdn: true` for public production content where speed matters.

---

## Lesson 14 : Validation and Customization

Sanity allows developers to validate fields and customize the Studio experience.

### Required field

```js
defineField({
  name: "title",
  title: "Title",
  type: "string",
  validation: (rule) => rule.required(),
});
```

### Maximum length

```js
defineField({
  name: "title",
  title: "Title",
  type: "string",
  validation: (rule) => rule.required().max(80),
});
```

### Custom error message

```js
defineField({
  name: "slug",
  title: "Slug",
  type: "slug",
  validation: (rule) =>
    rule.required().error("A slug is required for SEO and routing"),
});
```

### Conditional validation

```js
defineField({
  name: "externalUrl",
  title: "External URL",
  type: "url",
  hidden: ({ document }) => document?.isExternal !== true,
});
```

---

## Lesson 15 : Advantages of Sanity CMS

### Technical advantages

- Content and frontend are fully decoupled.
- Schemas are defined in code and version-controlled.
- GROQ enables precise and efficient queries.
- Portable Text is portable and customizable.
- Real-time collaboration for content teams.
- Highly customizable Studio.
- Strong Next.js and React integration.
- Content can be delivered to web, mobile, and other platforms.
- Flexible data modeling for complex content structures.

### Business advantages

- Developers control the frontend completely.
- Content teams get a modern editing experience.
- Same content can power multiple channels.
- Better scalability for structured content.
- Suitable for marketing sites, documentation, e-commerce, and enterprise content platforms.

A major benefit of headless CMS architecture is that the frontend can be replaced or reworked without changing the content backend, and multiple frontends can consume the same content. [133][138]

---

## Lesson 16 : Disadvantages and Limitations

| Limitation | Explanation |
|---|---|
| Developer-first approach | Non-developers may need help setting up schemas and Studio |
| No ready-made themes | You must build the frontend yourself |
| Learning curve | GROQ, schemas, Portable Text, and Studio customization take time |
| Initial setup cost | More setup than a traditional templated CMS |
| Hosting responsibility | Frontend hosting, caching, and revalidation are your responsibility |
| Cost at scale | Advanced enterprise features can become expensive |
| Not ideal for very simple sites | A basic static site may not need a headless CMS |
| Requires technical knowledge | Schema design and API integration require developer involvement |

Sanity’s flexibility means teams must build their own presentation layer, which can increase initial setup complexity and require developer involvement for content-model changes. [131][134]

---

## Lesson 17 : Most Important Interview Questions

### 1. What is Sanity CMS?

Sanity is a headless CMS that stores structured content in the cloud and delivers it to any frontend through APIs and GROQ queries.

### 2. What is a headless CMS?

A headless CMS manages content but does not control the frontend. The frontend fetches content through an API and renders it independently.

### 3. What is the Sanity Content Lake?

The Content Lake is Sanity’s cloud-hosted content repository where documents, assets, and structured content are stored.

### 4. What is Sanity Studio?

Sanity Studio is a customizable React-based editing interface used by content creators to create and manage content.

### 5. What is GROQ?

GROQ stands for Graph-Relational Object Queries. It is Sanity’s query language used to filter, project, sort, and join structured content. [136][144]

### 6. What is Portable Text?

Portable Text is Sanity’s structured rich-text format. Instead of storing HTML, it stores content as JSON blocks that can be rendered in any frontend. [132][139]

### 7. Why is Portable Text better than HTML?

Portable Text is portable, structured, and frontend-agnostic. It allows developers to render the same content differently across web, mobile, email, or other platforms.

### 8. What is a Sanity schema?

A schema defines the structure, fields, validation rules, and relationships of a content type.

### 9. What is a reference in Sanity?

A reference creates a relationship between documents, such as linking a post to an author or categories.

### 10. What does `->` mean in GROQ?

`->` resolves a reference and fetches fields from the referenced document.

```groq
author->{name, bio}
```

### 11. What is a dataset in Sanity?

A dataset is a separate content database inside a Sanity project. Teams commonly use separate datasets for development and production.

### 12. What is the difference between Sanity Studio and the Content Lake?

Studio is the editing interface, while the Content Lake is the backend storage and API layer.

### 13. What is `useCdn` in the Sanity client?

`useCdn` controls whether queries use Sanity’s CDN. `true` is faster for public content; `false` is better when fresh data is required.

### 14. What is draft mode in Next.js?

Draft mode allows editors to preview unpublished Sanity content in the real frontend before publishing it.

### 15. What is a webhook revalidation?

A webhook revalidation is triggered when content changes in Sanity. It tells Next.js to refresh cached pages so updated content appears quickly.

### 16. What is ISR?

Incremental Static Regeneration allows static pages to be regenerated after a specified time or through on-demand revalidation.

### 17. How do you fetch a single Sanity document by slug?

```groq
*[_type == "post" && slug.current == $slug]
```

### 18. How do you query referenced documents in GROQ?

Use the reference-resolution operator `->`:

```groq
*[_type == "post"]{
  title,
  author->{
    name
  }
}
```

### 19. What is the difference between Sanity and WordPress?

| Feature | Sanity | WordPress |
|---|---|---|
| Type | Headless CMS | Traditional CMS |
| Frontend | Developer-built | Theme-based |
| Content storage | Structured JSON | Database and PHP templates |
| Query language | GROQ | PHP/REST/GraphQL depending on setup |
| Customization | Code-first | Plugin and theme-based |
| Best for | Custom apps and multi-channel content | Blogs and traditional websites |

### 20. When should you choose Sanity?

Choose Sanity when you need a custom frontend, structured content, multi-channel delivery, strong developer control, real-time collaboration, and scalable content modeling.

---

## Lesson 18 : Senior-Level Interview Questions

### 1. How would you architect a large Sanity and Next.js application?

Use separate datasets for environments, define schemas in version control, create reusable GROQ query modules, fetch content in Server Components, use ISR or webhook revalidation, and separate content queries from application data.

### 2. How does Sanity handle content relationships?

Sanity uses reference fields. A document stores the `_ref` ID of another document, and GROQ resolves it using `->` syntax.

### 3. Why is Portable Text useful in a headless CMS?

It stores rich text as structured JSON rather than HTML. This makes content reusable across different renderers and platforms while allowing full frontend control.

### 4. What is the difference between `useCdn: true` and `useCdn: false`?

`useCdn: true` uses Sanity’s CDN for faster delivery of published content. `useCdn: false` bypasses the CDN for fresher results, which is useful for previews and immediate updates.

### 5. How would you implement live preview?

Enable Next.js draft mode, create a secure preview route, use Sanity’s preview perspective, and fetch draft documents for authorized editors.

### 6. How would you prevent stale content in a statically generated Next.js site?

Use ISR with a revalidation interval, or configure a Sanity publish webhook that calls a secure Next.js revalidation API route.

### 7. How would you secure a Sanity integration?

Keep write tokens server-side, never expose secret tokens with `NEXT_PUBLIC_`, validate webhook secrets, restrict dataset access, and use CORS and API permissions carefully.

### 8. What is schema-less storage in Sanity?

Sanity’s Content Lake does not strictly enforce schema at the storage layer. This allows new fields to be introduced gradually without breaking existing documents, while schemas guide Studio and validation. [138]

### 9. How would you model reusable content in Sanity?

Use object types, references, arrays, and Portable Text custom blocks. For example, create reusable `author`, `category`, `cta`, and `faq` schemas.

### 10. How would you optimize GROQ queries?

Fetch only required fields, avoid deep unnecessary joins, use projections, limit results, reuse query constants, and cache or revalidate responses appropriately.

---

## Lesson 19 : Best Practices

- Define schemas in TypeScript or JavaScript and keep them in version control.
- Use separate datasets for development and production.
- Fetch only the fields your UI needs.
- Use GROQ projections to shape API responses.
- Use Portable Text instead of storing HTML.
- Use references for reusable entities such as authors and categories.
- Use image URL transformations for responsive images.
- Protect write tokens and webhook secrets.
- Use ISR or webhooks to keep content fresh.
- Create reusable query helpers.
- Add validation rules to prevent bad content.
- Customize Studio for a better editor experience.
- Test draft preview and revalidation flows.

---

## Summary

Sanity CMS is a powerful headless CMS for teams that want full control over both content structure and frontend presentation. Its main strengths are code-defined schemas, structured content, GROQ queries, Portable Text, real-time collaboration, and flexible integration with modern frameworks such as Next.js. [130][136][138]

For beginners, focus on schemas, Sanity Studio, GROQ, references, Portable Text, images, and fetching content in Next.js. For interviews, focus on headless CMS architecture, Content Lake, GROQ, Portable Text, draft preview, ISR, webhooks, and content modeling.

This content is provided for learning purposes only. While we aim to keep it accurate and up to date, technologies evolve quickly. Please refer to the official Sanity documentation for the latest guidance.