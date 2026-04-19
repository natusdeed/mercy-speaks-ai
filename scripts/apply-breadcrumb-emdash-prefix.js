/**
 * Prefix workflow node + edge labels with em dash + space so trim(agent)+trim(label)
 * still separates "Agent" from a leading letter (ElevenLabs breadcrumb quirk).
 */
const fs = require("fs");
const path = require("path");

const LIVE = path.join(__dirname, "../agent_configs/Mercy-AI-Agent-LIVE.json");
const DASH = "\u2014";

const j = JSON.parse(fs.readFileSync(LIVE, "utf8"));

for (const n of Object.values(j.workflow?.nodes ?? {})) {
  if (typeof n.label !== "string" || !n.label) continue;
  const t = n.label.trim();
  if (!t.startsWith(DASH)) n.label = `${DASH} ${t}`;
}

for (const e of Object.values(j.workflow?.edges ?? {})) {
  const lab = e.forward_condition?.label;
  if (typeof lab !== "string" || !lab) continue;
  const t = lab.trim();
  if (!t.startsWith(DASH)) e.forward_condition.label = `${DASH} ${t}`;
}

fs.writeFileSync(LIVE, JSON.stringify(j, null, 2) + "\n");
