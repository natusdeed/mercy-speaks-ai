/**
 * Validates Phase 2 orchestration Zod envelopes (no network / DB).
 */
import {
  agentOrchestrationRequestSchema,
  agentOrchestrationResponseBodySchema,
} from "../src/lib/agent-os/schemas";
import {
  draftFollowUpToolInputSchema,
  intakeAgentOutputSchema,
  qualifyLeadToolInputSchema,
  saveLeadToolInputSchema,
  sendOwnerAlertToolInputSchema,
} from "../src/lib/agent-os/phase3-schemas";

const sampleRequest = {
  agent: "system.echo",
  input: { hello: "world" },
  tools: [{ name: "noop", input: {} }],
};

const intakeReq = agentOrchestrationRequestSchema.safeParse({
  agent: "employee.intake",
  tools: [{ name: "saveLead", input: { email: "a@example.com", phone: "555-0100", simulate: true } }],
});
if (!intakeReq.success) {
  console.error("Phase 3 intake request fixture failed", intakeReq.error.flatten());
  process.exit(1);
}
saveLeadToolInputSchema.parse({
  email: "a@example.com",
  phone: "555",
  simulate: true,
});
qualifyLeadToolInputSchema.parse({
  lead_id: "11111111-1111-4111-8111-111111111111",
  recommended_lead_status: "qualified",
  rationale: "High intent and urgent timeline.",
  qualification_result_text: "Fit confirmed for plumbing repair.",
});
sendOwnerAlertToolInputSchema.parse({
  headline: "Handoff requested",
  summary: "Needs human ASAP.",
  urgency: "high",
  drafted_notice: "Please call within 15 minutes.",
  simulate: true,
});
draftFollowUpToolInputSchema.parse({
  subject: "Thanks for chatting",
  body: "We will follow up with slot options shortly — no outbound send yet.",
});
intakeAgentOutputSchema.parse({
  kind: "employee.intake",
  summary: "Lead saved fixture",
  saveLead: {
    kind: "tool.saveLead",
    simulated: true,
    action: "validated_only",
    lead_id: "11111111-1111-4111-8111-111111111111",
  },
});

const okReq = agentOrchestrationRequestSchema.safeParse(sampleRequest);
if (!okReq.success) {
  console.error("Request fixture failed", okReq.error.flatten());
  process.exit(1);
}

const sampleSuccess = {
  ok: true as const,
  run_id: "11111111-1111-4111-8111-111111111111",
  agent: "system.echo",
  status: "success" as const,
  output: { a: 1 },
  tool_calls: [
    {
      id: "22222222-2222-4222-8222-222222222222",
      tool_name: "noop",
      status: "success" as const,
      response: { noop: true },
      error_message: null,
    },
  ],
  meta: {
    duration_ms: 12,
    started_at: "2026-05-08T12:00:00.000Z",
    completed_at: "2026-05-08T12:00:00.012Z",
  },
};

const okSuccess = agentOrchestrationResponseBodySchema.safeParse(sampleSuccess);
if (!okSuccess.success) {
  console.error("Success fixture failed", okSuccess.error.flatten());
  process.exit(1);
}

const sampleErr = {
  ok: false as const,
  run_id: "33333333-3333-4333-8333-333333333333",
  error: { code: "TEST", message: "fixture" },
};

const okErr = agentOrchestrationResponseBodySchema.safeParse(sampleErr);
if (!okErr.success) {
  console.error("Error fixture failed", okErr.error.flatten());
  process.exit(1);
}

console.log("agent-os Zod fixtures OK");
