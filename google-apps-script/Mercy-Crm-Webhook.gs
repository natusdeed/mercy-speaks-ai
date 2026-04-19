/**
 * Mercy AI CRM — Google Sheets Web App (doPost)
 *
 * Paste this into your Apps Script project bound to the "Mercy AI CRM" spreadsheet
 * (or set SPREADSHEET_ID if the script is standalone).
 *
 * Deploy: Deploy > New deployment > Type: Web app
 *   Execute as: Me
 *   Who has access: Anyone (or Anyone with Google account if you prefer)
 *
 * Point Make.com / your proxy at this web app URL with POST + JSON body.
 *
 * Handles:
 * - Flat booking body: full_name, callback_number, service_needed, preferred_day_or_time, notes, ...
 * - ElevenLabs-style wrapper: { tool_name, parameters: { caller_name, caller_phone, ... } }
 * - Stringified JSON in postData
 */

/** Tab name that receives rows (change if your sheet tab is not Sheet1). */
var MERCY_SHEET_NAME = 'Sheet1';

/** Optional: if script is not bound to the spreadsheet, set Script property MERCY_SPREADSHEET_ID */
function getMercySpreadsheet_() {
  var id = PropertiesService.getScriptProperties().getProperty('MERCY_SPREADSHEET_ID');
  if (id) return SpreadsheetApp.openById(id);
  return SpreadsheetApp.getActiveSpreadsheet();
}

/**
 * First non-empty string from obj using candidate keys.
 */
function pickField_(obj, keys) {
  if (!obj) return '';
  for (var i = 0; i < keys.length; i++) {
    var k = keys[i];
    if (obj[k] !== undefined && obj[k] !== null && String(obj[k]).trim() !== '') {
      return String(obj[k]).trim();
    }
  }
  return '';
}

/**
 * Parse POST body into an object. Returns null if not parseable.
 */
function parsePostJson_(e) {
  var raw = '';
  if (e.postData && e.postData.contents) {
    raw = e.postData.contents;
  } else if (e.parameter && e.parameter.payload) {
    raw = e.parameter.payload;
  }
  if (!raw || String(raw).trim() === '') {
    return null;
  }
  var s = String(raw).trim();
  try {
    var parsed = JSON.parse(s);
    if (Array.isArray(parsed) && parsed.length > 0 && typeof parsed[0] === 'object' && parsed[0] !== null) {
      return parsed[0];
    }
    if (parsed !== null && typeof parsed === 'object' && !Array.isArray(parsed)) {
      return parsed;
    }
    return { _raw_value: parsed };
  } catch (err) {
    return { _unparsed: s };
  }
}

/**
 * Unwrap common webhook shapes into one flat object for column mapping.
 */
function normalizePayload_(data) {
  if (!data || typeof data !== 'object') {
    return {};
  }
  // { payload: "{...json string...}" }
  if (data.payload && typeof data.payload === 'string') {
    try {
      var inner = JSON.parse(data.payload);
      return normalizePayload_(inner);
    } catch (e) {}
  }
  // Tool wrapper (tests / some proxies)
  if (data.tool_name && data.parameters && typeof data.parameters === 'object') {
    var merged = {};
    for (var k in data.parameters) {
      if (Object.prototype.hasOwnProperty.call(data.parameters, k)) {
        merged[k] = data.parameters[k];
      }
    }
    merged._tool_name = data.tool_name;
    return merged;
  }
  // Some stacks nest under "body"
  if (data.body) {
    if (typeof data.body === 'string') {
      try {
        return normalizePayload_(JSON.parse(data.body));
      } catch (e2) {}
    } else if (typeof data.body === 'object') {
      return normalizePayload_(data.body);
    }
  }
  return data;
}

function buildSummary_(flat) {
  var tool = pickField_(flat, ['_tool_name', 'tool_name']);
  var notes = pickField_(flat, ['notes', 'summary', 'message']);
  var service = pickField_(flat, ['service_needed', 'serviceNeeded', 'service']);
  var urgency = pickField_(flat, ['urgency']);
  var parts = [];
  if (tool) parts.push('Tool: ' + tool);
  if (service) parts.push(service);
  if (urgency) parts.push('Urgency: ' + urgency);
  if (notes) parts.push(notes);
  var line = parts.join(' · ');
  if (line) return line;
  return 'Booking request';
}

function rowFromFlat_(flat) {
  var name = pickField_(flat, [
    'full_name',
    'fullName',
    'name',
    'caller_name',
    'customer_name',
    'contact_name',
  ]);
  var phone = pickField_(flat, [
    'callback_number',
    'callbackNumber',
    'phone',
    'caller_phone',
    'phone_number',
    'mobile',
  ]);
  var email = pickField_(flat, ['email', 'email_address', 'contact_email']);
  var business = pickField_(flat, ['business_name', 'businessName', 'company', 'company_name']);
  var service = pickField_(flat, ['service_needed', 'serviceNeeded', 'service', 'service_interest']);
  var pref = pickField_(flat, [
    'preferred_day_or_time',
    'preferredDayOrTime',
    'preferred_time',
    'best_time',
  ]);
  var summary = pickField_(flat, ['summary', 'notes', 'description']);
  if (!summary) summary = buildSummary_(flat);

  return [
    new Date(),
    name,
    phone,
    email,
    business || 'Not provided',
    service,
    pref,
    summary,
  ];
}

function doPost(e) {
  var out = ContentService.createTextOutput();
  out.setMimeType(ContentService.MimeType.JSON);

  try {
    var data = parsePostJson_(e);
    if (!data) {
      out.setContent(
        JSON.stringify({ ok: false, error: 'Empty body. Send JSON POST with booking fields.' })
      );
      return out;
    }
    if (data._unparsed) {
      var ss = getMercySpreadsheet_();
      var sh = ss.getSheetByName(MERCY_SHEET_NAME);
      if (!sh) sh = ss.getSheets()[0];
      var bad = String(data._unparsed).slice(0, 1800);
      sh.appendRow([
        new Date(),
        '',
        '',
        '',
        'Not provided',
        '',
        '',
        'Invalid JSON (raw in Summary, not Name). ' + bad,
      ]);
      out.setContent(JSON.stringify({ ok: false, error: 'Invalid JSON' }));
      return out;
    }

    if (data._raw_value !== undefined) {
      var raw = data._raw_value;
      if (typeof raw === 'string') {
        try {
          raw = JSON.parse(raw);
        } catch (eR) {
          raw = {};
        }
      }
      if (Array.isArray(raw) && raw.length > 0 && typeof raw[0] === 'object') {
        raw = raw[0];
      }
      data =
        raw !== null && typeof raw === 'object' && !Array.isArray(raw)
          ? raw
          : {};
    }

    var flat = normalizePayload_(data);
    var row = rowFromFlat_(flat);

    var ss2 = getMercySpreadsheet_();
    var sheet = ss2.getSheetByName(MERCY_SHEET_NAME);
    if (!sheet) sheet = ss2.getSheets()[0];
    sheet.appendRow(row);

    out.setContent(JSON.stringify({ ok: true, row: row.length }));
  } catch (err) {
    out.setContent(
      JSON.stringify({
        ok: false,
        error: String(err && err.message ? err.message : err),
      })
    );
  }
  return out;
}

/** Optional: browser GET to verify deployment URL is live */
function doGet() {
  return ContentService.createTextOutput(
    JSON.stringify({ ok: true, service: 'Mercy CRM webhook', time: new Date().toISOString() })
  ).setMimeType(ContentService.MimeType.JSON);
}
