# Implementation Plan: Twilio + Vapi Production Stack

This document is the step-by-step checklist and exact file/route layout for the AI receptionist system using **Twilio** (numbers, SMS, voice webhooks) and **Vapi** (voice agent, tools). API layer is **Next.js App Router** (`app/api/.../route.ts`).

---

## Prerequisites

- [ ] Next.js project with App Router (if not already: add `api` app or migrate; API routes must be served by Node).
- [ ] Twilio account (phone number, SMS, Voice webhook URL).
- [ ] Vapi account (assistant, phone number or SIP, webhook URLs).
- [ ] Postgres database (e.g. Vercel Postgres, Neon, Supabase).
- [ ] Optional: Cal.com or Calendly account; CRM webhook URL; email provider (Resend, SendGrid, etc.).

---

## 1) Twilio number provisioning and inbound call webhook routing

**Goal:** When someone calls the Twilio number, Twilio requests TwiML from your app; your app returns TwiML that connects the call to Vapi (or fallback).

### 1.1 Twilio configuration (Console)

- [ ] Buy or configure a Twilio phone number.
- [ ] Set **Voice & Fax → A CALL COMES IN**: Webhook, `https://<your-domain>/api/voice/incoming`, HTTP POST.
- [ ] Set **Messaging → A MESSAGE COMES IN** (for SMS): Webhook, `https://<your-domain>/api/sms/incoming`, HTTP POST.

### 1.2 API routes (Next.js App Router)

| Purpose | Method | Path | File |
|--------|--------|------|------|
| Inbound voice (TwiML for Vapi or fallback) | POST | `/api/voice/incoming` | `app/api/voice/incoming/route.ts` |
| Status callback (optional, for call status) | POST | `/api/voice/status` | `app/api/voice/status/route.ts` |

**`app/api/voice/incoming/route.ts`**

- Read `From`, `To`, `CallSid` from Twilio POST body.
- Optionally check failover state (e.g. from DB or cache): if “use fallback”, return TwiML that dials human/voicemail.
- Else return TwiML that connects the call to Vapi (e.g. via `<Dial>` to Vapi’s TwiML endpoint or SIP, or redirect to Vapi’s webhook that returns TwiML). Exact TwiML depends on Vapi’s “Twilio integration” docs (they often give a URL to put in Twilio or a SIP URI).
- Log the call in Postgres (e.g. “call started”) for the Missed Revenue Dashboard.

**`app/api/voice/status/route.ts`** (optional)

- Twilio status callback (ringing, completed, busy, failed). Update call record in Postgres (duration, status).

**Checklist**

- [ ] Create `app/api/voice/incoming/route.ts` (TwiML response, Vapi connection or fallback, call log).
- [ ] Create `app/api/voice/status/route.ts` (optional; update call status in DB).
- [ ] Configure Twilio number webhooks to these URLs.
- [ ] Validate with a test call (TwiML returned, call reaches Vapi or fallback).

---

## 2) Vapi agent configuration (voice, prompt, tools)

**Goal:** Define the Vapi assistant (voice, system prompt) and register server-side tools so the agent can book appointments, capture leads, and send to CRM.

### 2.1 Vapi dashboard (or API)

- [ ] Create Assistant: name, voice (e.g. Eleven Labs, PlayHT), language.
- [ ] Set system prompt (greeting, qualification, booking intent, handoff to human/voicemail).
- [ ] Set **Server URL** (Vapi webhook): `https://<your-domain>/api/vapi/webhook`. Vapi will POST to this URL for tool calls and events.

### 2.2 API routes for Vapi

| Purpose | Method | Path | File |
|--------|--------|------|------|
| Vapi webhook (tool calls, end-of-call, etc.) | POST | `/api/vapi/webhook` | `app/api/vapi/webhook/route.ts` |

**`app/api/vapi/webhook/route.ts`**

- Verify request (e.g. Vapi signature/secret if supported).
- Handle event types:
  - **Tool call**: e.g. `book_appointment`, `capture_lead`, `crm_webhook`. Forward to internal handlers or sub-routes; return result to Vapi.
  - **End-of-call**: persist summary, outcome, and value estimate to Postgres; trigger missed-call SMS/email if applicable.
- Return 200 and the payload Vapi expects (e.g. tool results).

**Checklist**

- [ ] Create `app/api/vapi/webhook/route.ts` (dispatch by event type, call tool handlers, persist end-of-call data).
- [ ] In Vapi dashboard, set Server URL to `https://<your-domain>/api/vapi/webhook`.
- [ ] Configure voice and system prompt in Vapi.
- [ ] Test with a call: agent responds and triggers tool calls correctly.

---

## 3) Tool actions: appointment booking, lead capture, CRM webhook

**Goal:** Implement server-side logic for each tool and call it from the Vapi webhook.

### 3.1 Internal “tool” handlers (called by Vapi webhook, not public routes)

Implement as server functions or internal API routes; the Vapi webhook parses the tool name and invokes the right one.

| Tool name (example) | Purpose | Implementation |
|--------------------|--------|----------------|
| `book_appointment` | Create booking in Cal.com or Calendly | Call Cal.com/Calendly API; return confirmation or error to Vapi. |
| `capture_lead` | Save lead to DB and optionally notify | Insert into Postgres; optionally send email. |
| `crm_webhook` | Send lead/outcome to external CRM | HTTP POST to CRM webhook URL with structured payload. |

**Suggested file layout (one of two approaches):**

- **Option A – logic in lib, webhook calls lib:**  
  - `lib/tools/book-appointment.ts`  
  - `lib/tools/capture-lead.ts`  
  - `lib/tools/crm-webhook.ts`  
  - `app/api/vapi/webhook/route.ts` imports these and calls them based on tool name.

- **Option B – internal API routes:**  
  - `app/api/tools/book-appointment/route.ts` (POST, body from Vapi tool payload).  
  - `app/api/tools/capture-lead/route.ts`  
  - `app/api/tools/crm-webhook/route.ts`  
  - `app/api/vapi/webhook/route.ts` does `fetch(origin + '/api/tools/...')` or calls route handlers in process.

Use **Option A** for fewer network hops and simpler deployment.

### 3.2 Appointment booking (Cal.com / Calendly)

- [ ] Add Cal.com or Calendly API integration (env: `CALCOM_API_KEY` or `CALENDLY_API_KEY`, booking link or event type ID).
- [ ] Implement `book_appointment`: parse Vapi tool args (name, email, phone, preferred time/slot); create booking via API; return success/failure message for the agent to speak.
- [ ] Map tool name in Vapi assistant to `book_appointment` and pass the server URL so Vapi sends tool calls to your webhook.

### 3.3 Lead capture

- [ ] Implement `capture_lead`: write to Postgres table (e.g. `leads`: name, email, phone, source, call_sid, created_at); optionally enqueue email confirmation.
- [ ] In Vapi webhook, on `capture_lead` tool call, call this handler and return a short confirmation string for the agent.

### 3.4 CRM webhook

- [ ] Implement `crm_webhook`: receive lead/outcome payload from webhook handler; POST to `CRM_WEBHOOK_URL` (env); return success/failure to Vapi.
- [ ] Document payload shape for your CRM (e.g. name, email, phone, outcome, call_sid).

**Checklist**

- [ ] Create `lib/tools/book-appointment.ts` (or `app/api/tools/book-appointment/route.ts`).
- [ ] Create `lib/tools/capture-lead.ts` (or `app/api/tools/capture-lead/route.ts`).
- [ ] Create `lib/tools/crm-webhook.ts` (or `app/api/tools/crm-webhook/route.ts`).
- [ ] In `app/api/vapi/webhook/route.ts`, dispatch tool calls to these handlers and return results to Vapi.
- [ ] Add env vars: `CALCOM_API_KEY` or `CALENDLY_*`; `CRM_WEBHOOK_URL`.
- [ ] Test each tool via a real call or by POSTing sample Vapi payloads to the webhook.

---

## 4) Missed-call SMS follow-up and email confirmations

**Goal:** If a call is missed (no answer, or Vapi not used) or after a call, send SMS and/or email.

### 4.1 Twilio SMS (missed-call follow-up)

- [ ] When a call is not answered (e.g. from Twilio status callback or from your inbound logic when you don’t connect to Vapi), or when Vapi reports “no answer”, trigger missed-call flow.
- [ ] Send SMS via Twilio API: “You called [Business]. We’re sorry we missed you. Reply or book here: <link>.”
- [ ] Use a single route that your app calls internally, or expose a small internal endpoint for “send missed-call SMS”.

**Route (optional – can be internal only):**

| Purpose | Method | Path | File |
|--------|--------|------|------|
| Send missed-call SMS (internal or Twilio-triggered) | POST | `/api/sms/missed-call-follow-up` | `app/api/sms/missed-call-follow-up/route.ts` |

**`app/api/sms/missed-call-follow-up/route.ts`**

- Accept body: `{ to: string, callSid?: string, businessName?: string }`.
- Use Twilio SDK to send SMS to `to` with your template; include booking link from env.
- Log “SMS sent” in Postgres (e.g. `missed_call_follow_ups` or `communications` table).

### 4.2 Twilio inbound SMS (reply handling)

| Purpose | Method | Path | File |
|--------|--------|------|------|
| Inbound SMS webhook from Twilio | POST | `/api/sms/incoming` | `app/api/sms/incoming/route.ts` |

**`app/api/sms/incoming/route.ts`**

- Parse Twilio POST (From, Body, etc.). Optionally reply with TwiML or use Twilio REST to send a reply (e.g. “Thanks, we’ll call you back” or link to book).
- Optionally log to Postgres and/or create a lead.

### 4.3 Email confirmations

- [ ] Choose provider (e.g. Resend, SendGrid). Add env: `RESEND_API_KEY`, `EMAIL_FROM`, `BOOKING_CONFIRMATION_TEMPLATE_ID` (if applicable).
- [ ] After `book_appointment` succeeds, send confirmation email to the customer (and optionally to internal “bookings” inbox).
- [ ] Implement in `lib/tools/book-appointment.ts` or in a small `lib/email/send-confirmation.ts` called from the book-appointment handler.

**Checklist**

- [ ] Create `app/api/sms/incoming/route.ts` (Twilio SMS webhook).
- [ ] Create `app/api/sms/missed-call-follow-up/route.ts` (send SMS via Twilio; call from status or Vapi end-of-call when “missed”).
- [ ] Implement email send in booking flow (and optionally for lead capture).
- [ ] Set Twilio Messaging webhook to `https://<your-domain>/api/sms/incoming`.
- [ ] Test: miss a call → SMS received; book appointment → email received.

---

## 5) Data logging into Postgres for Missed Revenue Dashboard

**Goal:** Every call (and optionally SMS) is logged so the dashboard can show missed calls, outcomes, and value estimates.

### 5.1 Schema (example)

- [ ] **calls**  
  - `id`, `call_sid` (Twilio), `vapi_call_id` (nullable), `from_number`, `to_number`, `direction` (inbound/outbound), `status` (ringing, in-progress, completed, busy, failed, no-answer), `started_at`, `ended_at`, `duration_seconds`, `outcome` (e.g. booked, lead_captured, missed, voicemail), `value_estimate_cents`, `metadata` (jsonb), `created_at`, `updated_at`.
- [ ] **leads**  
  - `id`, `call_sid` (nullable), `name`, `email`, `phone`, `source` (call, form, sms), `message`, `created_at`.
- [ ] **missed_call_follow_ups** (optional)  
  - `id`, `call_sid`, `phone`, `sms_sent_at`, `created_at`.

Use migrations (e.g. Vercel Postgres, Drizzle, Prisma) to create tables.

### 5.2 Where to write

- **Inbound call:** In `app/api/voice/incoming/route.ts`, insert a row in `calls` (status e.g. `ringing` or `in-progress`).
- **Status callback:** In `app/api/voice/status/route.ts`, update `calls` (status, `ended_at`, `duration_seconds`). If status is `no-answer` or `busy`, set `outcome = 'missed'` and optionally trigger missed-call SMS.
- **Vapi end-of-call:** In `app/api/vapi/webhook/route.ts`, on end-of-call event, update the corresponding `calls` row (match by `vapi_call_id` or phone/time): set `outcome`, `value_estimate_cents`, transcript/summary in `metadata`. If no answer or abandoned, set `outcome = 'missed'` and trigger missed-call SMS.

### 5.3 Value estimate

- [ ] Define rules (e.g. “booked” = $X, “lead_captured” = $Y, “missed” = $Z based on average deal size). Store in `calls.value_estimate_cents` and use in dashboard.

**Checklist**

- [ ] Add Postgres client and migrations (e.g. Drizzle + `lib/db/schema.ts`).
- [ ] Create `calls` and `leads` (and optional `missed_call_follow_ups`) tables.
- [ ] Insert/update from `app/api/voice/incoming/route.ts`, `app/api/voice/status/route.ts`, `app/api/vapi/webhook/route.ts`.
- [ ] Implement value estimation logic and persist in `calls`.
- [ ] Dashboard (existing or new) reads from these tables for “Missed Revenue” and call list.

---

## 6) Failover: if AI fails, route to voicemail / human fallback

**Goal:** When Vapi is down or the call shouldn’t go to AI, send the call to voicemail or a human number.

### 6.1 Decision point

- In **`app/api/voice/incoming/route.ts`**:
  - Option A: Check a feature flag or DB/cache (e.g. “use_fallback” for this number or global). If set, return TwiML that `<Dial>` to a human number or `<Record>` for voicemail; otherwise connect to Vapi.
  - Option B: Try to start Vapi (e.g. create outbound call via Vapi API); on failure, return TwiML for fallback.
  - Option C: Use Twilio’s “timeout” on the dial to Vapi; if no answer within N seconds, Twilio hits a fallback URL. Implement a small route that returns voicemail/human TwiML and set that as the timeout URL in your initial TwiML.

### 6.2 TwiML for fallback

- **Voicemail:** Return TwiML: `<Say>Please leave a message after the beep.</Say><Record maxLength="120" action="/api/voice/voicemail-recording" />`.
- **Human:** Return TwiML: `<Dial timeout="30">+1XXXXXXXXXX</Dial>` then optionally `<Say>` and `<Record>` if no answer.

### 6.3 Routes

| Purpose | Method | Path | File |
|--------|--------|------|------|
| Voicemail recording callback | POST | `/api/voice/voicemail-recording` | `app/api/voice/voicemail-recording/route.ts` |
| Optional: timeout fallback (if using Twilio timeout URL) | POST | `/api/voice/fallback` | `app/api/voice/fallback/route.ts` |

**`app/api/voice/voicemail-recording/route.ts`**

- Twilio POST with `RecordingUrl`, `CallSid`. Save URL and call_sid in Postgres; optionally notify (email/Slack) and log outcome as `voicemail`.

**Checklist**

- [ ] In `app/api/voice/incoming/route.ts`, add failover logic (flag, Vapi failure, or timeout URL).
- [ ] Create `app/api/voice/fallback/route.ts` returning voicemail or human TwiML (if using timeout).
- [ ] Create `app/api/voice/voicemail-recording/route.ts` (store recording, update call outcome, notify).
- [ ] Test: disable Vapi or use flag → call goes to voicemail or human.

---

## Summary: exact files and routes

All paths are under the Next.js app root (e.g. `app/` in a Next.js project or `api-app/app/` if the API is a separate Next app).

### API routes (Next.js App Router)

| File | Method | Path (logical) |
|------|--------|----------------|
| `app/api/voice/incoming/route.ts` | POST | `/api/voice/incoming` |
| `app/api/voice/status/route.ts` | POST | `/api/voice/status` |
| `app/api/voice/fallback/route.ts` | POST | `/api/voice/fallback` (optional) |
| `app/api/voice/voicemail-recording/route.ts` | POST | `/api/voice/voicemail-recording` |
| `app/api/vapi/webhook/route.ts` | POST | `/api/vapi/webhook` |
| `app/api/sms/incoming/route.ts` | POST | `/api/sms/incoming` |
| `app/api/sms/missed-call-follow-up/route.ts` | POST | `/api/sms/missed-call-follow-up` |

Existing (keep or extend):

| File | Method | Path |
|------|--------|------|
| `app/api/book-demo/route.ts` | POST | `/api/book-demo` (form) |
| `app/api/contact/route.ts` | POST | `/api/contact` (form) |

### Lib / server-only (no route)

- `lib/db/schema.ts` (or migrations) – Postgres schema.
- `lib/db/client.ts` – DB client.
- `lib/tools/book-appointment.ts` – Cal.com/Calendly.
- `lib/tools/capture-lead.ts` – Insert lead, optional email.
- `lib/tools/crm-webhook.ts` – POST to CRM.
- `lib/email/send-confirmation.ts` (optional) – Booking/lead email.
- `lib/voice/fallback.ts` (optional) – Build voicemail/human TwiML.

### Environment variables (suggested)

```env
# Twilio
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_PHONE_NUMBER=

# Vapi
VAPI_API_KEY=
VAPI_PHONE_NUMBER_OR_SIP=   # or assistant ID / server URL from Vapi

# Postgres (e.g. Vercel Postgres / Neon)
POSTGRES_URL=                # or DATABASE_URL

# Optional: Cal.com / Calendly
CALCOM_API_KEY=             # or CALENDLY_API_KEY, CALENDLY_EVENT_TYPE_URI

# Optional: CRM
CRM_WEBHOOK_URL=

# Optional: Email (Resend, etc.)
RESEND_API_KEY=
EMAIL_FROM=
BOOKING_LINK=                # for SMS/email

# Optional: Vapi webhook secret
VAPI_WEBHOOK_SECRET=
```

---

## Suggested order of implementation

1. **Postgres + schema** – `lib/db/`, migrations, `calls` and `leads` tables.  
2. **Twilio voice** – `app/api/voice/incoming/route.ts` (TwiML → Vapi or fallback), log call.  
3. **Vapi webhook** – `app/api/vapi/webhook/route.ts` (event handling, tool dispatch).  
4. **Tools** – `lib/tools/capture-lead.ts`, `book-appointment.ts`, `crm-webhook.ts`; wire in webhook.  
5. **Voice status + failover** – `app/api/voice/status/route.ts`, `fallback/route.ts`, `voicemail-recording/route.ts`; failover logic in incoming.  
6. **SMS** – `app/api/sms/incoming/route.ts`, `app/api/sms/missed-call-follow-up/route.ts`; trigger from status/webhook.  
7. **Email** – confirmation in booking/lead flow.  
8. **Dashboard** – read from `calls`/`leads` for Missed Revenue and list views.

This plan gives you a step-by-step checklist and the exact `app/api/.../route.ts` files to add in your Next.js App Router project for the Twilio + Vapi stack.
