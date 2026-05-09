import type { RegisteredAgent } from "../agent-types";
import type { JsonObject } from "../types";
import {
  bookingEmployeeAgentOutputSchema,
  createBookingIntentToolOutputSchema,
  draftFollowUpToolOutputSchema,
  followUpAgentOutputSchema,
  handoffAgentOutputSchema,
  intakeAgentOutputSchema,
  qualifyLeadToolOutputSchema,
  qualifierAgentOutputSchema,
  saveLeadToolOutputSchema,
  sendOwnerAlertToolOutputSchema,
} from "../phase3-schemas";

type ToolEntry = { tool: string; output: JsonObject };

function requireToolResult(results: ToolEntry[], toolName: string): JsonObject {
  const hit = results.find((t) => t.tool === toolName);
  if (!hit) throw new Error(`Employee requires successful "${toolName}" tool execution first.`);
  return hit.output;
}

function briefSummary(toolName: string, output: JsonObject): string {
  switch (toolName) {
    case "saveLead":
      if (typeof output.simulated === "boolean" && output.simulated)
        return "Lead validated (simulate) — persistence skipped.";
      if (output.action === "inserted" && typeof output.lead_id === "string")
        return `Lead saved (created) id=${output.lead_id}`;
      if (output.action === "updated" && typeof output.lead_id === "string")
        return `Lead saved (updated) id=${output.lead_id}`;
      break;
    case "qualifyLead":
      return output.simulated
        ? "Qualification drafted (simulate) — CRM not updated."
        : `Qualification persisted (lead_patch=${Boolean(output.lead_updated)}, conversation_patch=${Boolean(output.conversation_updated)})`;
    case "createBookingIntent":
      return output.simulated ? "Booking intent drafted (simulate)." : `Booking intent row created id=${output.booking_id}`;
    case "draftFollowUp":
      return output.simulated ? "Follow-up draft validated (simulate)." : `Follow-up task draft stored id=${output.task_id}`;
    case "sendOwnerAlert":
      return output.simulated ? "Owner alert draft validated (simulate)." : `Owner alert approval pending id=${output.approval_id}`;
    case "logMissedRevenue":
      return output.simulated ? "Missed revenue event validated (simulate)." : `Missed revenue event logged id=${output.missed_revenue_event_id}`;
    default:
      break;
  }
  return `${toolName} OK`;
}

export const leadEmployees: Record<string, RegisteredAgent> = {
  "employee.intake": {
    version: "1",
    async run(ctx) {
      const out = requireToolResult(ctx.toolResults as ToolEntry[], "saveLead");
      const validated = saveLeadToolOutputSchema.parse(out);
      return intakeAgentOutputSchema.parse({
        kind: "employee.intake",
        summary: briefSummary("saveLead", validated as unknown as JsonObject),
        saveLead: validated,
      }) as JsonObject;
    },
  },
  "employee.qualifier": {
    version: "1",
    async run(ctx) {
      const out = requireToolResult(ctx.toolResults as ToolEntry[], "qualifyLead");
      const validated = qualifyLeadToolOutputSchema.parse(out);
      return qualifierAgentOutputSchema.parse({
        kind: "employee.qualifier",
        summary: briefSummary("qualifyLead", validated as unknown as JsonObject),
        qualifyLead: validated,
      }) as JsonObject;
    },
  },
  "employee.booking": {
    version: "1",
    async run(ctx) {
      const out = requireToolResult(ctx.toolResults as ToolEntry[], "createBookingIntent");
      const validated = createBookingIntentToolOutputSchema.parse(out);
      return bookingEmployeeAgentOutputSchema.parse({
        kind: "employee.booking",
        summary: briefSummary("createBookingIntent", validated as unknown as JsonObject),
        createBookingIntent: validated,
      }) as JsonObject;
    },
  },
  "employee.follow_up": {
    version: "1",
    async run(ctx) {
      const out = requireToolResult(ctx.toolResults as ToolEntry[], "draftFollowUp");
      const validated = draftFollowUpToolOutputSchema.parse(out);
      return followUpAgentOutputSchema.parse({
        kind: "employee.follow_up",
        summary: briefSummary("draftFollowUp", validated as unknown as JsonObject),
        draftFollowUp: validated,
      }) as JsonObject;
    },
  },
  "employee.handoff": {
    version: "1",
    async run(ctx) {
      const out = requireToolResult(ctx.toolResults as ToolEntry[], "sendOwnerAlert");
      const validated = sendOwnerAlertToolOutputSchema.parse(out);
      return handoffAgentOutputSchema.parse({
        kind: "employee.handoff",
        summary: briefSummary("sendOwnerAlert", validated as unknown as JsonObject),
        sendOwnerAlert: validated,
      }) as JsonObject;
    },
  },
};
