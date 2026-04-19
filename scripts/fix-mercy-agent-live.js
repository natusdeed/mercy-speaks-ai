/**
 * Normalization for Mercy-AI-Agent-LIVE.json:
 * - Strip UTF-8 BOM
 * - Fix double-encoded UTF-8 mojibake (em dash, arrow, apostrophe)
 * - Align main prompt handoff instructions with workflow (transfer first on voice)
 */
const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, "../agent_configs/Mercy-AI-Agent-LIVE.json");

let buf = fs.readFileSync(file);
if (buf[0] === 0xef && buf[1] === 0xbb && buf[2] === 0xbf) {
  buf = buf.slice(3);
}

let s = buf.toString("utf8");
if (s.charCodeAt(0) === 0xfeff) {
  s = s.slice(1);
}

const oldHandoff =
  "If the caller asks to speak with Don, asks for the owner, asks for a human, asks for a manager, has a sensitive issue, sounds upset, or the request is urgent, complex, or outside your scope, collect the minimum handoff details: full name, callback number, reason for call, and best callback time. Include requestedPerson if known. Once those handoff details are collected, use the mercy_handoff_request tool to save the escalation or human follow-up request.";

const newHandoff =
  "If the caller asks to speak with Don, the owner, a human, or a manager, or wants a live transfer during a phone call, use the transfer_to_number tool first. If the transfer cannot be completed, or the session is text-only (such as website chat) where phone transfer does not apply, collect the minimum handoff details: full name, callback number, reason for call, and best callback time. Include requestedPerson if known, then use the mercy_handoff_request tool to save the escalation or human follow-up request. If the issue is sensitive, urgent, complex, or outside your scope and the caller is not asking for an immediate live transfer on voice, collect those handoff details and use mercy_handoff_request.";

if (!s.includes(oldHandoff)) {
  console.error("Expected handoff paragraph not found; aborting.");
  process.exit(1);
}

s = s.replaceAll(oldHandoff, newHandoff);

// Em dash was stored as UTF-8 bytes misread then re-encoded: â (U+00E2) + € (U+20AC) + ” (U+201D)
s = s.replace(/\u00e2\u20ac\u201d/g, "\u2014");
// Arrow → : â + † + ’
s = s.replace(/\u00e2\u2020\u2019/g, "\u2192");
// Apostrophe in caller's : â + € + ™
s = s.replace(/\u00e2\u20ac\u2122/g, "\u2019");

JSON.parse(s);
fs.writeFileSync(file, s, "utf8");
console.log("OK:", file, "(no BOM, mojibake fixed, handoff prompt aligned)");
