-- =============================================================================
-- Dashboard: conversation inbox fields (widget + future channels)
-- Run after 001_widget_tenant_schema.sql
-- =============================================================================

ALTER TABLE conversations ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW();
ALTER TABLE conversations ADD COLUMN IF NOT EXISTS channel TEXT NOT NULL DEFAULT 'widget';
ALTER TABLE conversations ADD COLUMN IF NOT EXISTS contact_name TEXT;
ALTER TABLE conversations ADD COLUMN IF NOT EXISTS last_message_preview TEXT;
ALTER TABLE conversations ADD COLUMN IF NOT EXISTS last_message_at TIMESTAMPTZ;
ALTER TABLE conversations ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'open';
ALTER TABLE conversations ADD COLUMN IF NOT EXISTS intent TEXT;
ALTER TABLE conversations ADD COLUMN IF NOT EXISTS outcome TEXT;
ALTER TABLE conversations ADD COLUMN IF NOT EXISTS transcript JSONB NOT NULL DEFAULT '[]'::jsonb;
ALTER TABLE conversations ADD COLUMN IF NOT EXISTS ai_summary TEXT;
ALTER TABLE conversations ADD COLUMN IF NOT EXISTS qualification_result TEXT;
ALTER TABLE conversations ADD COLUMN IF NOT EXISTS internal_notes TEXT;

UPDATE conversations SET updated_at = started_at WHERE updated_at IS NOT NULL;

ALTER TABLE conversations DROP CONSTRAINT IF EXISTS conversations_channel_check;
ALTER TABLE conversations ADD CONSTRAINT conversations_channel_check CHECK (
  channel IN ('widget', 'sms', 'voice', 'email', 'other')
);

ALTER TABLE conversations DROP CONSTRAINT IF EXISTS conversations_status_check;
ALTER TABLE conversations ADD CONSTRAINT conversations_status_check CHECK (
  status IN ('open', 'closed', 'handed_off', 'archived')
);

CREATE OR REPLACE FUNCTION public.conversations_set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS conversations_set_updated_at ON conversations;
CREATE TRIGGER conversations_set_updated_at
  BEFORE UPDATE ON conversations
  FOR EACH ROW
  EXECUTE FUNCTION public.conversations_set_updated_at();

CREATE INDEX IF NOT EXISTS idx_conversations_updated_at ON conversations(updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_conversations_last_message_at ON conversations(last_message_at DESC NULLS LAST);
CREATE INDEX IF NOT EXISTS idx_conversations_status ON conversations(status);
CREATE INDEX IF NOT EXISTS idx_conversations_channel ON conversations(channel);
