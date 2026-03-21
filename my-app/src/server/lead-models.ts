import { z } from "zod";
import { LEAD_PRIORITIES, LEAD_STATUSES } from "../lib/dashboard-leads-types";

/** Columns returned by dashboard lead APIs (matches Supabase `leads` table). */
export const LEAD_DB_SELECT =
  "id, tenant_id, conversation_id, first_name, last_name, name, business_name, email, phone, service_interest, message, source, status, priority, estimated_value, notes, assigned_to, created_at, updated_at, metadata" as const;

export const leadStatusSchema = z.enum(LEAD_STATUSES);
export const leadPrioritySchema = z.enum(LEAD_PRIORITIES);

export const createLeadBodySchema = z.object({
  first_name: z.string().max(120).optional().nullable(),
  last_name: z.string().max(120).optional().nullable(),
  business_name: z.string().max(240).optional().nullable(),
  email: z.string().email(),
  phone: z.string().min(6).max(40),
  service_interest: z.string().max(240).optional().nullable(),
  source: z.string().max(80).default("dashboard"),
  status: leadStatusSchema.optional(),
  priority: leadPrioritySchema.optional(),
  notes: z.string().max(20000).optional().nullable(),
  estimated_value: z.number().nonnegative().finite().optional().nullable(),
});

export const patchLeadBodySchema = z
  .object({
    status: leadStatusSchema.optional(),
    priority: leadPrioritySchema.optional(),
    notes: z.string().max(20000).optional().nullable(),
    first_name: z.string().max(120).optional().nullable(),
    last_name: z.string().max(120).optional().nullable(),
    business_name: z.string().max(240).optional().nullable(),
    email: z.string().email().optional(),
    phone: z.string().min(6).max(40).optional(),
    service_interest: z.string().max(240).optional().nullable(),
    estimated_value: z.number().nonnegative().finite().optional().nullable(),
    assigned_to: z.string().max(120).optional().nullable(),
  })
  .strict();

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function parseLeadIdFromPathname(pathname: string): string | null {
  const parts = pathname.split("/").filter(Boolean);
  const id = parts[parts.length - 1];
  if (!id || !UUID_RE.test(id)) return null;
  return id;
}
