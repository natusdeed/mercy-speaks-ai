-- =============================================================================
-- Multi-tenant widget: tenants, conversations, leads
-- Run in Supabase SQL Editor or via supabase db push
-- =============================================================================

-- Tenants: one row per customer using the embeddable widget
CREATE TABLE IF NOT EXISTS tenants (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  domains TEXT[] NOT NULL DEFAULT '{}',
  branding JSONB NOT NULL DEFAULT '{}',
  booking_url TEXT,
  system_prompt TEXT,
  greeting TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON COLUMN tenants.domains IS 'Allowed hostnames for widget (e.g. example.com, www.example.com)';
COMMENT ON COLUMN tenants.branding IS 'JSON: primaryColor, accentColor, companyName, logoUrl, etc.';
COMMENT ON COLUMN tenants.system_prompt IS 'OpenAI system prompt for this tenant';
COMMENT ON COLUMN tenants.greeting IS 'First message shown in chat';

-- Conversations: one per widget session (optional; for analytics/history)
CREATE TABLE IF NOT EXISTS conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id TEXT NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  visitor_id TEXT,
  started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'
);

CREATE INDEX IF NOT EXISTS idx_conversations_tenant_id ON conversations(tenant_id);
CREATE INDEX IF NOT EXISTS idx_conversations_started_at ON conversations(started_at);

-- Leads: captured from widget (and optionally linked to conversation)
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id TEXT NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  conversation_id UUID REFERENCES conversations(id) ON DELETE SET NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  name TEXT,
  business_name TEXT,
  message TEXT,
  source TEXT NOT NULL DEFAULT 'widget',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'
);

CREATE INDEX IF NOT EXISTS idx_leads_tenant_id ON leads(tenant_id);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at);

-- RLS (optional): use service role in serverless to bypass; or restrict for anon
ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Policy: service role can do anything; anon has no access (widget API uses service key)
CREATE POLICY "Service role full access tenants" ON tenants FOR ALL USING (true);
CREATE POLICY "Service role full access conversations" ON conversations FOR ALL USING (true);
CREATE POLICY "Service role full access leads" ON leads FOR ALL USING (true);
