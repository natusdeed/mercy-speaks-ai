const fs = require('fs');
require('dotenv').config({ path: '.env.local' });

const API_KEY = process.env.ELEVENLABS_API_KEY;
const AGENT_ID = 'agent_5601kmr4v057ebqvfjbg64jpatq2';

async function main() {
  console.log('📦 Reading fresh live agent config...');
  const config = JSON.parse(fs.readFileSync('agent_configs/Mercy-AI-Agent-LIVE.json', 'utf8'));

  console.log('🔧 Fixing turn settings...');
  config.conversation_config.turn.turn_timeout = 15;
  config.conversation_config.turn.silence_end_call_timeout = 10;
  config.conversation_config.turn.soft_timeout_config = {
    timeout_seconds: -1,
    message: "I am still here if you need anything.",
    use_llm_generated_message: false
  };

  console.log('🔧 Fixing tool conflicts permanently...');
  const prompt = config.conversation_config.agent.prompt;
  delete prompt.tool_ids;
  delete prompt.tools;
  delete prompt.system_tools;

  prompt.tool_ids = [
    'tool_2101kpf6mhsze1ntd11w6syx9nvf',
    'tool_6301kpf6mhxefndr7mcb6t00h8jt',
    'tool_2701kpf6mhzqefqatmcsp9aybbtq'
  ];

  prompt.system_tools = [
    {
      name: 'end_call',
      description: 'Use this tool to end the conversation after saying goodbye to the caller.',
      params: {
        system_tool_type: 'end_call'
      }
    },
    {
      name: 'transfer_to_number',
      description: 'Transfer the caller to Don when they ask to speak with any human, any person by name, the owner, or a manager.',
      params: {
        system_tool_type: 'transfer_to_number',
        transfers: [
          {
            transfer_destination: {
              type: 'phone',
              phone_number: '+17033325956'
            },
            condition: 'When the caller asks to speak with any person by name, the owner, a manager, or any human.',
            transfer_type: 'conference',
            client_message: 'Please hold while I connect you now.',
            agent_message: 'Hi, incoming call from a Mercy Speaks Digital caller needing assistance.'
          }
        ]
      }
    }
  ];

  console.log('🔧 Fixing Greeting node prompt...');
  config.workflow.nodes['node_01kmry56a7e0689rdvcyxp916m'].additional_prompt = `Your only job is to greet the caller warmly and identify why they are calling. Then route immediately.

NEVER say anyone is unavailable. NEVER take a message here. NEVER handle transfers yourself.

If the caller asks for ANY person by name, asks for the owner, asks for a human, or wants to speak with anyone — immediately say: "Of course, let me connect you right now!" and route to Handoff / Human Request.

Ask one simple question: "How can I help you today?" Then route based on their answer. Keep this step very short.`;

  console.log('🔧 Fixing Handoff node prompt...');
  config.workflow.nodes['node_01kms1x20pe0689rfjwrea1qt1'].additional_prompt = `Your goal is to connect the caller with a human immediately using transfer_to_number.

When the caller wants any human — immediately use transfer_to_number with:
- transfer_number: +17033325956
- client_message: Please hold for just a moment while I connect you now.
- agent_message: Hi, incoming call from a Mercy Speaks Digital caller needing assistance.

Do NOT say anyone is unavailable.
Do NOT collect information before attempting transfer.
Just transfer immediately.

Only if the transfer actually fails — then collect their details and use mercy_handoff_request.`;

  console.log('🚀 Pushing all fixes to ElevenLabs...');
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
    console.log('✅ Everything fixed successfully!');
    console.log('📞 Mercy will now transfer immediately!');
    console.log('🔇 End call tool is live!');
    console.log('⏱️ Turn timeout fixed to 15 seconds!');
  } else {
    console.log('❌ Error:', JSON.stringify(result, null, 2));
  }
}

main();
