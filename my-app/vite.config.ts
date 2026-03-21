import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Load .env / .env.local into process.env so API middleware (e.g. chat handler) sees OPENAI_API_KEY.
const mode = process.env.MODE || process.env.NODE_ENV || 'development';
const cwd = process.cwd();
const parentDir = path.resolve(cwd, '..');
Object.assign(process.env, loadEnv(mode, parentDir, ''), loadEnv(mode, cwd, ''));

// https://vitejs.dev/config/
export default defineConfig({
  /* Always resolve index.html from this package (avoids "in/index.html" when cwd/CLI root is wrong in monorepo). */
  root: path.resolve(__dirname),
  plugins: [
    react(),
    // Dev-only: handle GET /api/widget/config, POST /api/widget/chat, POST /api/widget/lead
    {
      name: 'api-widget-routes',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (!req.url?.startsWith('/api/widget/')) {
            next();
            return;
          }
          const isConfig = req.url === '/api/widget/config' || req.url.startsWith('/api/widget/config?');
          const isWidgetChat = req.url === '/api/widget/chat' || req.url.startsWith('/api/widget/chat?');
          const isWidgetLead = req.url === '/api/widget/lead' || req.url.startsWith('/api/widget/lead?');
          if (!isConfig && !isWidgetChat && !isWidgetLead) {
            next();
            return;
          }
          const forwardHeaders = Object.fromEntries(
            Object.entries(req.headers).filter(([, v]) => v != null).map(([k, v]) => [k.toLowerCase(), Array.isArray(v) ? v.join(', ') : String(v)])
          );
          if (isConfig && req.method === 'GET') {
            (async () => {
              try {
                const fakeRequest = new Request(`http://localhost${req.url}`, { method: 'GET', headers: forwardHeaders });
                const { GET } = await import('./src/app/api/widget/config/route');
                const response = await GET(fakeRequest);
                res.statusCode = response.status;
                response.headers.forEach((v, k) => res.setHeader(k, v));
                const data = await response.json();
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(data));
              } catch (e) {
                console.error('Widget config API error:', e);
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ allowed: false, error: 'Internal server error' }));
              }
            })();
            return;
          }
          if ((isWidgetChat || isWidgetLead) && req.method === 'POST') {
            const chunks: Buffer[] = [];
            req.on('data', (chunk: Buffer) => chunks.push(chunk));
            req.on('end', async () => {
              const bodyStr = Buffer.concat(chunks).toString() || '{}';
              try {
                const fakeRequest = new Request(`http://localhost${req.url}`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json', ...forwardHeaders },
                  body: bodyStr,
                });
                if (isWidgetChat) {
                  const { handleWidgetChatRequest } = await import('./src/app/api/widget/chat-handler');
                  const response = await handleWidgetChatRequest(fakeRequest);
                  res.statusCode = response.status;
                  response.headers.forEach((v, k) => res.setHeader(k, v));
                  const data = await response.json();
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify(data));
                } else {
                  const { handleWidgetLeadRequest } = await import('./src/app/api/widget/lead/route');
                  const response = await handleWidgetLeadRequest(fakeRequest);
                  res.statusCode = response.status;
                  response.headers.forEach((v, k) => res.setHeader(k, v));
                  const data = await response.json();
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify(data));
                }
              } catch (e) {
                console.error('Widget API error:', e);
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'Internal server error' }));
              }
            });
            return;
          }
          next();
        });
      },
    },
    // Dev-only: handle POST /api/book-demo, /api/contact, /api/chat, /api/chat/lead
    {
      name: 'api-lead-routes',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.method !== 'POST' || !req.url?.startsWith('/api/')) {
            next();
            return;
          }
          const isBookDemo = req.url === '/api/book-demo' || req.url.startsWith('/api/book-demo?');
          const isContact = req.url === '/api/contact' || req.url.startsWith('/api/contact?');
          const isChat = req.url === '/api/chat' || req.url.startsWith('/api/chat?');
          const isChatLead = req.url === '/api/chat/lead' || req.url.startsWith('/api/chat/lead?');
          if (!isBookDemo && !isContact && !isChat && !isChatLead) {
            next();
            return;
          }

          const chunks: Buffer[] = [];
          req.on('data', (chunk: Buffer) => chunks.push(chunk));
          req.on('end', async () => {
            const bodyStr = Buffer.concat(chunks).toString() || '{}';

            if (isChatLead) {
              try {
                const fakeRequest = new Request(`http://localhost${req.url}`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: bodyStr,
                });
                const { handleChatLeadRequest } = await import('./src/app/api/chat/lead-route');
                const response = await handleChatLeadRequest(fakeRequest);
                res.statusCode = response.status;
                response.headers.forEach((v, k) => res.setHeader(k, v));
                const data = await response.json();
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(data));
              } catch (e) {
                console.error('Chat lead API error:', e);
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'Internal server error' }));
              }
              return;
            }

            if (isChat) {
              try {
                const fakeRequest = new Request(`http://localhost${req.url}`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json', ...Object.fromEntries(Object.entries(req.headers).filter(([, v]) => v != null).map(([k, v]) => [k.toLowerCase(), Array.isArray(v) ? v.join(', ') : String(v)])) },
                  body: bodyStr,
                });
                const { handleChatRequest } = await import('./src/app/api/chat/chat-handler');
                const response = await handleChatRequest(fakeRequest);
                res.statusCode = response.status;
                response.headers.forEach((v, k) => res.setHeader(k, v));
                if (response.body) {
                  const reader = response.body.getReader();
                  const pump = (): Promise<void> => reader.read().then(({ done, value }) => {
                    if (done) { res.end(); return; }
                    res.write(Buffer.from(value));
                    return pump();
                  });
                  await pump();
                } else res.end();
              } catch (e) {
                console.error('Chat API error:', e);
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'Internal server error', fallbackMessage: "I'm having trouble connecting right now. Please call us at (703) 332-5956 or email don@mercyspeaksdigital.com and we'll help you right away! 📞" }));
              }
              return;
            }

            if (isBookDemo || isContact) {
              try {
                const body = JSON.parse(bodyStr);
                if (!body.name || !body.email || !body.phone || !body.businessType) {
                  res.statusCode = 400;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ message: 'Name, email, phone, and business type are required.' }));
                  return;
                }
                if (isBookDemo) {
                  try {
                    const { POST } = await import('./src/app/api/book-demo/route');
                    const fakeReq = new Request(`http://localhost${req.url}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: bodyStr });
                    const response = await POST(fakeReq);
                    res.statusCode = response.status;
                    const data = await response.json();
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify(data));
                  } catch (e) {
                    console.error('Book-demo API error:', e);
                    res.statusCode = 500;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ error: 'Internal server error', message: e instanceof Error ? e.message : 'Submission failed. Please try again.' }));
                  }
                } else {
                  const { POST } = await import('./src/app/api/contact/route');
                  const fakeReq = new Request(`http://localhost${req.url}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: bodyStr });
                  const response = await POST(fakeReq);
                  res.statusCode = response.status;
                  const data = await response.json();
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify(data));
                }
              } catch {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ message: 'Invalid request body.' }));
              }
            }
          });
        });
      },
    },
    {
      name: 'api-dashboard-auth',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.method !== 'POST' || !req.url?.startsWith('/api/dashboard/')) {
            next();
            return;
          }
          const isLogin =
            req.url === '/api/dashboard/login' || req.url.startsWith('/api/dashboard/login?');
          const isVerify =
            req.url === '/api/dashboard/verify' || req.url.startsWith('/api/dashboard/verify?');
          if (!isLogin && !isVerify) {
            next();
            return;
          }
          const chunks: Buffer[] = [];
          req.on('data', (chunk: Buffer) => chunks.push(chunk));
          req.on('end', async () => {
            const bodyStr = Buffer.concat(chunks).toString() || '{}';
            try {
              const fakeRequest = new Request(`http://localhost${req.url}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: bodyStr,
              });
              const { POST } = isLogin
                ? await import('./src/app/api/dashboard/login/route')
                : await import('./src/app/api/dashboard/verify/route');
              const response = await POST(fakeRequest);
              res.statusCode = response.status;
              response.headers.forEach((v, k) => res.setHeader(k, v));
              const data = await response.json();
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(data));
            } catch (e) {
              console.error('Dashboard auth API error:', e);
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ message: 'Internal server error' }));
            }
          });
        });
      },
    },
    {
      name: 'api-dashboard-leads',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (!req.url?.startsWith('/api/dashboard/leads')) {
            next();
            return;
          }
          const url = new URL(req.url, 'http://localhost');
          const pathname = url.pathname;
          const idMatch = pathname.match(/^\/api\/dashboard\/leads\/([0-9a-fA-F-]{36})$/);
          const isList = pathname === '/api/dashboard/leads';

          const listOk =
            isList && (req.method === 'GET' || req.method === 'POST');
          const detailOk =
            idMatch && (req.method === 'GET' || req.method === 'PATCH');

          if (!listOk && !detailOk) {
            if (isList || idMatch) {
              res.statusCode = 405;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ message: 'Method not allowed' }));
              return;
            }
            next();
            return;
          }

          const forwardHeaders = Object.fromEntries(
            Object.entries(req.headers)
              .filter(([, v]) => v != null)
              .map(([k, v]) => [k.toLowerCase(), Array.isArray(v) ? v.join(', ') : String(v)])
          );

          const run = async () => {
            const bodyStr =
              req.method === 'GET'
                ? ''
                : await new Promise<string>((resolve) => {
                    const chunks: Buffer[] = [];
                    req.on('data', (chunk: Buffer) => chunks.push(chunk));
                    req.on('end', () => resolve(Buffer.concat(chunks).toString() || '{}'));
                  });
            try {
              const fakeRequest = new Request(`http://localhost${req.url}`, {
                method: req.method,
                headers: new Headers(forwardHeaders),
                body: req.method === 'GET' ? undefined : bodyStr,
              });
              const response =
                isList && req.method === 'GET'
                  ? await (await import('./src/app/api/dashboard/leads/route')).GET(fakeRequest)
                  : isList && req.method === 'POST'
                    ? await (await import('./src/app/api/dashboard/leads/route')).POST(fakeRequest)
                    : idMatch && req.method === 'GET'
                      ? await (await import('./src/app/api/dashboard/leads/[id]/route')).GET(fakeRequest)
                      : await (await import('./src/app/api/dashboard/leads/[id]/route')).PATCH(fakeRequest);
              res.statusCode = response.status;
              response.headers.forEach((v, k) => res.setHeader(k, v));
              const buf = Buffer.from(await response.arrayBuffer());
              res.end(buf);
            } catch (e) {
              console.error('Dashboard leads API error:', e);
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ message: 'Internal server error' }));
            }
          };

          void run();
        });
      },
    },
    {
      name: 'api-dashboard-conversations',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (!req.url?.startsWith('/api/dashboard/conversations')) {
            next();
            return;
          }
          const url = new URL(req.url, 'http://localhost');
          const pathname = url.pathname;
          const idMatch = pathname.match(/^\/api\/dashboard\/conversations\/([0-9a-fA-F-]{36})$/);
          const isList = pathname === '/api/dashboard/conversations';

          const listOk = isList && req.method === 'GET';
          const detailOk = idMatch && (req.method === 'GET' || req.method === 'PATCH');

          if (!listOk && !detailOk) {
            if (isList || idMatch) {
              res.statusCode = 405;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ message: 'Method not allowed' }));
              return;
            }
            next();
            return;
          }

          const forwardHeaders = Object.fromEntries(
            Object.entries(req.headers)
              .filter(([, v]) => v != null)
              .map(([k, v]) => [k.toLowerCase(), Array.isArray(v) ? v.join(', ') : String(v)])
          );

          const run = async () => {
            const bodyStr =
              req.method === 'GET'
                ? ''
                : await new Promise<string>((resolve) => {
                    const chunks: Buffer[] = [];
                    req.on('data', (chunk: Buffer) => chunks.push(chunk));
                    req.on('end', () => resolve(Buffer.concat(chunks).toString() || '{}'));
                  });
            try {
              const fakeRequest = new Request(`http://localhost${req.url}`, {
                method: req.method,
                headers: new Headers(forwardHeaders),
                body: req.method === 'GET' ? undefined : bodyStr,
              });
              const response =
                isList && req.method === 'GET'
                  ? await (await import('./src/app/api/dashboard/conversations/route')).GET(fakeRequest)
                  : idMatch && req.method === 'GET'
                    ? await (await import('./src/app/api/dashboard/conversations/[id]/route')).GET(fakeRequest)
                    : await (await import('./src/app/api/dashboard/conversations/[id]/route')).PATCH(fakeRequest);
              res.statusCode = response.status;
              response.headers.forEach((v, k) => res.setHeader(k, v));
              const buf = Buffer.from(await response.arrayBuffer());
              res.end(buf);
            } catch (e) {
              console.error('Dashboard conversations API error:', e);
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ message: 'Internal server error' }));
            }
          };

          void run();
        });
      },
    },
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});
