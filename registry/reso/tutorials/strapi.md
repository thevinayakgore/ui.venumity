## Lesson 1 : What Is Strapi ?

Strapi is a headless CMS that provides the backend content-management layer for modern applications. It includes:

- An admin panel for content editors
- A Content-Type Builder
- Automatically generated REST APIs
- Optional GraphQL API
- Media library
- Authentication and authorization
- Role-based access control
- Plugin system
- Database support

### Headless CMS architecture

```text
Content Editor
      ↓
Strapi Admin Panel
      ↓
Strapi Backend
      ↓
Database
      ↓
REST / GraphQL API
      ↓
Next.js / React / Mobile App
      ↓
User Interface
```

### Traditional CMS vs Strapi

| Traditional CMS | Strapi |
|---|---|
| Backend, admin panel, and frontend are coupled | Backend and frontend are separated |
| Usually uses themes and templates | Developer builds the frontend |
| Content often tied to one website | Same content can power web, mobile, and other apps |
| Limited API flexibility by default | REST and GraphQL APIs are first-class |
| Example: WordPress | Example: Strapi, Sanity, Contentful |

Strapi provides backend functionality for JAMstack applications and supports popular frontend frameworks such as Next.js, Nuxt, and Gatsby. [150]

---

## Lesson 2 : Core Strapi Concepts

| Concept | Meaning |
|---|---|
| Content Type | A content model, such as Article, Product, or Category |
| Collection Type | A content type with multiple entries, such as blog posts |
| Single Type | A content type with only one entry, such as Homepage settings |
| Component | Reusable group of fields used inside content types |
| Dynamic Zone | Flexible section where editors choose from predefined components |
| Media Library | Storage and management interface for uploaded files |
| Plugin | Module that adds functionality to Strapi |
| Middleware | Function that runs before or after requests |
| Policy | Authorization rule controlling access |
| Controller | Handles request logic |
| Service | Contains reusable business logic |
| REST API | Automatically generated HTTP API for content types |
| GraphQL API | Optional API for querying and mutating content |

### Example content model

```text
Article
 ├── title
 ├── slug
 ├── content
 ├── coverImage
 ├── author → Relation to Author
 ├── categories → Relation to Category
 └── publishedAt
```

---

## Lesson 3 : Installing Strapi

Create a new Strapi project:

```bash
npx create-strapi-app@latest my-strapi-app
```

Or using pnpm:

```bash
pnpm create strapi-app my-strapi-app
```

Start the development server:

```bash
npm run develop
```

By default, Strapi runs at:

```text
http://localhost:1337
```

The admin panel is available at:

```text
http://localhost:1337/admin
```

### Supported databases

Strapi supports databases such as:

- PostgreSQL
- MySQL
- MariaDB
- SQLite

For production, PostgreSQL or MySQL is commonly used. SQLite is useful for local development and small projects.

---

## Lesson 4 : Content-Type Builder

The Content-Type Builder is Strapi’s visual interface for creating content models. When you create a content type, Strapi generates the database schema and API endpoints automatically. [155][157]

### Creating an Article content type

1. Open the Strapi admin panel.
2. Go to **Content-Type Builder**.
3. Click **Create new collection type**.
4. Enter `Article` as the display name.
5. Add fields such as `title`, `slug`, `content`, `coverImage`, and `publishedAt`.
6. Save and restart the server.

### Common field types

| Field Type | Use |
|---|---|
| Text | Short text |
| Rich Text | Long-form formatted content |
| Number | Numeric value |
| Boolean | True or false |
| Date | Date value |
| Email | Email address |
| Password | Password field |
| Media | Image, video, or file |
| JSON | Structured JSON data |
| Relation | Link to another content type |
| Component | Reusable field group |
| Dynamic Zone | Flexible content sections |
| UID | URL-friendly unique identifier |

### Collection Type vs Single Type

| Collection Type | Single Type |
|---|---|
| Contains multiple entries | Contains only one entry |
| Example: Articles, Products, Categories | Example: Homepage, Site Settings, About Page |
| Used for repeating content | Used for global or page-level configuration |

---

## Lesson 5 : REST API

Strapi automatically generates REST endpoints for each content type. The Content API exposes content through REST by default and through GraphQL when the GraphQL plugin is installed. [146]

### Default REST endpoints

For a content type named `article`, Strapi generates endpoints such as:

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/articles` | Get all articles |
| `GET` | `/api/articles/:documentId` | Get one article |
| `POST` | `/api/articles` | Create an article |
| `PUT` | `/api/articles/:documentId` | Update an article |
| `DELETE` | `/api/articles/:documentId` | Delete an article |

### Fetch all articles

```bash
GET http://localhost:1337/api/articles
```

Response example:

```json
{
  "data": [
    {
      "id": 1,
      "documentId": "abc123",
      "title": "Getting Started with Strapi",
      "slug": "getting-started-with-strapi"
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 25,
      "pageCount": 1,
      "total": 1
    }
  }
}
```

### Fetch one article

```bash
GET http://localhost:1337/api/articles/abc123
```

### Create an article

```bash
POST http://localhost:1337/api/articles
Content-Type: application/json

{
  "data": {
    "title": "New Article",
    "slug": "new-article",
    "content": "Article content"
  }
}
```

### Update an article

```bash
PUT http://localhost:1337/api/articles/abc123
Content-Type: application/json

{
  "data": {
    "title": "Updated Article"
  }
}
```

### Delete an article

```bash
DELETE http://localhost:1337/api/articles/abc123
```

Strapi automatically creates standard CRUD REST endpoints when a content type is created. [156][157]

---

## Lesson 6 : REST Query Parameters

Strapi REST API supports filtering, sorting, pagination, population, and field selection.

### Pagination

```bash
GET /api/articles?pagination[page]=1&pagination[pageSize]=10
```

### Sorting

```bash
GET /api/articles?sort=publishedAt:desc
```

### Filtering

```bash
GET /api/articles?filters[title][$contains]=react
```

### Select specific fields

```bash
GET /api/articles?fields=title&fields=slug
```

### Populate relations

```bash
GET /api/articles?populate=author,categories,coverImage
```

### Deep population

```bash
GET /api/articles?populate[author][fields]=name&populate[categories][fields]=title
```

### Common filters

| Filter | Example |
|---|---|
| Equals | `filters[title][$eq]=React` |
| Contains | `filters[title][$contains]=React` |
| Starts with | `filters[title][$startsWith]=Re` |
| Greater than | `filters[price][$gt]=100` |
| Less than | `filters[price][$lt]=500` |
| In array | `filters[id][$in][0]=1&filters[id][$in][1]=2` |
| Not null | `filters[publishedAt][$notNull]=true` |

---

## Lesson 7 : GraphQL API

Strapi provides an optional GraphQL plugin for querying and mutating content types. GraphQL allows clients to request only the fields they need, reducing over-fetching. [145][149]

### Install GraphQL plugin

```bash
npm install @strapi/plugin-graphql
```

GraphQL endpoint:

```text
http://localhost:1337/graphql
```

### Query articles

```graphql
query {
  articles {
    documentId
    title
    slug
    publishedAt
  }
}
```

### Query with relations

```graphql
query {
  articles {
    documentId
    title
    author {
      name
      bio
    }
    categories {
      title
    }
  }
}
```

### Query a single article

```graphql
query {
  article(documentId: "abc123") {
    title
    content
    coverImage {
      url
    }
  }
}
```

### Create an article

```graphql
mutation {
  createArticle(
    data: {
      title: "GraphQL Article"
      slug: "graphql-article"
      content: "Created using GraphQL"
    }
  ) {
    documentId
    title
  }
}
```

### REST vs GraphQL

| Feature | REST | GraphQL |
|---|---|---|
| Data fetching | Multiple endpoints may be required | Single endpoint |
| Over-fetching | Possible | Reduced |
| Learning curve | Lower | Higher |
| Caching | Easier with HTTP caching | More complex |
| Best for | Simple resource-based APIs | Complex nested data requirements |

---

## Lesson 8 : Connecting Strapi with Next.js

In a Next.js application, fetch Strapi content in Server Components or client components using `fetch`.

### Fetch all articles

```jsx
// app/articles/page.jsx

async function getArticles() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/articles?populate=*`,
    {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
      next: {
        revalidate: 60,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch articles");
  }

  const json = await response.json();
  return json.data;
}

export default async function ArticlesPage() {
  const articles = await getArticles();

  return (
    <main>
      <h1>Articles</h1>

      <ul>
        {articles.map((article) => (
          <li key={article.documentId}>
            <a href={`/articles/${article.attributes.slug}`}>
              {article.attributes.title}
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}
```

### Environment variables

```env
NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337
STRAPI_API_TOKEN=your_server_only_token
```

Never expose private API tokens using the `NEXT_PUBLIC_` prefix.

---

## Lesson 9 : Authentication and Authorization

Strapi includes authentication, JWT tokens, users, roles, and permissions. Its role-based access control uses a `Resource:Action` pattern such as `articles:read`, `articles:write`, and `articles:delete`. [151]

### User types

| User Type | Purpose |
|---|---|
| Admin User | Manages the Strapi admin panel |
| Application User | End user of your website or app |
| Public Role | Permissions for unauthenticated users |
| Authenticated Role | Permissions for logged-in users |

### Register a user

```bash
POST http://localhost:1337/api/auth/local/register
Content-Type: application/json

{
  "username": "aman",
  "email": "aman@example.com",
  "password": "strongPassword123"
}
```

### Login

```bash
POST http://localhost:1337/api/auth/local
Content-Type: application/json

{
  "identifier": "aman@example.com",
  "password": "strongPassword123"
}
```

Response:

```json
{
  "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "aman",
    "email": "aman@example.com"
  }
}
```

### Access protected API

```bash
GET http://localhost:1337/api/users/me
Authorization: Bearer YOUR_JWT_TOKEN
```

### Role-based access control

Strapi allows permissions such as:

```text
api::article.article.find
api::article.article.findOne
api::article.article.create
api::article.article.update
api::article.article.delete
```

You can assign these permissions to roles such as `Public`, `Authenticated`, `Editor`, or custom roles. [151]

---

## Lesson 10 : Media Library

Strapi includes a Media Library for uploading and managing images, videos, and files.

### Upload media

You can upload media through the admin panel or API.

```bash
POST http://localhost:1337/api/upload
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: multipart/form-data
```

### Display an image

```jsx
<img
  src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${article.coverImage.url}`}
  alt={article.coverImage.alternativeText || article.title}
/>
```

### Using Next.js Image

```jsx
import Image from "next/image";

<Image
  src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${article.coverImage.url}`}
  alt={article.coverImage.alternativeText || article.title}
  width={1200}
  height={675}
/>
```

For remote Strapi images, configure the image domain in `next.config.js`:

```js
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "your-strapi-domain.com",
      },
    ],
  },
};
```

---

## Lesson 11 : Components and Dynamic Zones

Components are reusable groups of fields. Dynamic Zones allow editors to choose which components appear in a page or article.

### Component example: SEO

```json
{
  "collectionName": "components_shared_seos",
  "info": {
    "name": "seo"
  },
  "attributes": {
    "metaTitle": {
      "type": "string"
    },
    "metaDescription": {
      "type": "text"
    },
    "metaImage": {
      "type": "media",
      "multiple": false
    }
  }
}
```

### Dynamic Zone example

A page can include different sections such as:

- Hero section
- Feature section
- Testimonial section
- FAQ section
- Call-to-action section

```json
{
  "kind": "collectionType",
  "collectionName": "pages",
  "info": {
    "singularName": "page",
    "pluralName": "pages",
    "displayName": "Page"
  },
  "attributes": {
    "title": {
      "type": "string"
    },
    "sections": {
      "type": "dynamiczone",
      "components": [
        "shared.hero",
        "shared.features",
        "shared.testimonials",
        "shared.faq"
      ]
    }
  }
}
```

### Query dynamic zone

```bash
GET /api/pages?populate[sections][populate]=*
```

### Render dynamic zones in React

```jsx
function PageRenderer({ sections }) {
  return sections.map((section, index) => {
    switch (section.__component) {
      case "shared.hero":
        return <Hero key={index} data={section} />;

      case "shared.features":
        return <Features key={index} data={section} />;

      case "shared.testimonials":
        return <Testimonials key={index} data={section} />;

      case "shared.faq":
        return <Faq key={index} data={section} />;

      default:
        return null;
    }
  });
}
```

---

## Lesson 12 : Custom Controllers, Services, and Routes

Strapi allows developers to customize backend logic using controllers, services, routes, middleware, and policies.

### Custom controller

```js
// src/api/article/controllers/article.js

"use strict";

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::article.article", ({ strapi }) => ({
  async featuredArticles(ctx) {
    const articles = await strapi.documents("api::article.article").findMany({
      filters: {
        featured: true,
      },
      populate: ["coverImage", "author"],
    });

    return { data: articles };
  },
}));
```

### Custom route

```js
// src/api/article/routes/article.js

module.exports = {
  routes: [
    {
      method: "GET",
      path: "/articles/featured",
      handler: "article.featuredArticles",
      config: {
        policies: [],
      },
    },
  ],
};
```

### Custom service

```js
// src/api/article/services/article.js

"use strict";

module.exports = createCoreService("api::article.article", ({ strapi }) => ({
  async getPublishedArticles() {
    return strapi.documents("api::article.article").findMany({
      filters: {
        publishedAt: {
          $notNull: true,
        },
      },
    });
  },
}));
```

---

## Lesson 13 : Middleware and Policies

Middleware runs before or after a request. Policies control whether a request is allowed.

### Example middleware

```js
// src/middlewares/logger.js

module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    console.log(`Request: ${ctx.method} ${ctx.url}`);

    await next();

    console.log(`Response status: ${ctx.status}`);
  };
};
```

### Register middleware

```js
// config/middlewares.js

module.exports = [
  "strapi::errors",
  "strapi::security",
  "strapi::cors",
  "strapi::poweredBy",
  "strapi::logger",
  "strapi::query",
  "strapi::body",
  "global::logger",
];
```

### Example policy

```js
// src/policies/is-owner.js

module.exports = async (policyContext, config, { strapi }) => {
  const user = policyContext.state.user;

  if (!user) {
    return false;
  }

  return true;
};
```

---

## Lesson 14 : Deployment

Strapi can be deployed to platforms that support Node.js, such as VPS servers, Railway, Render, AWS, DigitalOcean, and Docker-based environments.

### Production build

```bash
npm run build
npm start
```

### Environment variables

```env
HOST=0.0.0.0
PORT=1337
APP_KEYS=your_app_keys
API_TOKEN_SALT=your_api_token_salt
ADMIN_JWT_SECRET=your_admin_jwt_secret
TRANSFER_TOKEN_SALT=your_transfer_token_salt
DATABASE_CLIENT=postgres
DATABASE_HOST=your_database_host
DATABASE_PORT=5432
DATABASE_NAME=strapi
DATABASE_USERNAME=strapi_user
DATABASE_PASSWORD=your_password
```

### Deployment checklist

- Use PostgreSQL or MySQL in production.
- Store secrets in environment variables.
- Enable HTTPS.
- Configure CORS properly.
- Use a process manager such as PM2 or Docker.
- Set up database backups.
- Use separate development and production environments.
- Restrict public API permissions.
- Use API tokens for frontend requests.

---

## Lesson 15 : Advantages of Strapi

### Technical advantages

- Open-source and self-hosted.
- Automatically generates REST APIs.
- Optional GraphQL support.
- Visual Content-Type Builder.
- Built-in authentication and RBAC.
- Media library included.
- Plugin and customization ecosystem.
- Supports PostgreSQL, MySQL, MariaDB, and SQLite.
- Can be extended with custom controllers, services, and middleware.
- Works with any frontend framework.

### Business advantages

- No vendor lock-in for self-hosted deployments.
- Content can be delivered across web, mobile, and other channels.
- Reduces backend development time for standard CRUD APIs.
- Suitable for startups, agencies, and enterprise teams.
- Flexible enough for custom business logic.

Strapi’s headless architecture separates content management from presentation and allows the same content to be delivered across multiple platforms through APIs. [152][158]

---

## Lesson 16 : Disadvantages and Limitations

| Limitation | Explanation |
|---|---|
| Requires backend setup | Developers must deploy, configure, and maintain the server |
| No built-in frontend | You must build the website or app separately |
| Learning curve | Content types, permissions, policies, and deployment require technical knowledge |
| Self-hosting responsibility | Updates, backups, scaling, and security are your responsibility |
| Plugin compatibility | Plugins may require version upgrades or custom maintenance |
| Initial development cost | More setup than a hosted CMS with prebuilt templates |
| Not ideal for non-technical teams | Editors may need developer support for advanced customization |

Strapi focuses mainly on backend content management, so teams need to build their own frontend or integrate it with a frontend framework. [155][157]

---

## Lesson 17 : Most Important Interview Questions

### 1. What is Strapi?

Strapi is an open-source, self-hosted headless CMS built with Node.js. It provides an admin panel, content modeling, REST and GraphQL APIs, media management, authentication, and role-based permissions.

### 2. What is a headless CMS?

A headless CMS manages content in the backend and delivers it through APIs. It does not control the frontend presentation layer.

### 3. What is the difference between Strapi and WordPress?

| Feature | Strapi | WordPress |
|---|---|---|
| Type | Headless CMS | Traditional CMS |
| Frontend | Developer-built | Theme-based |
| Backend | Node.js | PHP |
| APIs | REST and GraphQL | REST/GraphQL via plugins |
| Database | PostgreSQL, MySQL, SQLite, MariaDB | MySQL/MariaDB commonly |
| Best for | Custom apps and multi-channel content | Blogs and traditional websites |

### 4. What is a Content Type in Strapi?

A Content Type is a content model that defines fields, relations, and behavior. Examples include Article, Product, Category, and Author.

### 5. What is the difference between Collection Type and Single Type?

A Collection Type stores multiple entries, such as blog posts. A Single Type stores one entry, such as homepage settings or site configuration.

### 6. What is a component in Strapi?

A component is a reusable group of fields that can be used inside content types, such as an SEO block, address block, or testimonial block.

### 7. What is a Dynamic Zone?

A Dynamic Zone allows editors to choose and arrange predefined components dynamically, such as hero sections, FAQs, testimonials, and call-to-action sections.

### 8. What APIs does Strapi provide?

Strapi provides REST APIs by default and GraphQL APIs through the GraphQL plugin. It also provides Document Service and Query Engine APIs for backend customization. [146]

### 9. How does Strapi generate APIs?

When you create a content type, Strapi automatically creates database structures and REST endpoints for CRUD operations. [155][156]

### 10. What is population in Strapi?

Population controls which related fields, media, components, or dynamic zones are included in an API response.

```bash
GET /api/articles?populate=author,categories,coverImage
```

### 11. What is filtering in Strapi?

Filtering restricts API results based on conditions.

```bash
GET /api/articles?filters[title][$contains]=react
```

### 12. What is pagination in Strapi?

Pagination divides large result sets into pages.

```bash
GET /api/articles?pagination[page]=1&pagination[pageSize]=10
```

### 13. What is JWT in Strapi?

JWT, or JSON Web Token, is used to authenticate application users. After login, the frontend sends the JWT in the `Authorization` header to access protected APIs.

### 14. What is RBAC in Strapi?

RBAC stands for Role-Based Access Control. It controls what users and roles can read, create, update, or delete. [151]

### 15. What is the difference between Admin Users and Application Users?

Admin Users manage the Strapi admin panel. Application Users are end users of your website or app and authenticate through APIs such as `/api/auth/local`.

### 16. What is a middleware in Strapi?

Middleware is a function that runs before or after a request. It can handle logging, authentication, CORS, rate limiting, and custom request processing.

### 17. What is a policy in Strapi?

A policy is an authorization rule that determines whether a request is allowed to proceed.

### 18. What is a controller in Strapi?

A controller handles incoming requests and returns responses. Custom controllers can extend or replace default CRUD behavior.

### 19. What is a service in Strapi?

A service contains reusable business logic, such as querying the database, processing data, or sending notifications.

### 20. What databases does Strapi support?

Strapi supports PostgreSQL, MySQL, MariaDB, and SQLite. [147][157]

---

## Lesson 18 : Senior-Level Interview Questions

### 1. How would you architect a production Strapi application?

Use PostgreSQL or MySQL, separate development and production environments, store secrets in environment variables, use API tokens for frontend access, configure CORS, enable HTTPS, set up backups, and deploy with Docker or a Node.js process manager.

### 2. How would you secure a Strapi API?

Disable unnecessary public permissions, use JWT authentication, apply role-based permissions, validate input, use HTTPS, configure CORS, rate-limit sensitive endpoints, and keep API tokens server-side.

### 3. How would you optimize Strapi API performance?

Fetch only required fields, populate only necessary relations, use pagination, add database indexes where needed, cache responses where appropriate, and avoid deeply nested populate queries.

### 4. How would you implement custom business logic in Strapi?

Use custom controllers for request handling, services for reusable logic, lifecycles for database events, middleware for request processing, and policies for authorization.

### 5. What are lifecycle hooks in Strapi?

Lifecycle hooks run before or after database operations such as create, update, and delete. They are useful for validation, notifications, search indexing, and audit logging.

### 6. How would you handle file uploads in production?

Use a supported upload provider such as local storage, AWS S3, Cloudinary, or another cloud provider. Store upload credentials in environment variables and restrict public permissions.

### 7. How would you migrate a Strapi project?

Use version control for code and configuration, export and import data carefully, test migrations in staging, back up the database, and update dependencies gradually.

### 8. How would you prevent N+1 query problems?

Use appropriate `populate` queries, fetch related data in one request, avoid unnecessary nested population, and design relations based on actual UI requirements.

### 9. When would you choose Strapi over Sanity?

Choose Strapi when you need a self-hosted backend, custom database control, built-in authentication, REST-first APIs, and full ownership of infrastructure. Choose Sanity when you prefer a cloud-hosted content platform with GROQ and Portable Text.

### 10. How would you implement role-based content access?

Create roles such as `Editor`, `Reviewer`, and `Viewer`, assign permissions using Strapi RBAC, protect routes with policies, and validate ownership or role checks in custom controllers.

---

## Lesson 19 : Best Practices

- Use PostgreSQL or MySQL for production.
- Keep secrets in environment variables.
- Use separate environments for development, staging, and production.
- Restrict public API permissions.
- Use API tokens for frontend requests.
- Populate only required relations.
- Use pagination for large collections.
- Add validation rules to content types.
- Use components for reusable field groups.
- Use Dynamic Zones for flexible page building.
- Write custom controllers only when default behavior is insufficient.
- Use lifecycle hooks carefully to avoid slow database operations.
- Back up the database regularly.
- Test API permissions and authentication flows.
- Use HTTPS in production.

---

## Summary

Strapi is a powerful open-source headless CMS for developers who want full control over their backend, database, APIs, and deployment infrastructure. It automatically generates REST APIs from content types, supports GraphQL, includes authentication and RBAC, and integrates easily with modern frontend frameworks such as Next.js and React. [146][150][157]

For beginners, start with Content-Type Builder, collection types, single types, REST API queries, media, authentication, and Next.js integration. For interviews, focus on headless CMS architecture, REST vs GraphQL, population, filtering, JWT, RBAC, controllers, services, middleware, policies, and deployment.

This content is provided for learning purposes only. While we aim to keep it accurate and up to date, technologies evolve quickly. Please refer to the official Strapi documentation for the latest guidance.