# Pilot Launch Checklist

**Revora AI Front Desk Team / Mercy AI Staff**  
*Powered by Mercy Speaks Digital*

Final internal checklist before treating the product as **pilot-ready** for the first paying client.

> **This system is pilot-ready, not yet a fully autonomous SaaS.**  
> Real outbound channels stay off. Sensitive actions require human approval. Ops dashboard is read-only.

---

## 1. Product status

| Item | Status |
| --- | --- |
| Pilot-ready internal product | ☐ Verified |
| AI employee backend verified | ☐ Verified |
| Real database writes verified | ☐ Verified |
| Live read-only dashboard verified | ☐ Verified |
| Demo and client document package ready | ☐ Verified |

---

## 2. Verified AI employee flows

These six tool flows are verified at the employee / orchestration layer.

| Flow | Tool | Verified |
| --- | --- | --- |
| Inbound capture | `saveLead` | ☐ |
| Qualification | `qualifyLead` | ☐ |
| Booking intent | `createBookingIntent` | ☐ |
| Follow-up draft | `draftFollowUp` | ☐ |
| Owner handoff / alert | `sendOwnerAlert` | ☐ |
| Missed revenue logging | `logMissedRevenue` | ☐ |

**Notes**

- Booking intent does **not** mean a confirmed calendar appointment.
- Follow-up drafts are stored only — **no message is sent**.
- Owner alerts create approval rows — **no delivery is attempted**.

---

## 3. Verified dashboard pages

### Live read-only ops (`/dashboard/ops/*`)

| Route | Purpose | Verified |
| --- | --- | --- |
| `/dashboard/ops/leads` | Live leads from Supabase | ☐ |
| `/dashboard/ops/agent-runs` | Agent run history | ☐ |
| `/dashboard/ops/tool-calls` | Tool call log | ☐ |
| `/dashboard/ops/bookings` | Booking intents | ☐ |
| `/dashboard/ops/tasks` | Task / follow-up drafts | ☐ |
| `/dashboard/ops/approvals` | Pending approval rows | ☐ |
| `/dashboard/ops/missed-revenue` | Missed revenue events | ☐ |

### Authenticated dashboard (API-backed)

| Route | Purpose | Verified |
| --- | --- | --- |
| `/dashboard/leads` | Lead list | ☐ |
| `/dashboard/conversations` | Conversation list | ☐ |

---

## 4. Demo links

Replace `{ORIGIN}` with your deployed host (e.g. `https://www.mercyspeaksdigital.com`).

| Route | Purpose | Verified |
| --- | --- | --- |
| `{ORIGIN}/demo` | Demo Hub — launchpad for preview lanes | ☐ |
| `{ORIGIN}/demo/command-center` | Executive overview (mock KPIs) | ☐ |
| `{ORIGIN}/demo/ai-employees` | Digital workforce roster (mock) | ☐ |
| `{ORIGIN}/demo/lead-ops` | Lead pipeline preview (mock) | ☐ |
| `{ORIGIN}/demo/missed-revenue` | Recovery opportunities preview (mock) | ☐ |
| `{ORIGIN}/demo/approvals` | Human-in-the-loop queue preview (mock) | ☐ |
| `{ORIGIN}/demo/marketing-social` | Social / campaign drafts preview (mock) | ☐ |
| `{ORIGIN}/ai-employee-system` | Public sales page | ☐ |

**Presenter scripts:** `10_MINUTE_DEMO_SCRIPT.md`, `README_DEMO_WALKTHROUGH.md`

---

## 5. Client documents

Index: `CLIENT_DOCUMENT_PACKAGE.md`

| Document | Repo path | Ready |
| --- | --- | --- |
| One Page Offer Sheet | `ONE_PAGE_OFFER_SHEET.md` | ☐ |
| Client Setup Form | `CLIENT_SETUP_FORM.md` | ☐ |
| Client Onboarding Checklist | `CLIENT_ONBOARDING_CHECKLIST.md` | ☐ |
| Client Proposal Template | `CLIENT_PROPOSAL_TEMPLATE.md` | ☐ |
| Sales Outreach Kit | `SALES_OUTREACH_KIT.md` | ☐ |
| 10-Minute Demo Script | `10_MINUTE_DEMO_SCRIPT.md` | ☐ |
| Client Document Package (index) | `CLIENT_DOCUMENT_PACKAGE.md` | ☐ |

Polished PDF/DOCX exports (if used): `client-assets/pdf/`, `client-assets/docx/`

---

## 6. Environment variables checklist

Copy from `.env.example` into `my-app/.env.local` (local) and Vercel Project Settings (production/preview). **Never commit `.env.local`.**

| Variable | Purpose | Set |
| --- | --- | --- |
| `SUPABASE_URL` | Supabase project URL | ☐ |
| `SUPABASE_SERVICE_KEY` | Server-side service role (never expose to browser) | ☐ |
| `AGENT_OS_RUN_SECRET` | Protects `POST /api/agents/run` | ☐ |
| `MERCY_DASHBOARD_ADMIN_EMAIL` | Sole allowed dashboard login email | ☐ |
| `MERCY_DASHBOARD_PASSWORD` | Shared MVP dashboard password | ☐ |
| `MERCY_DASHBOARD_SESSION_SECRET` | HMAC secret for session cookie | ☐ |
| `DATABASE_URL` | Direct Postgres connection (if needed for migrations) | ☐ |

- [ ] Local `my-app/.env.local` populated
- [ ] Vercel production/preview env matches for dashboard + Supabase + agent run secret
- [ ] Secrets stored in password manager — not in git, screenshots, or client-facing docs

---

## 7. Security checklist

| Control | Expectation | Done |
| --- | --- | --- |
| Do not commit `.env.local` | `.env.local` stays out of git | ☐ |
| Keep service role key server-only | `SUPABASE_SERVICE_KEY` never prefixed with `VITE_` or `NEXT_PUBLIC_` | ☐ |
| Rotate database password after troubleshooting | Change Supabase/Postgres password if exposed during debug | ☐ |
| Rotate dashboard password/session secret if exposed | Regenerate `MERCY_DASHBOARD_PASSWORD` and `MERCY_DASHBOARD_SESSION_SECRET` | ☐ |
| Rotate `AGENT_OS_RUN_SECRET` if exposed | Regenerate and update Vercel + local env | ☐ |

Additional controls:

- [ ] Only core team has dashboard credentials
- [ ] Agent run endpoint requires `AGENT_OS_RUN_SECRET` — not exposed on public marketing flows
- [ ] Demo routes (`/demo/*`) do not read/write production Supabase
- [ ] Ops UI (`/dashboard/ops/*`) is read-only — no approve/send buttons wired

---

## 8. What is enabled

- AI agent orchestration (Mercy ConvAI / Agent OS)
- Real lead writes (`saveLead`)
- Real booking intent writes (`createBookingIntent`)
- Real task / follow-up draft writes (`draftFollowUp`)
- Real approval row creation (`sendOwnerAlert`)
- Real missed revenue event writes (`logMissedRevenue`)
- Read-only live ops dashboard (`/dashboard/ops/*`)
- Mock demo experiences for sales (`/demo/*`, `/ai-employee-system`)
- Client document package and booking CTA

---

## 9. What is intentionally disabled

Do **not** enable these during pilot without explicit engineering sign-off and written client approval.

| Capability | Status |
| --- | --- |
| No automatic email sending | Disabled |
| No automatic SMS sending | Disabled |
| No automatic social posting | Disabled |
| No approve/reject dashboard mutations yet | Disabled |
| No autonomous booking confirmations yet | Disabled |
| No Phase 4 Step 2 write actions yet | Disabled |

---

## 10. First pilot client checklist

- [ ] Choose one niche
- [ ] Use sales outreach kit (`SALES_OUTREACH_KIT.md`)
- [ ] Run 10-minute demo (`10_MINUTE_DEMO_SCRIPT.md`)
- [ ] Send one-page offer sheet (`ONE_PAGE_OFFER_SHEET.md`)
- [ ] Send setup form (`CLIENT_SETUP_FORM.md`)
- [ ] Collect setup fee
- [ ] Complete onboarding checklist (`CLIENT_ONBOARDING_CHECKLIST.md`)
- [ ] Configure client-specific rules (hours, services, escalation, tone)
- [ ] Run fake test lead (simulate or controlled real-write — internal only)
- [ ] Review with client before launch

---

## 11. Known limitations

Be transparent with prospects and pilot clients. These are **expected**, not bugs.

1. **Dashboard is read-only for ops actions** — no approve/reject/send from the UI yet.
2. **Multi-tenant scoping needs future hardening** — single-admin MVP posture today.
3. **Approval actions are not wired yet** — approval rows are created; humans act outside the dashboard.
4. **Email / SMS / social integrations are not active yet** — drafts and queues only.
5. **Booking intent ≠ confirmed appointment** — calendar write-back is future work.
6. **Demo pages use mock data** — `/demo/*` does not reflect a specific client's live metrics.
7. **This system is pilot-ready, not yet a fully autonomous SaaS.**

---

## 12. Go / No-Go decision

Complete all sections above. **Go** requires every item below checked and no open security or outbound-channel failures.

| Gate | Pass |
| --- | --- |
| Demo reviewed (all `/demo/*` routes + `/ai-employee-system`) | ☐ |
| Dashboard reviewed (login + `/dashboard/ops/*` + leads/conversations) | ☐ |
| Client documents ready to send | ☐ |
| Secrets secured (not in git; rotation plan understood) | ☐ |
| No errors in build | ☐ |
| Pilot client selected | ☐ |
| Final approval (engineering + sales / AM) | ☐ |

### Decision

| Outcome | When |
| --- | --- |
| **GO — pilot launch** | All gates above Pass |
| **NO-GO** | Any gate Fail on security, outbound safety, or data integrity |

**Decision:** ☐ GO (pilot) ☐ NO-GO

**Date:** _______________

**Signed:** _______________ (engineering) _______________ (sales / AM)

---

*This checklist records launch posture only. It does not change application behavior, connect integrations, or enable write actions in production.*
