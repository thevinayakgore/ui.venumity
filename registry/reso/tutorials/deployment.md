## Lesson 1 : What Is Deployment ?

Deployment is the process of moving an application from development to a server, cloud platform, or hosting environment so users can access it.

### Basic deployment flow

```text
Developer writes code
        ↓
Code pushed to Git repository
        ↓
CI pipeline runs tests and build
        ↓
Build artifact is created
        ↓
Artifact is deployed to hosting environment
        ↓
Application becomes live
```

### Example

For a Next.js application:

```bash
git push origin main
```

A platform such as Vercel may then:

1. Detect the push.
2. Install dependencies.
3. Run the build.
4. Upload static assets to a CDN.
5. Deploy serverless functions.
6. Update the production URL.

### Deployment vs Hosting

| Hosting | Deployment |
|---|---|
| Provides servers and infrastructure | Releases application code to that infrastructure |
| Stores and runs the application | Builds, tests, and ships new versions |
| Example: VPS, Vercel, AWS | Example: Git push, CI/CD pipeline, Docker deployment |

---

## Lesson 2 : Deployment Environments

Applications are commonly deployed across multiple environments to reduce risk.

| Environment | Purpose | Example URL |
|---|---|---|
| Local | Developer machine | `http://localhost:3000` |
| Development | Shared testing environment | `https://dev.example.com` |
| Staging | Pre-production testing | `https://staging.example.com` |
| Production | Live user-facing application | `https://example.com` |

### Environment flow

```text
Local
  ↓
Development
  ↓
Staging
  ↓
Production
```

### Why separate environments matter

- Prevents untested code from reaching users.
- Allows safe testing with production-like data.
- Helps isolate configuration and secrets.
- Makes debugging easier.
- Enables safe database migrations.

---

## Lesson 3 : Version Control and Git

Git is the foundation of modern deployment. It tracks code changes, enables collaboration, and connects code repositories to CI/CD pipelines.

### Basic Git workflow

```bash
git checkout -b feature/new-feature
git add .
git commit -m "Add new feature"
git push origin feature/new-feature
```

Then open a pull request, review the code, merge it, and deploy.

### Common branching strategy

```text
main
 ├── develop
 │    ├── feature/login
 │    ├── feature/dashboard
 │    └── bugfix/navbar
 └── release/v1.2.0
```

### Common Git branches

| Branch | Purpose |
|---|---|
| `main` | Production-ready code |
| `develop` | Integration branch for features |
| `feature/*` | New feature development |
| `bugfix/*` | Bug fixes |
| `release/*` | Release preparation |
| `hotfix/*` | Urgent production fixes |

---

## Lesson 4 : CI/CD

CI/CD stands for **Continuous Integration** and **Continuous Delivery or Continuous Deployment**.

### Continuous Integration, CI

CI automatically builds and tests code whenever developers push changes.

```text
Git push
   ↓
Install dependencies
   ↓
Run linting
   ↓
Run tests
   ↓
Build application
```

### Continuous Delivery, CD

Continuous Delivery automatically prepares a release-ready build, but deployment to production may require manual approval.

```text
CI passes
   ↓
Build artifact created
   ↓
Deploy to staging
   ↓
Manual approval
   ↓
Deploy to production
```

### Continuous Deployment

Continuous Deployment automatically deploys every change that passes the pipeline to production.

```text
Git push
   ↓
Tests pass
   ↓
Build succeeds
   ↓
Deploy to production
```

### CI/CD comparison

| Term | Production Deployment |
|---|---|
| Continuous Integration | Automated build and tests |
| Continuous Delivery | Manual approval before production |
| Continuous Deployment | Automatic production deployment |

---

## Lesson 5 : CI/CD Pipeline

A CI/CD pipeline is an automated workflow that builds, tests, and deploys code.

### Example pipeline stages

```text
Checkout code
      ↓
Install dependencies
      ↓
Lint code
      ↓
Run unit tests
      ↓
Run integration tests
      ↓
Build application
      ↓
Scan dependencies
      ↓
Deploy to staging
      ↓
Run smoke tests
      ↓
Deploy to production
```

### GitHub Actions example

```yaml
# .github/workflows/deploy.yml

name: Deploy Next.js App

on:
  push:
    branches:
      - main

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install dependencies
        run: npm ci

      - name: Run lint
        run: npm run lint

      - name: Run tests
        run: npm test

      - name: Build application
        run: npm run build

      - name: Deploy
        run: echo "Deploy to hosting platform"
```

### Common CI/CD tools

| Tool | Use |
|---|---|
| GitHub Actions | CI/CD inside GitHub |
| GitLab CI/CD | CI/CD for GitLab repositories |
| Jenkins | Self-hosted automation server |
| CircleCI | Cloud CI/CD platform |
| Vercel | Frontend and full-stack deployment |
| Netlify | Frontend and serverless deployment |
| AWS CodePipeline | AWS deployment automation |

---

## Lesson 6 : Build Process

A build converts source code into an optimized, production-ready artifact.

### Frontend build example

```bash
npm ci
npm run build
```

For a React or Next.js application, this may:

- Compile TypeScript.
- Bundle JavaScript.
- Minify CSS and JS.
- Optimize images.
- Generate static pages.
- Create serverless functions.
- Produce deployment artifacts.

### Build artifact

A build artifact is the final output that gets deployed, such as:

- Static HTML, CSS, and JS files
- A Docker image
- A compiled Node.js application
- A serverless function bundle
- A `.zip` or `.tar` package

### Important principle

Build once, deploy the same artifact to multiple environments. This avoids differences between staging and production builds. [175]

---

## Lesson 7 : Environment Variables

Environment variables store configuration values outside source code, such as API keys, database URLs, and secrets.

### Example

```env
DATABASE_URL=postgresql://user:password@host:5432/database
JWT_SECRET=your_jwt_secret
STRAPI_API_TOKEN=your_api_token
NEXT_PUBLIC_API_URL=[https://api.example.com](https://api.example.com)
```

### Public vs private variables

| Prefix | Visibility |
|---|---|
| No prefix | Server-only |
| `NEXT_PUBLIC_` | Available in browser and server |

Never expose private secrets using `NEXT_PUBLIC_`.

### Best practices

- Never commit `.env` files to Git.
- Use different values for development, staging, and production.
- Rotate secrets regularly.
- Use secret managers for sensitive data.
- Give each environment only the permissions it needs.
- Avoid hardcoding URLs, API keys, or credentials.

---

## Lesson 8 : Docker and Containers

Docker packages an application and its dependencies into a container. Containers help ensure that the application runs consistently across development, staging, and production.

### Dockerfile example

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

### Build and run container

```bash
docker build -t my-nextjs-app .
docker run -p 3000:3000 my-nextjs-app
```

### Why containers matter

- Consistent environments.
- Easy dependency management.
- Portable across servers and clouds.
- Useful for scaling and orchestration.
- Reduces “works on my machine” problems.

---

## Lesson 9 : Deployment Strategies

Deployment strategies control how a new version replaces the old version in production. The most common strategies are rolling, blue-green, and canary deployments. [176][178]

### Recreate deployment

The old version is stopped completely before the new version starts.

```text
Old version stopped
      ↓
New version started
```

- Simple.
- Causes downtime.
- Suitable only for internal tools or low-traffic apps.

### Rolling deployment

The new version replaces old instances gradually.

```text
Old instance 1 → New instance 1
Old instance 2 → New instance 2
Old instance 3 → New instance 3
```

At any moment, some instances may run the old version while others run the new version. [180][186]

### Blue-green deployment

Two identical production environments are maintained: blue and green. One serves live traffic while the other receives the new version. After testing, traffic is switched. [180][183]

```text
Users → Blue environment (old version)

Deploy new version to Green
      ↓
Test Green
      ↓
Switch traffic to Green
      ↓
Users → Green environment (new version)
```

### Canary deployment

A small percentage of traffic is routed to the new version first. If metrics remain healthy, traffic is gradually increased. [176][180]

```text
95% users → Old version
5% users → New version
      ↓
Monitor errors and performance
      ↓
10% → 25% → 50% → 100%
```

### Strategy comparison

| Strategy | Downtime | Rollback | Cost | Complexity | Best For |
|---|---|---|---|---|---|
| Recreate | Yes | Slow | Low | Low | Internal tools |
| Rolling | Usually none | Moderate | Low | Low | Standard apps |
| Blue-green | None | Instant | High | Medium | Critical releases |
| Canary | None | Fast | Medium | High | High-traffic apps |

Blue-green deployments switch traffic between two environments for fast rollback, canary deployments release gradually to a small user group, and rolling deployments replace old instances in phases. [178][188]

---

## Lesson 10 : Rollback

Rollback is the process of returning to a previous stable version after a failed deployment.

### Rollback methods

| Method | Description |
|---|---|
| Git revert | Revert problematic commits and redeploy |
| Previous build | Redeploy the last known-good artifact |
| Blue-green switch | Switch traffic back to the old environment |
| Container rollback | Run the previous Docker image |
| Database rollback | Restore database migration or backup carefully |

### Rollback flow

```text
New deployment deployed
        ↓
Error rate increases
        ↓
Alert triggered
        ↓
Team rolls back to previous version
        ↓
Stable version restored
```

### Important rule

A traffic switch can roll back application code, but it cannot automatically reverse database writes or destructive schema changes. [182]

---

## Lesson 11 : Health Checks

Health checks determine whether a deployed application is running correctly.

### Example health endpoint

```js
// app/api/health/route.js

import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    timestamp: new Date().toISOString(),
  });
}
```

### Health check types

| Type | Purpose |
|---|---|
| Liveness check | Checks whether the app is running |
| Readiness check | Checks whether the app can handle traffic |
| Startup check | Checks whether the app has finished initializing |

### Deployment gate

```text
Deploy new instance
      ↓
Run health check
      ↓
Healthy? Add to load balancer
      ↓
Unhealthy? Stop deployment and roll back
```

---

## Lesson 12 : Database Migrations

Database migrations change the database structure, such as adding tables, columns, or indexes.

### Example migration

```sql
ALTER TABLE users
ADD COLUMN phone_number VARCHAR(20);
```

### Safe migration practices

- Back up the database before deployment.
- Test migrations in staging.
- Use backward-compatible changes.
- Avoid destructive changes during initial deployment.
- Deploy code and database changes in the correct order.
- Never mix schema changes with irreversible data deletion.
- Use feature flags when necessary.

### Safe migration order

```text
Add new column
      ↓
Deploy code that can work with or without it
      ↓
Backfill data if needed
      ↓
Remove old column later
```

---

## Lesson 13 : Zero-Downtime Deployment

Zero-downtime deployment means users can continue using the application while a new version is being released.

### Techniques

- Rolling deployments
- Blue-green deployments
- Canary deployments
- Load balancer health checks
- Feature flags
- Backward-compatible database migrations

### Example

```text
Old version running
      ↓
New version deployed alongside
      ↓
Health checks pass
      ↓
Traffic gradually shifted
      ↓
Old version removed
```

---

## Lesson 14 : Feature Flags

Feature flags allow developers to deploy code without immediately enabling new features for all users.

### Example

```jsx
const isNewDashboardEnabled = featureFlags.dashboardV2;

return isNewDashboardEnabled ? <DashboardV2 /> : <DashboardV1 />;
```

### Benefits

- Deploy code safely.
- Release features gradually.
- Test features with specific users.
- Disable features without redeploying.
- Reduce deployment risk.

### Use cases

- Beta features
- A/B testing
- Gradual rollout
- Emergency feature disablement
- Testing with internal users

---

## Lesson 15 : Monitoring After Deployment

Deployment is not complete when code goes live. You must monitor the application after release.

### What to monitor

| Metric | Why It Matters |
|---|---|
| Error rate | Detects broken functionality |
| Latency | Detects performance issues |
| Uptime | Detects availability problems |
| CPU and memory | Detects resource problems |
| Database queries | Detects slow queries |
| User behavior | Detects business impact |
| Logs | Helps debug failures |

### Post-deployment checklist

- Check application health endpoint.
- Verify main user flows.
- Monitor error tracking tools.
- Check server and database performance.
- Confirm environment variables.
- Test authentication and payment flows.
- Watch logs for unexpected errors.
- Be ready to roll back.

---

## Lesson 16 : Deployment for Static Sites

Static sites are simple to deploy because they contain pre-built files.

### Build

```bash
npm run build
```

### Deploy

Upload the build folder to:

- Vercel
- Netlify
- Cloudflare Pages
- GitHub Pages
- AWS S3 + CloudFront

### Example output

```text
out/
 ├── index.html
 ├── about.html
 ├── assets/
 │    ├── main.js
 │    └── styles.css
 └── images/
```

Static deployments are fast, cheap, and highly scalable because files can be served directly from a CDN.

---

## Lesson 17 : Deployment for Next.js

Next.js deployment depends on the features used.

### Static export

Use when the app does not require server-side features.

```js
// next.config.js

module.exports = {
  output: "export",
};
```

```bash
npm run build
```

### Server deployment

Use when the app requires server-side rendering, API routes, middleware, ISR, or Server Actions.

```bash
npm run build
npm start
```

### Serverless deployment

Platforms such as Vercel can automatically deploy Next.js apps:

```text
Git push
      ↓
Automatic build
      ↓
Static assets to CDN
      ↓
Serverless functions deployed
      ↓
Production URL updated
```

---

## Lesson 18 : Deployment for Full-Stack Applications

Full-stack applications may include:

- Frontend
- Backend API
- Database
- Authentication
- Background jobs
- File storage
- Caching layer

### Example architecture

```text
Next.js Frontend
      ↓
Backend API
      ↓
PostgreSQL Database
      ↓
Redis Cache
      ↓
S3 File Storage
```

### Deployment considerations

- Deploy frontend and backend independently when possible.
- Use environment-specific configuration.
- Keep database migrations separate from code deployment.
- Use health checks for each service.
- Monitor API latency and database performance.
- Use secrets management.
- Set up automated backups.

---

## Lesson 19 : Advantages of Automated Deployment

- Faster release cycles.
- Fewer human errors.
- Consistent builds.
- Easy rollback.
- Better collaboration.
- Safer production releases.
- Automated testing before release.
- Improved developer productivity.
- Faster recovery from failures.

---

## Lesson 20 : Disadvantages and Challenges

| Challenge | Explanation |
|---|---|
| Initial setup complexity | CI/CD pipelines require configuration |
| Pipeline failures | Tests, builds, or deployments can fail |
| Secret management | Misconfigured secrets can cause security issues |
| Database migration risk | Bad migrations can break production |
| Cost | Cloud and CI/CD usage can increase costs |
| Debugging complexity | Failures may occur in build, deploy, or runtime stages |
| Over-automation risk | Poorly designed automation can deploy bad code quickly |

---

## Lesson 21 : Most Important Interview Questions

### 1. What is deployment?

Deployment is the process of releasing application code to a hosting environment so users can access it.

### 2. What is CI/CD?

CI/CD stands for Continuous Integration and Continuous Delivery or Deployment. It automates building, testing, and releasing applications.

### 3. What is Continuous Integration?

Continuous Integration automatically builds and tests code whenever developers push changes to a repository.

### 4. What is Continuous Delivery?

Continuous Delivery automatically prepares a release-ready build, but production deployment requires manual approval.

### 5. What is Continuous Deployment?

Continuous Deployment automatically deploys every change that passes the CI/CD pipeline to production.

### 6. What is a deployment pipeline?

A deployment pipeline is an automated sequence of steps that builds, tests, and deploys an application.

### 7. What is a build artifact?

A build artifact is the final output of a build process, such as static files, a Docker image, or a serverless function bundle.

### 8. What is a staging environment?

A staging environment is a pre-production environment used to test changes before releasing them to production.

### 9. What is rollback?

Rollback is the process of returning to a previous stable version after a failed or problematic deployment.

### 10. What is blue-green deployment?

Blue-green deployment maintains two identical production environments and switches traffic from the old environment to the new one after testing. [180][183]

### 11. What is canary deployment?

Canary deployment releases a new version to a small percentage of users first, then gradually increases traffic if metrics remain healthy. [176][180]

### 12. What is rolling deployment?

Rolling deployment replaces old application instances with new ones gradually, usually in small batches. [180][186]

### 13. What is zero-downtime deployment?

Zero-downtime deployment allows a new version to be released without interrupting user access to the application.

### 14. What is a health check?

A health check is a request or automated test that verifies whether an application is running correctly and ready to receive traffic.

### 15. What is a feature flag?

A feature flag allows developers to enable or disable features without redeploying the application.

### 16. What are environment variables?

Environment variables store configuration values such as API keys, database URLs, and secrets outside source code.

### 17. Why should secrets not be committed to Git?

Committing secrets can expose database credentials, API keys, and private tokens to anyone with repository access.

### 18. What is Docker?

Docker packages an application and its dependencies into a portable container that can run consistently across environments.

### 19. What is a Docker image?

A Docker image is a read-only template containing the application code, runtime, dependencies, and configuration needed to create containers.

### 20. What is a container?

A container is a running instance of a Docker image.

### 21. What is a database migration?

A database migration changes the structure or data of a database, such as adding a table, column, or index.

### 22. What is a reverse proxy?

A reverse proxy forwards client requests to backend servers and can handle SSL termination, caching, load balancing, and security.

### 23. What is a load balancer?

A load balancer distributes incoming traffic across multiple servers to improve performance, reliability, and scalability.

### 24. What is blue-green deployment rollback?

In blue-green deployment, rollback is fast because traffic can be switched back to the previous environment immediately. [183][188]

### 25. What is the difference between deployment and release?

Deployment means code is deployed to an environment. Release means a feature is made available to users, often controlled by feature flags.

---

## Lesson 22 : Senior-Level Interview Questions

### 1. How would you design a safe deployment pipeline?

Use Git-based workflows, automated tests, linting, type checks, builds, dependency scanning, staging deployment, health checks, manual or automated approval, production deployment, monitoring, and rollback support.

### 2. How would you deploy a Next.js application with zero downtime?

Use a platform or infrastructure setup that supports rolling, blue-green, or canary deployment. Run health checks, keep database migrations backward compatible, and use CDN caching for static assets.

### 3. How would you handle a failed production deployment?

Check logs and monitoring, identify the failure cause, roll back to the last stable version if needed, communicate the incident, fix the issue in a separate branch, and redeploy after validation.

### 4. What is the difference between blue-green and canary deployment?

Blue-green switches all traffic between two complete environments, enabling instant rollback. Canary sends a small percentage of traffic to the new version and gradually increases it while monitoring metrics. [176][178]

### 5. Why can a deployment rollback fail?

Rollback can fail when database migrations are irreversible, when old code is incompatible with new database schema, when cached data is stale, or when external services have changed.

### 6. How would you deploy database changes safely?

Back up the database, test migrations in staging, use backward-compatible changes, deploy schema changes before code that depends on them, and avoid destructive operations during initial rollout.

### 7. What is immutable infrastructure?

Immutable infrastructure means servers or artifacts are not modified after deployment. Instead, a new version is built and deployed as a replacement.

### 8. What is GitOps?

GitOps uses Git as the source of truth for infrastructure and deployment configuration. Changes are applied automatically through CI/CD pipelines.

### 9. How would you secure a CI/CD pipeline?

Use least-privilege access, protect secrets, require code review, scan dependencies, sign artifacts, restrict deployment permissions, and audit pipeline activity.

### 10. How would you reduce deployment risk?

Use automated tests, preview environments, feature flags, gradual rollouts, health checks, monitoring, rollback plans, and clear incident-response procedures.

---

## Lesson 23 : Best Practices

- Use Git-based deployment workflows.
- Keep environments separate.
- Automate tests and builds.
- Build once and deploy the same artifact.
- Store secrets in secure environment variables.
- Never commit `.env` files.
- Use staging before production.
- Add health checks.
- Monitor deployments after release.
- Use feature flags for risky features.
- Keep database migrations backward compatible.
- Maintain a rollback plan.
- Use preview deployments for pull requests.
- Document the deployment process.
- Test rollback procedures regularly.

---

## Summary

Deployment is the process of releasing application code safely to production. A reliable deployment workflow includes Git, CI/CD, automated testing, builds, environment configuration, health checks, monitoring, and rollback strategies.

For beginners, start with Git, environments, builds, environment variables, and basic CI/CD. For interviews, focus on CI/CD pipelines, deployment strategies, blue-green vs canary vs rolling deployments, rollback, database migrations, Docker, health checks, and zero-downtime deployment.

This content is provided for learning purposes only. While we aim to keep it accurate and up to date, technologies evolve quickly. Please refer to official platform and DevOps documentation for the latest guidance.