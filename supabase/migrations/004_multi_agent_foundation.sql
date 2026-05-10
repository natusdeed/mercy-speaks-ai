-- =============================================================================
-- Multi-agent business OS foundation (Phase 1 / Phase 2)
-- Additive only: new tables for agent operations, marketing, approvals, etc.
--
-- Scoping: all new FKs and indexes use organization_id (UUID → organizations).
-- This file does NOT reference tenant_id (widget/tenants namespace from 001).
-- =============================================================================

BEGIN;

SET search_path TO public;

-- Optional organization layer for multi-location / multi-brand setups.
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
CREATE INDEX IF NOT EXISTS idx_organizations_created_at ON public.organizations(created_at DESC);

-- Optional org references on existing CRM tables (widget schema from 001).
ALTER TABLE IF EXISTS public.leads
  ADD COLUMN IF NOT EXISTS organization_id UUID REFERENCES public.organizations(id) ON DELETE SET NULL;
ALTER TABLE IF EXISTS public.conversations
  ADD COLUMN IF NOT EXISTS organization_id UUID REFERENCES public.organizations(id) ON DELETE SET NULL;

-- Indexes only when CRM tables exist (avoids failure on empty / non-widget databases).
DO $org_idx$
BEGIN
  IF to_regclass('public.leads') IS NOT NULL THEN
    EXECUTE 'CREATE INDEX IF NOT EXISTS idx_leads_organization_id ON public.leads(organization_id)';
  END IF;
  IF to_regclass('public.conversations') IS NOT NULL THEN
    EXECUTE 'CREATE INDEX IF NOT EXISTS idx_conversations_organization_id ON public.conversations(organization_id)';
  END IF;
END;
$org_idx$;

-- Message log for conversation timeline and channel parity.
CREATE TABLE IF NOT EXISTS public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
  lead_id UUID REFERENCES public.leads(id) ON DELETE SET NULL,
  organization_id UUID REFERENCES public.organizations(id) ON DELETE SET NULL,
  role TEXT NOT NULL,
  channel TEXT NOT NULL DEFAULT 'widget',
  direction TEXT NOT NULL DEFAULT 'inbound',
  content TEXT NOT NULL,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  sent_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT messages_role_check CHECK (role IN ('system', 'assistant', 'user', 'tool', 'human_agent')),
  CONSTRAINT messages_channel_check CHECK (channel IN ('widget', 'sms', 'voice', 'email', 'web', 'other')),
  CONSTRAINT messages_direction_check CHECK (direction IN ('inbound', 'outbound', 'internal'))
);

CREATE INDEX IF NOT EXISTS idx_messages_conversation_id ON public.messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_messages_lead_id ON public.messages(lead_id);
CREATE INDEX IF NOT EXISTS idx_messages_sent_at ON public.messages(sent_at DESC);

-- Voice activity log.
CREATE TABLE IF NOT EXISTS public.calls (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES public.conversations(id) ON DELETE SET NULL,
  lead_id UUID REFERENCES public.leads(id) ON DELETE SET NULL,
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
  CONSTRAINT calls_status_check CHECK (status IN ('initiated', 'ringing', 'in_progress', 'completed', 'missed', 'failed', 'voicemail'))
);

CREATE INDEX IF NOT EXISTS idx_calls_conversation_id ON public.calls(conversation_id);
CREATE INDEX IF NOT EXISTS idx_calls_lead_id ON public.calls(lead_id);
CREATE INDEX IF NOT EXISTS idx_calls_started_at ON public.calls(started_at DESC);

-- Booking activity and intent tracking.
CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES public.leads(id) ON DELETE SET NULL,
  conversation_id UUID REFERENCES public.conversations(id) ON DELETE SET NULL,
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
  CONSTRAINT bookings_source_check CHECK (source IN ('ai_agent', 'owner', 'human_staff', 'widget', 'other')),
  CONSTRAINT bookings_provider_check CHECK (provider IN ('calcom', 'calendly', 'manual', 'other')),
  CONSTRAINT bookings_status_check CHECK (status IN ('intent', 'pending_confirmation', 'confirmed', 'completed', 'cancelled', 'no_show'))
);

CREATE INDEX IF NOT EXISTS idx_bookings_lead_id ON public.bookings(lead_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON public.bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_starts_at ON public.bookings(starts_at DESC);

-- Revenue leakage / missed-opportunity tracking.
CREATE TABLE IF NOT EXISTS public.missed_revenue_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES public.organizations(id) ON DELETE SET NULL,
  lead_id UUID REFERENCES public.leads(id) ON DELETE SET NULL,
  conversation_id UUID REFERENCES public.conversations(id) ON DELETE SET NULL,
  call_id UUID REFERENCES public.calls(id) ON DELETE SET NULL,
  booking_id UUID REFERENCES public.bookings(id) ON DELETE SET NULL,
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
  CONSTRAINT missed_revenue_severity_check CHECK (severity IN ('low', 'medium', 'high', 'critical'))
);

CREATE INDEX IF NOT EXISTS idx_missed_revenue_org_id ON public.missed_revenue_events(organization_id);
CREATE INDEX IF NOT EXISTS idx_missed_revenue_created_at ON public.missed_revenue_events(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_missed_revenue_recovered ON public.missed_revenue_events(recovered);

-- Every orchestration run of an AI employee (Phase 2 agent-os).
CREATE TABLE IF NOT EXISTS public.agent_runs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES public.organizations(id) ON DELETE SET NULL,
  lead_id UUID REFERENCES public.leads(id) ON DELETE SET NULL,
  conversation_id UUID REFERENCES public.conversations(id) ON DELETE SET NULL,
  parent_run_id UUID REFERENCES public.agent_runs(id) ON DELETE SET NULL,
  agent_name TEXT NOT NULL,
  agent_version TEXT,
  trigger_source TEXT NOT NULL DEFAULT 'api',
  input_payload JSONB NOT NULL DEFAULT '{}'::jsonb,
  output_payload JSONB NOT NULL DEFAULT '{}'::jsonb,
  status TEXT NOT NULL DEFAULT 'running',
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  error_code TEXT,
  error_message TEXT,
  started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  duration_ms INTEGER,
  CONSTRAINT agent_runs_status_check CHECK (status IN ('running', 'success', 'failed', 'blocked', 'cancelled')),
  CONSTRAINT agent_runs_trigger_source_check CHECK (
    trigger_source IN ('api', 'webhook', 'schedule', 'manual', 'dashboard', 'other')
  )
);

CREATE INDEX IF NOT EXISTS idx_agent_runs_org_id ON public.agent_runs(organization_id);
CREATE INDEX IF NOT EXISTS idx_agent_runs_agent_name ON public.agent_runs(agent_name);
CREATE INDEX IF NOT EXISTS idx_agent_runs_started_at ON public.agent_runs(started_at DESC);
CREATE INDEX IF NOT EXISTS idx_agent_runs_status ON public.agent_runs(status);

-- Tool execution telemetry (Phase 2 agent-os).
-- Columns match API usage; tool_version + requires_approval are required by orchestration inserts.
CREATE TABLE IF NOT EXISTS public.tool_calls (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_run_id UUID NOT NULL REFERENCES public.agent_runs(id) ON DELETE CASCADE,
  tool_name TEXT NOT NULL,
  tool_version TEXT,
  request_payload JSONB NOT NULL DEFAULT '{}'::jsonb,
  response_payload JSONB NOT NULL DEFAULT '{}'::jsonb,
  status TEXT NOT NULL DEFAULT 'success',
  error_message TEXT,
  started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  duration_ms INTEGER,
  requires_approval BOOLEAN NOT NULL DEFAULT FALSE,
  CONSTRAINT tool_calls_status_check CHECK (status IN ('success', 'failed', 'blocked', 'skipped'))
);

CREATE INDEX IF NOT EXISTS idx_tool_calls_agent_run_id ON public.tool_calls(agent_run_id);
CREATE INDEX IF NOT EXISTS idx_tool_calls_tool_name ON public.tool_calls(tool_name);
CREATE INDEX IF NOT EXISTS idx_tool_calls_started_at ON public.tool_calls(started_at DESC);

-- Operational task queue.
CREATE TABLE IF NOT EXISTS public.tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES public.organizations(id) ON DELETE SET NULL,
  lead_id UUID REFERENCES public.leads(id) ON DELETE SET NULL,
  conversation_id UUID REFERENCES public.conversations(id) ON DELETE SET NULL,
  created_by_agent_run_id UUID REFERENCES public.agent_runs(id) ON DELETE SET NULL,
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
  CONSTRAINT tasks_status_check CHECK (status IN ('pending', 'in_progress', 'blocked', 'completed', 'cancelled')),
  CONSTRAINT tasks_priority_check CHECK (priority IN ('low', 'medium', 'high', 'urgent'))
);

CREATE INDEX IF NOT EXISTS idx_tasks_org_id ON public.tasks(organization_id);
CREATE INDEX IF NOT EXISTS idx_tasks_status ON public.tasks(status);
CREATE INDEX IF NOT EXISTS idx_tasks_due_at ON public.tasks(due_at ASC NULLS LAST);

-- Marketing campaign planner.
CREATE TABLE IF NOT EXISTS public.campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES public.organizations(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  objective TEXT NOT NULL,
  channel TEXT NOT NULL DEFAULT 'social',
  audience TEXT,
  status TEXT NOT NULL DEFAULT 'draft',
  start_date DATE,
  end_date DATE,
  budget NUMERIC(12, 2),
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT campaigns_channel_check CHECK (channel IN ('social', 'email', 'sms', 'ads', 'mixed')),
  CONSTRAINT campaigns_status_check CHECK (status IN ('draft', 'planned', 'active', 'paused', 'completed', 'archived'))
);

CREATE INDEX IF NOT EXISTS idx_campaigns_org_id ON public.campaigns(organization_id);
CREATE INDEX IF NOT EXISTS idx_campaigns_status ON public.campaigns(status);

-- Content ideation artifacts.
CREATE TABLE IF NOT EXISTS public.content_ideas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES public.organizations(id) ON DELETE SET NULL,
  campaign_id UUID REFERENCES public.campaigns(id) ON DELETE SET NULL,
  generated_by_agent_run_id UUID REFERENCES public.agent_runs(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  angle TEXT,
  target_platform TEXT NOT NULL DEFAULT 'instagram',
  funnel_stage TEXT NOT NULL DEFAULT 'awareness',
  hook TEXT,
  cta TEXT,
  status TEXT NOT NULL DEFAULT 'draft',
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT content_ideas_platform_check CHECK (
    target_platform IN ('instagram', 'facebook', 'tiktok', 'youtube', 'linkedin', 'x', 'blog', 'email', 'other')
  ),
  CONSTRAINT content_ideas_funnel_stage_check CHECK (
    funnel_stage IN ('awareness', 'consideration', 'conversion', 'retention')
  ),
  CONSTRAINT content_ideas_status_check CHECK (status IN ('draft', 'approved', 'rejected', 'archived'))
);

CREATE INDEX IF NOT EXISTS idx_content_ideas_org_id ON public.content_ideas(organization_id);
CREATE INDEX IF NOT EXISTS idx_content_ideas_campaign_id ON public.content_ideas(campaign_id);
CREATE INDEX IF NOT EXISTS idx_content_ideas_status ON public.content_ideas(status);

-- Social post drafts and publish lifecycle.
CREATE TABLE IF NOT EXISTS public.social_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES public.organizations(id) ON DELETE SET NULL,
  campaign_id UUID REFERENCES public.campaigns(id) ON DELETE SET NULL,
  content_idea_id UUID REFERENCES public.content_ideas(id) ON DELETE SET NULL,
  generated_by_agent_run_id UUID REFERENCES public.agent_runs(id) ON DELETE SET NULL,
  platform TEXT NOT NULL,
  post_type TEXT NOT NULL DEFAULT 'feed',
  status TEXT NOT NULL DEFAULT 'draft',
  title TEXT,
  caption TEXT NOT NULL,
  hashtags TEXT[] NOT NULL DEFAULT '{}'::text[],
  visual_prompt TEXT,
  scheduled_for TIMESTAMPTZ,
  published_at TIMESTAMPTZ,
  external_post_id TEXT,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT social_posts_platform_check CHECK (
    platform IN ('instagram', 'facebook', 'tiktok', 'youtube', 'linkedin', 'x', 'threads', 'other')
  ),
  CONSTRAINT social_posts_post_type_check CHECK (
    post_type IN ('feed', 'story', 'reel', 'short', 'carousel', 'thread', 'other')
  ),
  CONSTRAINT social_posts_status_check CHECK (
    status IN ('draft', 'pending_approval', 'approved', 'scheduled', 'published', 'failed', 'rejected')
  )
);

CREATE INDEX IF NOT EXISTS idx_social_posts_org_id ON public.social_posts(organization_id);
CREATE INDEX IF NOT EXISTS idx_social_posts_status ON public.social_posts(status);
CREATE INDEX IF NOT EXISTS idx_social_posts_scheduled_for ON public.social_posts(scheduled_for ASC NULLS LAST);

-- Human-in-the-loop gate for sensitive or externally visible actions.
CREATE TABLE IF NOT EXISTS public.approvals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES public.organizations(id) ON DELETE SET NULL,
  agent_run_id UUID REFERENCES public.agent_runs(id) ON DELETE SET NULL,
  tool_call_id UUID REFERENCES public.tool_calls(id) ON DELETE SET NULL,
  social_post_id UUID REFERENCES public.social_posts(id) ON DELETE SET NULL,
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
  CONSTRAINT approvals_status_check CHECK (status IN ('pending', 'approved', 'rejected', 'expired', 'cancelled'))
);

CREATE INDEX IF NOT EXISTS idx_approvals_org_id ON public.approvals(organization_id);
CREATE INDEX IF NOT EXISTS idx_approvals_status ON public.approvals(status);
CREATE INDEX IF NOT EXISTS idx_approvals_created_at ON public.approvals(created_at DESC);

-- External system credentials/settings (never store raw secrets in plaintext).
CREATE TABLE IF NOT EXISTS public.integrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
  provider TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'disconnected',
  config JSONB NOT NULL DEFAULT '{}'::jsonb,
  secrets_ref JSONB NOT NULL DEFAULT '{}'::jsonb,
  last_tested_at TIMESTAMPTZ,
  last_error TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT integrations_provider_check CHECK (provider IN ('resend', 'twilio', 'calcom', 'make', 'supabase', 'openai', 'other')),
  CONSTRAINT integrations_status_check CHECK (status IN ('connected', 'disconnected', 'error', 'disabled'))
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_integrations_org_provider_unique
  ON public.integrations(organization_id, provider);
CREATE INDEX IF NOT EXISTS idx_integrations_status ON public.integrations(status);

-- Immutable operational and compliance log.
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES public.organizations(id) ON DELETE SET NULL,
  actor_type TEXT NOT NULL,
  actor_id TEXT,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT,
  severity TEXT NOT NULL DEFAULT 'info',
  message TEXT,
  before_state JSONB NOT NULL DEFAULT '{}'::jsonb,
  after_state JSONB NOT NULL DEFAULT '{}'::jsonb,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  occurred_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT audit_logs_actor_type_check CHECK (actor_type IN ('ai_agent', 'user', 'system', 'integration')),
  CONSTRAINT audit_logs_severity_check CHECK (severity IN ('info', 'warning', 'error', 'critical'))
);

CREATE INDEX IF NOT EXISTS idx_audit_logs_org_id ON public.audit_logs(organization_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_occurred_at ON public.audit_logs(occurred_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_logs_entity ON public.audit_logs(entity_type, entity_id);

-- Shared trigger for updated_at maintenance.
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

DROP TRIGGER IF EXISTS campaigns_set_updated_at ON public.campaigns;
CREATE TRIGGER campaigns_set_updated_at
  BEFORE UPDATE ON public.campaigns
  FOR EACH ROW
  EXECUTE FUNCTION public.agent_os_set_updated_at();

DROP TRIGGER IF EXISTS content_ideas_set_updated_at ON public.content_ideas;
CREATE TRIGGER content_ideas_set_updated_at
  BEFORE UPDATE ON public.content_ideas
  FOR EACH ROW
  EXECUTE FUNCTION public.agent_os_set_updated_at();

DROP TRIGGER IF EXISTS social_posts_set_updated_at ON public.social_posts;
CREATE TRIGGER social_posts_set_updated_at
  BEFORE UPDATE ON public.social_posts
  FOR EACH ROW
  EXECUTE FUNCTION public.agent_os_set_updated_at();

DROP TRIGGER IF EXISTS integrations_set_updated_at ON public.integrations;
CREATE TRIGGER integrations_set_updated_at
  BEFORE UPDATE ON public.integrations
  FOR EACH ROW
  EXECUTE FUNCTION public.agent_os_set_updated_at();

COMMIT;
