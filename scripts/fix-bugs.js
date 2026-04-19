const fs = require('fs');
require('dotenv').config({ path: '.env.local' });

const API_KEY = process.env.ELEVENLABS_API_KEY;
const AGENT_ID = 'agent_5601kmr4v057ebqvfjbg64jpatq2';

async function main() {
  console.log('📦 Reading fresh live agent config...');
  const config = JSON.parse(fs.readFileSync('agent_configs/Mercy-AI-Agent-LIVE.json', 'utf8'));

  const prompt = config.conversation_config.agent.prompt;

  console.log('🔧 Removing tool conflicts...');
  delete prompt.tools;
  delete prompt.system_tools;
  delete prompt.tool_ids;

  prompt.tool_ids = [
    'tool_2101kpf6mhsze1ntd11w6syx9nvf',
    'tool_6301kpf6mhxefndr7mcb6t00h8jt',
    'tool_2701kpf6mhzqefqatmcsp9aybbtq'
  ];

  console.log('🔧 Re-adding transfer system tool...');
  prompt.system_tools = [
    {
      type: 'system',
      name: 'transfer_to_number',
      description: 'Transfer the caller to a human when they ask to speak to Don, the owner, a manager, or a real person, or when the issue is urgent, sensitive, or outside Mercy scope.',
      params: {
        system_tool_type: 'transfer_to_number',
        transfers: [
          {
            transfer_destination: {
              type: 'phone',
              phone_number: '+17033325956'
            },
            condition: 'When the caller asks to speak to Don, the owner, a manager, or a human, or when the issue is urgent, sensitive, complex, or outside Mercy scope.',
            transfer_type: 'conference',
            client_message: 'Please hold for just a moment while I connect you with Don.',
            agent_message: 'Hi Don, you have an incoming call from a Mercy Speaks Digital caller. They need your assistance.'
          }
        ]
      }
    }
  ];

  console.log('🔧 Fixing conversation end behavior...');
  config.conversation_config.turn.silence_end_call_timeout = 10;

  prompt.prompt = prompt.prompt + `

CRITICAL ENDING RULE: When you have said goodbye and the conversation is complete, stop speaking immediately. Do not ask "are you still there?" Do not wait for a response. Do not reopen the conversation. The call ends the moment you deliver the farewell. Silence after goodbye means the call is over — never interpret silence as a reason to speak again.`;

  console.log('🚀 Pushing fixes to ElevenLabs...');
  const response = await fetch(`https://api.elevenlabs.io/v1/convai/agents/${AGENT_ID}`, {
    method: 'PATCH',
    headers: {
      'xi-api-key': API_KEY,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(config)
  });

  const result = await response.json();

  if (response.ok) {
    console.log('✅ Both bugs fixed successfully!');
    console.log('📞 Transfer tool re-added!');
    console.log('🔇 Conversation ending fixed!');
  } else {
    console.log('❌ Error:', JSON.stringify(result, null, 2));
  }
}

main();
