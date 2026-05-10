import { getDashboardSupabase } from "@/server/supabase-dashboard";
import type { JsonObject } from "../types";
import type { ToolExecutor } from "../tool-executor-types";
import {
  createBookingIntentToolInputSchema,
  createBookingIntentToolOutputSchema,
  draftFollowUpToolInputSchema,
  draftFollowUpToolOutputSchema,
  logMissedRevenueToolInputSchema,
  logMissedRevenueToolOutputSchema,
  qualifyLeadToolInputSchema,
  qualifyLeadToolOutputSchema,
  saveLeadToolInputSchema,
  saveLeadToolOutputSchema,
  sendOwnerAlertToolInputSchema,
  sendOwnerAlertToolOutputSchema,
} from "../phase3-schemas";

function requireSupabase(): ReturnType<typeof getDashboardSupabase> {
  const sb = getDashboardSupabase();
  if (!sb) throw new Error("Database client unavailable (SUPABASE_URL / SUPABASE_SERVICE_KEY).");
  return sb;
}

function mergeMetadata(base: Record<string, unknown>, patch?: Record<string, unknown>): Record<string, unknown> {
  return { ...base, ...patch };
}

/** When `metadata` JSONB is missing on a lean `leads` table, we still tag the row after adaptation. */
const PHASE3_LEAD_SOURCE_SMOKE_SUFFIX = "phase3-real-write-smoke-test";

function parseMissingLeadsColumn(msg: string): string | null {
  const m = /Could not find the '([^']+)' column of 'leads'/i.exec(msg);
  return m?.[1] ?? null;
}

async function insertLeadRowAdaptive(
  sb: NonNullable<ReturnType<typeof getDashboardSupabase>>,
  initialRow: Record<string, unknown>,
  sourceBase: string
): Promise<{ id: string }> {
  let attemptRow: Record<string, unknown> = { ...initialRow };
  for (let step = 0; step < 40; step++) {
    const { data, error } = await sb.from("leads").insert(attemptRow).select("id").single();
    if (!error && data?.id) return { id: data.id as string };
    const col = error?.message ? parseMissingLeadsColumn(error.message) : null;
    if (!col || !(col in attemptRow)) {
      throw new Error((error?.message ?? "saveLead insert failed").slice(0, 2000));
    }
    const next: Record<string, unknown> = { ...attemptRow };
    delete next[col];
    if (col === "metadata") {
      next.source = `${sourceBase}|test=${PHASE3_LEAD_SOURCE_SMOKE_SUFFIX}`;
    }
    attemptRow = next;
  }
  throw new Error("saveLead insert failed: schema adaptation limit exceeded");
}

export const executeSaveLead: ToolExecutor = async (input, ambient) => {
  const parsed = saveLeadToolInputSchema.parse(input as JsonObject);
  const simulated = !!parsed.simulate;

  const orgId = parsed.organization_id ?? ambient.organization_id;
  const convId = parsed.conversation_id ?? ambient.conversation_id;

  if (simulated) {
    return saveLeadToolOutputSchema.parse({
      kind: "tool.saveLead",
      simulated: true,
      action: "validated_only",
      lead_id: ambient.lead_id ?? undefined,
    });
  }

  const sb = requireSupabase();
  const nowMeta = mergeMetadata(parsed.metadata as Record<string, unknown>, {
    ambient_lead_id: ambient.lead_id,
    ambient_conversation_id: ambient.conversation_id,
    ambient_agent_run_id: ambient.agent_run_id,
    phase: 3,
  });

  if (parsed.lead_id) {
    const patch: Record<string, unknown> = {
      tenant_id: parsed.tenant_id === undefined ? undefined : parsed.tenant_id,
      email: parsed.email,
      phone: parsed.phone,
      name: parsed.name ?? null,
      source: parsed.source,
      metadata: nowMeta,
    };
    if (parsed.message !== undefined) {
      patch.message = parsed.message;
    }
    if (parsed.service_interest !== undefined) {
      patch.service_interest = parsed.service_interest;
    }
    if (parsed.notes !== undefined) {
      patch.notes = parsed.notes;
    }
    if (parsed.status !== undefined) {
      patch.status = parsed.status;
    }
    if (parsed.priority !== undefined) {
      patch.priority = parsed.priority;
    }
    if (parsed.estimated_value !== undefined) {
      patch.estimated_value = parsed.estimated_value;
    }
    if (parsed.business_name !== undefined) {
      patch.business_name = parsed.business_name;
    }
    if (orgId !== undefined && orgId !== null) {
      patch.organization_id = orgId;
    }
    if (convId !== undefined && convId !== null) {
      patch.conversation_id = convId;
    }
    if (parsed.first_name !== undefined) {
      patch.first_name = parsed.first_name;
    }
    if (parsed.last_name !== undefined) {
      patch.last_name = parsed.last_name;
    }
    const clean = Object.fromEntries(
      Object.entries(patch).filter(([, v]) => v !== undefined)
    ) as Record<string, unknown>;
    const { error } = await sb.from("leads").update(clean).eq("id", parsed.lead_id);
    if (error) throw new Error(error.message.slice(0, 2000));

    return saveLeadToolOutputSchema.parse({
      kind: "tool.saveLead",
      simulated: false,
      lead_id: parsed.lead_id,
      action: "updated",
    });
  }

  const insertRow: Record<string, unknown> = {
    email: parsed.email,
    phone: parsed.phone,
    name: parsed.name ?? null,
    source: parsed.source,
    metadata: nowMeta,
  };
  if (parsed.message !== undefined) {
    insertRow.message = parsed.message;
  }
  if (parsed.first_name !== undefined) {
    insertRow.first_name = parsed.first_name;
  }
  if (parsed.last_name !== undefined) {
    insertRow.last_name = parsed.last_name;
  }
  if (parsed.tenant_id !== undefined) {
    insertRow.tenant_id = parsed.tenant_id;
  }
  if (orgId !== undefined && orgId !== null) {
    insertRow.organization_id = orgId;
  }
  if (convId !== undefined && convId !== null) {
    insertRow.conversation_id = convId;
  }
  if (parsed.business_name !== undefined) {
    insertRow.business_name = parsed.business_name;
  }
  if (parsed.service_interest !== undefined) insertRow.service_interest = parsed.service_interest;
  if (parsed.notes !== undefined) insertRow.notes = parsed.notes;
  if (parsed.status !== undefined) insertRow.status = parsed.status;
  if (parsed.priority !== undefined) insertRow.priority = parsed.priority;
  if (parsed.estimated_value !== undefined) insertRow.estimated_value = parsed.estimated_value;

  const { id } = await insertLeadRowAdaptive(sb, insertRow, parsed.source);

  return saveLeadToolOutputSchema.parse({
    kind: "tool.saveLead",
    simulated: false,
    lead_id: id,
    action: "inserted",
  });
};

export const executeQualifyLead: ToolExecutor = async (input, ambient) => {
  const parsed = qualifyLeadToolInputSchema.parse(input as JsonObject);
  const simulated = !!parsed.simulate;
  const orgId = parsed.organization_id ?? ambient.organization_id ?? null;
  const leadId = parsed.lead_id ?? ambient.lead_id ?? null;
  const conversationId = parsed.conversation_id ?? ambient.conversation_id ?? null;

  if (simulated) {
    return qualifyLeadToolOutputSchema.parse({
      kind: "tool.qualifyLead",
      simulated: true,
      lead_id: leadId,
      conversation_id: conversationId,
      lead_updated: !!leadId,
      conversation_updated: !!conversationId,
    });
  }

  if (!leadId && !conversationId) {
    throw new Error(
      "qualifyLead requires at least lead_id or conversation_id (ambient envelope or tool input)."
    );
  }

  const sb = requireSupabase();
  let leadUpdated = false;
  let conversationUpdated = false;

  if (leadId) {
    const leadPatch: Record<string, unknown> = {
      status: parsed.recommended_lead_status,
      estimated_value: parsed.estimated_value ?? undefined,
    };
    const cleanLead = Object.fromEntries(
      Object.entries(leadPatch).filter(([, v]) => v !== undefined)
    );
    const { error } = await sb.from("leads").update(cleanLead).eq("id", leadId);
    if (error) throw new Error(error.message.slice(0, 2000));
    leadUpdated = true;
  }

  if (conversationId) {
    const convPatch: Record<string, unknown> = {
      organization_id: orgId ?? undefined,
      qualification_result: parsed.qualification_result_text,
      intent: parsed.conversation_intent ?? undefined,
      outcome: parsed.conversation_outcome ?? undefined,
      internal_notes: parsed.internal_notes_patch ?? undefined,
    };
    const cleanConv = Object.fromEntries(
      Object.entries(convPatch).filter(([, v]) => v !== undefined)
    );
    const { error } = await sb.from("conversations").update(cleanConv).eq("id", conversationId);
    if (error) throw new Error(error.message.slice(0, 2000));
    conversationUpdated = true;
  }

  return qualifyLeadToolOutputSchema.parse({
    kind: "tool.qualifyLead",
    simulated: false,
    lead_id: leadId,
    conversation_id: conversationId,
    lead_updated: leadUpdated,
    conversation_updated: conversationUpdated,
  });
};

export const executeCreateBookingIntent: ToolExecutor = async (input, ambient) => {
  const parsed = createBookingIntentToolInputSchema.parse(input as JsonObject);
  const simulated = !!parsed.simulate;
  const orgId = parsed.organization_id ?? ambient.organization_id ?? null;
  const leadId = parsed.lead_id ?? ambient.lead_id ?? null;
  const conversationId = parsed.conversation_id ?? ambient.conversation_id ?? null;

  if (simulated) {
    return createBookingIntentToolOutputSchema.parse({
      kind: "tool.createBookingIntent",
      simulated: true,
      status: "intent",
    });
  }

  const sb = requireSupabase();
  const row = {
    lead_id: leadId,
    conversation_id: conversationId,
    organization_id: orgId,
    source: parsed.source,
    provider: parsed.provider,
    status: parsed.status as "intent",
    booking_link: parsed.booking_link ?? null,
    starts_at: parsed.starts_at ?? null,
    ends_at: parsed.ends_at ?? null,
    timezone: parsed.timezone ?? null,
    notes: parsed.notes ?? null,
    metadata: mergeMetadata(parsed.metadata as Record<string, unknown>, {
      agent_run_id: ambient.agent_run_id,
      phase: 3,
      note: "intent_only_phase3_no_external_booking_calls",
    }),
  };

  const { data, error } = await sb.from("bookings").insert(row).select("id").single();
  if (error || !data?.id) throw new Error(error?.message?.slice(0, 2000) ?? "booking intent insert failed");

  return createBookingIntentToolOutputSchema.parse({
    kind: "tool.createBookingIntent",
    simulated: false,
    booking_id: data.id as string,
    status: "intent",
  });
};

function mapSuggestedUrgencyToTaskPriority(u: string): "low" | "medium" | "high" | "urgent" {
  if (u === "urgent") return "urgent";
  if (u === "high") return "high";
  if (u === "low") return "low";
  return "medium";
}

export const executeDraftFollowUp: ToolExecutor = async (input, ambient) => {
  const parsed = draftFollowUpToolInputSchema.parse(input as JsonObject);
  const simulated = !!parsed.simulate;

  const orgId = parsed.organization_id ?? ambient.organization_id ?? null;
  const leadId = parsed.lead_id ?? ambient.lead_id ?? null;
  const conversationId = parsed.conversation_id ?? ambient.conversation_id ?? null;

  if (simulated) {
    return draftFollowUpToolOutputSchema.parse({
      kind: "tool.draftFollowUp",
      simulated: true,
      note: "draft_only_no_message_sent_phase3",
    });
  }

  const sb = requireSupabase();
  const draftPayload = {
    subject: parsed.subject,
    body: parsed.body,
    channel_suggestion: parsed.channel_suggestion,
    urgency: parsed.urgency,
    drafted_at_phase: 3,
    send_blocked: true,
    reason: "Phase 3 drafts only — no outbound delivery pipeline wired yet.",
  };

  const meta = mergeMetadata(parsed.metadata as Record<string, unknown>, {
    draft_follow_up: draftPayload,
  });

  const taskRow = {
    organization_id: orgId,
    lead_id: leadId,
    conversation_id: conversationId,
    created_by_agent_run_id: ambient.agent_run_id,
    title: `Follow-up draft: ${parsed.subject.slice(0, 140)}`,
    description: parsed.body.slice(0, 10000),
    task_type: "follow_up" as const,
    status: "pending" as const,
    priority: mapSuggestedUrgencyToTaskPriority(parsed.urgency),
    due_at: parsed.due_at ?? null,
    metadata: meta,
  };

  const { data, error } = await sb.from("tasks").insert(taskRow).select("id").single();
  if (error || !data?.id) throw new Error(error?.message?.slice(0, 2000) ?? "draftFollowUp insert failed");

  return draftFollowUpToolOutputSchema.parse({
    kind: "tool.draftFollowUp",
    simulated: false,
    task_id: data.id as string,
    note: "draft_only_no_message_sent_phase3",
  });
};

export const executeSendOwnerAlert: ToolExecutor = async (input, ambient) => {
  const parsed = sendOwnerAlertToolInputSchema.parse(input as JsonObject);
  const simulated = !!parsed.simulate;
  const orgId = ambient.organization_id ?? null;
  const conversationId = ambient.conversation_id ?? null;

  const requestedPayload = {
    headline: parsed.headline,
    summary: parsed.summary,
    urgency: parsed.urgency,
    drafted_notice: parsed.drafted_notice,
    recommendation: parsed.recommendation ?? null,
    delivery: {
      attempted: false as const,
      reason: "Phase 3 inserts approval drafts only — no email/SMS send.",
    },
    metadata_patch: parsed.metadata_patch,
  };

  if (simulated) {
    return sendOwnerAlertToolOutputSchema.parse({
      kind: "tool.sendOwnerAlert",
      simulated: true,
      conversation_status_patch_applied: !!parsed.mark_conversation_status && !!conversationId,
    });
  }

  const sb = requireSupabase();
  const approvalRow = {
    organization_id: orgId,
    agent_run_id: ambient.agent_run_id,
    approval_type: parsed.approval_type,
    status: "pending" as const,
    requested_by: "employee.handoff.agent_os.phase3",
    requested_payload: requestedPayload,
    metadata: mergeMetadata(parsed.metadata_patch, { phase: 3 }),
  };

  const { data, error } = await sb.from("approvals").insert(approvalRow).select("id").single();
  if (error || !data?.id) throw new Error(error?.message?.slice(0, 2000) ?? "approvals insert failed");

  let statusPatchApplied = false;
  if (parsed.mark_conversation_status === "handed_off" && conversationId) {
    const { error: patchErr } = await sb.from("conversations").update({ status: "handed_off" }).eq("id", conversationId);
    if (patchErr) throw new Error(patchErr.message.slice(0, 2000));
    statusPatchApplied = true;
  }

  return sendOwnerAlertToolOutputSchema.parse({
    kind: "tool.sendOwnerAlert",
    simulated: false,
    approval_id: data.id as string,
    conversation_status_patch_applied: statusPatchApplied,
  });
};

export const executeLogMissedRevenue: ToolExecutor = async (input, ambient) => {
  const parsed = logMissedRevenueToolInputSchema.parse(input as JsonObject);
  const simulated = !!parsed.simulate;

  const orgId = parsed.organization_id ?? ambient.organization_id ?? null;
  const leadId = parsed.lead_id ?? ambient.lead_id ?? null;
  const conversationId = parsed.conversation_id ?? ambient.conversation_id ?? null;

  if (simulated) {
    return logMissedRevenueToolOutputSchema.parse({
      kind: "tool.logMissedRevenue",
      simulated: true,
    });
  }

  const sb = requireSupabase();
  const row = {
    organization_id: orgId,
    lead_id: leadId,
    conversation_id: conversationId,
    booking_id: parsed.booking_id ?? null,
    call_id: parsed.call_id ?? null,
    event_type: parsed.event_type,
    severity: parsed.severity,
    reason: parsed.reason,
    estimated_value: parsed.estimated_value ?? null,
    recovered: false,
    metadata: mergeMetadata(parsed.metadata as Record<string, unknown>, {
      logged_by_agent_run_id: ambient.agent_run_id,
      phase: 3,
    }),
  };

  const { data, error } = await sb.from("missed_revenue_events").insert(row).select("id").single();
  if (error || !data?.id) throw new Error(error?.message?.slice(0, 2000) ?? "missed revenue insert failed");

  return logMissedRevenueToolOutputSchema.parse({
    kind: "tool.logMissedRevenue",
    simulated: false,
    missed_revenue_event_id: data.id as string,
  });
};
