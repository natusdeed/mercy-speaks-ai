-- =============================================================================
-- Phase 3 database completion (idempotent, additive only)
--
-- Purpose
--   The Phase 3 lead-handling tools in
--     my-app/src/lib/agent-os/tools/lead-handling-tools.ts
--   write to: leads, conversations, bookings, tasks, approvals,
--             missed_revenue_events, agent_runs, tool_calls.
--
--   The Phase 3 real-write smoke test confirmed that:
--     - leads, conversations, agent_runs, tool_calls already exist
--     - bookings, tasks, approvals, missed_revenue_events do NOT exist
--     - leads is missing a `metadata JSONB` column
--
--   This migration completes ONLY what is missing for Phase 3 to write
--   real rows safely. It is fully re-runnable.
--
-- Safety guarantees
--   - No DROP TABLE / DROP COLUMN anywhere.
--   - No DELETE / UPDATE of existing data.
--   - All table creation uses CREATE TABLE IF NOT EXISTS.
--   - All column additions use ALTER TABLE ... ADD COLUMN IF NOT EXISTS.
--   - Foreign keys are added in conditional DO blocks: each FK is only
--     attached when the referenced table exists AND the same FK is not
--     already present, so this file never crashes on a partial schema.
--   - No app code, no production behavior, no secrets.
-- =============================================================================

BEGIN;

SET search_path TO public;

-- -----------------------------------------------------------------------------
-- 1. Organizations (FK target for several tables; harmless if it already exists)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  legal_name TEXT,
  industry TEXT,
  website_url TEXT,
  phone TEXT,
  email TEXT,
  timezone TEXT NOT NULL DEFAULT 'America/New_York',
  status TEXT NOT NULL DEFAULT 'active',
  settings JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT organizations_status_check CHECK (status IN ('active', 'inactive', 'archived'))
);

CREATE INDEX IF NOT EXISTS idx_organizations_status ON public.organizations(status);

-- -----------------------------------------------------------------------------
-- 2. Add `metadata JSONB` to leads if it is missing.
--    Existing rows backfill to '{}'::jsonb via the DEFAULT (no data loss).
-- -----------------------------------------------------------------------------
DO $leads_metadata$
BEGIN
  IF to_regclass('public.leads') IS NOT NULL THEN
    EXECUTE 'ALTER TABLE public.leads
              ADD COLUMN IF NOT EXISTS metadata JSONB NOT NULL DEFAULT ''{}''::jsonb';
  END IF;
END;
$leads_metadata$;

-- -----------------------------------------------------------------------------
-- 3. Calls (created safely so missed_revenue_events.call_id can FK cleanly).
--    FK columns are kept as plain UUIDs first, then attached conditionally.
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.calls (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID,
  lead_id UUID,
  organization_id UUID REFERENCES public.organizations(id) ON DELETE SET NULL,
  external_call_id TEXT,
  provider TEXT NOT NULL DEFAULT 'twilio',
  direction TEXT NOT NULL DEFAULT 'inbound',
  status TEXT NOT NULL DEFAULT 'initiated',
  from_number TEXT,
  to_number TEXT,
  started_at TIMESTAMPTZ,
  ended_at TIMESTAMPTZ,
  duration_seconds INTEGER,
  transcript TEXT,
  summary TEXT,
  recording_url TEXT,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT calls_provider_check CHECK (provider IN ('twilio', 'vapi', 'other')),
  CONSTRAINT calls_direction_check CHECK (direction IN ('inbound', 'outbound')),
  CONSTRAINT calls_status_check CHECK (
    status IN ('initiated', 'ringing', 'in_progress', 'completed', 'missed', 'failed', 'voicemail')
  )
);

DO $calls_fks$
BEGIN
  IF to_regclass('public.conversations') IS NOT NULL
     AND NOT EXISTS (
       SELECT 1 FROM pg_constraint
       WHERE conname = 'calls_conversation_id_fkey'
         AND conrelid = 'public.calls'::regclass
     )
  THEN
    EXECUTE 'ALTER TABLE public.calls
              ADD CONSTRAINT calls_conversation_id_fkey
              FOREIGN KEY (conversation_id) REFERENCES public.conversations(id) ON DELETE SET NULL';
  END IF;

  IF to_regclass('public.leads') IS NOT NULL
     AND NOT EXISTS (
       SELECT 1 FROM pg_constraint
       WHERE conname = 'calls_lead_id_fkey'
         AND conrelid = 'public.calls'::regclass
     )
  THEN
    EXECUTE 'ALTER TABLE public.calls
              ADD CONSTRAINT calls_lead_id_fkey
              FOREIGN KEY (lead_id) REFERENCES public.leads(id) ON DELETE SET NULL';
  END IF;
END;
$calls_fks$;

CREATE INDEX IF NOT EXISTS idx_calls_conversation_id ON public.calls(conversation_id);
CREATE INDEX IF NOT EXISTS idx_calls_lead_id ON public.calls(lead_id);
CREATE INDEX IF NOT EXISTS idx_calls_started_at ON public.calls(started_at DESC);

-- -----------------------------------------------------------------------------
-- 4. Bookings (target of executeCreateBookingIntent in lead-handling-tools.ts)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID,
  conversation_id UUID,
  organization_id UUID REFERENCES public.organizations(id) ON DELETE SET NULL,
  source TEXT NOT NULL DEFAULT 'ai_agent',
  provider TEXT NOT NULL DEFAULT 'calcom',
  external_booking_id TEXT,
  status TEXT NOT NULL DEFAULT 'intent',
  booking_link TEXT,
  starts_at TIMESTAMPTZ,
  ends_at TIMESTAMPTZ,
  timezone TEXT,
  notes TEXT,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT bookings_source_check CHECK (
    source IN ('ai_agent', 'owner', 'human_staff', 'widget', 'other')
  ),
  CONSTRAINT bookings_provider_check CHECK (
    provider IN ('calcom', 'calendly', 'manual', 'other')
  ),
  CONSTRAINT bookings_status_check CHECK (
    status IN ('intent', 'pending_confirmation', 'confirmed', 'completed', 'cancelled', 'no_show')
  )
);

DO $bookings_fks$
BEGIN
  IF to_regclass('public.leads') IS NOT NULL
     AND NOT EXISTS (
       SELECT 1 FROM pg_constraint
       WHERE conname = 'bookings_lead_id_fkey'
         AND conrelid = 'public.bookings'::regclass
     )
  THEN
    EXECUTE 'ALTER TABLE public.bookings
              ADD CONSTRAINT bookings_lead_id_fkey
              FOREIGN KEY (lead_id) REFERENCES public.leads(id) ON DELETE SET NULL';
  END IF;

  IF to_regclass('public.conversations') IS NOT NULL
     AND NOT EXISTS (
       SELECT 1 FROM pg_constraint
       WHERE conname = 'bookings_conversation_id_fkey'
         AND conrelid = 'public.bookings'::regclass
     )
  THEN
    EXECUTE 'ALTER TABLE public.bookings
              ADD CONSTRAINT bookings_conversation_id_fkey
              FOREIGN KEY (conversation_id) REFERENCES public.conversations(id) ON DELETE SET NULL';
  END IF;
END;
$bookings_fks$;

CREATE INDEX IF NOT EXISTS idx_bookings_lead_id ON public.bookings(lead_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON public.bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_starts_at ON public.bookings(starts_at DESC);

-- -----------------------------------------------------------------------------
-- 5. Tasks (target of executeDraftFollowUp in lead-handling-tools.ts)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES public.organizations(id) ON DELETE SET NULL,
  lead_id UUID,
  conversation_id UUID,
  created_by_agent_run_id UUID,
  title TEXT NOT NULL,
  description TEXT,
  task_type TEXT NOT NULL DEFAULT 'follow_up',
  status TEXT NOT NULL DEFAULT 'pending',
  priority TEXT NOT NULL DEFAULT 'medium',
  due_at TIMESTAMPTZ,
  assigned_to TEXT,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  CONSTRAINT tasks_task_type_check CHECK (
    task_type IN ('follow_up', 'callback', 'proposal', 'content_review', 'approval', 'integration_check', 'other')
  ),
  CONSTRAINT tasks_status_check CHECK (
    status IN ('pending', 'in_progress', 'blocked', 'completed', 'cancelled')
  ),
  CONSTRAINT tasks_priority_check CHECK (
    priority IN ('low', 'medium', 'high', 'urgent')
  )
);

DO $tasks_fks$
BEGIN
  IF to_regclass('public.leads') IS NOT NULL
     AND NOT EXISTS (
       SELECT 1 FROM pg_constraint
       WHERE conname = 'tasks_lead_id_fkey'
         AND conrelid = 'public.tasks'::regclass
     )
  THEN
    EXECUTE 'ALTER TABLE public.tasks
              ADD CONSTRAINT tasks_lead_id_fkey
              FOREIGN KEY (lead_id) REFERENCES public.leads(id) ON DELETE SET NULL';
  END IF;

  IF to_regclass('public.conversations') IS NOT NULL
     AND NOT EXISTS (
       SELECT 1 FROM pg_constraint
       WHERE conname = 'tasks_conversation_id_fkey'
         AND conrelid = 'public.tasks'::regclass
     )
  THEN
    EXECUTE 'ALTER TABLE public.tasks
              ADD CONSTRAINT tasks_conversation_id_fkey
              FOREIGN KEY (conversation_id) REFERENCES public.conversations(id) ON DELETE SET NULL';
  END IF;

  IF to_regclass('public.agent_runs') IS NOT NULL
     AND NOT EXISTS (
       SELECT 1 FROM pg_constraint
       WHERE conname = 'tasks_created_by_agent_run_id_fkey'
         AND conrelid = 'public.tasks'::regclass
     )
  THEN
    EXECUTE 'ALTER TABLE public.tasks
              ADD CONSTRAINT tasks_created_by_agent_run_id_fkey
              FOREIGN KEY (created_by_agent_run_id) REFERENCES public.agent_runs(id) ON DELETE SET NULL';
  END IF;
END;
$tasks_fks$;

CREATE INDEX IF NOT EXISTS idx_tasks_org_id ON public.tasks(organization_id);
CREATE INDEX IF NOT EXISTS idx_tasks_status ON public.tasks(status);
CREATE INDEX IF NOT EXISTS idx_tasks_due_at ON public.tasks(due_at ASC NULLS LAST);

-- -----------------------------------------------------------------------------
-- 6. Approvals (target of executeSendOwnerAlert in lead-handling-tools.ts)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.approvals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES public.organizations(id) ON DELETE SET NULL,
  agent_run_id UUID,
  tool_call_id UUID,
  social_post_id UUID,
  approval_type TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  requested_by TEXT NOT NULL DEFAULT 'ai_agent',
  requested_payload JSONB NOT NULL DEFAULT '{}'::jsonb,
  decision_reason TEXT,
  approved_by TEXT,
  decided_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT approvals_type_check CHECK (
    approval_type IN ('publish_social', 'send_email', 'send_sms', 'booking_confirmation', 'price_quote', 'other')
  ),
  CONSTRAINT approvals_status_check CHECK (
    status IN ('pending', 'approved', 'rejected', 'expired', 'cancelled')
  )
);

DO $approvals_fks$
BEGIN
  IF to_regclass('public.agent_runs') IS NOT NULL
     AND NOT EXISTS (
       SELECT 1 FROM pg_constraint
       WHERE conname = 'approvals_agent_run_id_fkey'
         AND conrelid = 'public.approvals'::regclass
     )
  THEN
    EXECUTE 'ALTER TABLE public.approvals
              ADD CONSTRAINT approvals_agent_run_id_fkey
              FOREIGN KEY (agent_run_id) REFERENCES public.agent_runs(id) ON DELETE SET NULL';
  END IF;

  IF to_regclass('public.tool_calls') IS NOT NULL
     AND NOT EXISTS (
       SELECT 1 FROM pg_constraint
       WHERE conname = 'approvals_tool_call_id_fkey'
         AND conrelid = 'public.approvals'::regclass
     )
  THEN
    EXECUTE 'ALTER TABLE public.approvals
              ADD CONSTRAINT approvals_tool_call_id_fkey
              FOREIGN KEY (tool_call_id) REFERENCES public.tool_calls(id) ON DELETE SET NULL';
  END IF;

  IF to_regclass('public.social_posts') IS NOT NULL
     AND NOT EXISTS (
       SELECT 1 FROM pg_constraint
       WHERE conname = 'approvals_social_post_id_fkey'
         AND conrelid = 'public.approvals'::regclass
     )
  THEN
    EXECUTE 'ALTER TABLE public.approvals
              ADD CONSTRAINT approvals_social_post_id_fkey
              FOREIGN KEY (social_post_id) REFERENCES public.social_posts(id) ON DELETE SET NULL';
  END IF;
END;
$approvals_fks$;

CREATE INDEX IF NOT EXISTS idx_approvals_org_id ON public.approvals(organization_id);
CREATE INDEX IF NOT EXISTS idx_approvals_status ON public.approvals(status);
CREATE INDEX IF NOT EXISTS idx_approvals_created_at ON public.approvals(created_at DESC);

-- -----------------------------------------------------------------------------
-- 7. Missed revenue events (target of executeLogMissedRevenue in lead-handling-tools.ts)
--    call_id remains a plain nullable UUID; FK is attached only if the
--    `calls` table exists, per requirement 14.
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.missed_revenue_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES public.organizations(id) ON DELETE SET NULL,
  lead_id UUID,
  conversation_id UUID,
  call_id UUID,
  booking_id UUID,
  event_type TEXT NOT NULL,
  severity TEXT NOT NULL DEFAULT 'medium',
  reason TEXT NOT NULL,
  estimated_value NUMERIC(12, 2),
  recovered BOOLEAN NOT NULL DEFAULT FALSE,
  recovered_at TIMESTAMPTZ,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT missed_revenue_event_type_check CHECK (
    event_type IN ('missed_call', 'abandoned_chat', 'no_follow_up', 'failed_handoff', 'no_show', 'other')
  ),
  CONSTRAINT missed_revenue_severity_check CHECK (
    severity IN ('low', 'medium', 'high', 'critical')
  )
);

DO $mre_fks$
BEGIN
  IF to_regclass('public.leads') IS NOT NULL
     AND NOT EXISTS (
       SELECT 1 FROM pg_constraint
       WHERE conname = 'missed_revenue_events_lead_id_fkey'
         AND conrelid = 'public.missed_revenue_events'::regclass
     )
  THEN
    EXECUTE 'ALTER TABLE public.missed_revenue_events
              ADD CONSTRAINT missed_revenue_events_lead_id_fkey
              FOREIGN KEY (lead_id) REFERENCES public.leads(id) ON DELETE SET NULL';
  END IF;

  IF to_regclass('public.conversations') IS NOT NULL
     AND NOT EXISTS (
       SELECT 1 FROM pg_constraint
       WHERE conname = 'missed_revenue_events_conversation_id_fkey'
         AND conrelid = 'public.missed_revenue_events'::regclass
     )
  THEN
    EXECUTE 'ALTER TABLE public.missed_revenue_events
              ADD CONSTRAINT missed_revenue_events_conversation_id_fkey
              FOREIGN KEY (conversation_id) REFERENCES public.conversations(id) ON DELETE SET NULL';
  END IF;

  IF to_regclass('public.calls') IS NOT NULL
     AND NOT EXISTS (
       SELECT 1 FROM pg_constraint
       WHERE conname = 'missed_revenue_events_call_id_fkey'
         AND conrelid = 'public.missed_revenue_events'::regclass
     )
  THEN
    EXECUTE 'ALTER TABLE public.missed_revenue_events
              ADD CONSTRAINT missed_revenue_events_call_id_fkey
              FOREIGN KEY (call_id) REFERENCES public.calls(id) ON DELETE SET NULL';
  END IF;

  IF to_regclass('public.bookings') IS NOT NULL
     AND NOT EXISTS (
       SELECT 1 FROM pg_constraint
       WHERE conname = 'missed_revenue_events_booking_id_fkey'
         AND conrelid = 'public.missed_revenue_events'::regclass
     )
  THEN
    EXECUTE 'ALTER TABLE public.missed_revenue_events
              ADD CONSTRAINT missed_revenue_events_booking_id_fkey
              FOREIGN KEY (booking_id) REFERENCES public.bookings(id) ON DELETE SET NULL';
  END IF;
END;
$mre_fks$;

CREATE INDEX IF NOT EXISTS idx_missed_revenue_org_id ON public.missed_revenue_events(organization_id);
CREATE INDEX IF NOT EXISTS idx_missed_revenue_created_at ON public.missed_revenue_events(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_missed_revenue_recovered ON public.missed_revenue_events(recovered);

-- -----------------------------------------------------------------------------
-- 8. updated_at trigger (idempotent function + triggers only on tables we
--    introduced or completed in this file).
-- -----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.agent_os_set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS organizations_set_updated_at ON public.organizations;
CREATE TRIGGER organizations_set_updated_at
  BEFORE UPDATE ON public.organizations
  FOR EACH ROW
  EXECUTE FUNCTION public.agent_os_set_updated_at();

DROP TRIGGER IF EXISTS bookings_set_updated_at ON public.bookings;
CREATE TRIGGER bookings_set_updated_at
  BEFORE UPDATE ON public.bookings
  FOR EACH ROW
  EXECUTE FUNCTION public.agent_os_set_updated_at();

DROP TRIGGER IF EXISTS tasks_set_updated_at ON public.tasks;
CREATE TRIGGER tasks_set_updated_at
  BEFORE UPDATE ON public.tasks
  FOR EACH ROW
  EXECUTE FUNCTION public.agent_os_set_updated_at();

COMMIT;
