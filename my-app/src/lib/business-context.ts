/**
 * Single source of truth for Mercy Speaks Digital — used by the chatbot
 * so the assistant never invents facts. If something is not here, the assistant
 * should suggest booking a demo.
 */
const BOOKING_URL = process.env.BOOKING_URL ?? "/book-demo";

export const BUSINESS_CONTEXT = {
  companyName: "Mercy Speaks Digital",
  tagline: "AI automation and digital marketing company",
  contact: {
    phone: "(703) 332-5956",
    email: "don@mercyspeaksdigital.com",
    bookingLink: BOOKING_URL,
    contactLink: "/contact",
  },
  services: [
    "AI phone receptionist — answers calls 24/7, takes messages, schedules callbacks",
    "Website chatbots — answer questions and capture leads on your site",
    "Appointment automation — accept bookings 24/7 via website, phone, or chatbot",
    "Workflow automation — streamline follow-up, CRM, and internal processes",
    "SEO and digital strategy",
  ],
  pricing: {
    note: "Pricing is customized based on business size and needs. We do not publish fixed tiers publicly.",
    guidance: "Suggest booking a demo or calling (703) 332-5956 for a tailored quote.",
  },
  setupTimeline: "Typically 1–2 weeks from kickoff to go-live for most solutions; complex integrations may take longer. We'll provide a timeline during the demo.",
  coverage: "We serve businesses nationwide (US).",
  instructionsForAssistant: [
    "Only use facts from this config. Do not invent pricing, timelines, or service details.",
    "If asked something not covered here (e.g. specific pricing, guarantees), say you don't have that detail and suggest booking a demo or calling the team.",
    "Keep responses concise (2–3 sentences when possible).",
    "For pricing or demo requests, after a brief answer, invite the user to share their business name and email/phone so the team can follow up, or suggest they use the booking link in this context block instead of guessing a URL.",
  ],
} as const;

/** Build a string block for the system prompt. */
export function getBusinessContextBlock(): string {
  const s = BUSINESS_CONTEXT;
  return `
Company: ${s.companyName} — ${s.tagline}
Contact: ${s.contact.phone}, ${s.contact.email}
Book a demo: ${s.contact.bookingLink}
Contact form: ${s.contact.contactLink}

Services (only mention these):
${s.services.map((svc) => `- ${svc}`).join("\n")}

Pricing: ${s.pricing.note} ${s.pricing.guidance}
Setup timeline: ${s.setupTimeline}
Coverage: ${s.coverage}

Rules for you: ${s.instructionsForAssistant.join(" ")}
`.trim();
}
