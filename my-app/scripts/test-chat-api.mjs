#!/usr/bin/env node
/**
 * Temporary test: POST /api/chat and expect JSON.
 * Run with dev server up: npm run dev, then in another terminal: node scripts/test-chat-api.mjs
 * Or: npm run test:chat-api
 */
const base = process.env.API_BASE || 'http://localhost:3000';
const url = `${base}/api/chat`;

async function main() {
  console.log('POST', url);
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userMessage: 'Hi' }),
  });
  const contentType = res.headers.get('content-type') || '';
  console.log('Status:', res.status, res.statusText);
  console.log('Content-Type:', contentType);
  const text = await res.text();
  if (contentType.includes('application/json')) {
    const data = JSON.parse(text);
    console.log('JSON:', JSON.stringify(data, null, 2));
    if (data.response !== undefined) console.log('OK — response field present');
    if (res.status >= 400 && data.error) console.log('Error:', data.error);
  } else {
    console.log('Body (non-JSON):', text.slice(0, 300));
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
