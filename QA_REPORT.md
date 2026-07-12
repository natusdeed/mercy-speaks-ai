# QA Report — Mercy Speaks Digital

**Date:** 2026-07-12  
**Scope:** `my-app` production build (Vite + prerender), sitemap routes, local preview crawl  
**Method:** `npm run build`, dist HTML audit, HTTP crawl on `vite preview` (port 4173), Lighthouse 12 (perf + a11y)

---

## Verdict

Production build succeeds. All **35** sitemap routes return **200** with correct per-route titles after preview clean-URL fix. Unknown routes return **404** + `404.html`. SEO fields present on every sitemap page (title, description, canonical, exactly one H1, JSON-LD). No forbidden marketing strings in prerendered HTML. Remaining gaps need **your decisions** (demo phone, rates/terms, media, social profiles, DNS).

---

## 1. Build & routes

| Check | Result |
|-------|--------|
| `npm run build` | Pass (after vite.config fix) |
| Sitemap URLs | 35 |
| Prerendered routes | 42 + `404.html` |
| All sitemap paths HTTP 200 | Pass |
| Correct title per route (not homepage fallback) | Pass (after preview middleware) |
| Unknown path HTTP status | **404** + “Page Not Found \| Mercy Speaks Digital” |

### Fixed this pass

- **Build blocker:** Vite config bundler was inlining API route modules and failing on unresolved `@/lib/...` imports. Replaced bare `import('./src/...')` with `ssrLoad()` / regex aliases in `my-app/vite.config.ts`.
- **Preview SPA trap:** `/pricing` (no trailing slash) served homepage HTML. Added `preview-prerender-clean-urls` middleware so `dist/<path>/index.html` is served, and missing paths get `404.html` with status **404**.
- **Redirect prerender noise:** `/hvac`, `/plumbing`, `/solutions`, `/services/reputation-management` still warn that `<Navigate>` must not run on initial StaticRouter render (Vercel 301s already cover these). Non-blocking for sitemap routes.

---

## 2. SEO (every sitemap route)

All 35 routes: title + meta description + canonical + **exactly one H1** + JSON-LD present.  
Soft length guidance used: title ≤60, description 70–160.

| Path | Title (chars) | Desc (chars) | Canonical | H1 | JSON-LD types | Flags |
|------|---------------|--------------|-----------|----|---------------|-------|
| `/` | AI Receptionists & Websites \| Mercy Speaks Digital (50) | 149 | `/` | Websites and 24/7 AI Receptionists… | Organization, ProfessionalService, WebSite, FAQPage | — |
| `/services` | Services \| … (31) | 153 | `/services` | Services That Capture Revenue | Org, ProfessionalService, WebPage, Service, ItemList, BreadcrumbList | — |
| `/services/website-design` | Website Design & Development \| … (51) | 154 | ok | Conversion‑Focused Websites… | Org, ProfessionalService, WebPage, Service, BreadcrumbList | — |
| `/services/ai-phone-receptionist` | 24/7 AI Phone Receptionist \| … (49) | 134 | ok | AI phone receptionist | + FAQPage | — |
| `/services/missed-call-text-back` | Missed-Call Text Back \| … (44) | 156 | ok | Missed-Call Text Back: Win Back… | + FAQPage | — |
| `/services/workflow-automation` | Business Workflow Automation \| … (51) | 151 | ok | Workflow automation | + FAQPage | — |
| `/services/appointment-automation` | Appointment Automation \| … (45) | 145 | ok | Appointment automation | WebPage, Service, BreadcrumbList | — |
| `/services/website-chatbot` | Website Chat & Lead Capture \| … (50) | 147 | ok | Website chat that books | WebPage, Service, BreadcrumbList | — |
| `/services/review-generation` | Google Review Automation \| … (47) | 146 | ok | Your Reputation Is Your Most… | + FAQPage | — |
| `/services/voice-agents` | Custom AI Voice Agents \| … (45) | 156 | ok | Voice agents | + FAQPage | — |
| `/services/social-media-management` | Social Media Management \| … (46) | 155 | ok | Your Business Deserves a Social… | + FAQPage | — |
| `/services/rag-data` | Knowledge Bases & RAG for AI \| … (51) | 144 | ok | Knowledge & RAG data | WebPage, Service, BreadcrumbList | — |
| `/industries` | Industries \| … (33) | 159 | ok | AI receptionist systems by industry | WebPage, BreadcrumbList, ItemList | — |
| `/industries/hvac` | AI Receptionist for HVAC \| … (47) | 138 | ok | AI Receptionist & Missed-Call… | + FAQPage | — |
| `/industries/plumbing` | AI Receptionist for Plumbing \| … (51) | 155 | ok | AI Receptionist & Missed-Call… | + FAQPage | — |
| `/industries/dental` | AI Receptionist for Dental Offices \| … (57) | 153 | ok | AI Receptionist for Dental Offices | + FAQPage | — |
| `/industries/legal` | AI Receptionist for Law Firms \| … (52) | 154 | ok | AI Receptionist for Law Firms | + FAQPage | — |
| `/industries/churches` | AI Receptionist for Churches \| … (51) | 146 | ok | AI Receptionist for Churches… | + FAQPage | — |
| `/industries/auto-repair` | AI Receptionist for Auto Repair \| … (54) | 141 | ok | AI Receptionist for Auto Repair Shops | + FAQPage | — |
| `/roofing` | AI Receptionist for Roofing \| … (50) | 147 | ok | Stop losing storm and emergency jobs… | WebPage, BreadcrumbList | — |
| `/houston` | Houston Web Design & AI Receptionists \| … (60) | 144 | ok | Web Design & AI Receptionists in Houston, TX | + LocalBusiness, FAQPage | — |
| `/richmond-tx` | Website Design & AI in Richmond, TX \| … (58) | 149 | ok | Website Design & AI Automation in Richmond… | + LocalBusiness, FAQPage | — |
| `/pricing` | Pricing \| … (30) | 136 | ok | Simple, transparent pricing | OfferCatalog, FAQPage, BreadcrumbList | — |
| `/results` | Results & Proof \| … (38) | 153 | ok | Results | WebPage, BreadcrumbList | — |
| `/testimonials` | Testimonials \| … (35) | 146 | ok | Client testimonials | WebPage, BreadcrumbList | — |
| `/about` | About Mercy Speaks Digital \| Houston-Area… (57) | 155 | ok | Modern Websites & Digital Solutions | WebPage, BreadcrumbList | — |
| `/blog` | Blog & Resources \| … (39) | 131 | ok | Blog & resources | ItemList, BreadcrumbList | — |
| `/contact` | Contact Mercy Speaks Digital \| Websites & AI Automation (55) | 153 | ok | Let's Talk | ContactPage, BreadcrumbList | — |
| `/book-demo` | Book a Demo \| … (34) | 147 | ok | Pick a time that works for you | WebPage, BreadcrumbList | — |
| `/ai-employee-system` | AI Employee System \| … (41) | 152 | ok | Your 24/7 AI Employee Team… | WebPage, BreadcrumbList | — |
| `/cookie-policy` | Cookie Policy \| … (36) | 154 | ok | Cookie Policy | WebPage, BreadcrumbList | — |
| `/blog/ai-receptionist-vs-answering-service` | AI vs Answering Service \| … (46) | 144 | ok | AI Receptionist vs. Human… | BlogPosting, FAQPage | — |
| `/blog/diy-ai-receptionist-vs-done-for-you` | DIY vs Done-for-You AI Setup \| … (51) | 143 | ok | DIY AI Receptionist Tools vs… | BlogPosting, FAQPage | — |
| `/blog/how-much-does-an-ai-receptionist-cost` | AI Receptionist Cost in 2026 \| … (51) | 153 | ok | How Much Does an AI Receptionist Cost… | BlogPosting, FAQPage | — |
| `/blog/what-is-missed-call-text-back` | What Is Missed-Call Text Back? \| … (53) | 138 | ok | What Is Missed-Call Text Back… | BlogPosting, FAQPage | — |

### Fixed this pass

- Shortened overlong titles (home, contact, AI receptionist, missed-call, voice agents, website design, local/industry meta descriptions).
- Trimmed industry/local meta descriptions that exceeded ~160 characters.

---

## 3. Links

### Internal

- All discovered internal `href`s resolve (0 broken; 0 missing hash targets).
- Legacy aliases (`/hvac`, `/plumbing`, `/solutions`, `/services/reputation-management`) are **301** in `my-app/vercel.json` (not in sitemap).

### External (status from crawl)

| URL | Status | Notes |
|-----|--------|--------|
| https://cal.com/natusdeed/free-ai-receptionist-demo | 200 | OK |
| https://davita-auto-logistics.vercel.app/ | 200 | Demo deploy — needs production domain (decision) |
| https://facebook.com/mercyspeaksdigital | 200 | OK |
| https://instagram.com/mercyspeaksdigital | 200 | OK |
| https://primeglogistics.com/ | 200 | Portfolio |
| https://www.rccgshilohmega.org/ | 200 | Portfolio |
| https://linkedin.com/company/mercyspeaksdigital | **404** | Decision: create page or remove from `SOCIAL_LINKS` |
| https://twitter.com/mercyspeaksai | **404** | Decision: create/X handle or remove |
| https://youtube.com/@mercyspeaksdigital | **404** | Decision: create channel or remove |

---

## 4. Content integrity

| Forbidden string | In prerendered marketing HTML? |
|------------------|--------------------------------|
| `lorem` / lorem ipsum | No |
| Martinez HVAC / Carlos Martinez | No |
| Elite Dental / Chen's Auto | No |
| `$0 in` / `0% missed` | No |
| `NEEDS_REAL` literal | No (config sentinels; UI shows pending copy) |
| `Video preview placeholder` | **Removed** — How It Works video gated on `siteContent.demoMedia.videoUrl` |
| `mercyspeaks.ai` in rendered HTML | No (allowed functional ref remains in `widget-tenant.ts` allowlist) |

### FAQ prerender

- Homepage: all `HOME_PAGE_FAQS` answers present in HTML (0 missing).
- Accordion always mounts answers in the DOM (`hidden` when collapsed) — good for SEO.
- Pricing / AI receptionist / HVAC: FAQ sections present with answer text in source.

### Honest pending UI (not forbidden, but incomplete)

- Pricing overage rows → “Published overage rates coming soon — ask on your call”
- Billing terms → “Confirmed in writing before you start — ask on your strategy call”
- Live demo: “Sample audio is coming soon…” when `demoPhoneNumber` / `audioUrl` are null
- Testimonials: empty-state / Google widget placeholder box (intentional until real reviews)

---

## 5. Performance (Lighthouse, mobile-ish lab, local preview)

| Page | Perf | LCP | CLS | TBT (INP proxy) | FCP | Notes |
|------|------|-----|-----|-----------------|-----|--------|
| `/` | **0.43** | 4.8s | ~0 | **1400ms** | 4.2s | Heaviest page (motion + demo + portfolio) |
| `/pricing` | 0.78 | 3.6s | 0 | 160ms | 3.5s | |
| `/services/ai-phone-receptionist` | 0.80 | 3.6s | 0 | 0ms | 3.4s | |
| `/industries/hvac` | 0.80 | 3.6s | 0 | 60ms | 3.4s | |
| `/blog/what-is-missed-call-text-back` | 0.77 | 3.6s | 0 | 190ms | 3.4s | |

### Images / blocking / widget

- Prerendered `<img>` tags: dimensions + lazy/eager present; Lighthouse `unsized-images` score 1.
- Render-blocking: Geist Google Fonts stylesheet (expected); no major third-party besides fonts on first paint.
- **Chat widget:** deferred until idle/first interaction (`SiteChatWidget`) — does not load in cold Lighthouse unless interaction; good for LCP. Impact when loaded: extra `/widget.js` + network — acceptable tradeoff; keep deferred.
- Fonts: `preconnect` to Google Fonts already present.
- **Added:** `preconnect` to `cal.com` / `app.cal.com` in `index.html`.

### Fixed this pass

- Image `width`/`height` on testimonial + live-demo dashboard imgs.
- Cal.com preconnects.
- Fake How It Works video shell removed (was promising media that did not exist).

### Needs your decision / larger work

- Homepage LCP/TBT still weak (code-split home sections, reduce Framer Motion on first paint, self-host Geist, optional critical CSS).
- Whether to ship sample-call audio / demo video (currently gated off).

---

## 6. Accessibility

Lighthouse a11y scores: home/pricing/hvac **0.96**; AI receptionist/blog **0.92**.

| Issue | Where | Action |
|-------|--------|--------|
| Color contrast | Cookie “REJECT NON-ESSENTIAL”, `text-slate-500` labels | **Fixed** — stronger reject button colors; slate-500 → slate-400 on flagged copy |
| Links by color only | Service marketing body links | **Fixed** — always underline on `[&_a]` |
| Touch targets | Blog TOC links | **Fixed** — `min-h-11` + padding + underline |
| Accordion / nav | FAQ accordion has `aria-expanded` / `aria-controls` / `role="region"`; nav dropdowns use `aria-expanded`, `aria-haspopup`, `aria-controls` | Pass |
| Focus | Skip link + `focus-visible` rings on CTAs | Pass |
| Alt text | Portfolio/testimonial imgs have descriptive alts; no missing alts in prerender | Pass |

Remaining low-contrast risk: decorative `text-slate-500` elsewhere (e.g. footer map icons) — optional polish, not failing critical flows.

---

## 7. Meta / social (3 samples)

| Page | og:title | og:description len | og:image | twitter:card | twitter:image |
|------|----------|--------------------|----------|--------------|---------------|
| `/` | Matches title | 149 | `/og/home.png` (1200×630) | summary_large_image | same |
| `/pricing` | Pricing \| Mercy Speaks Digital | 136 | `/og/pricing.png` | summary_large_image | same |
| `/services/ai-phone-receptionist` | Matches title | 134 | `/og/ai-phone-receptionist.png` | summary_large_image | same |

OG alt + width/height present site-wide via SeoHead defaults.

---

## Fixed (auto) — checklist

1. Vite build: `ssrLoad` for API middleware + regex `@/` aliases  
2. Preview clean URLs + HTTP 404 for unknown paths  
3. How It Works: remove “Video preview placeholder”; gate real video  
4. SEO title/description length trims (home, services, industries, local, contact)  
5. Cal.com + font preconnects  
6. Image dimensions on remaining marketing imgs  
7. Cookie reject button contrast; slate-500 → slate-400 on flagged text  
8. Blog TOC target size; prose links always underlined  

---

## Needs human input

| Item | Where | Why |
|------|--------|-----|
| **Real demo phone number** | `siteConfig.demoPhoneNumber` in `site-config.ts` | Live “Call the AI” CTA stays fallback until set |
| **Overage rates** | `PLAN_OVERAGE_ROWS` / `NEEDS_REAL_RATES` in `pricing-tiers.ts` | UI shows “coming soon — ask on your call” |
| **Cancellation / contract / number-&-data terms** | `BILLING_TERMS` / `NEEDS_REAL_TERMS` | Same honest pending copy |
| **Sample-call audio (+ transcript)** | `siteContent.demoMedia.audioUrl` | “Sample audio is coming soon” on LiveDemo |
| **Demo video** | `siteContent.demoMedia.videoUrl` | How It Works embed only when set |
| **Davita production domain** | `DAVITA_AUTO_LOGISTICS_URL` | Still Vercel demo URL |
| **DNS 301s** | `REDIRECTS.md` | mercyspeaks.ai → www.mercyspeaksdigital.com; apex → www; HTTP → HTTPS — **manual DNS/hosting** |
| **Social profiles 404** | LinkedIn / Twitter(X) / YouTube in `SOCIAL_LINKS` | Create accounts or remove links + JSON-LD `sameAs` |
| **Google reviews embed** | Testimonials page | Optional Business Profile widget |

---

## Reproduce

```bash
cd my-app
npm run build
npx vite preview --host 127.0.0.1 --port 4173 --strictPort
node scripts/qa-seo-dist.mjs
node scripts/qa-crawl.mjs http://127.0.0.1:4173
# Optional: lighthouse JSON already written as qa-lh-*.json
```

Artifacts (local, gitignored-friendly): `my-app/qa-crawl-results.json`, `my-app/qa-seo-dist.json`, `my-app/qa-lh-*.json`.
