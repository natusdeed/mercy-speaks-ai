/**
 * Simulates ElevenLabs-style breadcrumb: trim(agentTitle) + nodeLabel (no separator).
 * Appends NDJSON to debug-0ecf9e.log for debug sessions.
 */
const fs = require("fs");
const path = require("path");

const LOG = path.join(__dirname, "../debug-0ecf9e.log");
const LIVE = path.join(__dirname, "../agent_configs/Mercy-AI-Agent-LIVE.json");
const SESSION = "0ecf9e";

function log(payload) {
  const line = JSON.stringify({
    sessionId: SESSION,
    timestamp: Date.now(),
    ...payload,
  });
  fs.appendFileSync(LOG, line + "\n");
}

const raw = JSON.parse(fs.readFileSync(LIVE, "utf8"));
const name = raw.name ?? "";
const agentTrim = name.trim();
const nodes = raw.workflow?.nodes ?? {};

for (const [nodeId, n] of Object.entries(nodes)) {
  if (typeof n.label !== "string") continue;
  const joined = agentTrim + n.label;
  const joinedLabelTrimmed = agentTrim + n.label.trim();
  const hasAgentLetterGlue = /Agent[A-Za-z]/.test(joined);
  const hasGlueIfLabelTrimmed = /Agent[A-Za-z]/.test(joinedLabelTrimmed);
  // #region agent log
  log({
    runId: process.argv[2] || "sim",
    hypothesisId: "H1",
    location: "debug-breadcrumb-sim.js",
    message: "trim(name)+nodeLabel glue check",
    data: { nodeId, labelLen: n.label.length, labelStartsWithSpace: n.label.startsWith(" "), hasAgentLetterGlue },
  });
  log({
    runId: process.argv[2] || "sim",
    hypothesisId: "H5",
    location: "debug-breadcrumb-sim.js",
    message: "trim(name)+trim(nodeLabel) glue check (UI may trim label)",
    data: { nodeId, hasGlueIfLabelTrimmed, labelFirstChar: n.label.trim().slice(0, 1) },
  });
  // #endregion
}
