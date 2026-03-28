import { Router } from 'express';
import { bookingIntentBodySchema } from '../schemas/bookingIntent.js';
import { handoffRequestBodySchema } from '../schemas/handoffRequest.js';
import { messageCaptureBodySchema } from '../schemas/messageCapture.js';
import {
  toLogSafeBookingIntent,
  toLogSafeHandoffRequest,
  toLogSafeMessageCapture,
} from '../utils/safePayloadLog.js';

export const aiRouter = Router();

/**
 * POST /api/ai/message-capture
 * ElevenLabs tool webhook — lead / callback capture.
 */
aiRouter.post('/message-capture', (req, res) => {
  const parsed = messageCaptureBodySchema.safeParse(req.body);

  if (!parsed.success) {
    const flat = parsed.error.flatten();
    res.status(400).json({
      error: 'Validation failed',
      message: 'Missing or invalid required fields.',
      details: flat.fieldErrors,
    });
    return;
  }

  const safe = toLogSafeMessageCapture(parsed.data);
  console.info('[mercy-ai] message-capture', JSON.stringify(safe));

  res.json({
    success: true,
    message: 'Message captured successfully',
  });
});

/**
 * POST /api/ai/booking-intent
 * ElevenLabs tool webhook — booking / demo intent capture.
 */
aiRouter.post('/booking-intent', (req, res) => {
  const parsed = bookingIntentBodySchema.safeParse(req.body);

  if (!parsed.success) {
    const details = parsed.error.issues.map((issue) => ({
      path: issue.path.length ? issue.path.join('.') : 'body',
      message: issue.message,
    }));
    res.status(400).json({
      error: 'validation_error',
      message: 'Invalid booking intent payload',
      details,
    });
    return;
  }

  const safe = toLogSafeBookingIntent(parsed.data);
  console.info('[mercy-ai] booking-intent', JSON.stringify(safe));

  res.json({
    success: true,
    message: 'Booking intent captured successfully',
  });
});

/**
 * POST /api/ai/handoff-request
 * Mercy AI Agent — human handoff / escalation capture.
 */
aiRouter.post('/handoff-request', (req, res) => {
  const parsed = handoffRequestBodySchema.safeParse(req.body);

  if (!parsed.success) {
    const details = parsed.error.issues.map((issue) => ({
      path: issue.path.length ? issue.path.join('.') : 'body',
      message: issue.message,
    }));
    res.status(400).json({
      error: 'validation_error',
      message: 'Invalid handoff request payload',
      details,
    });
    return;
  }

  const safe = toLogSafeHandoffRequest(parsed.data);
  console.info('[mercy-ai] handoff-request', JSON.stringify(safe));

  res.json({
    success: true,
    message: 'Handoff request captured successfully',
  });
});
