import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
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
                  const pump = () => reader.read().then(({ done, value }) => {
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
                  const { POST } = await import('./src/app/api/book-demo/route');
                  const fakeReq = new Request(`http://localhost${req.url}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: bodyStr });
                  const response = await POST(fakeReq);
                  res.statusCode = response.status;
                  const data = await response.json();
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify(data));
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
