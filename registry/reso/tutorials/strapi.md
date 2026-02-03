# Open Source Node.js Headless CMS

Strapi is an open-source headless CMS built with Node.js that provides a customizable admin panel, REST and GraphQL APIs, and plugin architecture.

**Key Features:**

- Self-hosted or cloud
- REST & GraphQL APIs
- Customizable admin panel
- Plugin system
- Role-Based Access Control (RBAC)
- Media library
- Internationalization

---

## Getting Started

### 1. Installation

```bash
# Create new Strapi project
npx create-strapi-app@latest my-project

# Or with specific template
npx create-strapi-app@latest my-project --template blog

# Navigate to project
cd my-project

# Start development server
npm run develop
```

---

**Project Structure:**

```
my-project/
├── src/
│   ├── api/          # Content-types
│   ├── components/   # Reusable components
│   ├── extensions/   # Custom extensions
│   └── admin/        # Admin panel customizations
├── config/           # Configuration files
├── public/           # Static files
├── database/         # Database files
└── package.json
```

### 2. First Run

Access the admin panel:

- **URL:** http://localhost:1337/admin
- Create admin account
- Set up your first content-type

---

## Creating Content Types

### 1. Using Content-Type Builder

**Admin Panel → Content-Type Builder:**

1. Click "Create new collection type"
2. Enter display name (e.g., "Article")
3. Add fields:
   - Text (for title)
   - Rich Text (for content)
   - Media (for image)
   - Relation (to author)
4. Click "Save"

### 2. Programmatically (Recommended)

**Create model:**

```bash
npx strapi generate:api article
```

**Generated file (src/api/article/content-types/article/schema.json):**

```json
{
  "kind": "collectionType",
  "collectionName": "articles",
  "info": {
    "singularName": "article",
    "pluralName": "articles",
    "displayName": "Article"
  },
  "options": {
    "draftAndPublish": true
  },
  "attributes": {
    "title": {
      "type": "string",
      "required": true
    },
    "content": {
      "type": "richtext"
    },
    "slug": {
      "type": "uid",
      "targetField": "title"
    },
    "author": {
      "type": "relation",
      "relation": "manyToOne",
      "target": "api::author.author",
      "inversedBy": "articles"
    },
    "category": {
      "type": "relation",
      "relation": "manyToOne",
      "target": "api::category.category",
      "inversedBy": "articles"
    }
  }
}
```

### 3. Field Types

**Basic Fields:**

```json
{
  "title": {
    "type": "string",
    "required": true,
    "maxLength": 100
  },
  "description": {
    "type": "text",
    "maxLength": 500
  },
  "views": {
    "type": "integer",
    "default": 0
  },
  "price": {
    "type": "decimal",
    "min": 0
  },
  "isPublished": {
    "type": "boolean",
    "default": false
  },
  "publishedAt": {
    "type": "datetime"
  },
  "email": {
    "type": "email"
  },
  "url": {
    "type": "string",
    "regex": "^https?://.+"
  }
}
```

**Advanced Fields:**

```json
{
  "image": {
    "type": "media",
    "allowedTypes": ["images"],
    "multiple": false
  },
  "gallery": {
    "type": "media",
    "allowedTypes": ["images", "videos"],
    "multiple": true
  },
  "tags": {
    "type": "enumeration",
    "enum": ["tech", "lifestyle", "business"]
  },
  "metadata": {
    "type": "json"
  },
  "location": {
    "type": "component",
    "repeatable": false,
    "component": "shared.location"
  }
}
```

### 4. Components (Reusable Fields)

**Create component:**

```bash
npx strapi generate:component shared.metadata
```

**Component schema (src/components/shared/metadata.json):**

```json
{
  "collectionName": "components_shared_metadata",
  "info": {
    "displayName": "Metadata",
    "icon": "information"
  },
  "attributes": {
    "title": {
      "type": "string"
    },
    "description": {
      "type": "text"
    },
    "keywords": {
      "type": "text"
    }
  }
}
```

**Use in content-type:**

```json
{
  "seo": {
    "type": "component",
    "repeatable": false,
    "component": "shared.metadata"
  }
}
```

---

## API Endpoints

### 1. REST API

**Default endpoints:**

```
GET    /api/articles          # Get all articles
POST   /api/articles          # Create article
GET    /api/articles/:id      # Get single article
PUT    /api/articles/:id      # Update article
DELETE /api/articles/:id      # Delete article
```

**Query Parameters:**

```javascript
// Filtering
/api/articles?filters[title][$eq]=Hello
/api/articles?filters[views][$gt]=100
/api/articles?filters[category][name][$eq]=Tech

// Sorting
/api/articles?sort=title:asc
/api/articles?sort=publishedAt:desc,title:asc

// Pagination
/api/articles?pagination[page]=1&pagination[pageSize]=10

// Populating relations
/api/articles?populate=author,category
/api/articles?populate=author.avatar

// Selecting fields
/api/articles?fields[0]=title&fields[1]=slug
```

### 2. GraphQL API

**Enable GraphQL:**

```bash
npm install @strapi/plugin-graphql
```

**GraphQL Queries:**

```graphql
query {
  articles {
    data {
      id
      attributes {
        title
        content
        author {
          data {
            attributes {
              name
              email
            }
          }
        }
      }
    }
  }
}

query {
  article(id: 1) {
    data {
      attributes {
        title
        slug
      }
    }
  }
}

mutation {
  createArticle(data: { title: "New Article", content: "Content here" }) {
    data {
      id
      attributes {
        title
      }
    }
  }
}
```

---

## Custom Controllers & Services

### 1. Custom Controller

**src/api/article/controllers/article.js:**

```javascript
"use strict";

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::article.article", ({ strapi }) => ({
  // Example: Custom find method
  async find(ctx) {
    // Custom logic before default behavior
    const { query } = ctx;

    // Call default core action
    const { data, meta } = await super.find(ctx);

    // Custom logic after default behavior
    const customData = data.map((item) => ({
      ...item,
      customField: "custom value",
    }));

    return { data: customData, meta };
  },

  // Custom action
  async findBySlug(ctx) {
    const { slug } = ctx.params;

    const entity = await strapi.db.query("api::article.article").findOne({
      where: { slug },
      populate: ["author", "category"],
    });

    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

    return this.transformResponse(sanitizedEntity);
  },

  // Custom count action
  async count(ctx) {
    const count = await strapi.db.query("api::article.article").count({
      where: ctx.query.filters,
    });

    return { count };
  },
}));
```

### 2. Custom Service

**src/api/article/services/article.js:**

```javascript
"use strict";

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService("api::article.article", ({ strapi }) => ({
  // Custom service method
  async findPopular(limit = 10) {
    return strapi.db.query("api::article.article").findMany({
      where: {
        views: { $gt: 100 },
      },
      orderBy: { views: "desc" },
      limit,
      populate: ["author"],
    });
  },

  // Increment views
  async incrementViews(id) {
    const article = await strapi.db.query("api::article.article").findOne({
      where: { id },
    });

    return strapi.db.query("api::article.article").update({
      where: { id },
      data: {
        views: (article.views || 0) + 1,
      },
    });
  },

  // Search articles
  async search(query) {
    return strapi.db.query("api::article.article").findMany({
      where: {
        $or: [
          { title: { $containsi: query } },
          { content: { $containsi: query } },
        ],
      },
      populate: ["author"],
    });
  },
}));
```

---

## Middleware & Policies

### 1. Custom Middleware

**config/middlewares.js:**

```javascript
module.exports = [
  "strapi::errors",
  {
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          "connect-src": ["'self'", "https:"],
          "img-src": ["'self'", "data:", "blob:", "your-cdn.com"],
          "media-src": ["'self'", "data:", "blob:"],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  "strapi::cors",
  "strapi::poweredBy",
  "strapi::logger",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];
```

**Custom middleware (src/middlewares/custom.js):**

```javascript
module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    // Log request
    strapi.log.info(`Request: ${ctx.method} ${ctx.url}`);

    // Add custom header
    ctx.set("X-Custom-Header", "Strapi");

    // Rate limiting logic
    const ip = ctx.request.ip;
    const key = `rate-limit:${ip}`;
    const requests = (await strapi.cache.get(key)) || 0;

    if (requests > 100) {
      return ctx.tooManyRequests("Rate limit exceeded");
    }

    await strapi.cache.set(key, requests + 1, 60); // 1 minute TTL

    await next();

    // Log response
    strapi.log.info(`Response: ${ctx.status}`);
  };
};
```

### 2. Custom Policies

**src/policies/is-owner.js:**

```javascript
module.exports = (policyContext, config, { strapi }) => {
  const { user, params } = policyContext;

  // Check if user is authenticated
  if (!user) {
    return false;
  }

  // Check if user owns the resource
  const resourceId = params.id;

  return strapi.db
    .query("api::article.article")
    .findOne({
      where: {
        id: resourceId,
        author: user.id,
      },
    })
    .then((article) => {
      return !!article; // Returns true if article exists
    });
};
```

**Use in route:**

```javascript
module.exports = {
  routes: [
    {
      method: "PUT",
      path: "/articles/:id",
      handler: "article.update",
      config: {
        policies: ["global::is-owner"],
      },
    },
  ],
};
```

---

## Authentication & Roles

### 1. User Permissions Plugin

**Enable users-permissions:**

```bash
npm install @strapi/plugin-users-permissions
```

**Configure roles (Admin Panel):**

1. Settings → Users & Permissions Plugin → Roles
2. Create roles (Admin, Editor, Author, etc.)
3. Set permissions for each role

### 2. JWT Authentication

**Login:**

```javascript
// Client-side login
const response = await fetch("http://localhost:1337/api/auth/local", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    identifier: "user@example.com",
    password: "password123",
  }),
});

const data = await response.json();
const { jwt, user } = data;

// Store token
localStorage.setItem("token", jwt);
```

**Authenticated requests:**

```javascript
const token = localStorage.getItem("token");

const response = await fetch("http://localhost:1337/api/articles", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
```

### 3. Custom Authentication Strategies

**config/plugins.js:**

```javascript
module.exports = {
  "users-permissions": {
    config: {
      jwtSecret: process.env.JWT_SECRET,
      jwt: {
        expiresIn: "7d",
      },
    },
  },
};
```

---

## Media Library

### 1. Upload Files

**Client-side upload:**

```javascript
const formData = new FormData();
formData.append("files", fileInput.files[0]);
formData.append(
  "data",
  JSON.stringify({
    alternativeText: "Image description",
    caption: "Image caption",
  }),
);

const response = await fetch("http://localhost:1337/api/upload", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${token}`,
  },
  body: formData,
});

const uploadedFiles = await response.json();
```

### 2. Image Optimization

**config/plugins.js:**

```javascript
module.exports = {
  upload: {
    config: {
      provider: "@strapi/provider-upload-cloudinary",
      providerOptions: {
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_KEY,
        api_secret: process.env.CLOUDINARY_SECRET,
      },
      breakpoints: {
        xlarge: 1920,
        large: 1000,
        medium: 750,
        small: 500,
        xsmall: 64,
      },
    },
  },
};
```

### 3. Responsive Images

```javascript
// Get responsive image URLs
const image = article.attributes.image.data.attributes;

const imageUrls = {
  original: image.url,
  large: image.formats.large?.url,
  medium: image.formats.medium?.url,
  small: image.formats.small?.url,
  thumbnail: image.formats.thumbnail?.url,
};
```

---

## Internationalization (i18n)

### 1. Enable i18n

```bash
npm install @strapi/plugin-i18n
```

### 2. Configure Locales

**config/plugins.js:**

```javascript
module.exports = {
  i18n: {
    enabled: true,
    defaultLocale: "en",
    locales: ["en", "fr", "es"],
  },
};
```

### 3. Localized Content

**Create localized field:**

```json
{
  "title": {
    "type": "string",
    "pluginOptions": {
      "i18n": {
        "localized": true
      }
    }
  }
}
```

**Fetch localized content:**

```javascript
// Get content in specific locale
const articles = await strapi.entityService.findMany("api::article.article", {
  locale: "fr",
  populate: "*",
});

// Get all locales for an article
const article = await strapi.entityService.findOne("api::article.article", 1, {
  populate: "localizations",
});
```

---

## Webhooks

### 1. Configure Webhooks

**Admin Panel → Settings → Webhooks:**

1. Click "Add new webhook"
2. Set name and URL
3. Configure events (entry.create, entry.update, entry.delete)
4. Add headers if needed

### 2. Custom Webhook Logic

**src/index.js (lifecycle hooks):**

```javascript
module.exports = {
  register({ strapi }) {
    strapi.db.lifecycles.subscribe({
      models: ["api::article.article"],

      async afterCreate(event) {
        const { result } = event;

        // Send webhook
        await fetch(process.env.WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            event: "article.created",
            data: result,
          }),
        });
      },

      async afterUpdate(event) {
        // Handle update events
      },

      async afterDelete(event) {
        // Handle delete events
      },
    });
  },
};
```

---

## Deployment

### 1. Production Build

```bash
# Build admin panel
npm run build

# Or build with specific environment
NODE_ENV=production npm run build

# Start production server
npm start
```

### 2. Environment Configuration

**.env:**

```bash
HOST=0.0.0.0
PORT=1337
APP_KEYS=your-app-keys
API_TOKEN_SALT=your-api-token-salt
ADMIN_JWT_SECRET=your-admin-jwt-secret
JWT_SECRET=your-jwt-secret
DATABASE_CLIENT=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=strapi
DATABASE_USERNAME=strapi
DATABASE_PASSWORD=strapi
```

### 3. Database Configuration

**config/database.js:**

```javascript
module.exports = ({ env }) => ({
  connection: {
    client: "postgres",
    connection: {
      host: env("DATABASE_HOST", "localhost"),
      port: env.int("DATABASE_PORT", 5432),
      database: env("DATABASE_NAME", "strapi"),
      user: env("DATABASE_USERNAME", "strapi"),
      password: env("DATABASE_PASSWORD", "strapi"),
      ssl: env.bool("DATABASE_SSL", false) && {
        rejectUnauthorized: env.bool("DATABASE_SSL_SELF", false),
      },
    },
    debug: false,
  },
});
```

### 4. Docker Deployment

**Dockerfile:**

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production

COPY . .

RUN npm run build

EXPOSE 1337

CMD ["npm", "start"]
```

**docker-compose.yml:**

```yaml
version: "3"
services:
  strapi:
    image: strapi/strapi
    environment:
      DATABASE_CLIENT: postgres
      DATABASE_HOST: postgres
      DATABASE_PORT: 5432
      DATABASE_NAME: strapi
      DATABASE_USERNAME: strapi
      DATABASE_PASSWORD: strapi
    ports:
      - "1337:1337"
    volumes:
      - ./app:/srv/app

  postgres:
    image: postgres:14
    environment:
      POSTGRES_DB: strapi
      POSTGRES_USER: strapi
      POSTGRES_PASSWORD: strapi
    volumes:
      - ./data:/var/lib/postgresql/data
```

---

## Best Practices

### 1. Performance

- Use projections to select only needed fields
- Implement caching strategy
- Optimize media with CDN
- Use database indexing
- Monitor API response times

### 2. Security

- Use environment variables
- Implement CORS properly
- Regular security updates
- Use HTTPS in production
- Implement rate limiting
- Regular backups

### 3. Development

- Use TypeScript for better type safety
- Implement proper error handling
- Write unit tests
- Use version control
- Document APIs

---

## Common Patterns

### 1. Singleton for Settings

```javascript
// config/server.js
module.exports = ({ env }) => ({
  settings: {
    singleton: {
      enabled: true,
      models: ["settings"],
    },
  },
});
```

### 2. Soft Delete

```javascript
// Custom service method
async softDelete(id) {
  return strapi.db.query('api::article.article').update({
    where: { id },
    data: {
      deletedAt: new Date(),
      publishedAt: null
    }
  })
}

async findNonDeleted() {
  return strapi.db.query('api::article.article').findMany({
    where: {
      deletedAt: null
    }
  })
}
```

### 3. Audit Logging

```javascript
// Lifecycle hook for audit
strapi.db.lifecycles.subscribe({
  models: ["api::article.article"],

  async afterCreate(event) {
    await strapi.db.query("api::audit-log.audit-log").create({
      data: {
        action: "create",
        model: "article",
        recordId: event.result.id,
        userId: event.params.data.author,
        changes: event.result,
      },
    });
  },
});
```

---

## Resources

**Official Documentation:**

- [Strapi Documentation](https://docs.strapi.io/)
- [API Reference](https://docs.strapi.io/dev-docs/api/rest)
- [Plugin Development](https://docs.strapi.io/dev-docs/plugins)

**Community Resources:**

- [Strapi Community](https://strapi.io/community)
- [Awesome Strapi](https://github.com/strapi-community/awesome-strapi)
- [Strapi Examples](https://github.com/strapi/strapi-examples)

**Marketplace :**

- [Strapi Marketplace](https://market.strapi.io/)
- [Official Plugins](https://strapi.io/plugins)
- [Community Plugins](https://market.strapi.io/plugins)

---

## Quick Comparison

### Sanity vs Strapi

**Sanity :**

- Hosted/SaaS option available
- Real-time collaboration
- GROQ query language
- Portable Text for rich content
- Excellent for content teams

**Strapi :**

- Open source & self-hosted
- REST & GraphQL APIs
- Plugin architecture
- Role-Based Access Control
- More control over infrastructure

**Choose Sanity if :**

- You need real-time collaboration
- Your team prefers hosted solutions
- You work with complex content structures
- You need advanced image optimization

**Choose Strapi if :**

- You need full control over hosting
- You require extensive customization
- You prefer REST/GraphQL APIs
- Budget is a concern (self-hosted)
