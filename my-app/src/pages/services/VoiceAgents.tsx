import { Bot } from "lucide-react";
import { ServiceMarketingPage } from "@/components/templates/service-marketing-page";
import { NAV_PATHS } from "@/lib/site-config";

export default function ServiceVoiceAgents() {
  return (
    <ServiceMarketingPage
      path={NAV_PATHS.voiceAgents}
      seoTitle="Voice agents & AI calling"
      seoDescription="Voice agents for structured phone workflows—Mercy Speaks Digital designs guardrails, scripts, and handoffs."
      icon={Bot}
      h1="Voice agents"
      intro="Beyond a single receptionist line: specialized voice flows for routing, reminders, and light outbound when it fits your compliance posture."
      atAGlance="Voice agents are purpose-built conversational layers for telephony—think qualification trees, status updates, or scripted assistance that hands off cleanly to humans. We scope what is safe and effective for your industry, then deploy with testing and monitoring."
      serviceType="Voice AI"
      sections={[
        {
          title: "What it is",
          body: "Software that speaks on the phone using AI voices and language models, constrained by prompts, policies, and escalation paths you approve. It is not a replacement for regulated advice; it is an operational assistant with clear boundaries.",
        },
        {
          title: "When it fits",
          body: "High call volume with repetitive questions, after-hours coverage, dispatch triage, or booking flows that need verbal confirmation. We pair this with your AI receptionist strategy when that is simpler—or extend it when you need deeper branching.",
        },
        {
          title: "What we deliver",
          body: "Call flows, voice selection, disclosure scripts where required, logging for coaching, and integrations to your stack. You review recordings and edge cases before scaling traffic.",
        },
      ]}
      related={[
        { to: NAV_PATHS.aiReceptionist, label: "AI phone receptionist" },
        { to: NAV_PATHS.workflowAutomation, label: "Workflow automation" },
      ]}
    />
  );
}
