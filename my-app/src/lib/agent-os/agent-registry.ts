import type { RegisteredAgent } from "./agent-types";
import { leadEmployees } from "./agents/lead-employees";

const registry: Record<string, RegisteredAgent> = {
  "system.echo": {
    version: "1",
    async run(ctx) {
      return {
        kind: "system.echo",
        received: ctx.input,
        tool_results: ctx.toolResults,
      };
    },
  },
  "system.health": {
    version: "1",
    plannedMockTools: ["noop"],
    async run(ctx) {
      return {
        kind: "system.health",
        status: "ok",
        echo_metadata: ctx.metadata,
      };
    },
  },
  ...leadEmployees,
};

export function listRegisteredAgentNames(): string[] {
  return Object.keys(registry).sort();
}

export function getRegisteredAgent(name: string): RegisteredAgent | null {
  return registry[name] ?? null;
}

export type { AgentRunContext, RegisteredAgent } from "./agent-types";
