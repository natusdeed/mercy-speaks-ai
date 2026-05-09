import type { JsonObject } from "./types";

/**
 * Passed from orchestration HTTP envelope + current run identifier.
 * Keeps CRM rows aligned without requiring every tool input to repeat IDs.
 */
export type AgentToolAmbientContext = {
  organization_id?: string | null;
  lead_id?: string | null;
  conversation_id?: string | null;
  agent_run_id: string;
};

export type ToolExecutor = (
  input: JsonObject,
  ambient: AgentToolAmbientContext,
) => Promise<JsonObject>;
