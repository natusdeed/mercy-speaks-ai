// Cross-platform install script
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// #region agent log
fetch('http://127.0.0.1:7243/ingest/e6485d11-3b9f-4fe8-abde-87df7488e504',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'scripts/install.js:6',message:'Install script started',data:{cwd:process.cwd(),path:process.env.PATH},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
// #endregion

const myAppDir = path.join(__dirname, '..', 'my-app');

// #region agent log
// Find npm by getting node path and deriving npm.cmd location
let npmPath = null;
try {
  // First try to find node.exe
  const nodePath = execSync('where node', { encoding: 'utf8', stdio: 'pipe' }).trim().split('\n')[0];
  if (nodePath) {
    // npm.cmd is in the same directory as node.exe
    const nodeDir = path.dirname(nodePath);
    const npmCmdPath = path.join(nodeDir, 'npm.cmd');
    if (fs.existsSync(npmCmdPath)) {
      npmPath = npmCmdPath;
    }
  }
} catch (e) {
  // node not found, try common locations
}
fetch('http://127.0.0.1:7243/ingest/e6485d11-3b9f-4fe8-abde-87df7488e504',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'scripts/install.js:18',message:'Finding npm path',data:{npmPath,pathEnv:process.env.PATH?.split(path.delimiter)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
// #endregion

// #region agent log
// Try to find npm in common locations if not found via node
if (!npmPath) {
  const commonNpmPaths = [
    path.join(process.env.ProgramFiles || 'C:\\Program Files', 'nodejs', 'npm.cmd'),
    path.join(process.env['ProgramFiles(x86)'] || 'C:\\Program Files (x86)', 'nodejs', 'npm.cmd'),
    path.join(process.env.APPDATA || '', 'npm', 'npm.cmd'),
    path.join(process.env.LOCALAPPDATA || '', 'npm', 'npm.cmd'),
  ];
  npmPath = commonNpmPaths.find(p => fs.existsSync(p)) || null;
}
fetch('http://127.0.0.1:7243/ingest/e6485d11-3b9f-4fe8-abde-87df7488e504',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'scripts/install.js:30',message:'Checking common npm locations',data:{npmPath},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
// #endregion

try {
  // #region agent log
  // Ensure PATH includes nodejs directory for execSync
  const nodejsPath = npmPath ? path.dirname(npmPath) : null;
  const env = { ...process.env };
  if (nodejsPath && !env.PATH?.includes(nodejsPath)) {
    env.PATH = `${nodejsPath}${path.delimiter}${env.PATH || ''}`;
  }
  fetch('http://127.0.0.1:7243/ingest/e6485d11-3b9f-4fe8-abde-87df7488e504',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'scripts/install.js:47',message:'Attempting npm install',data:{myAppDir,nodejsPath,pathUpdated:!!nodejsPath,originalPath:process.env.PATH?.substring(0,100)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
  // #endregion
  
  // Use 'npm' command - PATH is now set correctly
  // Use --ignore-scripts to prevent infinite loop with root install script
  execSync('npm install --ignore-scripts', {
    cwd: myAppDir,
    stdio: 'inherit',
    env: env,
    shell: true
  });
  
  // #region agent log
  fetch('http://127.0.0.1:7243/ingest/e6485d11-3b9f-4fe8-abde-87df7488e504',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'scripts/install.js:47',message:'Install completed successfully',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'})}).catch(()=>{});
  // #endregion
} catch (error) {
  // #region agent log
  fetch('http://127.0.0.1:7243/ingest/e6485d11-3b9f-4fe8-abde-87df7488e504',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'scripts/install.js:50',message:'Install failed',data:{error:error.message,stack:error.stack,code:error.code},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'F'})}).catch(()=>{});
  // #endregion
  process.exit(1);
}
