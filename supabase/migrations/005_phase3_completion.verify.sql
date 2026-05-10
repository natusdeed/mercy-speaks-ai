-- =============================================================================
-- Phase 3 completion — READ-ONLY verification queries.
-- Safe to run any time. No INSERT / UPDATE / DELETE / DDL.
-- Run after applying 005_phase3_completion.sql.
-- =============================================================================

-- 1. Confirm every Phase 3 target table exists in `public`.
SELECT table_name,
       CASE WHEN table_name IS NOT NULL THEN 'OK' ELSE 'MISSING' END AS status
FROM (
  VALUES
    ('organizations'),
    ('leads'),
    ('conversations'),
    ('agent_runs'),
    ('tool_calls'),
    ('calls'),
    ('bookings'),
    ('tasks'),
    ('approvals'),
    ('missed_revenue_events')
) AS expected(name)
LEFT JOIN information_schema.tables
  ON information_schema.tables.table_schema = 'public'
 AND information_schema.tables.table_name   = expected.name
ORDER BY expected.name;

-- 2. Confirm `leads.metadata` exists and is JSONB.
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name   = 'leads'
  AND column_name  = 'metadata';

-- 3. Confirm bookings has every column the Phase 3 tool inserts.
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name   = 'bookings'
  AND column_name IN (
    'id', 'lead_id', 'conversation_id', 'organization_id',
    'source', 'provider', 'status', 'booking_link',
    'starts_at', 'ends_at', 'timezone', 'notes', 'metadata',
    'created_at', 'updated_at'
  )
ORDER BY column_name;

-- 4. Confirm tasks has every column the Phase 3 tool inserts.
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name   = 'tasks'
  AND column_name IN (
    'id', 'organization_id', 'lead_id', 'conversation_id',
    'created_by_agent_run_id', 'title', 'description',
    'task_type', 'status', 'priority', 'due_at', 'metadata',
    'created_at', 'updated_at', 'completed_at'
  )
ORDER BY column_name;

-- 5. Confirm approvals has every column the Phase 3 tool inserts.
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name   = 'approvals'
  AND column_name IN (
    'id', 'organization_id', 'agent_run_id', 'tool_call_id', 'social_post_id',
    'approval_type', 'status', 'requested_by', 'requested_payload',
    'decision_reason', 'approved_by', 'decided_at', 'expires_at',
    'metadata', 'created_at'
  )
ORDER BY column_name;

-- 6. Confirm missed_revenue_events has every column the Phase 3 tool inserts.
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name   = 'missed_revenue_events'
  AND column_name IN (
    'id', 'organization_id', 'lead_id', 'conversation_id',
    'call_id', 'booking_id', 'event_type', 'severity',
    'reason', 'estimated_value', 'recovered', 'recovered_at',
    'metadata', 'created_at'
  )
ORDER BY column_name;

-- 7. Show foreign keys on the four Phase 3 tables.
SELECT conrelid::regclass AS table_name,
       conname            AS constraint_name,
       pg_get_constraintdef(oid) AS definition
FROM pg_constraint
WHERE contype = 'f'
  AND conrelid::regclass::text IN (
    'public.bookings',
    'public.tasks',
    'public.approvals',
    'public.missed_revenue_events',
    'public.calls'
  )
ORDER BY table_name, conname;

-- 8. Sanity counts (should not error; should be small/zero before smoke).
SELECT 'organizations'         AS table_name, COUNT(*) FROM public.organizations
UNION ALL
SELECT 'bookings',              COUNT(*) FROM public.bookings
UNION ALL
SELECT 'tasks',                 COUNT(*) FROM public.tasks
UNION ALL
SELECT 'approvals',             COUNT(*) FROM public.approvals
UNION ALL
SELECT 'missed_revenue_events', COUNT(*) FROM public.missed_revenue_events
UNION ALL
SELECT 'calls',                 COUNT(*) FROM public.calls;
