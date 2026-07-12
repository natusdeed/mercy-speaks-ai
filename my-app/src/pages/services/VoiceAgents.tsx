import { Bot } from "lucide-react";
import { Link } from "react-router-dom";
import { ServiceMarketingPage } from "@/components/templates/service-marketing-page";
import { VOICE_AGENTS_SERVICE_FAQS } from "@/content/service-page-faqs";
import { NAV_PATHS } from "@/lib/site-config";

const COMPLIANCE_BODY =
  "Call recording: When calls are recorded or monitored, we configure clear disclosure language in the greeting so callers know what is happening.\n\nOutbound practices: Light outbound (reminders, follow-ups) is scoped with TCPA-aware consent, quiet hours, and opt-out handling—never spray-and-pray dialing.\n\nRegulated industries: Healthcare, legal, and similar verticals get scoped guardrails and human-escalation rules for deeper branching workflows.\n\nThis describes how Mercy Speaks Digital implements telephony systems for clients. It is not legal advice.";

export default function ServiceVoiceAgents() {
  return (
    <ServiceMarketingPage
      path={NAV_PATHS.voiceAgents}
      seoTitle="Custom AI Voice Agents | Mercy Speaks Digital"
      seoDescription="Custom voice agents for multi-step qualification, dispatch triage, reminders, and light outbound — with scripts, guardrails, and human handoffs you approve."
      icon={Bot}
      h1="Voice agents"
      intro="Advanced, custom telephony for teams that need more than a front-desk answer-and-book flow—qualification trees, dispatch triage, reminders, and light outbound with compliance framing."
      introNote={
        <>
          If you just need inbound calls answered and booked 24/7, start with our{" "}
          <Link to={NAV_PATHS.aiReceptionist}>AI Phone Receptionist</Link>. Voice
          agents are for teams that need custom call workflows beyond a receptionist.
        </>
      }
      atAGlance="Voice agents are purpose-built conversational layers for telephony—multi-step qualification, status updates, dispatch triage, reminder calls, and scripted assistance that hands off cleanly to humans. We scope what is safe and effective for your industry, then deploy with testing and monitoring."
      serviceType="Voice AI"
      sections={[
        {
          title: "What it is",
          body: "Software that speaks on the phone using AI voices and language models, constrained by prompts, policies, and escalation paths you approve. Unlike a single receptionist line, voice agents support deeper branching: multi-step qualification trees, dispatch triage, reminder calls, and light outbound when it fits your compliance posture. It is not a replacement for regulated advice; it is an operational assistant with clear boundaries.",
        },
        {
          title: "When it fits",
          body: "High call volume with repetitive but branching questions, after-hours coverage that needs more than FAQs, field-service dispatch triage, appointment reminder calls, or outbound follow-ups that require verbal confirmation. If your need is simply “answer and book inbound 24/7,” use the AI Phone Receptionist instead—and graduate here when workflows get custom.",
        },
        {
          title: "What we deliver",
          body: "Call flows with deeper branching, voice selection, disclosure scripts where required, logging for coaching, and integrations to your stack. You review recordings and edge cases before scaling traffic. Outbound is always scoped lightly and with consent/opt-out practices in mind.",
        },
        {
          title: "How we work with you",
          body: "We start with a strategy call to map call types, compliance needs, and systems of record. Then we design the tree, test handoffs, and monitor outcomes. Ongoing tweaks happen as you hear real caller behavior—not a one-time dump of prompts.",
        },
      ]}
      compliance={{
        title: "Compliance & trust",
        body: COMPLIANCE_BODY,
      }}
      related={[
        {
          to: NAV_PATHS.aiReceptionist,
          label: "AI Phone Receptionist for 24/7 inbound answering & booking",
        },
        { to: NAV_PATHS.workflowAutomation, label: "Workflow automation" },
        { to: NAV_PATHS.services, label: "All services" },
      ]}
      faqs={VOICE_AGENTS_SERVICE_FAQS}
    />
  );
}
