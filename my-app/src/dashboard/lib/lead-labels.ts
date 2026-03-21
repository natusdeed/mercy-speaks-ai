import type { LeadPriority, LeadStatus } from "@/dashboard/types/leads";

export const LEAD_STATUS_LABEL: Record<LeadStatus, string> = {
  new: "New",
  contacted: "Contacted",
  qualified: "Qualified",
  booked: "Booked",
  proposal_sent: "Proposal sent",
  won: "Won",
  lost: "Lost",
  follow_up_later: "Follow-up later",
};

export const LEAD_PRIORITY_LABEL: Record<LeadPriority, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
  hot: "Hot",
};
