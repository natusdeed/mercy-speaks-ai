import { Socket } from 'node:net';
import fs from 'node:fs';
import { defineConfig, loadEnv, type UserConfig, type ViteDevServer } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Load .env / .env.local into process.env so API middleware (e.g. chat handler) sees OPENAI_API_KEY.
const mode = process.env.MODE || process.env.NODE_ENV || 'development';
const cwd = process.cwd();
const parentDir = path.resolve(cwd, '..');
Object.assign(process.env, loadEnv(mode, parentDir, ''), loadEnv(mode, cwd, ''));

/**
 * Load app modules via Vite SSR (aliases + TS). Never use bare `import('./src/...')` in this
 * file — Vite's config bundler inlines those and leaves unresolved `@/` package imports.
 */
function ssrLoad(server: ViteDevServer, relFromConfig: string) {
  const abs = path.resolve(__dirname, relFromConfig);
  const id = '/' + path.relative(server.config.root, abs).split(path.sep).join('/');
  return server.ssrLoadModule(id);
}

/**
 * True if something already accepts TCP on this port on loopback (checks both IPv4 and IPv6).
 * A bare `listen(3000)` probe can succeed on IPv4 while another process holds [::1]:3000 — then Vite fails.
 */
function portHasLoopbackListener(port: number): Promise<boolean> {
  const probe = (host: string) =>
    new Promise<boolean>((resolve) => {
      const s = new Socket();
      s.setTimeout(500);
      s.once('connect', () => {
        s.destroy();
        resolve(true);
      });
      s.once('timeout', () => {
        s.destroy();
        resolve(false);
      });
      s.once('error', () => {
        s.destroy();
        resolve(false);
      });
      s.connect(port, host);
    });
  return probe('127.0.0.1').then((v4) => v4 || probe('::1'));
}

/**
 * Prefer 3000; if busy on either stack, pick a fallback — never 3001 (mercy-ai-server /api/ai proxy).
 * Override with VITE_DEV_PORT=n in .env
 */
async function pickDevServerPort(): Promise<number> {
  const raw = process.env.VITE_DEV_PORT;
  if (raw && /^\d+$/.test(raw)) {
    const p = Number(raw);
    if (p > 0 && p < 65536 && p !== 3001) return p;
  }
  const candidates = [3000, 3020, 3030, 5173, 5174, 8080];
  for (const p of candidates) {
    if (p === 3001) continue;
    if (await portHasLoopbackListener(p)) continue;
    return p;
  }
  return 5173;
}

// https://vitejs.dev/config/
export default defineConfig(async (): Promise<UserConfig> => {
  const devPort = await pickDevServerPort();

  return {
  /* Always resolve index.html from this package (avoids "in/index.html" when cwd/CLI root is wrong in monorepo). */
  root: path.resolve(__dirname),
  plugins: [
    {
      name: 'preview-prerender-clean-urls',
      /**
       * Vite preview SPA fallback serves `/pricing` as root index.html.
       * Prerendered pages live at `dist/<path>/index.html` — serve those (and 404.html)
       * before the SPA fallback so local QA matches Vercel static hosting.
       */
      configurePreviewServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.method !== 'GET' && req.method !== 'HEAD') {
            next();
            return;
          }
          const raw = req.url?.split('?')[0] ?? '/';
          // Leave real assets / extensioned files to Vite
          if (raw.includes('.') && !raw.endsWith('.html')) {
            next();
            return;
          }
          const clean = decodeURIComponent(raw.replace(/\/$/, '') || '/');
          // Client-only apps: keep SPA fallback
          if (
            clean === '/dashboard' ||
            clean.startsWith('/dashboard/') ||
            clean === '/admin' ||
            clean.startsWith('/admin/') ||
            clean.startsWith('/demo/')
          ) {
            next();
            return;
          }
          if (clean === '/') {
            next();
            return;
          }

          const distRoot = path.resolve(__dirname, 'dist');
          const pageFile = path.join(distRoot, clean.slice(1), 'index.html');
          if (fs.existsSync(pageFile)) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html; charset=utf-8');
            fs.createReadStream(pageFile).pipe(res);
            return;
          }

          const notFound = path.join(distRoot, '404.html');
          if (fs.existsSync(notFound)) {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/html; charset=utf-8');
            fs.createReadStream(notFound).pipe(res);
            return;
          }
          next();
        });
      },
    },
    {
      name: 'dev-fallback-port-hint',
      configureServer(server) {
        server.httpServer?.once('listening', () => {
          const addr = server.httpServer?.address();
          const port =
            typeof addr === 'object' && addr && 'port' in addr ? (addr as { port: number }).port : undefined;
          if (port != null && port !== 3000) {
            console.info(
              `[vite] Port 3000 is in use — dev app: http://localhost:${port}/ (port 3001 left free for mercy-ai-server).`,
            );
          }
        });
      },
    },
    {
      name: 'warn-pricing-placeholders',
      buildStart() {
        // Scan source (avoid importing @/-aliased modules from Node).
        const pricingPath = path.resolve(__dirname, 'src/content/pricing-tiers.ts');
        const src = fs.readFileSync(pricingPath, 'utf8');
        const rateHits = [...src.matchAll(/overagePerCallUsd:\s*NEEDS_REAL_RATES/g)];
        if (rateHits.length > 0) {
          console.warn(
            `[pricing-tiers] NEEDS_REAL_RATES: ${rateHits.length} overage rate(s) still placeholders. UI shows “Published overage rates coming soon — ask on your call” until you set numbers in PLAN_OVERAGE_ROWS.`,
          );
        }
        const termHits = [...src.matchAll(/:\s*NEEDS_REAL_TERMS/g)];
        if (termHits.length > 0) {
          console.warn(
            `[pricing-tiers] NEEDS_REAL_TERMS: ${termHits.length} billing term(s) still placeholders. UI shows honest “ask on your strategy call” copy until you fill BILLING_TERMS.`,
          );
        }
      },
    },
    react(),
    // Dev-only: POST /api/agents/run (agent OS orchestration — Phase 2)
    {
      name: 'api-agents-run',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.method !== 'POST') {
            next();
            return;
          }
          const pathnameOnly = req.url?.split('?')[0];
          if (pathnameOnly !== '/api/agents/run') {
            next();
            return;
          }
          const chunks: Buffer[] = [];
          req.on('data', (chunk: Buffer) => chunks.push(chunk));
          req.on('end', async () => {
            const bodyStr = Buffer.concat(chunks).toString() || '{}';
            try {
              const forwardHeaders = Object.fromEntries(
                Object.entries(req.headers)
                  .filter(([, v]) => v != null)
                  .map(([k, v]) => [k.toLowerCase(), Array.isArray(v) ? v.join(', ') : String(v)])
              );
              const fakeRequest = new Request(`http://localhost${req.url}`, {
                method: 'POST',
                headers: new Headers(forwardHeaders),
                body: bodyStr,
              });
              // Use Vite's SSR loader — Node's bare import() doesn't apply resolve.alias, so transitive @/ imports fail.
              const routeTs = path.resolve(__dirname, 'src/app/api-handlers/agents/run/route.ts');
              const routeModuleId =
                '/' + path.relative(server.config.root, routeTs).split(path.sep).join('/');
              const { POST } = await server.ssrLoadModule(routeModuleId);
              const response = await POST(fakeRequest);
              res.statusCode = response.status;
              response.headers.forEach((v, k) => res.setHeader(k, v));
              const buf = Buffer.from(await response.arrayBuffer());
              res.end(buf);
            } catch (e) {
              console.error('Agents run API error:', e);
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(
                JSON.stringify({
                  ok: false,
                  error: { code: 'INTERNAL', message: 'Internal server error.' },
                })
              );
            }
          });
        });
      },
    },
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
                const { GET } = await ssrLoad(server, 'src/app/api-handlers/widget/config/route.ts');
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
                  const { handleWidgetChatRequest } = await ssrLoad(
                    server,
                    'src/app/api-handlers/widget/chat-handler.ts',
                  );
                  const response = await handleWidgetChatRequest(fakeRequest);
                  res.statusCode = response.status;
                  response.headers.forEach((v, k) => res.setHeader(k, v));
                  const data = await response.json();
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify(data));
                } else {
                  const { handleWidgetLeadRequest } = await ssrLoad(
                    server,
                    'src/app/api-handlers/widget/lead/route.ts',
                  );
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
                const { handleChatLeadRequest } = await ssrLoad(
                  server,
                  'src/app/api-handlers/chat/lead-route.ts',
                );
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
                const { handleChatRequest } = await ssrLoad(
                  server,
                  'src/app/api-handlers/chat/chat-handler.ts',
                );
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
                    const { POST } = await ssrLoad(server, 'src/app/api-handlers/book-demo/route.ts');
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
                  const { POST } = await ssrLoad(server, 'src/app/api-handlers/contact/route.ts');
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
                ? await ssrLoad(server, 'src/app/api-handlers/dashboard/login/route.ts')
                : await ssrLoad(server, 'src/app/api-handlers/dashboard/verify/route.ts');
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
                  ? await (await ssrLoad(server, 'src/app/api-handlers/dashboard/leads/route.ts')).GET(fakeRequest)
                  : isList && req.method === 'POST'
                    ? await (await ssrLoad(server, 'src/app/api-handlers/dashboard/leads/route.ts')).POST(fakeRequest)
                    : idMatch && req.method === 'GET'
                      ? await (await ssrLoad(server, 'src/app/api-handlers/dashboard/leads/[id]/route.ts')).GET(fakeRequest)
                      : await (await ssrLoad(server, 'src/app/api-handlers/dashboard/leads/[id]/route.ts')).PATCH(fakeRequest);
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
                  ? await (await ssrLoad(server, 'src/app/api-handlers/dashboard/conversations/route.ts')).GET(fakeRequest)
                  : idMatch && req.method === 'GET'
                    ? await (await ssrLoad(server, 'src/app/api-handlers/dashboard/conversations/[id]/route.ts')).GET(fakeRequest)
                    : await (await ssrLoad(server, 'src/app/api-handlers/dashboard/conversations/[id]/route.ts')).PATCH(fakeRequest);
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
    {
      name: "api-dashboard-ops",
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.method !== "GET" || !req.url?.startsWith("/api/dashboard/ops/")) {
            next();
            return;
          }
          const pathname = new URL(req.url, "http://localhost").pathname;
          const routeFile: Record<string, string> = {
            "/api/dashboard/ops/leads": "src/app/api-handlers/dashboard/ops/leads/route.ts",
            "/api/dashboard/ops/agent-runs": "src/app/api-handlers/dashboard/ops/agent-runs/route.ts",
            "/api/dashboard/ops/tool-calls": "src/app/api-handlers/dashboard/ops/tool-calls/route.ts",
            "/api/dashboard/ops/bookings": "src/app/api-handlers/dashboard/ops/bookings/route.ts",
            "/api/dashboard/ops/tasks": "src/app/api-handlers/dashboard/ops/tasks/route.ts",
            "/api/dashboard/ops/approvals": "src/app/api-handlers/dashboard/ops/approvals/route.ts",
            "/api/dashboard/ops/missed-revenue": "src/app/api-handlers/dashboard/ops/missed-revenue/route.ts",
          };
          const rel = routeFile[pathname];
          if (!rel) {
            res.statusCode = 404;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ message: "Not found" }));
            return;
          }

          const forwardHeaders = Object.fromEntries(
            Object.entries(req.headers)
              .filter(([, v]) => v != null)
              .map(([k, v]) => [k.toLowerCase(), Array.isArray(v) ? v.join(", ") : String(v)])
          );

          void (async () => {
            try {
              const abs = path.resolve(__dirname, rel);
              const routeModuleId =
                "/" + path.relative(server.config.root, abs).split(path.sep).join("/");
              const { GET } = await server.ssrLoadModule(routeModuleId);
              const fakeRequest = new Request(`http://localhost${req.url}`, {
                method: "GET",
                headers: new Headers(forwardHeaders),
              });
              const response = await GET(fakeRequest);
              res.statusCode = response.status;
              response.headers.forEach((v, k) => res.setHeader(k, v));
              const buf = Buffer.from(await response.arrayBuffer());
              res.end(buf);
            } catch (e) {
              console.error("Dashboard ops API error:", e);
              res.statusCode = 500;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ message: "Internal server error" }));
            }
          })();
        });
      },
    },
  ],
  resolve: {
    // Regex aliases: string find "@/lib/..." can make Vite's config bundler try to resolve `@/lib` as a package.
    // Helmet compat must win over the general `@/` → src mapping.
    alias: [
      {
        find: /^@\/lib\/react-helmet-compat$/,
        replacement: path.resolve(__dirname, "./src/lib/react-helmet-compat.browser.tsx"),
      },
      {
        find: /^@\//,
        replacement: `${path.resolve(__dirname, "./src")}/`,
      },
    ],
  },
  server: {
    // strictPort: we pre-pick a free port (never auto-use 3001 — that breaks /api/ai proxy to mercy-ai-server).
    port: devPort,
    strictPort: true,
    open: true,
    proxy: {
      '/api/ai': {
        target: 'http://127.0.0.1:3001',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'dist',
    // Sourcemaps spike Rollup memory; Vercel's default Node heap can OOM during chunk rendering.
    sourcemap: process.env.VERCEL !== '1',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return;
          // React core first — avoids one huge "index" chunk and improves long-term cache hits.
          if (/node_modules[/\\](?:react-dom|react|scheduler)[/\\]/.test(id)) {
            return 'vendor-react';
          }
          if (id.includes('framer-motion')) return 'motion';
          if (id.includes('react-router')) return 'router';
          if (id.includes('lucide-react')) return 'icons';
          if (id.includes('@radix-ui')) return 'radix';
        },
      },
    },
  },
};
});
