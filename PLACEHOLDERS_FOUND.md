# Placeholders found (review list)

Scan date: 2026-07-10  
Scope: `my-app/src` (and related marketing/dashboard UI)  
Search terms: `placeholder`, `TODO`, `lorem`, `coming soon` (plus closely related user-visible stub copy)

**Do not delete these without review.** This file is an inventory only.

---

## Fixed / gated in this pass

| Location | Notes |
|----------|--------|
| `my-app/src/components/sections/live-demo-home.tsx` | Former user-facing strings `"Sample call — placeholder"` and `"Video — placeholder"` removed from the live homepage. Section is gated by `siteContent.demoMedia` in `my-app/src/lib/site-config.ts` (both `audioUrl` and `videoUrl` are `null` → section does not render). |

---

## Marketing site — user-facing stub / incomplete UI

| File | Line(s) | Copy / issue |
|------|---------|--------------|
| `my-app/src/components/sections/how-it-works.tsx` | 94–106 | Comment `TODO: Replace with real Loom/YouTube embed URL.` Visible play-button shell with `aria-label="Video preview placeholder"` and caption *"Watch: AI Receptionist handling a real inbound call."* (no real video). |
| `my-app/src/app/testimonials/page.tsx` | 62–70 | Comment `TODO: Add Google Business Profile review widget embed code here`. Visible dashed box: *"Google reviews will appear here once the Business Profile widget is embedded."* |
| `my-app/src/app/testimonials/page.tsx` | 78 | Description: *"Verified quotes appear here once clients approve publication. Until then, see labeled illustrative scenarios on Results."* |
| `my-app/src/content/all-testimonials.ts` | 1–7 | `ALL_SITE_TESTIMONIALS` is intentionally empty until permissioned quotes exist (homepage/testimonials show empty-state messaging, not fake quotes). |
| `my-app/src/app/results/page.tsx` | 39, 50, 61 | Quote labels: *"Illustrative scenario. References available on request."* |
| `my-app/src/app/results/page.tsx` | 152 | Intro copy states scenarios are illustrative composites. |
| `my-app/src/pages/Portfolio.tsx` | 30, 42, 54 | Notes: *"Illustrative scenario. References available on request."* |
| `my-app/src/pages/Portfolio.tsx` | 128 | *"…shown as illustrative composites."* |
| `my-app/src/components/cta/prominent-cta.tsx` | 17–18 | Comment + hard-coded `audioUrl = "/audio/sample-call.mp3"` — file not present under `public/`; component currently unused on routes. |
| `my-app/src/components/cta/prominent-cta.tsx` | 201 | `TODO: Open chatbot widget or navigate to chat page` (chat CTA behavior incomplete). |
| `my-app/src/components/demos/voice-demo-tile.tsx` | 14–51 | Mock conversation + `TODO: Replace with Vapi API call`. Component currently unused on routes. |

**`lorem` / `coming soon`:** no matches in marketing user-facing copy under `my-app/src`.

---

## Dashboard / internal demo — user-facing stub copy

| File | Line(s) | Copy / issue |
|------|---------|--------------|
| `my-app/src/dashboard/components/section-placeholder.tsx` | 12 | Default eyebrow **"Soon"** for unfinished dashboard sections. |
| `my-app/src/dashboard/dashboard-app.tsx` | 52–126 | Multiple `<SectionPlaceholder>` routes (Appointments, Clients, AI settings, Knowledge base, Follow-up, Analytics, Settings) with “will appear / will live / will be added” descriptions. |
| `my-app/src/dashboard/pages/dashboard-home-page.tsx` | 21 | *"KPIs and activity will appear here as data is connected…"* |
| `my-app/src/dashboard/pages/command-center-mock-page.tsx` | 91, 192 | Illustrative demo copy; *"Numbers are placeholders for dashboard tiles."* |
| `my-app/src/dashboard/pages/agent-os-mock-page.tsx` | 55 | Badge/label: **"Mock data only"** |
| `my-app/src/dashboard/pages/approvals-demo-page.tsx` | 63 | **"Mock data only"** |
| `my-app/src/dashboard/pages/lead-ops-demo-page.tsx` | 45, 105 | **"Mock data only"**; stages/owners described as illustrative. |
| `my-app/src/dashboard/pages/marketing-social-mock-page.tsx` | 75, 86 | **"Mock data only"**; counts described as illustrative. |
| `my-app/src/dashboard/pages/missed-revenue-demo-page.tsx` | 28, 32 | Fictional dollars / **"Mock data only"** |
| `my-app/src/dashboard/pages/real-*-page.tsx` (several) | empty states | *"…will appear here…"* empty-state strings when live tables have no rows (agent runs, approvals, bookings, lead ops, missed revenue, tasks, tool calls). |
| `my-app/src/demo/demo-hub-page.tsx` | 225 | **"Mock data only"** |
| `my-app/src/demo/dev-demo-shell.tsx` | 35 | *"Local demo preview — mock data only."* |

---

## Developer TODOs / comments (not always visible, but unfinished product surface)

| File | Line(s) | Note |
|------|---------|------|
| `my-app/src/app/api-handlers/lead/route.ts` | 61–62 | `TODO: Integrate with CRM…` / “placeholder for side effects” |
| `my-app/src/components/sections/portfolio-gallery.tsx` | 236 | Comment: thumbnail placeholder sizing note (not visitor-facing text) |
| `my-app/src/app/page.tsx` | 150 | Comment: “placeholder-safe” testimonials (developer note only) |
| `my-app/src/dashboard/content/*-mock-data.ts` | headers | File comments marking static/illustrative mock datasets |

---

## Form `placeholder=` attributes (legitimate UX hints — not content gaps)

These matched the search term `placeholder` but are normal input hints, not unfinished marketing copy:

- `my-app/src/pages/Contact.tsx`, `BookDemo.tsx`
- `my-app/src/app/contact/page.tsx`, `book-demo/page.tsx` (`placeholders` prop on lead form)
- `my-app/src/components/forms/lead-form.tsx`
- `my-app/src/app/widget/frame/WidgetFramePage.tsx`, `install/WidgetInstallPage.tsx`
- `my-app/src/dashboard/pages/*` search/filter inputs
- `my-app/src/components/admin/AdminGate.jsx`, `ProspectingHub.jsx`
- Tailwind classes like `placeholder:text-slate-500` / `placeholder:text-zinc-600`

---

## Suggested review priority (marketing site)

1. **How It Works video shell** — still looks like a real video CTA without an embed.  
2. **Testimonials Google reviews box** — explicit “will appear here” stub on a public page.  
3. **Illustrative scenarios** on `/results` and Portfolio — labeled honestly; decide if they stay or move behind a flag.  
4. **Unused** `ProminentCTA` / `VoiceDemoTile` — wire up with real media or remove from the tree later.
