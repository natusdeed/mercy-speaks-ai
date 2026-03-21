-- =============================================================================
-- Mercy Speaks AI — seed data for local / staging (demo tenant + sample leads)
-- Run AFTER migrations 001 + 002 + 003 (conversations columns). Example:
--   psql "$DATABASE_URL" -f supabase/seed.sql
-- Or paste into Supabase SQL Editor.
-- Set MERCY_DASHBOARD_DEFAULT_TENANT_ID=demo in .env so dashboard-created leads
-- attach to this tenant when desired.
-- =============================================================================

BEGIN;

INSERT INTO tenants (id, name, domains, branding)
VALUES (
  'demo',
  'Mercy Speaks Demo',
  ARRAY['localhost', '127.0.0.1', 'mercyspeaks.ai']::text[],
  '{"primaryColor":"#06b6d4","accentColor":"#8b5cf6","companyName":"Mercy Speaks Digital"}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  domains = EXCLUDED.domains,
  branding = EXCLUDED.branding;

INSERT INTO leads (
  id,
  tenant_id,
  conversation_id,
  email,
  phone,
  name,
  first_name,
  last_name,
  business_name,
  message,
  source,
  status,
  priority,
  service_interest,
  estimated_value,
  notes,
  assigned_to,
  metadata
) VALUES
  (
    'a1000000-0000-4000-8000-000000000001',
    'demo',
    NULL,
    'alex.rivera@example.com',
    '+1 (555) 010-2211',
    'Alex Rivera',
    'Alex',
    'Rivera',
    'Rivera Dental Group',
    'We miss a lot of calls after hours. Need AI receptionist + SMS follow-up.',
    'widget',
    'qualified',
    'hot',
    'AI Phone Receptionist',
    28500,
    'Wants ROI sheet and compliance notes for HIPAA.',
    'ops@mercyspeaksdigital.com',
    '{}'::jsonb
  ),
  (
    'a1000000-0000-4000-8000-000000000002',
    'demo',
    NULL,
    'jordan.kim@example.com',
    '+1 (555) 010-8844',
    'Jordan Kim',
    'Jordan',
    'Kim',
    'PrimeGlobal Logistics',
    'Interested in workflow automation between CRM and dispatch.',
    'widget',
    'contacted',
    'high',
    'Workflow Automation',
    42000,
    'Follow up Tuesday — decision maker traveling.',
    NULL,
    '{}'::jsonb
  ),
  (
    'a1000000-0000-4000-8000-000000000003',
    'demo',
    NULL,
    'sam.ortiz@example.com',
    '+1 (555) 010-3390',
    'Sam Ortiz',
    'Sam',
    'Ortiz',
    'Ortiz Home Services',
    'Website chat is slow; looking for a faster AI assistant with booking.',
    'dashboard',
    'new',
    'medium',
    'Website Chatbot',
    12000,
    NULL,
    NULL,
    '{}'::jsonb
  ),
  (
    'a1000000-0000-4000-8000-000000000004',
    'demo',
    NULL,
    'taylor.morgan@example.com',
    '+1 (555) 010-7720',
    'Taylor Morgan',
    'Taylor',
    'Morgan',
    'Morgan Legal Partners',
    'Need intake + appointment automation for new case volume.',
    'widget',
    'booked',
    'medium',
    'Appointment Automation',
    18000,
    'Demo booked via Cal.com next week.',
    'sales@mercyspeaksdigital.com',
    '{}'::jsonb
  )
ON CONFLICT (id) DO NOTHING;

-- Sample conversations for dashboard inbox (links optional)
INSERT INTO conversations (
  id,
  tenant_id,
  visitor_id,
  started_at,
  updated_at,
  channel,
  contact_name,
  last_message_preview,
  last_message_at,
  status,
  intent,
  outcome,
  transcript,
  ai_summary,
  qualification_result,
  internal_notes,
  metadata
) VALUES
  (
    'b2000000-0000-4000-8000-000000000001',
    'demo',
    'visitor-alex-r',
    NOW() - INTERVAL '2 days',
    NOW() - INTERVAL '1 hour',
    'widget',
    NULL,
    'Thanks — I''ll send the HIPAA notes and ROI sheet tomorrow.',
    NOW() - INTERVAL '1 hour',
    'handed_off',
    'AI phone receptionist + after-hours',
    'Qualified; human handoff for proposal',
    $transcript$[
      {"role":"assistant","content":"Hi — I'm Mercy. How can I help today?","at":"2025-03-18T18:00:00Z"},
      {"role":"user","content":"We miss calls after 5pm at our dental group. Need AI receptionist coverage.","at":"2025-03-18T18:00:22Z"},
      {"role":"assistant","content":"Got it — I can outline after-hours voice + SMS follow-up. What's your average weekly call volume?","at":"2025-03-18T18:00:35Z"},
      {"role":"user","content":"Roughly 40–60. HIPAA matters for us.","at":"2025-03-18T18:01:02Z"}
    ]$transcript$::jsonb,
    'Decision maker engaged; dental group exploring AI receptionist with HIPAA constraints. Budget and timeline discussed positively.',
    'Strong fit — stated pain (after-hours volume), compliance named, willing to receive materials.',
    'Send compliance pack + ROI worksheet. Mention Rivera Dental in subject.',
    '{}'::jsonb
  ),
  (
    'b2000000-0000-4000-8000-000000000002',
    'demo',
    'anon-widget-9f3',
    NOW() - INTERVAL '5 hours',
    NOW() - INTERVAL '5 hours',
    'widget',
    NULL,
    'Is booking included in the starter plan?',
    NOW() - INTERVAL '5 hours',
    'open',
    'Pricing / packaging',
    NULL,
    $transcript$[
      {"role":"user","content":"Is booking included in the starter plan?","at":"2025-03-20T12:10:00Z"},
      {"role":"assistant","content":"Starter focuses on chat + lead capture; booking add-ons are a separate module. Want a quick breakdown?","at":"2025-03-20T12:10:12Z"}
    ]$transcript$::jsonb,
    'Anonymous visitor asked about booking scope vs starter plan; no lead captured yet.',
    'Informational — no budget or timeline captured.',
    NULL,
    '{}'::jsonb
  ),
  (
    'b2000000-0000-4000-8000-000000000003',
    'demo',
    NULL,
    NOW() - INTERVAL '20 days',
    NOW() - INTERVAL '20 days',
    'voice',
    'Jordan Kim',
    'Call ended — callback scheduled Tuesday.',
    NOW() - INTERVAL '20 days',
    'archived',
    'Workflow automation',
    'Callback scheduled',
    '[]'::jsonb,
    'Brief discovery on CRM–dispatch sync; Jordan requested Tuesday callback while traveling.',
    'Mid-funnel — needs recap when back in office.',
    NULL,
    '{}'::jsonb
  )
ON CONFLICT (id) DO UPDATE SET
  tenant_id = EXCLUDED.tenant_id,
  visitor_id = EXCLUDED.visitor_id,
  updated_at = EXCLUDED.updated_at,
  channel = EXCLUDED.channel,
  contact_name = EXCLUDED.contact_name,
  last_message_preview = EXCLUDED.last_message_preview,
  last_message_at = EXCLUDED.last_message_at,
  status = EXCLUDED.status,
  intent = EXCLUDED.intent,
  outcome = EXCLUDED.outcome,
  transcript = EXCLUDED.transcript,
  ai_summary = EXCLUDED.ai_summary,
  qualification_result = EXCLUDED.qualification_result,
  internal_notes = EXCLUDED.internal_notes,
  metadata = EXCLUDED.metadata;

UPDATE leads
SET conversation_id = 'b2000000-0000-4000-8000-000000000001'
WHERE id = 'a1000000-0000-4000-8000-000000000001';

UPDATE leads
SET conversation_id = 'b2000000-0000-4000-8000-000000000003'
WHERE id = 'a1000000-0000-4000-8000-000000000002';

COMMIT;
