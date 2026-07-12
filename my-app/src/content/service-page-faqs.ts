import type { AccordionItemData } from "@/components/ui/Accordion";

/** Task 5 (audit) — AI Receptionist service FAQs */
export const AI_RECEPTIONIST_SERVICE_FAQS: AccordionItemData[] = [
  {
    id: "ai-receptionist-setup-time",
    question: "How quickly can the AI receptionist be set up?",
    answer: "Most clients are live within 48–72 hours of onboarding.",
  },
  {
    id: "ai-receptionist-robotic",
    question: "Will it sound robotic to my customers?",
    answer:
      "No. Our AI voices are indistinguishable from a real receptionist in most cases.",
  },
  {
    id: "ai-receptionist-complex",
    question: "What happens if a caller asks something complex?",
    answer:
      "The AI captures their information and flags it for your team to follow up — no call goes unanswered.",
  },
  {
    id: "ai-receptionist-after-hours",
    question: "Does it work after business hours?",
    answer: "Yes, 24/7 including weekends and holidays.",
  },
];

/** Voice agents — custom telephony FAQs (included in FAQPage JSON-LD). */
export const VOICE_AGENTS_SERVICE_FAQS: AccordionItemData[] = [
  {
    id: "voice-agents-vs-receptionist",
    question: "What's the difference between a voice agent and an AI receptionist?",
    answer:
      "The AI Phone Receptionist is our flagship inbound product: answer calls 24/7, qualify leads, and book appointments—ideal for small businesses that need a reliable front desk on the phone. Voice agents are for advanced/custom telephony: multi-step qualification trees, dispatch triage, reminder calls, light outbound, and deeper branching beyond a standard receptionist flow. If you just need inbound answered and booked, start with the AI Phone Receptionist.",
  },
  {
    id: "voice-agents-outbound",
    question: "Can voice agents make outbound calls?",
    answer:
      "Yes—light outbound such as appointment reminders and consented follow-ups can be in scope when it fits your compliance posture. We design those workflows with TCPA-aware consent, quiet hours, and opt-out handling. This is not spray-and-pray dialing; outbound is always scoped and reviewed before go-live. This describes our implementation practices, not legal advice.",
  },
];

/** Missed-call text-back service FAQs (included in FAQPage JSON-LD). */
export const MISSED_CALL_TEXT_BACK_FAQS: AccordionItemData[] = [
  {
    id: "mctb-how-fast",
    question: "How fast does the text go out after a missed call?",
    answer:
      "Typically within seconds of the missed call. Speed is the point: you reach the caller before they dial the next business on Google.",
  },
  {
    id: "mctb-existing-customers",
    question: "Will it text existing customers?",
    answer:
      "Yes, when someone who already has your number calls and you miss it, they can still get the same fast text-back—so regulars aren't left wondering if you got the message. You control the first message and handoff rules so the tone stays on-brand for new leads and returning callers.",
  },
  {
    id: "mctb-keep-number",
    question: "Do I have to change my phone number?",
    answer:
      "No. You keep your existing business number. We wire missed-call detection and SMS reply around the line you already advertise.",
  },
  {
    id: "mctb-tcpa-consent",
    question: "Is this TCPA-compliant? Do callers need to consent?",
    answer:
      "We design missed-call text-back with TCPA-aware practices: messages are tied to an inbound call the person initiated, copy includes clear identification and an easy opt-out, and we avoid spray-and-pray marketing blasts. Consent and quiet-hour rules are reviewed during setup for your use case. This describes our implementation practices, not legal advice—regulated industries may need additional review.",
  },
];

/** Task 5 (audit) — Business Automation (workflow) service FAQs */
export const BUSINESS_AUTOMATION_SERVICE_FAQS: AccordionItemData[] = [
  {
    id: "biz-auto-tasks",
    question: "What tasks can you automate for my business?",
    answer:
      "Lead follow-up, appointment reminders, missed-call texts, review requests, and more.",
  },
  {
    id: "biz-auto-tech",
    question: "Do I need to be tech-savvy to use this?",
    answer:
      "Not at all. We handle the entire setup and train your team on what to expect.",
  },
  {
    id: "biz-auto-replace-staff",
    question: "Will automation replace my staff?",
    answer:
      "No. It handles the repetitive tasks so your team can focus on revenue-generating work.",
  },
];
