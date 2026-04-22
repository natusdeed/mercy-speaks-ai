/**
 * MERCY AI AGENT — Google Apps Script Web App (doPost)
 *
 * Handles: mercy_booking_intent, mercy_handoff_request, mercy_message_capture
 * Logs to Google Sheets + Gmail notifications
 *
 * Paste into Apps Script, set SHEET_ID / NOTIFY_EMAIL / SHEET_NAME, then:
 * Deploy → New deployment → Web app → Execute as: Me, Who has access: Anyone
 *
 * Fixes vs naive version:
 * - Reads POST body from postData (including getDataAsString), form fields, or Make.com-style parameters (empty postData was why nothing updated).
 * - Synthesizes JSON from flat e.parameter when the client sends application/x-www-form-urlencoded or omits postData.contents (some ConvAI / proxy stacks).
 * - Routes flat JSON from ElevenLabs (no tool_name) using field inference.
 * - Does not use data.name as tool name (that is often the caller's name).
 * - Gmail failures do not block sheet writes.
 * - Optional debug RAW row (off by default).
 */

const SHEET_ID = '1GeKtxC9fHBXLq9qvWAp3mbiPuZfbcY9VPf3HPhanFN8';
const NOTIFY_EMAIL = 'natusdeed@gmail.com';
const SHEET_NAME = 'Sheet1';

/** Set true only while debugging — logs one extra row per request */
const LOG_RAW_DEBUG = false;

// ============================================================
// POST body extraction (Make / proxies often omit postData.contents)
// ============================================================
/** Known webhook field names — if flat parameters include any, treat as JSON tool payload. */
function synthesizeJsonFromFlatParameters_(param) {
  if (!param || typeof param !== 'object') return '';
  var toolKeys = {
    fullName: 1,
    callbackNumber: 1,
    full_name: 1,
    callback_number: 1,
    serviceNeeded: 1,
    preferredDayOrTime: 1,
    service_needed: 1,
    preferred_day_or_time: 1,
    reasonForCall: 1,
    bestCallbackTime: 1,
    reason_for_calling: 1,
    best_callback_time: 1,
    requested_person: 1,
    requestedPerson: 1,
    email: 1,
    businessName: 1,
    business_name: 1,
    notes: 1,
    source: 1,
    urgency: 1,
    tool_name: 1,
    parameters: 1,
  };
  var keys = Object.keys(param);
  var hit = 0;
  for (var i = 0; i < keys.length; i++) {
    if (toolKeys[keys[i]]) hit++;
  }
  if (hit === 0) return '';
  var out = {};
  for (var j = 0; j < keys.length; j++) {
    var k = keys[j];
    var v = param[k];
    if (v !== undefined && v !== null && String(v) !== '') out[k] = v;
  }
  return JSON.stringify(out);
}

function getRawPostBody_(e) {
  if (!e) return '';
  if (e.postData) {
    if (e.postData.contents != null && String(e.postData.contents).trim() !== '') {
      return String(e.postData.contents);
    }
    if (typeof e.postData.getDataAsString === 'function') {
      try {
        var asStr = e.postData.getDataAsString();
        if (asStr && String(asStr).trim() !== '') return String(asStr);
      } catch (ignore) {}
    }
  }
  if (e.parameter) {
    if (e.parameter.payload) return String(e.parameter.payload);
    if (e.parameter.body) return String(e.parameter.body);
    if (e.parameter.data) return String(e.parameter.data);
    var keys = Object.keys(e.parameter);
    for (var i = 0; i < keys.length; i++) {
      var v = e.parameter[keys[i]];
      if (v && String(v).trim().indexOf('{') === 0) return String(v);
    }
    var synth = synthesizeJsonFromFlatParameters_(e.parameter);
    if (synth) return synth;
  }
  return '';
}

function jsonResponse_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

/** Strip wrapper; handlers always receive a flat parameter object */
function normalizeParams_(data) {
  if (!data || typeof data !== 'object') return {};
  if (data.parameters && typeof data.parameters === 'object') {
    return Object.assign({}, data.parameters);
  }
  var copy = Object.assign({}, data);
  delete copy.tool_name;
  delete copy.tool;
  delete copy.input;
  return copy;
}

/**
 * ElevenLabs sends flat bodies without tool_name. Infer from distinctive fields.
 * Booking: service_needed, preferred_day_or_time
 * Handoff: reasonForCall (camelCase in schema)
 * Message: reason_for_calling + best_callback_time (snake_case)
 */
function inferToolName_(data, params) {
  var p = params || {};
  var d = data || {};
  if (d.reasonForCall || p.reasonForCall) return 'mercy_handoff_request';
  if (d.reason_for_calling || p.reason_for_calling) {
    if (d.service_needed || p.service_needed || d.service_interest || p.service_interest) {
      return 'mercy_booking_intent';
    }
    return 'mercy_message_capture';
  }
  if (
    d.service_needed ||
    p.service_needed ||
    d.preferred_day_or_time ||
    p.preferred_day_or_time ||
    d.service_interest ||
    p.service_interest ||
    d.serviceNeeded ||
    p.serviceNeeded ||
    d.preferredDayOrTime ||
    p.preferredDayOrTime
  ) {
    return 'mercy_booking_intent';
  }
  /** Early booking (name + phone only) uses camelCase like the ElevenLabs tool schema; distinguish from handoff via reasonForCall / bestCallbackTime. */
  if (d.fullName || p.fullName || d.callbackNumber || p.callbackNumber) {
    if (d.reasonForCall || p.reasonForCall || d.bestCallbackTime || p.bestCallbackTime) {
      return 'mercy_handoff_request';
    }
    return 'mercy_booking_intent';
  }
  if ((d.full_name || p.full_name) && (d.callback_number || p.callback_number)) {
    return 'mercy_booking_intent';
  }
  return '';
}

function resolveToolAndParams_(data) {
  var tool = String(data.tool_name || data.tool || '').trim();
  var params = normalizeParams_(data);
  if (!tool) {
    tool = inferToolName_(data, params);
  }
  return { tool: tool, params: params };
}

// ============================================================
// MAIN ENTRY
// ============================================================
function doPost(e) {
  try {
    var raw = getRawPostBody_(e);
    if (!raw || !String(raw).trim()) {
      appendToSheet_([
        new Date(),
        'WEBHOOK ERROR',
        'Empty POST body',
        '',
        '',
        '',
        '',
        'Deploy latest Mercy-Agent-Webhook.gs; or client sent no body (check ConvAI tool POST).',
      ]);
      return jsonResponse_({ status: 'error', message: 'Empty body' });
    }

    if (LOG_RAW_DEBUG) {
      appendToSheet_([new Date(), 'RAW PAYLOAD', raw, '', '', '', '', 'debug']);
    }

    var data;
    try {
      data = JSON.parse(raw);
    } catch (parseErr) {
      appendToSheet_([
        new Date(),
        'PARSE ERROR',
        String(raw).slice(0, 800),
        '',
        '',
        '',
        '',
        String(parseErr && parseErr.message ? parseErr.message : parseErr),
      ]);
      return jsonResponse_({ status: 'error', message: 'Invalid JSON' });
    }

    if (Array.isArray(data) && data.length && typeof data[0] === 'object') {
      data = data[0];
    }

    var resolved = resolveToolAndParams_(data);
    var tool = resolved.tool;
    var params = resolved.params;

    if (tool === 'mercy_booking_intent') {
      handleBooking(params);
    } else if (tool === 'mercy_handoff_request') {
      handleHandoff(params);
    } else if (tool === 'mercy_message_capture') {
      handleMessage(params);
    } else {
      handleFallback(params, tool);
    }

    return jsonResponse_({ status: 'success' });
  } catch (err) {
    try {
      appendToSheet_([
        new Date(),
        'SCRIPT ERROR',
        String(err && err.message ? err.message : err),
        '',
        '',
        '',
        '',
        'See Executions in Apps Script',
      ]);
    } catch (ignore) {}
    return jsonResponse_({
      status: 'error',
      message: String(err && err.message ? err.message : err),
    });
  }
}

function doGet() {
  return jsonResponse_({
    ok: true,
    service: 'Mercy Agent webhook',
    time: new Date().toISOString(),
  });
}

// ============================================================
// HANDLER 1 — Booking (ElevenLabs tool schema: fullName, callbackNumber, serviceNeeded, preferredDayOrTime; snake_case still accepted)
// ============================================================
function handleBooking(p) {
  var row = [
    new Date(),
    p.caller_name || p.fullName || p.full_name || p.name || 'Unknown',
    p.caller_phone || p.callbackNumber || p.callback_number || p.phone || 'Not provided',
    p.caller_email || p.email || 'Not provided',
    p.businessName || p.business_name || 'Not provided',
    p.service_interest || p.serviceNeeded || p.service_needed || p.service || p.reason_for_calling || 'Not provided',
    p.preferred_time || p.preferredDayOrTime || p.preferred_day_or_time || p.best_callback_time || p.time || 'Not provided',
    buildBookingSummary_(p),
  ];

  appendToSheet_(row);
  sendEmailSafe_(
    'New Booking Request — Mercy AI',
    'A caller wants to book a demo or appointment.\n\n' +
      'Name: ' +
      row[1] +
      '\nPhone: ' +
      row[2] +
      '\nEmail: ' +
      row[3] +
      '\nBusiness: ' +
      row[4] +
      '\nService Interest: ' +
      row[5] +
      '\nPreferred Time: ' +
      row[6] +
      '\nSummary: ' +
      row[7] +
      '\n\nLogged to Google Sheets automatically.'
  );
}

function buildBookingSummary_(p) {
  var parts = [];
  if (p.notes) parts.push(p.notes);
  if (p.source) parts.push('Source: ' + p.source);
  if (p.urgency) parts.push('Urgency: ' + p.urgency);
  if (parts.length) return parts.join(' · ');
  return 'Booking request';
}

// ============================================================
// HANDLER 2 — Handoff
// ============================================================
function handleHandoff(p) {
  var row = [
    new Date(),
    p.fullName || p.caller_name || p.name || 'Unknown',
    p.callbackNumber || p.caller_phone || p.phone || 'Not provided',
    p.caller_email || p.email || 'Not provided',
    p.business_name || 'Not provided',
    p.reasonForCall || p.service_interest || p.service || 'Not provided',
    p.bestCallbackTime || p.preferred_time || p.time || 'Not provided',
    p.notes || p.reason || p.requestedPerson || 'Requested to speak with a human',
  ];

  appendToSheet_(row);
  sendEmailSafe_(
    'Handoff Request — Mercy AI',
    'A caller requested to speak with a human team member.\n\n' +
      'Name: ' +
      row[1] +
      '\nPhone: ' +
      row[2] +
      '\nEmail: ' +
      row[3] +
      '\nBusiness: ' +
      row[4] +
      '\nReason: ' +
      row[5] +
      '\nBest time: ' +
      row[6] +
      '\nNotes: ' +
      row[7] +
      '\n\nFollow up if needed.'
  );
}

// ============================================================
// HANDLER 3 — Message
// ============================================================
function handleMessage(p) {
  var row = [
    new Date(),
    p.full_name || p.caller_name || p.name || 'Unknown',
    p.callback_number || p.caller_phone || p.phone || 'Not provided',
    p.caller_email || p.email || 'Not provided',
    p.business_name || 'Not provided',
    p.reason_for_calling || p.service_interest || p.service || 'Not provided',
    p.best_callback_time || p.preferred_time || p.time || 'Not provided',
    p.notes || p.message || p.summary || 'Message captured',
  ];

  appendToSheet_(row);
  sendEmailSafe_(
    'New Message Captured — Mercy AI',
    'Mercy captured a message from a caller.\n\n' +
      'Name: ' +
      row[1] +
      '\nPhone: ' +
      row[2] +
      '\nEmail: ' +
      row[3] +
      '\nBusiness: ' +
      row[4] +
      '\nReason: ' +
      row[5] +
      '\nBest time: ' +
      row[6] +
      '\nNotes: ' +
      row[7] +
      '\n\nLogged to Google Sheets automatically.'
  );
}

// ============================================================
// FALLBACK
// ============================================================
function handleFallback(p, toolName) {
  var row = [
    new Date(),
    p.fullName || p.full_name || p.caller_name || p.name || 'Unknown',
    p.callbackNumber || p.callback_number || p.caller_phone || p.phone || 'Not provided',
    p.caller_email || p.email || 'Not provided',
    p.business_name || 'Not provided',
    p.reasonForCall || p.reason_for_calling || p.service_interest || 'Not provided',
    p.bestCallbackTime || p.best_callback_time || p.preferred_time || 'Not provided',
    'Unknown or empty tool: ' + String(toolName || '(empty)') + ' — inspect parameters',
  ];

  appendToSheet_(row);
  sendEmailSafe_(
    'Unknown Webhook — Mercy AI',
    'Mercy fired a webhook that could not be routed.\nTool: "' +
      String(toolName || '') +
      '"\n\nCheck Make mapping and ElevenLabs tool body shape.'
  );
}

// ============================================================
// Sheet + Gmail
// ============================================================
function appendToSheet_(row) {
  var ss = SpreadsheetApp.openById(SHEET_ID);
  var sheet = ss.getSheetByName(SHEET_NAME) || ss.getSheets()[0];
  sheet.appendRow(row);
}

function sendEmailSafe_(subject, body) {
  try {
    GmailApp.sendEmail(NOTIFY_EMAIL, subject, body);
  } catch (mailErr) {
    try {
      MailApp.sendEmail(NOTIFY_EMAIL, subject, body);
    } catch (mailErr2) {
      appendToSheet_([
        new Date(),
        'EMAIL FAILED',
        String(mailErr2 && mailErr2.message ? mailErr2.message : mailErr2),
        '',
        '',
        '',
        '',
        subject,
      ]);
    }
  }
}

// ============================================================
// TEST — Run in editor: selects → Run
// ============================================================
function testWebhook() {
  var testPayload = {
    tool_name: 'mercy_booking_intent',
    parameters: {
      caller_name: 'Test Caller',
      caller_phone: '+13460000000',
      caller_email: 'test@example.com',
      business_name: 'Test Roofing Co',
      service_interest: 'AI Receptionist Demo',
      preferred_time: 'Monday morning',
    },
  };
  handleBooking(testPayload.parameters);
}

function testFlatBookingBody() {
  var flat = {
    full_name: 'Flat Test',
    callback_number: '7135550000',
    service_needed: 'Website',
    preferred_day_or_time: 'Tuesday PM',
    notes: 'Simulates ElevenLabs POST without tool_name',
  };
  var r = resolveToolAndParams_(flat);
  Logger.log(r.tool);
  if (r.tool === 'mercy_booking_intent') {
    handleBooking(r.params);
  }
}
