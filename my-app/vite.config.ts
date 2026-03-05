import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Dev-only: handle POST /api/book-demo and /api/contact so form submissions work without a backend.
    {
      name: 'api-lead-routes',
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          if (req.method !== 'POST' || !req.url?.startsWith('/api/')) {
            next();
            return;
          }
          const isBookDemo = req.url === '/api/book-demo' || req.url.startsWith('/api/book-demo?');
          const isContact = req.url === '/api/contact' || req.url.startsWith('/api/contact?');
          if (!isBookDemo && !isContact) {
            next();
            return;
          }
          const chunks: Buffer[] = [];
          req.on('data', (chunk) => chunks.push(chunk));
          req.on('end', () => {
            try {
              const body = JSON.parse(Buffer.concat(chunks).toString() || '{}');
              if (!body.name || !body.email || !body.phone || !body.businessType) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ message: 'Name, email, phone, and business type are required.' }));
                return;
              }
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true }));
            } catch {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ message: 'Invalid request body.' }));
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
