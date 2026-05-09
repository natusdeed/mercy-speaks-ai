/**
 * POST /api/agents/run — internal AI orchestration (Phase 2).
 * Not wired to public marketing flows.
 */
import { runAgentOrchestration } from "@/lib/agent-os/orchestration";

export async function POST(request: Request) {
  return runAgentOrchestration(request);
}
