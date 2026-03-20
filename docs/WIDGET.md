# Embeddable multi-tenant chat widget — MVP

This doc describes the widget architecture, file structure, database schema, and install snippet. **The main site no longer mounts the old floating chat UI**; integrate ElevenLabs (or another provider) in `my-app/src/components/ElevenLabsWidgetMount.tsx`. The `/api/chat` and `/api/chat/lead` routes remain in the repo for custom or future clients.

---

## 1. File structure

```
mercyspeaks.ai/
├── api/
│   ├── chat.ts                    # existing: POST /api/chat
│   ├── chat/
│   │   └── lead.ts                # existing: POST /api/chat/lead
│   └── widget/
│       ├── config.ts              # GET  /api/widget/config?tenant=TENANT_ID
│       ├── chat.ts                # POST /api/widget/chat
│       └── lead.ts                # POST /api/widget/lead
├── my-app/
│   ├── public/
│   │   └── widget.js              # embeddable script (floating button + modal)
│   ├── src/
│   │   ├── lib/
│   │   │   ├── widget-types.ts    # Tenant, WidgetConfigResponse, etc.
│   │   │   └── widget-tenant.ts   # getTenant(), getWidgetConfig(), domain allowlist
│   │   └── app/
│   │       └── api/
│   │           └── widget/
│   │               └── chat-handler.ts  # tenant-scoped OpenAI chat
│   └── ...
├── supabase/
│   └── migrations/
│       └── 001_widget_tenant_schema.sql
└── docs/
    └── WIDGET.md                  # this file
```

- **Widget script:** `my-app/public/widget.js` → deployed as `/widget.js` (Vite copies `public/` into `dist/`).
- **Backend:** Vercel serverless `api/widget/*.ts`; they import shared code from `my-app/src/lib` and `my-app/src/app/api/widget`.

---

## 2. Database schema (Supabase / Postgres)

Run `supabase/migrations/001_widget_tenant_schema.sql` in the Supabase SQL Editor (or via `supabase db push`).

| Table           | Purpose |
|----------------|--------|
| **tenants**    | One row per customer. `id`, `name`, `domains[]`, `branding` (JSON), `booking_url`, `system_prompt`, `greeting`. |
| **conversations** | Optional: one per widget session. `tenant_id`, `visitor_id`, `started_at`, `metadata`. |
| **leads**      | Captured from widget. `tenant_id`, `conversation_id`, `email`, `phone`, `name`, `business_name`, `message`, `source`, `created_at`. |

**tenants**

- `id` (TEXT, PK) — e.g. `acme-corp`
- `name` — display name
- `domains` (TEXT[]) — allowed hostnames, e.g. `{ 'acme.com', 'www.acme.com' }`
- `branding` (JSONB) — `{ "primaryColor", "accentColor", "companyName", "logoUrl" }`
- `booking_url` — CTA link
- `system_prompt` — OpenAI system prompt for this tenant
- `greeting` — first message in the widget

**Domain allowlist:** All widget endpoints (config, chat, lead) check that the request `Origin` or `Referer` hostname is in that tenant’s `domains`. If not, they return 403. The widget only renders when `GET /api/widget/config` returns 200 with `allowed: true`.

---

## 3. Backend endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET  | `/api/widget/config?tenant=TENANT_ID` | Returns branding, greeting, booking URL. Only when request origin is in tenant’s `domains`. |
| POST | `/api/widget/chat` | Body: `{ tenantId, userMessage, conversationHistory? }`. Routes to OpenAI using tenant’s `system_prompt`. |
| POST | `/api/widget/lead` | Body: `{ tenantId, email, phone, name?, businessName?, message?, conversationId? }`. Validates tenant + domain, then stores lead (Supabase and/or Resend). |

All three validate tenant and domain server-side. No changes to existing `/api/chat` or `/api/chat/lead`.

---

## 4. Copy-paste install snippet (for customers)

Replace `YOUR_TENANT_ID` and optionally `https://mercy-speaks-ai.vercel.app` with the customer’s tenant id and your widget host.

```html
<!-- Mercy Speaks AI — embeddable chat widget -->
<script
  src="https://mercy-speaks-ai.vercel.app/widget.js"
  data-tenant="YOUR_TENANT_ID"
  data-theme="dark"
  data-base-url="https://mercy-speaks-ai.vercel.app"
  async
></script>
```

**Attributes**

- **data-tenant** (required) — Tenant ID (must exist in `tenants` and have the site’s domain in `domains`).
- **data-theme** (optional) — `"dark"` (default) or `"light"`.
- **data-base-url** (optional) — Backend base URL. Defaults to the origin of the script’s `src`.

The widget only loads the chat UI when `GET /api/widget/config?tenant=...` returns 200 and the current page’s hostname is allowed for that tenant.

---

## 5. Env vars (widget + Supabase)

- **Supabase (multi-tenant):** `SUPABASE_URL`, `SUPABASE_SERVICE_KEY`. Used by `api/widget/*` and `widget-tenant.ts` to read tenants and write leads.
- **Fallback (single tenant):** If Supabase is not set, one tenant can be driven by env: `MERCY_TENANT_ID`, `MERCY_WIDGET_DOMAINS` (comma-separated), `MERCY_WIDGET_NAME`, `MERCY_WIDGET_PRIMARY_COLOR`, `MERCY_WIDGET_ACCENT_COLOR`, `MERCY_BOOKING_URL`, `MERCY_WIDGET_GREETING`, `MERCY_WIDGET_SYSTEM_PROMPT`.
- **OpenAI:** Existing `OPENAI_API_KEY` is used for both the in-site chatbot and the widget chat.

See `.env.example` for the full list.
