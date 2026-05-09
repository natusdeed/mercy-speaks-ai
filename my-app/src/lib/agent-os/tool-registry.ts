import type { ToolExecutor } from "./tool-executor-types";
import {
  executeCreateBookingIntent,
  executeDraftFollowUp,
  executeLogMissedRevenue,
  executeQualifyLead,
  executeSaveLead,
  executeSendOwnerAlert,
} from "./tools/lead-handling-tools";

/**
 * Registered tool executables (inputs validated per-tool; orchestration persists tool_calls rows).
 */
const registry: Record<string, { version: string; execute: ToolExecutor }> = {
  noop: {
    version: "1",
    async execute(_input, _ambient) {
      return { noop: true, note: "mock tool — no operation performed" };
    },
  },
  "echo.input": {
    version: "1",
    async execute(input, _ambient) {
      return { echoed: input };
    },
  },
  saveLead: {
    version: "1",
    execute: executeSaveLead,
  },
  qualifyLead: {
    version: "1",
    execute: executeQualifyLead,
  },
  createBookingIntent: {
    version: "1",
    execute: executeCreateBookingIntent,
  },
  draftFollowUp: {
    version: "1",
    execute: executeDraftFollowUp,
  },
  sendOwnerAlert: {
    version: "1",
    execute: executeSendOwnerAlert,
  },
  logMissedRevenue: {
    version: "1",
    execute: executeLogMissedRevenue,
  },
};

export function listRegisteredToolNames(): string[] {
  return Object.keys(registry).sort();
}

export function getToolDefinition(name: string) {
  return registry[name] ?? null;
}

export type { ToolExecutor, AgentToolAmbientContext } from "./tool-executor-types";
