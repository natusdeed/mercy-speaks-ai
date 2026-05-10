# AI Employee Operating System

This document describes the **Mercy AI Employee Operating System** as a product concept and where to preview the UI. It does **not** change runtime behavior or database schema.

## What it is

The operating system is the **coordination layer** above individual automations: specialized **AI employees** (agents) own slices of the revenue lifecycle—intake, qualification, booking, follow-up, escalation, marketing strategy, and social execution—each with clear inputs, outputs, and human review boundaries.

## Mock dashboard (static data)

Inside the authenticated Mercy dashboard, a **preview** screen shows:

- **Org-level mock KPIs:** runs today, success rate, tasks completed, pending approvals.
- **Seven agent cards:** Intake, Lead Qualifier, Booking, Follow-Up, Human Handoff, Marketing Strategist, and Social Media.

**Route:** `/dashboard/ai-employees`  
**Source:** `my-app/src/dashboard/pages/agent-os-mock-page.tsx`  
**Mock payloads:** `my-app/src/dashboard/content/agent-os-mock-data.ts`

All numbers and “last activity” labels are **fabricated for layout and copy review**. The page performs **no Supabase calls** and does not invoke production APIs beyond what the dashboard shell already loads for auth.

## Phase 3 database gate

Real writes for several employees depend on tables and columns that are documented as **not yet applied** in production. See **`PHASE_3_DATABASE_BLOCKER.md`** at the repository root before wiring live metrics or tool execution to this UI.

## Safety boundaries

- **No** automatic email, SMS, calendar bookings, or social posts from the mock page.  
- **No** Phase 4 production database wiring is implied by this documentation or the mock route.  
- Changes remain **additive** (new route, nav item, content module, doc) so they can be reverted by removing those artifacts.
