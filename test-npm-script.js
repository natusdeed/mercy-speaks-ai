// Test script to simulate what happens when npm runs the install script
const { exec } = require('child_process');
const { promisify } = require('util');
const execAsync = promisify(exec);

// #region agent log
fetch('http://127.0.0.1:7243/ingest/e6485d11-3b9f-4fe8-abde-87df7488e504',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'test-npm-script.js:5',message:'Testing npm script execution',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'test-script',hypothesisId:'D'})}).catch(()=>{});
// #endregion

async function testNpmScript() {
  // Simulate what npm does when running: "cd my-app && npm install"
  const command = 'cd my-app && npm install';
  
  // #region agent log
  fetch('http://127.0.0.1:7243/ingest/e6485d11-3b9f-4fe8-abde-87df7488e504',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'test-npm-script.js:12',message:'Executing npm script command',data:{command},timestamp:Date.now(),sessionId:'debug-session',runId:'test-script',hypothesisId:'D'})}).catch(()=>{});
  // #endregion

  try {
    // Test with cmd.exe (what npm uses on Windows)
    const { stdout, stderr } = await execAsync(`cmd.exe /d /s /c "${command}"`, {
      cwd: process.cwd(),
      env: process.env
    });
    
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/e6485d11-3b9f-4fe8-abde-87df7488e504',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'test-npm-script.js:20',message:'Command succeeded',data:{stdoutLength:stdout.length,stderrLength:stderr.length},timestamp:Date.now(),sessionId:'debug-session',runId:'test-script',hypothesisId:'D'})}).catch(()=>{});
    // #endregion
    
    console.log('SUCCESS');
    console.log('STDOUT:', stdout);
    if (stderr) console.log('STDERR:', stderr);
  } catch (error) {
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/e6485d11-3b9f-4fe8-abde-87df7488e504',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'test-npm-script.js:28',message:'Command failed',data:{error:error.message,code:error.code,stderr:error.stderr?.substring(0,200)},timestamp:Date.now(),sessionId:'debug-session',runId:'test-script',hypothesisId:'D'})}).catch(()=>{});
    // #endregion
    
    console.log('FAILED');
    console.log('Error:', error.message);
    console.log('Code:', error.code);
    if (error.stderr) console.log('STDERR:', error.stderr);
  }
}

testNpmScript().catch(console.error);
