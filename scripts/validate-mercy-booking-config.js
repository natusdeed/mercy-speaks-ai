/**
 * Local config check: LIVE agent booking tool registration, workflow edges, schema alignment.
 * Run: node scripts/validate-mercy-booking-config.js
 */
const fs = require("fs");
const path = require("path");

const LIVE = path.join(__dirname, "../agent_configs/Mercy-AI-Agent-LIVE.json");
const TOOL = path.join(__dirname, "../tool_configs/mercy_booking_intent.json");
const INGEST =
  "http://127.0.0.1:7243/ingest/9d569fcb-c7c6-498a-b566-060b65e33c2c";
const SESSION = "6277ad";

function log(hypothesisId, message, data) {
  const payload = {
    sessionId: SESSION,
    runId: "config-validate",
    hypothesisId,
    location: "scripts/validate-mercy-booking-config.js",
    message,
    data,
    timestamp: Date.now(),
  };
  // #region agent log
  fetch(INGEST, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Debug-Session-Id": SESSION,
    },
    body: JSON.stringify(payload),
  }).catch(() => {});
  // #endregion
}

function main() {
  const agent = JSON.parse(fs.readFileSync(LIVE, "utf8"));
  const bookingFile = JSON.parse(fs.readFileSync(TOOL, "utf8"));

  const toolIds = agent.conversation_config?.agent?.prompt?.tool_ids || [];
  const hasBookingId = toolIds.includes("tool_5301kph79z49fj2vz5p6xr6gcp2p");
  log("A", "tool_ids contains mercy_booking tool_5301", {
    hasBookingId,
    toolIdsLength: toolIds.length,
  });

  const edges = agent.workflow?.edges || {};
  const toTool = Object.entries(edges).find(
    ([, e]) =>
      e.source === "node_01kms0wffze0689rf5txr2d1f1" &&
      e.target === "node_01kms38sn3e0689rgpj57vyq56"
  );
  const fc = toTool?.[1]?.forward_condition;
  log("B", "Booking -> tool node edge", {
    edgeId: toTool?.[0],
    label: fc?.label,
    conditionPreview: (fc?.condition || "").slice(0, 120),
  });

  const props = Object.keys(
    bookingFile.api_schema?.request_body_schema?.properties || {}
  );
  const need = [
    "full_name",
    "callback_number",
    "service_needed",
    "preferred_day_or_time",
    "email",
    "business_name",
    "notes",
  ];
  const missing = need.filter((k) => !props.includes(k));
  log("C", "mercy_booking_intent.json properties", { props, missing });

  const mainPrompt =
    agent.conversation_config?.agent?.prompt?.prompt || "";
  const mustCall =
    mainPrompt.includes("mercy_booking_intent") &&
    mainPrompt.includes("MUST call");
  log("D", "main prompt mandates tool call", { mustCall });

  if (!hasBookingId || missing.length || !toTool) {
    console.error("validate-mercy-booking-config: FAILED (see logs)");
    process.exit(1);
  }
  console.log("validate-mercy-booking-config: OK");
}

main();
