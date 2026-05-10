/**
 * Static mock data for the Approvals demo dashboard.
 * UI-only — no outbound sends when users interact with demo controls.
 */

export type MockApprovalChannel = "SMS" | "Email" | "Voice script" | "Social draft" | "Discount";

export type MockApprovalRisk = "Low" | "Medium" | "High";

export type MockApprovalItem = {
  id: string;
  channel: MockApprovalChannel;
  title: string;
  summary: string;
  risk: MockApprovalRisk;
  requestedBy: string;
  createdAtLabel: string;
};

export const MOCK_APPROVAL_ITEMS: MockApprovalItem[] = [
  {
    id: "ap-1",
    channel: "SMS",
    title: "Confirm Tuesday 2:00 PM tune-up — Riverdale",
    summary:
      "Friendly confirmation with address line and opt-out. No payment link; calendar hold only.",
    risk: "Low",
    requestedBy: "Booking agent · mock",
    createdAtLabel: "4m ago",
  },
  {
    id: "ap-2",
    channel: "Email",
    title: "Proposal follow-up for commercial roof inspection",
    summary:
      "Single-thread reply referencing prior call notes and attaching PDF summary (mock attachment name only).",
    risk: "Medium",
    requestedBy: "Revenue agent · mock",
    createdAtLabel: "22m ago",
  },
  {
    id: "ap-3",
    channel: "Discount",
    title: "10% first-service discount — eligibility check passed",
    summary: "Capped at $350. Requires owner approval before any coupon code is exposed to the lead.",
    risk: "High",
    requestedBy: "Retention agent · mock",
    createdAtLabel: "1h ago",
  },
  {
    id: "ap-4",
    channel: "Social draft",
    title: "LinkedIn post — case study teaser",
    summary: "Three-line hook + CTA to book consult. Uses only approved claims from knowledge base tags.",
    risk: "Low",
    requestedBy: "Marketing agent · mock",
    createdAtLabel: "2h ago",
  },
  {
    id: "ap-5",
    channel: "Voice script",
    title: "After-hours overflow greeting — storm season",
    summary: "60-second script with emergency routing and SLA promise. No auto-transfer to on-call.",
    risk: "Medium",
    requestedBy: "Intake agent · mock",
    createdAtLabel: "Yesterday",
  },
];
