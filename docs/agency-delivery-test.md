# Agency delivery test — mercyspeaksdigital.com

Documentation-only handoff. This file records what this repository already uses. It does not change the site, dependencies, or production settings.

Inspected on 2026-10-04 from the repo root (`natusdeed/mercy-speaks-ai`).

## Detected framework

The marketing site is a **Vite 5 + React 19** single-page app in the `my-app` npm workspace, with **React Router DOM 6**, **TypeScript**, and **Tailwind CSS v4**.

| Source | What it says |
| --- | --- |
| Root `package.json` | npm workspaces: `my-app`, `server`. `"build": "npm run build -w my-app"`. `"engines": { "node": "24.x" }`. |
| `my-app/package.json` | `"dev": "vite"`, `"build"` runs blog generation, sitemap generation, `vite build`, then `tsx … scripts/prerender.tsx`. Dependencies include `react` ^19, `react-router-dom` ^6, `vite` ^5.4, `tailwindcss` ^4. |
| Root `vercel.json` | `"framework": null`, `"buildCommand": "NODE_OPTIONS=--max-old-space-size=4096 npm run build"`, `"outputDirectory": "my-app/dist"`, `"installCommand": "npm install"`. |
| `DEPLOYMENT.md` | "This project uses **Vite + React Router** (not Next.js)." Vercel root directory stays `.` (repo root), not `my-app`. |
| `PROJECT_MAP.md` | Vite 5 + React 19, React Router, Tailwind CSS v4, prerender to `dist/**/index.html` and `dist/404.html`. |

`my-app/README.md` is leftover `create-next-app` text and still says Next.js. The scripts, Vite config, and Vercel output directory do not. Treat Vite as the framework.

There is no Next.js app router build. `vercel.json` leaves the framework preset unset (`null`) and publishes the static Vite output.

## Existing build command

Run this from the **repository root**. It is the command already set in `vercel.json` `buildCommand`. It calls the root npm script, which builds the `my-app` workspace.

```bash
NODE_OPTIONS=--max-old-space-size=4096 npm run build
```

That expands to the `my-app` script already in `my-app/package.json`:

```bash
npm run generate:blog && npm run generate:sitemap && vite build && tsx --tsconfig tsconfig.prerender.json scripts/prerender.tsx && npm run generate:blog && npm run generate:sitemap
```

Install command already in `vercel.json`: `npm install`.

Published files: `my-app/dist`.

## Build check (this handoff)

Command run from the repo root:

```bash
NODE_OPTIONS=--max-old-space-size=4096 npm run build
```

**Result: pass** (process exit code 0).

Relevant output:

- `blog: 4 post(s) (4 published)`
- `sitemap my-app/public/sitemap.xml (35 urls)`
- `vite v5.4.21 building for production...` then `✓ built in 3.76s`
- `Prerendered 42 routes + 404.html. Set VITE_SITE_URL in build env for canonicals.`
- Closing sitemap line: `sitemap my-app/dist/sitemap.xml (35 urls)`

Warnings printed during the same successful run (they did not fail the build):

- Pricing copy still has placeholder overage rates and billing terms (`NEEDS_REAL_RATES`, `NEEDS_REAL_TERMS`).
- One JS chunk is larger than 500 kB after minification.
- React Router `<Navigate>` on the initial static render for `/solutions`, `/hvac`, and `/plumbing` (those paths are also permanent redirects in root `vercel.json`).
- `VITE_SITE_URL` was not set in this environment, so prerender used its existing fallback for canonicals.

Environment note: root `package.json` asks for Node `24.x`. This run used Node `v22.14.0`. `npm ci` printed `EBADENGINE` and still installed. The build then passed.

The build rewrote `<lastmod>` dates in `my-app/public/sitemap.xml` (2026-07-12 → 2026-10-04). That file was restored and is **not** part of this change.

## Website delivery checklist

Short list of what this project already does before a site handoff. Do not add a new build script or change production settings to satisfy it.

1. **Install at the repo root.** `npm install` (Vercel `installCommand`). Keep the Vercel root directory as `.`, not `my-app` (`DEPLOYMENT.md`).
2. **Build with the existing command.** `NODE_OPTIONS=--max-old-space-size=4096 npm run build`. Confirm the log shows Vite production build, 35 sitemap URLs, and `Prerendered 42 routes + 404.html`.
3. **Publish `my-app/dist` only.** That is `outputDirectory` in root `vercel.json`. Marketing routes are static `dist/<path>/index.html` files.
4. **Keep the current 404 behavior.** Unknown paths are served from `dist/404.html` with HTTP 404. Root `vercel.json` rewrites only `/api/*`, `/dashboard`, and `/admin` to the client app. There is no catch-all rewrite to `index.html`.
5. **Keep the existing permanent redirects** in root `vercel.json`: `/services/reputation-management` → `/services/review-generation`, `/solutions` → `/services`, `/hvac` → `/industries/hvac`, `/plumbing` → `/industries/plumbing`.
6. **Leave security headers as configured** on `/(.*)`: `Permissions-Policy`, `X-Content-Type-Options`, `X-Frame-Options`, `X-XSS-Protection`, `Referrer-Policy`.
7. **Set canonicals at build time when a real deploy needs them.** Prerender prints `Set VITE_SITE_URL in build env for canonicals.` Production fallback in the app is `https://www.mercyspeaksdigital.com` (`PROJECT_MAP.md`). Do not commit `.env` or `.env.local`.
8. **After a deploy, check status codes** the way `PROJECT_MAP.md` already describes:
   - `https://www.mercyspeaksdigital.com/this-does-not-exist` → HTTP 404
   - `https://www.mercyspeaksdigital.com/pricing` → HTTP 200
9. **Do not promote a preview.** `DEPLOYMENT.md` notes that a push to `main` triggers a production redeploy. A branch preview is not a production release.
