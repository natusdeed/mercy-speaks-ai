import { Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { ServiceMarketingPage } from "@/components/templates/service-marketing-page";
import { LiveDemo } from "@/components/sections/live-demo";
import { AI_RECEPTIONIST_SERVICE_FAQS } from "@/content/service-page-faqs";
import { NAV_PATHS } from "@/lib/site-config";

const COMPLIANCE_BODY =
  "Call recording: When calls are recorded or monitored, we configure clear disclosure language in the greeting so callers know what is happening.\n\nOutbound practices: Any light outbound we scope (reminders, follow-ups) is designed with TCPA-aware consent, quiet hours, and opt-out handling in mind.\n\nRegulated industries: Healthcare, legal, and similar verticals get scoped guardrails and human-escalation rules—not a generic script dump.\n\nThis describes how Mercy Speaks Digital implements telephony systems for clients. It is not legal advice.";

export default function ServiceAIPhoneReceptionist() {
  return (
    <ServiceMarketingPage
      path={NAV_PATHS.aiReceptionist}
      seoTitle="24/7 AI Phone Receptionist | Mercy Speaks Digital"
      seoDescription="Never miss a call. Our AI receptionist answers 24/7, qualifies leads, and books appointments. Live in 48–72 hours. Plans from $197/mo."
      icon={Phone}
      h1="AI phone receptionist"
      intro="Our flagship inbound product for small businesses: answer every call, qualify the lead, and book the appointment—even when your team is busy or the business is closed."
      introNote={
        <>
          Need multi-step qualification trees, dispatch triage, or custom outbound workflows? See our{" "}
          <Link to={NAV_PATHS.voiceAgents}>
            custom voice agents for advanced call workflows
          </Link>
          .
        </>
      }
      atAGlance="Mercy Speaks Digital designs and installs an AI-powered phone receptionist that follows scripts you approve: greet callers, answer common questions, qualify intent, and route or book against your calendar. Most teams are live in 48–72 hours. It complements—not replaces—your team for high-touch moments, while making sure routine calls still convert."
      serviceType="AI receptionist"
      sections={[
        {
          title: "What it is",
          body: "An AI receptionist answers inbound phone calls with natural language, collects the details you need, and takes the next step you define—booking, sending a text recap, or notifying a human. It is configured for your industry, hours, and escalation rules. This is the right starting point when the job is simple: never miss an inbound call and get it on the calendar.",
        },
        {
          title: "Who it's for",
          body: "Built for small businesses that live and die by the phone—especially HVAC, plumbing, dental, legal, auto shops, churches, and med spas. If calls rolling to voicemail mean lost jobs, empty chairs, or missed opportunities, this is the product.",
        },
        {
          title: "Integrations",
          body: "We connect to the tools you already use: keep your existing business number, sync with Google Calendar or Outlook, book through cal.com when that is your scheduler, and push lead details into your CRM. You review routing and handoffs before traffic goes live.",
        },
        {
          title: "Live in 48–72 hours",
          body: "After a strategy call to map call types, scripts, and calendars, most clients are live within 48–72 hours of onboarding. We implement routing, notifications, and escalation paths; you approve before we point calls at the agent.",
        },
        {
          title: "Outcomes we design for",
          body: "Fewer abandoned calls, faster response to new inquiries, cleaner handoffs to your staff, and calendar slots filled without phone tag. Reporting focuses on call volume, outcomes, and where leads stall so you can adjust scripts and routing.",
        },
      ]}
      comparison={{
        title: "AI receptionist vs voicemail vs human answering",
        columns: ["Voicemail", "Human answering service", "AI phone receptionist"],
        rows: [
          {
            feature: "Answers every inbound call",
            values: [
              "No — caller leaves a message (if they bother)",
              "Yes, when an agent is available",
              "Yes — 24/7, no hold music queue",
            ],
          },
          {
            feature: "Books into your calendar",
            values: [
              "No",
              "Sometimes, with extra cost and training",
              "Yes — Google, Outlook, or cal.com",
            ],
          },
          {
            feature: "Knows your business",
            values: [
              "N/A",
              "Generic scripts; turnover resets knowledge",
              "Trained on your FAQs, hours, and offer",
            ],
          },
          {
            feature: "Cost profile",
            values: [
              "“Free,” but you pay in lost leads",
              "High monthly + per-minute fees",
              "Plans from $197/mo",
            ],
          },
          {
            feature: "Consistency",
            values: [
              "None",
              "Varies by agent and shift",
              "Same approved script every call",
            ],
          },
        ],
      }}
      compliance={{
        title: "Compliance & trust",
        body: COMPLIANCE_BODY,
      }}
      related={[
        {
          to: NAV_PATHS.voiceAgents,
          label: "Custom voice agents for advanced call workflows",
        },
        { to: NAV_PATHS.websiteDesign, label: "Conversion websites" },
        { to: NAV_PATHS.websiteChatbot, label: "Website chat" },
        { to: NAV_PATHS.workflowAutomation, label: "Workflow automation" },
        { to: NAV_PATHS.socialMediaManagement, label: "Social Media Management" },
        { to: NAV_PATHS.reviewGeneration, label: "Reputation Management" },
        { to: NAV_PATHS.services, label: "All services" },
      ]}
      faqs={AI_RECEPTIONIST_SERVICE_FAQS}
      afterHero={<LiveDemo location="ai-phone-receptionist" />}
    />
  );
}
