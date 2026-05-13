# Pilot Launch Checklist

**Revora AI Front Desk Team / Mercy AI Staff**  
*Powered by Mercy Speaks Digital*

Final internal checklist before treating the product as **pilot-ready** for the first paying client. This is not a fully autonomous SaaS launch — it is a controlled pilot with human oversight, mock sales dashboards, and live read-only ops visibility.

> **Pilot posture (non-negotiable)**  
> - **Real email, SMS, and social posting are not enabled yet.** Outbound channels stay off until integrations are explicitly wired and approved.  
> - **Human approval is required before sensitive actions** (owner alerts, follow-up sends, booking confirmations, pricing quotes, social posts).  
> - The system is **pilot-ready**, not a self-serve, fully autonomous SaaS.

---

## 1. Product status

| Area | Status | Notes |
| --- | --- | --- |
| Phase 2 — logging foundation | **Verified** | Agent runs and tool calls log to Supabase. |
| Phase 3 — simulate mode | **Verified** | All AI employee lanes run with `simulate: true` without persistence side effects. |
| Phase 3 — real-write mode | **Verified** | Migration `005_phase3_completion.sql` applied; six-tool smoke passed (see `PHASE_3_DATABASE_BLOCKER.md`). |
| Phase 4 — production dashboard wiring | **Deferred** | Full owner UX wiring is paused by policy until Phase 4 is explicitly started. |
| Phase 4 — mock / demo pages | **Built** | `/demo/*` and dashboard demo routes use mock data only. |
| Phase 4 — live ops read API | **Built (read-only)** | `/dashboard/ops/*` reads Supabase; no write actions from the UI. |
| Mercy ConvAI (ElevenLabs) | **Live** | Voice agent orchestration runs against `agent_configs/Mercy-AI-Agent-LIVE.json`. |
| Outbound delivery (email / SMS / social) | **Not enabled** | Drafts and approval rows only; no auto-send pipeline. |

**Sign-off:** Engineering lead confirms Phase 3 resolution doc is current. Sales lead confirms demo script matches what is shown live.

- [ ] Phase 3 database blocker marked **RESOLVED** in `PHASE_3_DATABASE_BLOCKER.md`
- [ ] Latest agent config synced if tools/workflow changed (`node scripts/fetch-agent.js` when applicable)
- [ ] Team aligned: **pilot-ready ≠ production SaaS**

---

## 2. Verified AI employee flows

These flows are verified at the **tool + employee** layer. Default runtime for demos and cautious pilots should prefer **simulate mode** unless a controlled real-write test is intentional.

| Flow | Employee / tool | Verified behavior |
| --- | --- | --- |
| Inbound capture | `employee.intake` → `saveLead` | Lead validated; real-write creates/updates `leads`. |
| Qualification | `employee.qualifier` → `qualifyLead` | Scores and patches lead/conversation metadata. |
| Booking intent | `employee.booking` → `createBookingIntent` | Creates booking intent row; **does not** complete calendar booking. |
| Follow-up draft | `employee.follow_up` → `draftFollowUp` | Stores task draft with `send_blocked: true` — **no message sent**. |
| Owner handoff / alert | `employee.handoff` → `sendOwnerAlert` | Inserts **approval** draft; `delivery.attempted: false`. |
| Missed revenue | `logMissedRevenue` | Logs `missed_revenue_events` row for recovery tracking. |

**Mock-only (UI preview, not production agents):**

| Lane | Where shown | Status |
| --- | --- | --- |
| Marketing strategist | `/demo/marketing-social`, `/dashboard/marketing-social-demo` | Mock drafts only |
| Social media executor | Same | Mock drafts only; never auto-posts |

- [ ] Internal voice/chat test pass completed on Mercy ConvAI agent
- [ ] Simulate-mode run exercised for each lane above
- [ ] Real-write smoke acknowledged as **engineering verification only** — not default for client-facing pilot
- [ ] Team can explain: booking intent ≠ confirmed appointment; follow-up draft ≠ sent email/SMS

---

## 3. Verified dashboard pages

### Public demo routes (mock data only)

| Route | Purpose |
| --- | --- |
| `/demo` | Demo Hub — launchpad for all preview lanes |
| `/demo/command-center` | Executive overview (mock KPIs) |
| `/demo/ai-employees` | Digital workforce roster (mock) |
| `/demo/lead-ops` | Lead pipeline preview (mock) |
| `/demo/missed-revenue` | Recovery opportunities preview (mock) |
| `/demo/approvals` | Human-in-the-loop queue preview (mock) |
| `/demo/marketing-social` | Social / review / campaign drafts preview (mock) |
| `/ai-employee-system` | Public sales page — customer-facing pitch |

### Authenticated dashboard — demo slices (mock)

| Route | Purpose |
| --- | --- |
| `/dashboard/ai-employees` | Agent OS mock roster |
| `/dashboard/lead-ops-demo` | Lead ops layout preview |
| `/dashboard/missed-revenue-demo` | Missed revenue layout preview |
| `/dashboard/approvals-demo` | Approvals layout preview |
| `/dashboard/marketing-social-demo` | Marketing/social layout preview |

### Authenticated dashboard — live read-only ops

| Route | Purpose | Badge |
| --- | --- | --- |
| `/dashboard/ops/leads` | Live leads from Supabase | Live read-only |
| `/dashboard/ops/agent-runs` | Agent run history | Live read-only |
| `/dashboard/ops/tool-calls` | Tool call log | Live read-only |
| `/dashboard/ops/bookings` | Booking intents | Live read-only |
| `/dashboard/ops/tasks` | Task / follow-up drafts | Live read-only |
| `/dashboard/ops/approvals` | Pending approval rows | Live read-only |
| `/dashboard/ops/missed-revenue` | Missed revenue events | Live read-only |

### Authenticated dashboard — other

| Route | Status |
| --- | --- |
| `/dashboard` | Overview home |
| `/dashboard/leads`, `/dashboard/leads/:id` | Lead list + detail (API-backed) |
| `/dashboard/conversations`, `/dashboard/conversations/:id` | Conversation list + detail |
| `/dashboard/appointments` | Placeholder — calendar not connected |
| `/dashboard/clients` | Placeholder — CRM-style accounts not built |
| `/dashboard/ai-settings` | Placeholder |
| `/dashboard/knowledge-base` | Placeholder |
| `/dashboard/follow-up` | Placeholder |
| `/dashboard/analytics` | Placeholder |
| `/dashboard/settings` | Placeholder |

- [ ] Each demo route loads without errors in target environment (local + production preview)
- [ ] “Mock data only” / “Live read-only” badges called out during internal walkthrough
- [ ] Dashboard login works for designated admin email only

---

## 4. Demo links

Use these paths on your deployed host (e.g. `https://mercyspeaks.ai` or `https://mercy-speaks-ai.vercel.app`). Replace `{ORIGIN}` below.

| Audience | URL | Use when |
| --- | --- | --- |
| Prospect — story first | `{ORIGIN}/ai-employee-system` | Opening slide / first tab |
| Prospect — product tour | `{ORIGIN}/demo` | Hands-on walkthrough |
| Prospect — executive view | `{ORIGIN}/demo/command-center` | Owner morning view |
| Prospect — workforce | `{ORIGIN}/demo/ai-employees` | “Who is on the team” |
| Prospect — pipeline | `{ORIGIN}/demo/lead-ops` | Lead → qualified → booked story |
| Prospect — recovery | `{ORIGIN}/demo/missed-revenue` | After-hours / missed call ROI |
| Prospect — trust / control | `{ORIGIN}/demo/approvals` | Human approval before send |
| Prospect — marketing lane | `{ORIGIN}/demo/marketing-social` | Drafts staged, not posted |
| Internal — live ops | `{ORIGIN}/dashboard/ops/leads` | After login; real Supabase reads |
| Book a call CTA | `BOOKING_URL` / Cal.com | Default: `https://cal.com/natusdeed/free-ai-receptionist-demo` |

**Presenter script:** `README_DEMO_WALKTHROUGH.md` and `10_MINUTE_DEMO_SCRIPT.md`.

- [ ] `{ORIGIN}` confirmed for the session (prod vs preview)
- [ ] Booking link opens and shows correct Cal.com event
- [ ] Dashboard credentials available only to internal presenters (not shared with prospects)

---

## 5. Client documents

Index: `CLIENT_DOCUMENT_PACKAGE.md`. Polished PDF/DOCX pairs live under `client-assets/pdf/` and `client-assets/docx/`.

### Safe to send or present to prospects/clients

| Document | Repo path | When |
| --- | --- | --- |
| One Page Offer Sheet | `ONE_PAGE_OFFER_SHEET.md` / `client-assets/pdf/Revora_AI_One_Page_Offer_Sheet.pdf` | Early interest / leave-behind |
| Client Setup Form | `CLIENT_SETUP_FORM.md` | After verbal “yes” |
| Client Proposal Template | `CLIENT_PROPOSAL_TEMPLATE.md` | Formal proposal |
| 10-Minute Demo Script | `10_MINUTE_DEMO_SCRIPT.md` | Live demo (usually not emailed) |
| Sales Outreach Kit | `SALES_OUTREACH_KIT.md` | Outbound copy source |
| Client Onboarding Workbook | `client-assets/pdf/Revora_AI_Client_Onboarding_Workbook.pdf` | Post-sign kickoff |

### Internal only — never send externally

| Document | Reason |
| --- | --- |
| `PILOT_LAUNCH_CHECKLIST.md` | Engineering + ops posture |
| `PHASE_3_DATABASE_BLOCKER.md` | Internal verification log |
| `README_DEMO_WALKTHROUGH.md` | Internal demo map |
| `PRODUCT_PRESENTATION_PACKAGE.md` | Internal pitch notes |
| `CLIENT_ONBOARDING_CHECKLIST.md` | Team workflow (use internally) |

- [ ] Correct PDF/DOCX versions attached for this pilot (no draft filenames)
- [ ] Offer sheet states human approval and no auto-send on outbound channels
- [ ] Setup form sent with 48-hour soft deadline before kickoff

---

## 6. Environment variables checklist

Copy from `.env.example` into `my-app/.env.local` (local) and Vercel Project Settings (production/preview). **Never commit `.env.local`.**

### Required for dashboard access

| Variable | Purpose |
| --- | --- |
| `MERCY_DASHBOARD_ADMIN_EMAIL` | Sole allowed login email |
| `MERCY_DASHBOARD_PASSWORD` | Shared MVP password (generate via `npm run dashboard:bootstrap -- you@company.com`) |
| `MERCY_DASHBOARD_SESSION_SECRET` | HMAC secret for session cookie |

### Required for live ops reads + agent orchestration

| Variable | Purpose |
| --- | --- |
| `SUPABASE_URL` | Supabase project URL |
| `SUPABASE_SERVICE_KEY` | Server-side service role (never expose to browser) |
| `AGENT_OS_RUN_SECRET` | Protects `POST /api/agents/run` |

### Required for site chat / marketing site

| Variable | Purpose |
| --- | --- |
| `OPENAI_API_KEY` | `POST /api/chat` on marketing site |
| `BOOKING_URL` | Server-side booking links |
| `VITE_BOOKING_URL` | Client-side booking CTAs |

### Optional / not required for pilot demo

| Variable | Status |
| --- | --- |
| `TWILIO_*` | Not required — SMS/voice outbound not enabled for pilot |
| `VAPI_*` | Optional alternate voice stack |
| `RESEND_API_KEY`, `EMAIL_FROM` | Not required — email send disabled |
| `CALCOM_API_KEY` / `CALENDLY_*` | Optional — human booking link is sufficient for pilot |
| `CRM_WEBHOOK_URL` | Not wired for pilot |
| `ELEVENLABS_API_KEY` | Local agent sync scripts only (repo root `.env.local`) |

- [ ] Dashboard bootstrap run and secrets stored in password manager
- [ ] Vercel production env matches local for dashboard + Supabase + `AGENT_OS_RUN_SECRET`
- [ ] No secrets in git, screenshots, or client-facing docs
- [ ] `OPENAI_API_KEY` set on Vercel if `/api/chat` is shown live

---

## 7. Security checklist

| Control | Expectation |
| --- | --- |
| Dashboard auth | Single allowed work email + shared password + HMAC session; no public signup |
| API authorization | Dashboard and ops routes require valid Bearer session |
| Agent run endpoint | Requires `AGENT_OS_RUN_SECRET`; not exposed on public marketing flows |
| Supabase service key | Server-only; never prefixed with `VITE_` or `NEXT_PUBLIC_` |
| Outbound channels | Email, SMS, social APIs unset or unused — **no accidental send** |
| Demo isolation | `/demo/*` does not read/write Supabase or external services |
| Ops UI | Read-only badges on `/dashboard/ops/*`; no approve/send buttons wired |
| Client data | Pilot uses client-approved test scenarios; avoid real PHI in smoke tests |
| Secrets rotation | Rotate dashboard password + session secret if shared outside core team |

- [ ] Only core team has dashboard credentials
- [ ] Production deploy reviewed — no new write integrations enabled in this release
- [ ] Prospect told honestly when data is mock vs live read-only

---

## 8. What is enabled

- Mercy ConvAI voice agent (ElevenLabs) for inbound conversations and demos
- Website chat (`/api/chat`) when `OPENAI_API_KEY` is configured
- Agent orchestration + tool execution (simulate by default; real-write available for controlled tests)
- Supabase persistence for leads, conversations, agent runs, tool calls, bookings (intent), tasks, approvals, missed revenue events
- Authenticated **live read-only** ops dashboard (`/dashboard/ops/*`)
- Mock demo experiences for sales (`/demo/*`, dashboard `*-demo` routes)
- Human-in-the-loop **approval records** in database (`sendOwnerAlert` → `approvals` table)
- Client document package and booking CTA (Cal.com)
- Widget / tenant foundation (optional; see `docs/WIDGET.md`)

---

## 9. What is intentionally disabled

Do **not** enable these during pilot without explicit engineering sign-off and client written approval.

| Capability | Why disabled |
| --- | --- |
| **Automatic email send** | No Resend/SendGrid delivery pipeline wired |
| **Automatic SMS send** | Twilio outbound not connected for pilot |
| **Automatic social posting** | Social executor is mock-only; posts stay drafts |
| **Calendar booking completion** | Booking **intent** only — no Cal.com/Calendly write-back |
| **CRM webhook push** | `CRM_WEBHOOK_URL` not in pilot scope |
| **Dashboard approve/send actions** | Ops UI is read-only |
| **Self-serve tenant signup** | Manual onboarding per `CLIENT_ONBOARDING_CHECKLIST.md` |
| **Phase 4 full owner dashboard** | Deferred — demo pages remain mock for sales UX |
| **Autonomous pricing quotes / commitments** | Requires client-specific rules + approval (not auto-enabled) |

---

## 10. First pilot client checklist

Use with `CLIENT_ONBOARDING_CHECKLIST.md`. Minimum bar before calling the client “live on pilot.”

### Commercial

- [ ] Pilot agreement signed (scope, fee, duration, limitations stated)
- [ ] Deposit or first invoice collected
- [ ] `#1 priority` documented (missed calls, bookings, follow-up, etc.)
- [ ] Human approval rules documented in writing

### Discovery

- [ ] `CLIENT_SETUP_FORM.md` returned and reviewed
- [ ] Business hours, top services, escalation contacts confirmed
- [ ] Booking link tested manually (human calendar — not AI auto-book)
- [ ] FAQs and tone samples collected

### Build

- [ ] Client-specific agent prompt / FAQs loaded in workspace
- [ ] Internal test passes: angry caller, after-hours, pricing push, emergency
- [ ] Client preview call completed with sign-off email

### Launch (pilot scope)

- [ ] **At most one** primary inbound channel connected (e.g. widget or demo number — not full phone port)
- [ ] Team monitoring first 72 hours assigned
- [ ] Day-1 summary and Day-3 check-in scheduled
- [ ] Client informed: **no auto email/SMS/social**; approvals required for sensitive actions

### Success definition (30-day pilot)

- [ ] At least one real conversation reviewed and healthy
- [ ] Missed-revenue or lead-capture story documented with real or simulated metrics
- [ ] Renewal / Phase-2 expansion conversation scheduled

---

## 11. Pre-demo checklist

Run this **30 minutes before** any prospect, investor, or pilot-client demo.

- [ ] Read `10_MINUTE_DEMO_SCRIPT.md` or `README_DEMO_WALKTHROUGH.md` once
- [ ] Browser: close unrelated tabs; zoom 100%; dark mode if presenting
- [ ] Open tabs in order: `/ai-employee-system` → `/demo` → `/demo/command-center`
- [ ] Confirm `{ORIGIN}` is the environment you intend (not stale localhost unless local demo)
- [ ] If showing live ops: log into `/dashboard` in a separate window; verify `/dashboard/ops/leads` loads
- [ ] Prepare honest answers:
  - “Is this live data?” → Demo pages: **mock**. Ops pages: **live read-only** from Supabase.
  - “Does it send texts/emails?” → **No** — drafts and approvals only.
  - “Is it fully automated?” → **No** — pilot with human approval gates.
- [ ] Booking link tested (`BOOKING_URL` / Cal.com)
- [ ] Do **not** run real-write smoke tests during the demo
- [ ] Do **not** start Phase 4 wiring or new integrations from the demo machine

---

## 12. Post-demo next steps

| If prospect says… | Next step | Owner |
| --- | --- | --- |
| “Send me something” | One Page Offer Sheet PDF + booking link | Sales |
| “We’re interested” | `CLIENT_SETUP_FORM.md` + proposal template | Sales |
| “What does onboarding look like?” | Kickoff scheduling + internal `CLIENT_ONBOARDING_CHECKLIST.md` | AM + build |
| “Is it live for us?” | Pilot scope doc — channels, approval rules, timeline 7–14 days | AM |
| “Can it post to Instagram / send SMS?” | Explain roadmap; confirm **not in pilot** without integration project | Sales + engineering |

### Internal follow-up (within 24 hours)

- [ ] Recap email: outcomes discussed, mock vs live clarified, next meeting booked
- [ ] CRM note: objections, niche, decision maker, timeline
- [ ] Log feature requests — do not promise auto-send or full SaaS self-serve on the call

---

## 13. Known limitations

Be transparent with prospects and pilot clients. These are **expected**, not bugs.

1. **Not fully autonomous** — sensitive actions stop at approval rows; humans decide.
2. **No outbound delivery** — email, SMS, and social posts are drafted or queued, not sent.
3. **Booking intent ≠ confirmed appointment** — calendar integration write-back is future work.
4. **Demo dashboards use mock data** — `/demo/*` and dashboard `*-demo` routes do not reflect a specific client’s live metrics.
5. **Phase 4 owner UX incomplete** — placeholders remain for appointments, clients, analytics, settings, knowledge base, follow-up automation UI.
6. **Single-tenant dashboard auth** — one admin email/password MVP; not multi-user RBAC SaaS.
7. **Marketing / social AI employees** — preview UI only; no production agent execution for auto-posting.
8. **Pilot channel scope** — full phone port, multi-location, and complex CRM sync are out of first-pilot scope unless explicitly scoped.
9. **Compliance** — client responsible for industry rules (HIPAA, etc.); Mercy Speaks configures within agreed boundaries only.
10. **Engineering smoke vs client runtime** — real-write verification uses test payloads; default client-facing runs should use simulate unless agreed otherwise.

---

## 14. Go / no-go decision

Complete all sections above, then score each gate **Pass** or **Fail**. **Go** requires all critical gates Pass and no open Fail on security or outbound channels.

| # | Gate | Pass criteria |
| --- | --- | --- |
| G1 | Product truth | Team can state pilot-ready vs SaaS in one sentence without overselling |
| G2 | Phase 3 data layer | Migration applied; six tools smoke-documented as passed |
| G3 | Demo reliability | All `/demo/*` routes load on target `{ORIGIN}` |
| G4 | Dashboard access | Login + at least one `/dashboard/ops/*` page returns data or empty state (not 503) |
| G5 | Outbound safety | **Confirmed:** no email, SMS, or social auto-send in prod config |
| G6 | Approval model | `sendOwnerAlert` / approvals story demonstrated; client docs mention human approval |
| G7 | Client kit | PDF offer sheet + setup form ready to send |
| G8 | First pilot scope | One niche, one channel, one success metric agreed internally |
| G9 | Monitoring | Named owner for first 72 hours after client go-live |
| G10 | Legal / commercial | Pilot agreement template reviewed; limitations clause includes mock data + no auto-send |

### Decision

| Outcome | When |
| --- | --- |
| **GO — pilot sales & first client onboarding** | All gates G1–G10 Pass |
| **GO — demos only** | G1, G3, G5, G6, G7 Pass; G4 may Fail if Supabase not configured in that environment |
| **NO-GO** | Any Fail on G5 (outbound), G6 (approval), or G2 (data integrity) |

**Decision:** ☐ GO (pilot) ☐ GO (demos only) ☐ NO-GO  

**Date:** _______________  

**Signed:** _______________ (engineering) _______________ (sales / AM)

---

*This checklist records launch posture only. It does not change application behavior, connect integrations, or enable write actions in production.*
