import type { JsonObject } from "./types";

export type AgentRunContext = {
  input: JsonObject;
  /** Results from requested tools, in order (same length as tools that completed success path). */
  toolResults: Array<{ tool: string; output: JsonObject }>;
  metadata: JsonObject;
};

export type RegisteredAgent = {
  version: string;
  /**
   * Pure orchestration step — no network I/O in Phase 2 defaults.
   * Declares optional tools the agent "would" call for observability/testing (logged as skipped/no-op).
   */
  plannedMockTools?: string[];
  run: (ctx: AgentRunContext) => Promise<JsonObject>;
};
