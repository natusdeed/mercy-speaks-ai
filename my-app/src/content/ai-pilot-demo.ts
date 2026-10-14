/**
 * Recorded pilot demonstration — UNPUBLISHED.
 * Nothing imports this file or components/ai-pilot/recorded-demo.tsx from a public page or route.
 * To publish: record a test call that follows DEMO_SCRIPT with fictional caller details, get Donatus's written
 * approval, add the audio file under /public/media/, set AI_PILOT_RECORDING below, then render
 * <RecordedPilotDemo /> on /ai-pilot (and optionally the homepage section 4) — and update the transcript to
 * match the actual recording word for word.
 */
export type PilotRecording = { src: string; type: string; durationLabel: string; approvedBy: string; approvedOn: string };

/** null = no approved recording exists; the player must not be rendered. */
export const AI_PILOT_RECORDING: PilotRecording | null = null;

/** Script for the test call. Fictional business and caller; no real names, numbers or addresses. */
export const DEMO_SCRIPT: readonly { speaker: "AI receptionist" | "Caller"; text: string }[] = [
  { speaker: "AI receptionist", text: "Thanks for calling Example Heating & Air. This is the virtual receptionist. How can I help today?" },
  { speaker: "Caller", text: "Hi, my upstairs AC isn't cooling. I'd like someone to come take a look." },
  { speaker: "AI receptionist", text: "I'm sorry to hear that. I can take a service request for the team. May I have your name?" },
  { speaker: "Caller", text: "It's Jordan Sample." },
  { speaker: "AI receptionist", text: "Thanks, Jordan. What's the best callback number?" },
  { speaker: "Caller", text: "555-0142." },
  { speaker: "AI receptionist", text: "Got it, 555-0142. And what's the service address or neighborhood?" },
  { speaker: "Caller", text: "Maple Street, in the Westfield area." },
  { speaker: "AI receptionist", text: "Thank you. Is there a day or time that works best for a visit?" },
  { speaker: "Caller", text: "Tomorrow morning if possible." },
  {
    speaker: "AI receptionist",
    text: "I've noted a request for tomorrow morning. I can't confirm the appointment myself — someone from the team will review your request and call you back to confirm a time.",
  },
  { speaker: "Caller", text: "Okay, thanks." },
  { speaker: "AI receptionist", text: "You're welcome, Jordan. Thanks for calling Example Heating & Air." },
];
