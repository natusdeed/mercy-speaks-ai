-- =============================================================================
-- Dashboard CRM fields on existing leads (widget-compatible)
-- Run after 001_widget_tenant_schema.sql
-- =============================================================================

-- Allow internal / dashboard-created leads without a widget tenant
ALTER TABLE leads ALTER COLUMN tenant_id DROP NOT NULL;

ALTER TABLE leads ADD COLUMN IF NOT EXISTS first_name TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS last_name TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS service_interest TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'new';
ALTER TABLE leads ADD COLUMN IF NOT EXISTS priority TEXT NOT NULL DEFAULT 'medium';
ALTER TABLE leads ADD COLUMN IF NOT EXISTS estimated_value NUMERIC(12, 2);
ALTER TABLE leads ADD COLUMN IF NOT EXISTS notes TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS assigned_to TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW();

ALTER TABLE leads DROP CONSTRAINT IF EXISTS leads_status_check;
ALTER TABLE leads ADD CONSTRAINT leads_status_check CHECK (
  status IN (
    'new',
    'contacted',
    'qualified',
    'booked',
    'proposal_sent',
    'won',
    'lost',
    'follow_up_later'
  )
);

ALTER TABLE leads DROP CONSTRAINT IF EXISTS leads_priority_check;
ALTER TABLE leads ADD CONSTRAINT leads_priority_check CHECK (
  priority IN ('low', 'medium', 'high', 'hot')
);

UPDATE leads SET updated_at = created_at WHERE updated_at < created_at;

CREATE OR REPLACE FUNCTION public.leads_set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS leads_set_updated_at ON leads;
-- Supabase (Postgres 15): prefer FUNCTION. Use PROCEDURE on older instances if needed.
CREATE TRIGGER leads_set_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW
  EXECUTE FUNCTION public.leads_set_updated_at();

CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_priority ON leads(priority);
CREATE INDEX IF NOT EXISTS idx_leads_updated_at ON leads(updated_at DESC);
