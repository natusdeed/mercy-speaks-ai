# Ship log — site audit overhaul

**Date:** 2026-07-12 (UTC)  
**Operator:** Cursor agent (local ship from `c:\Users\letth\mercyspeaks.ai`)  
**Canonical production domain:** https://www.mercyspeaksdigital.com

---

## Git

| Item | Value |
|------|--------|
| Feature branch | `site-audit-fixes` (created this session; had uncommitted work on `main`, not a pre-existing remote branch) |
| Merge strategy | Fast-forward `main` ← `site-audit-fixes` (repo history is linear; no squash) |
| Commit range merged | `d8f011b` → `9f8a123` |
| Ship commit | `9f8a1231940954d04fea945849589edccdf8d6ea` |
| Commit title | Site audit overhaul: trust fixes, technical SEO, LLM SEO, demo modules, industry + local pages, blog |
| Remote | `origin` (`https://github.com/natusdeed/mercy-speaks-ai.git`) |
| Push result | `site-audit-fixes` and `main` both at `9f8a123` (`main` push: `d8f011b..9f8a123`) |

### Pre-flight (completed before push)

- `npm run build` in `my-app` — **pass** (35 sitemap URLs; 42 prerendered routes + `404.html`)
- Content-integrity grep on `my-app/src` + `my-app/public` + prerendered `dist` — no user-facing hits for fabricated names (`Martinez HVAC`, `Carlos Martinez`, `Elite Dental`, `Chen's Auto`), `lorem`, `$0 in`, or `mercyspeaks.ai` in marketing HTML. Remaining `placeholder` matches are form `placeholder=` attrs, Tailwind classes, dashboard stubs, or developer comments (allowed). Functional allowlist ref remains in `widget-tenant.ts`.
- `QA_REPORT.md`, `REDIRECTS.md`, `PLACEHOLDERS_FOUND.md` — present. `QA_REPORT.md` has **no open critical blockers**; remaining items are human decisions (see below).
- Root `vercel.json` updated so path **redirects** live in the repo-root config Vercel actually uses (previously only in `my-app/vercel.json`). Catch-all SPA rewrite to `/index.html` removed so static `404.html` can return real **404**s; SPA rewrites kept only for `/dashboard` and `/admin`.

---

## Vercel / production

GitHub integration **did** trigger (no local `vercel` CLI login / `VERCEL_TOKEN` available — could not run `vercel ls`; verified via GitHub Deployments API + live HTTP).

| Project (GitHub env label) | Deployment ID | SHA | State | Deployment URL |
|----------------------------|---------------|-----|-------|----------------|
| **Production – mercyspeaks.ai** | `5409497828` | `9f8a123` | **success** | https://mercyspeaks-6ok816y4g-natusdeed-5105s-projects.vercel.app |
| Preview – mercyspeaks.ai | `5409491250` | `9f8a123` | success | https://mercyspeaks-gr6ik164x-natusdeed-5105s-projects.vercel.app |
| Production – mercy-speaks-ai | `5409494631` | `9f8a123` | success | https://mercy-speaks-a0v32tjfp-natusdeed-5105s-projects.vercel.app |
| Preview – mercy-speaks-ai | `5409491215` | `9f8a123` | success | https://mercy-speaks-1ihj1zzep-natusdeed-5105s-projects.vercel.app |

Local `.vercel/project.json` links this checkout to project **`mercyspeaks.ai`** (`prj_vVSLZpWkmfNZkTRtsMUwbnRaK65f`). A second project **`mercy-speaks-ai` / `my-app`** also received deploys from the same push.

### Production domain confirmation (post-deploy)

Probed **https://www.mercyspeaksdigital.com** after Production deploy `5409497828`:

| Check | Result |
|-------|--------|
| `/` | 200, `Last-Modified: Sun, 12 Jul 2026` (new build, not Jul 8 stale) |
| `/llms.txt` | 200, `text/plain` (new LLM SEO file) |
| `/blog` | 200 |
| `/industries/hvac` | 200 |
| `/houston` | 200 |
| `/richmond-tx` | 200 |
| `/services/missed-call-text-back` | 200 |
| `/hvac` | **308** → `/industries/hvac` (permanent redirect from `vercel.json`) |
| `/solutions` | **308** → `/services` |
| Unknown path | **404** + 404 page HTML (real 404; catch-all SPA rewrite removed) |

---

## Needs your manual attention

These were **not** auto-fixed; they need your decisions / dashboard / DNS:

1. **DNS 301s** — complete checklist in `REDIRECTS.md` (`mercyspeaks.ai` → `www.mercyspeaksdigital.com`, apex → www, HTTP → HTTPS). Cursor cannot set DNS.
2. **Demo phone number** — set `siteConfig.demoPhoneNumber` in `my-app/src/lib/site-config.ts` (Live “Call the AI” stays gated until set).
3. **Overage rates** — replace `NEEDS_REAL_RATES` placeholders in `PLAN_OVERAGE_ROWS` (`my-app/src/content/pricing-tiers.ts`). UI currently shows “Published overage rates coming soon — ask on your call”.
4. **Billing terms** — fill `BILLING_TERMS` / `NEEDS_REAL_TERMS` in the same file.
5. **Sample-call audio / demo video** — set `siteContent.demoMedia.audioUrl` / `videoUrl` when assets exist.
6. **Social profiles** — LinkedIn / Twitter(X) / YouTube URLs in `SOCIAL_LINKS` were **404** at QA time; create accounts or remove from footer + JSON-LD `sameAs`.
7. **Davita production domain** — still on a Vercel demo URL per QA.
8. **CLI auth (optional)** — to run `vercel ls` / `vercel --prod` locally next time:
   - `npm i -g vercel` (or use `npx vercel`)
   - `vercel login`
   - from repo root: `vercel link` (select **mercyspeaks.ai** / `prj_vVSLZpWkmfNZkTRtsMUwbnRaK65f`)
   - or set `VERCEL_TOKEN` in the environment

### Not committed (local QA artifacts)

Left untracked on purpose: `my-app/qa-crawl-results.json`, `my-app/qa-lh-*.json`, `my-app/qa-seo-dist.json`.
