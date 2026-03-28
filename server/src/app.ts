import cors from 'cors';
import express from 'express';
import { aiRouter } from './routes/ai.routes.js';

/**
 * Express app factory — mount feature routers here later:
 * booking, transfer, lead capture, dashboard hooks, etc.
 */
export function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json({ limit: '256kb' }));

  app.get('/health', (_req, res) => {
    res.json({ ok: true, service: 'mercy-ai-server' });
  });

  app.use('/api/ai', aiRouter);

  return app;
}
