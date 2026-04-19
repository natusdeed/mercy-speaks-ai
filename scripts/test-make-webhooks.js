/**
 * POST sample payloads to Make.com webhooks; log HTTP status + body.
 * No secrets; safe to commit.
 */
const tests = [
  {
    name: 'mercy_booking_intent',
    url: 'https://hook.us2.make.com/aniana8d64s67gje6texu2iq6s62prx9',
    body: {
      full_name: 'Test User',
      callback_number: '7135550000',
      service_needed: 'AI Receptionist Demo',
      preferred_day_or_time: 'Monday morning',
      source: 'test_script',
      notes: 'Webhook connectivity test',
      urgency: 'normal',
    },
  },
  {
    name: 'mercy_handoff_request',
    url: 'https://hook.us2.make.com/ott2fgmhwe6je72in4au71rc93fyu4is',
    body: {
      fullName: 'Test User',
      callbackNumber: '7135550000',
      reasonForCall: 'Wants to speak with Don',
      bestCallbackTime: 'Monday morning',
      requestedPerson: 'Don',
      urgency: 'normal',
      source: 'test_script',
      notes: 'Webhook connectivity test',
    },
  },
  {
    name: 'mercy_message_capture',
    url: 'https://hook.us2.make.com/tifvwnhdp7n7xshu74ezx39js3f091fj',
    body: {
      full_name: 'Test User',
      callback_number: '7135550000',
      reason_for_calling: 'General inquiry',
      best_callback_time: 'Monday morning',
      source: 'test_script',
      notes: 'Webhook connectivity test',
      urgency: 'normal',
    },
  },
];

async function run() {
  for (const t of tests) {
    let text = '';
    let status = 0;
    try {
      const res = await fetch(t.url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(t.body),
      });
      status = res.status;
      text = await res.text();
    } catch (e) {
      text = String(e && e.message ? e.message : e);
    }
    console.log(`\n--- ${t.name} ---`);
    console.log('HTTP status:', status);
    console.log('Body (first 2000 chars):', text.slice(0, 2000));
  }
}

run();
