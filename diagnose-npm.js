// Diagnostic script to check npm availability in subprocess
const { exec } = require('child_process');
const { promisify } = require('util');
const execAsync = promisify(exec);

// #region agent log
fetch('http://127.0.0.1:7243/ingest/e6485d11-3b9f-4fe8-abde-87df7488e504',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'diagnose-npm.js:7',message:'Diagnostic script started',data:{processEnvPath:process.env.PATH?.substring(0,100)},timestamp:Date.now(),sessionId:'debug-session',runId:'diagnosis',hypothesisId:'A'})}).catch(()=>{});
// #endregion

async function diagnose() {
  const results = {
    mainProcess: {},
    subprocess: {}
  };

  // Check main process
  // #region agent log
  fetch('http://127.0.0.1:7243/ingest/e6485d11-3b9f-4fe8-abde-87df7488e504',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'diagnose-npm.js:15',message:'Checking main process PATH',data:{pathLength:process.env.PATH?.length},timestamp:Date.now(),sessionId:'debug-session',runId:'diagnosis',hypothesisId:'A'})}).catch(()=>{});
  // #endregion
  
  results.mainProcess.PATH = process.env.PATH;
  results.mainProcess.PATH_includes_nodejs = process.env.PATH?.includes('nodejs') || false;

  // Check if npm is available in main process
  try {
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/e6485d11-3b9f-4fe8-abde-87df7488e504',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'diagnose-npm.js:24',message:'Testing npm in main process',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'diagnosis',hypothesisId:'A'})}).catch(()=>{});
    // #endregion
    const { stdout } = await execAsync('npm --version');
    results.mainProcess.npm_version = stdout.trim();
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/e6485d11-3b9f-4fe8-abde-87df7488e504',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'diagnose-npm.js:28',message:'npm found in main process',data:{version:stdout.trim()},timestamp:Date.now(),sessionId:'debug-session',runId:'diagnosis',hypothesisId:'A'})}).catch(()=>{});
    // #endregion
  } catch (error) {
    results.mainProcess.npm_error = error.message;
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/e6485d11-3b9f-4fe8-abde-87df7488e504',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'diagnose-npm.js:32',message:'npm NOT found in main process',data:{error:error.message},timestamp:Date.now(),sessionId:'debug-session',runId:'diagnosis',hypothesisId:'A'})}).catch(()=>{});
    // #endregion
  }

  // Check subprocess (simulating what npm script does)
  try {
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/e6485d11-3b9f-4fe8-abde-87df7488e504',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'diagnose-npm.js:38',message:'Testing npm in subprocess (cmd.exe)',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'diagnosis',hypothesisId:'B'})}).catch(()=>{});
    // #endregion
    const { stdout } = await execAsync('cmd.exe /c npm --version');
    results.subprocess.npm_version = stdout.trim();
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/e6485d11-3b9f-4fe8-abde-87df7488e504',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'diagnose-npm.js:41',message:'npm found in subprocess',data:{version:stdout.trim()},timestamp:Date.now(),sessionId:'debug-session',runId:'diagnosis',hypothesisId:'B'})}).catch(()=>{});
    // #endregion
  } catch (error) {
    results.subprocess.npm_error = error.message;
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/e6485d11-3b9f-4fe8-abde-87df7488e504',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'diagnose-npm.js:45',message:'npm NOT found in subprocess',data:{error:error.message},timestamp:Date.now(),sessionId:'debug-session',runId:'diagnosis',hypothesisId:'B'})}).catch(()=>{});
    // #endregion
  }

  // Check where npm is located
  try {
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/e6485d11-3b9f-4fe8-abde-87df7488e504',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'diagnose-npm.js:51',message:'Finding npm location',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'diagnosis',hypothesisId:'C'})}).catch(()=>{});
    // #endregion
    const { stdout } = await execAsync('where.exe npm');
    results.npm_location = stdout.trim();
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/e6485d11-3b9f-4fe8-abde-87df7488e504',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'diagnose-npm.js:54',message:'npm location found',data:{location:stdout.trim()},timestamp:Date.now(),sessionId:'debug-session',runId:'diagnosis',hypothesisId:'C'})}).catch(()=>{});
    // #endregion
  } catch (error) {
    results.npm_location_error = error.message;
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/e6485d11-3b9f-4fe8-abde-87df7488e504',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'diagnose-npm.js:58',message:'npm location NOT found',data:{error:error.message},timestamp:Date.now(),sessionId:'debug-session',runId:'diagnosis',hypothesisId:'C'})}).catch(()=>{});
    // #endregion
  }

  // #region agent log
  fetch('http://127.0.0.1:7243/ingest/e6485d11-3b9f-4fe8-abde-87df7488e504',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'diagnose-npm.js:62',message:'Diagnostic complete',data:results,timestamp:Date.now(),sessionId:'debug-session',runId:'diagnosis',hypothesisId:'ALL'})}).catch(()=>{});
  // #endregion

  console.log(JSON.stringify(results, null, 2));
}

diagnose().catch(console.error);
