# Mercy AI Staff / Revora AI Employee System — Demo Walkthrough

A short, presenter-friendly guide for walking a prospect (or internal stakeholder)
through the current state of the product. Use this as the script for any live
or recorded demo session.

---

## 1. Current Project Status

| Phase | Status |
| --- | --- |
| Phase 2 | Verified |
| Phase 3 — simulate mode | Verified |
| Phase 3 — real-write mode | Partially blocked by Supabase migration |
| Phase 4 — mock / demo pages | Built |

The database blocker is fully documented in
[`PHASE_3_DATABASE_BLOCKER.md`](./PHASE_3_DATABASE_BLOCKER.md) in the repo root.
Until that migration applies cleanly, real-write workflows stay gated and the
demo pages remain mock-only.

---

## 2. Demo Links

All demo paths are local previews. The last link is the public sales page.

| Path | What it shows |
| --- | --- |
| `/demo` | Demo Hub — launchpad into every AI Employee preview |
| `/demo/command-center` | Executive overview of every AI lane |
| `/demo/ai-employees` | The digital workforce roster |
| `/demo/lead-ops` | Inbound capture, qualification, and routing |
| `/demo/missed-revenue` | Recovered opportunities, no-shows, after-hours calls |
| `/demo/approvals` | Owner review queue (human-in-the-loop) |
| `/demo/marketing-social` | Drafted social posts, review replies, outbound campaigns |
| `/ai-employee-system` | Public customer-facing sales page |

---

## 3. Suggested Demo Flow

A clean 8-step path. Roughly 6–10 minutes end to end.

1. **Start at `/ai-employee-system`** — set the story. This is the customer-facing
   pitch for the AI Employee System. Anchor the conversation in outcomes:
   24/7 coverage, never miss a lead, recover lost revenue.
2. **Open `/demo`** — show the Demo Hub. This is the single launchpad into every
   AI Employee preview. Call out the "Mock data only" badge so expectations
   are clear.
3. **Show `/demo/command-center`** — executive view. Runs, success rate,
   escalations, and revenue saved at a glance. This is what an owner opens
   first thing in the morning.
4. **Show `/demo/ai-employees`** — the workforce roster. Each AI employee owns
   a specific lane (receptionist, qualifier, recovery, marketing) and reports
   its own performance.
5. **Show `/demo/lead-ops`** — pipeline view. How a new lead moves from first
   touch through qualification to a booked appointment.
6. **Show `/demo/missed-revenue`** — recovery view. After-hours calls, missed
   voicemails, dormant leads, and the dollar value Mercy AI claws back.
7. **Show `/demo/approvals`** — human-in-the-loop. High-stakes drafts and
   outbound actions wait here for a one-click yes or no. Reinforces trust and
   control.
8. **Show `/demo/marketing-social`** — outbound view. Social posts, review
   responses, and campaigns drafted by Mercy, staged for approval — never
   auto-sent.

End by returning to `/ai-employee-system` and asking the closing question.

---

## 4. Plain-Language Pitch

> "A 24/7 AI employee team that captures leads, qualifies them, prepares
> booking/follow-up, flags missed revenue, and helps create marketing content."

Use this one sentence whenever the prospect asks "so what does it actually do?"
Avoid jargon — no LLM, no agent orchestration, no Supabase. Outcomes only.

---

## 5. What Is Real Now

These pieces are live and working today:

- **Agent orchestration** — Mercy ConvAI runs end to end against the live
  ElevenLabs agent configuration.
- **Logging** — agent runs and tool calls log to Supabase (Phase 2 + Phase 3
  simulate mode).
- **AI employee simulate mode** — every AI employee lane runs in simulate mode
  with verified outputs (bookings, follow-ups, recovery drafts, etc.).
- **Mock dashboard UI** — every page under `/demo/*` is built, styled, and
  navigable.

---

## 6. What Is Still Blocked

These pieces are gated until the database blocker is resolved:

- Full real-database workflow until `supabase/migrations/005_phase3_completion.sql`
  applies cleanly against the live Supabase project.
- Live writes for bookings, tasks, approvals, and missed-revenue rows.
- Production dashboard DB wiring (replacing mock data with live reads).

See [`PHASE_3_DATABASE_BLOCKER.md`](./PHASE_3_DATABASE_BLOCKER.md) for the
exact migration error, attempted fixes, and current status.

---

## 7. Safety Rules

These rules apply to every demo and every environment until the database
blocker is fixed and signed off:

- **No auto email/SMS/social posting** — every outbound channel stays disabled.
- **Human approval required** — any high-stakes action surfaces in
  `/demo/approvals` first.
- **Mock data only on demo pages** — `/demo/*` never reads or writes Supabase,
  ElevenLabs, or any external service.
- **Do not start live Phase 4 wiring** — production database wiring stays
  paused until the migration blocker is fixed and verified.

If a prospect asks "is this live data?" the honest answer during a demo is:
"This is a mock preview of the dashboard. The AI agent itself is fully live;
the dashboard goes live the moment the database migration is signed off."
