const fs = require('fs');
require('dotenv').config({ path: '.env.local' });

const raw = fs.readFileSync('agent_configs/Mercy-AI-Agent-LIVE.json', 'utf8');
const config = JSON.parse(raw.replace(/^\uFEFF/, ''));
const prompt = config.conversation_config.agent.prompt;

console.log('=== TOOL IDs ===');
console.log('tool_ids:', JSON.stringify(prompt.tool_ids, null, 2));
console.log('tools:', JSON.stringify(prompt.tools, null, 2));
console.log('system_tools:', JSON.stringify(prompt.system_tools, null, 2));
console.log('=== TURN SETTINGS ===');
console.log(JSON.stringify(config.conversation_config.turn, null, 2));
