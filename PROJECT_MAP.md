# PROJECT_MAP

Short map of the marketing site. **Do not treat `src/app/**/page.tsx` as Next.js file routing** — routes are wired manually in React Router.

---

## 1. Framework & build tooling

| Layer | Choice |
|-------|--------|
| App | **Vite 5** + **React 19** (`my-app/`) |
| Routing | **React Router DOM 6** (`BrowserRouter` in `my-app/src/main.tsx`; `StaticRouter` in prerender) |
| Styling | Tailwind CSS v4 (`my-app/postcss.config.mjs`, `my-app/src/app/globals.css`) |
| SEO | `react-helmet-async` via `my-app/src/lib/react-helmet-compat.*` |
| Monorepo | npm workspaces: `my-app`, `server` (root `package.json`) |

**Key configs**

- `my-app/vite.config.ts` — Vite build, `@` alias, dev API middleware, `/api/ai` proxy → `:3001`
- `my-app/index.html` — HTML shell + default meta + favicon links (`vite-prerender-head` markers)
- Build: `vite build && tsx … scripts/prerender.tsx` (`my-app/package.json`)
- Prerender: `my-app/scripts/prerender.tsx` — `renderToString` + `StaticRouter` + `HelmetProvider`; writes per-route `dist/**/index.html`, injects title/meta/canonical into the head region, and writes `dist/404.html` from the catch-all NotFound route

Not Next.js SSR. Not file-based routing.

---

## 2. Public routes (source of truth: `my-app/src/App.tsx`)

Shared chrome: `PublicChrome` → `Header` + `<Outlet />` + `Footer`.

| Path | Component file |
|------|----------------|
| `/` | `my-app/src/app/page.tsx` |
| `/services` | `my-app/src/pages/Services.tsx` (canonical hub) |
| `/solutions` | **301 → `/services`** (`vercel.json` + `<Navigate>` in `App.tsx`) |
| `/pricing` | `my-app/src/app/pricing/page.tsx` (Starter / Growth / Pro packages) |
| `/results` | `my-app/src/app/results/page.tsx` |
| `/testimonials` | `my-app/src/app/testimonials/page.tsx` |
| `/about` | `my-app/src/pages/About.tsx` |
| `/contact` | `my-app/src/app/contact/page.tsx` |
| `/book-demo` | `my-app/src/app/book-demo/page.tsx` |

### `/services/*`

| Path | Component file |
|------|----------------|
| `/services/ai-phone-receptionist` | `my-app/src/pages/services/AIPhoneReceptionist.tsx` |
| `/services/appointment-automation` | `my-app/src/pages/services/AppointmentAutomation.tsx` |
| `/services/rag-data` | `my-app/src/pages/services/RAGData.tsx` |
| `/services/review-generation` | `my-app/src/pages/services/ReviewGeneration.tsx` → re-exports `app/services/review-generation/page.tsx` |
| `/services/reputation-management` | Same component as review-generation (alias in `App.tsx`; also redirected in `my-app/vercel.json`) |
| `/services/social-media-management` | `my-app/src/pages/services/SocialMediaManagement.tsx` → re-exports `app/services/social-media-management/page.tsx` |
| `/services/voice-agents` | `my-app/src/pages/services/VoiceAgents.tsx` |
| `/services/website-chatbot` | `my-app/src/pages/services/WebsiteChatbot.tsx` |
| `/services/website-design` | `my-app/src/app/services/website-design/page.tsx` |
| `/services/workflow-automation` | `my-app/src/pages/services/WorkflowAutomation.tsx` |
| `/cookie-policy` | `my-app/src/pages/CookiePolicy.tsx` |
| `*` (404) | `my-app/src/pages/NotFound.tsx` — also prerendered to `dist/404.html` |

Most template-style service pages use `my-app/src/components/templates/service-marketing-page.tsx`.

Other public routes (not in the list above): `/portfolio` (→ `/results`), `/roofing`, `/hvac`, `/plumbing`, `/ai-employee-system`, `/widget/frame`, `/widget/install`, plus `/dashboard/*` and `/admin/prospecting` outside `PublicChrome`.

---

## 3. Shared layout components

| Role | Path |
|------|------|
| Header / nav | `my-app/src/components/navigation/header.tsx` |
| Footer | `my-app/src/components/navigation/footer.tsx` |
| SEO / meta | `my-app/src/components/seo/seo-head.tsx` (+ `json-ld.tsx`) |
| Root shell (site chat widget) | `my-app/src/app/layout.tsx` — deferred `SiteChatWidget` (product `/widget.js` dogfood); **not** header/footer |
| Page content wrapper | `my-app/src/components/ui/page-shell.tsx` |
| Breadcrumbs (per-page) | `my-app/src/components/navigation/breadcrumbs.tsx` |

Header/footer are mounted once in `PublicChrome` inside `App.tsx`.

### Site-wide chat widget (dogfood)

Product embed loaded from `RootLayout` via `my-app/src/components/SiteChatWidget.tsx` (same snippet shape as `/widget/install`: `/widget.js` + `data-tenant` / `data-key`).

- **Deferred:** injects after `requestIdleCallback` (≈4s timeout) or first user interaction — not on critical path for LCP/INP.
- **Excluded routes:** `/widget/*`, `/dashboard` (and nested).
- **Null-safe:** if `VITE_MERCY_WIDGET_TENANT_ID` is unset, the component renders nothing (no crash).

| Env var | Where | Purpose |
|---------|--------|---------|
| `VITE_MERCY_WIDGET_TENANT_ID` | Client (required to show) | Tenant id for the script tag |
| `VITE_MERCY_WIDGET_PUBLIC_KEY` | Client (optional) | `data-key` when the tenant requires a public key |
| `VITE_MERCY_WIDGET_BASE_URL` | Client (optional) | Widget host; defaults to page origin |
| `MERCY_TENANT_ID` | Server | Fallback single-tenant id when Supabase is unset |
| `MERCY_WIDGET_DOMAINS` | Server | Comma-separated allowlist (must include this site) |
| `MERCY_WIDGET_PUBLIC_KEY` | Server | Expected public key (pair with Vite key) |
| `MERCY_WIDGET_GREETING` | Server | First assistant message in the frame |
| `MERCY_WIDGET_QUICK_REPLIES` | Server | Pipe-separated quick replies (`Pricing\|How the AI receptionist works\|Book a demo`) |
| `MERCY_WIDGET_NAME` / colors / `MERCY_WIDGET_SYSTEM_PROMPT` / booking URLs | Server | Branding + chat behavior |

Local without Supabase: set `VITE_MERCY_WIDGET_TENANT_ID=demo` and `VITE_MERCY_WIDGET_PUBLIC_KEY=demo_public_key` (built-in demo tenant in `widget-tenant.ts`). See also `.env.example` and `docs/WIDGET.md`.

---

## 4. Meta tags, titles, canonicals

Per-page via **`SeoHead`** (`react-helmet-async` / Helmet):

- Title: `/` → `Mercy Speaks Digital | AI Receptionists, Websites & Automation`; others → `{title} | Mercy Speaks Digital`
- Canonical / `og:url`: `absoluteUrl(canonicalPath ?? path)` from `my-app/src/lib/site-config.ts` (`VITE_SITE_URL`, fallback `https://www.mercyspeaksdigital.com`)
- Also sets description, robots, Open Graph, Twitter, theme-color
- Structured data: `JsonLd` + builders in `my-app/src/lib/schema.ts`

At build time, `scripts/prerender.tsx` hoists rendered `<title>` / `<meta>` / `<link rel="canonical">` into each route’s HTML. Default fallbacks live in `my-app/index.html` between prerender markers.

---

## 5. Static public files

All under **`my-app/public/`** (copied to `dist/` by Vite):

| Asset | Path |
|-------|------|
| `robots.txt` | `my-app/public/robots.txt` |
| `sitemap.xml` | `my-app/public/sitemap.xml` |
| Favicons | `favicon.ico`, `favicon-*.png`, `apple-touch-icon.png` (linked from `index.html`) |
| Other | `widget.js`, `images/`, `portfolio/` |

Generator (optional): `my-app/scripts/generate-favicons.cjs`.

---

## 6. Sitemap generation

**Hand-maintained static file** — `my-app/public/sitemap.xml`. No package script generates it.

`PRERENDER_PATHS` in `scripts/prerender.tsx` is documented as aligned with the sitemap (+ `/portfolio`). `robots.txt` points at `https://www.mercyspeaksdigital.com/sitemap.xml`.

Note: `/services/social-media-management` is routed/prerendered but **not** listed in the current sitemap.

---

## 7. Hosting config

**Primary:** root `vercel.json`

- `buildCommand`: `NODE_OPTIONS=--max-old-space-size=4096 npm run build`
- `outputDirectory`: `my-app/dist`
- `framework`: `null`
- Security headers on `/(.*)`
- Rewrites (SPA-only; **no** catch-all to `index.html`):
  - `/api/:path*` → API
  - `/dashboard` and `/dashboard/:path*` → `/index.html` (client router)
  - `/admin` and `/admin/:path*` → `/index.html` (client router)
- **404 status:** prerender writes `my-app/dist/404.html`. With no SPA catch-all rewrite, Vercel serves that file with **HTTP 404** for unknown paths (avoids soft-404 homepage-at-200).
- Marketing routes are prerendered to `dist/<path>/index.html` and return **200** as static files.

**Verify after deploy:**

```bash
curl -I https://www.mercyspeaksdigital.com/this-does-not-exist
# Expect: HTTP/2 404 (or HTTP/1.1 404) and body from 404.html

curl -I https://www.mercyspeaksdigital.com/pricing
# Expect: HTTP/2 200
```

**App-level:** `my-app/vercel.json` — permanent redirect `/services/reputation-management` → `/services/review-generation`

API: `api/[...path].ts` → `lib/vercel-api-dispatch.ts`. No `netlify.toml`.

---

## 8. Homepage sections (composed in `my-app/src/app/page.tsx`)

| Section | Component | Notes |
|---------|-----------|--------|
| **Real Results** (stat counters) | `my-app/src/components/sections/proof.tsx` | Heading “Real Results from Real Businesses”; counters via `my-app/src/hooks/use-count-up.ts` |
| **Trusted by** strip | `my-app/src/components/sections/ClientLogos.tsx` | “Trusted by local businesses across Houston” (placeholder names) |
| **See It In Action** | `my-app/src/components/sections/live-demo-home.tsx` | `id="live-demo"` |
| **FAQ accordion** | `my-app/src/components/sections/faq.tsx` | Copy: `my-app/src/content/home-faqs.ts`; custom Framer Motion accordion |

Order on the homepage (relevant slice): `…` → `<Proof />` → `<ClientLogos />` → `<LiveDemoHome />` → … → `<FAQ />` → `<FinalCTA />`.

Unused alternate: `my-app/src/components/sections/social-proof.tsx` (“Trusted by 47+…”) is not imported on the homepage.
