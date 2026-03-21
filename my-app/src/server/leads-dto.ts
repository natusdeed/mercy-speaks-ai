import type { LeadDto, LeadPriority, LeadStatus } from "../lib/dashboard-leads-types";

export type LeadRowDb = {
  id: string;
  tenant_id: string | null;
  conversation_id: string | null;
  first_name: string | null;
  last_name: string | null;
  name: string | null;
  business_name: string | null;
  email: string;
  phone: string;
  service_interest: string | null;
  message: string | null;
  source: string;
  status: string;
  priority: string;
  estimated_value: number | string | null;
  notes: string | null;
  assigned_to: string | null;
  created_at: string;
  updated_at: string;
  metadata: Record<string, unknown> | null;
};

export function mapLeadRow(row: LeadRowDb): LeadDto {
  const ev = row.estimated_value;
  const num =
    ev === null || ev === undefined
      ? null
      : typeof ev === "number"
        ? ev
        : Number(ev);
  return {
    id: row.id,
    tenantId: row.tenant_id,
    conversationId: row.conversation_id,
    firstName: row.first_name,
    lastName: row.last_name,
    name: row.name,
    businessName: row.business_name,
    email: row.email,
    phone: row.phone,
    serviceInterest: row.service_interest,
    message: row.message,
    source: row.source,
    status: row.status as LeadStatus,
    priority: row.priority as LeadPriority,
    estimatedValue: num !== null && Number.isFinite(num) ? num : null,
    notes: row.notes,
    assignedTo: row.assigned_to,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    metadata: row.metadata && typeof row.metadata === "object" ? row.metadata : {},
  };
}
