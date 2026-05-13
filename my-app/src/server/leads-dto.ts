import type { LeadDto, LeadPriority, LeadStatus } from "../lib/dashboard-leads-types";

export type LeadRowDb = {
  id: string;
  organization_id: string | null;
  client_id: string | null;
  name: string | null;
  email: string;
  phone: string;
  service: string | null;
  intent: string | null;
  preferred_time: string | null;
  source: string;
  status: string;
  notes: string | null;
  metadata: Record<string, unknown> | null;
  created_at: string;
};

export function mapLeadRow(row: LeadRowDb): LeadDto {
  const displayName = row.name?.trim() || null;
  return {
    id: row.id,
    tenantId: row.organization_id,
    conversationId: null,
    firstName: displayName,
    lastName: null,
    name: displayName,
    businessName: null,
    email: row.email,
    phone: row.phone,
    serviceInterest: row.service,
    message: row.notes?.trim() || null,
    source: row.source,
    status: row.status as LeadStatus,
    priority: "medium" as LeadPriority,
    estimatedValue: null,
    notes: row.notes,
    assignedTo: null,
    createdAt: row.created_at,
    updatedAt: row.created_at,
    metadata: row.metadata && typeof row.metadata === "object" ? row.metadata : {},
  };
}
