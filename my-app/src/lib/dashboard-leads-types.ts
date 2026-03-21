/**
 * Shared lead enums + DTO for dashboard UI and server APIs.
 * Kept under src/lib (not src/dashboard) so Vite’s config bundle never resolves `@/dashboard/*`.
 */

export const LEAD_STATUSES = [
  "new",
  "contacted",
  "qualified",
  "booked",
  "proposal_sent",
  "won",
  "lost",
  "follow_up_later",
] as const;

export type LeadStatus = (typeof LEAD_STATUSES)[number];

export const LEAD_PRIORITIES = ["low", "medium", "high", "hot"] as const;

export type LeadPriority = (typeof LEAD_PRIORITIES)[number];

export type LeadDto = {
  id: string;
  tenantId: string | null;
  conversationId: string | null;
  firstName: string | null;
  lastName: string | null;
  name: string | null;
  businessName: string | null;
  email: string;
  phone: string;
  serviceInterest: string | null;
  message: string | null;
  source: string;
  status: LeadStatus;
  priority: LeadPriority;
  estimatedValue: number | null;
  notes: string | null;
  assignedTo: string | null;
  createdAt: string;
  updatedAt: string;
  metadata: Record<string, unknown>;
};
