import { Phone } from "lucide-react";
import { ServiceMarketingPage } from "@/components/templates/service-marketing-page";
import { AI_RECEPTIONIST_SERVICE_FAQS } from "@/content/service-page-faqs";
import { NAV_PATHS } from "@/lib/site-config";

export default function ServiceAIPhoneReceptionist() {
  return (
    <ServiceMarketingPage
      path={NAV_PATHS.aiReceptionist}
      seoTitle="AI phone receptionist"
      seoDescription="24/7 AI phone receptionist for qualification, booking, and follow-up. Reduce missed calls and keep leads moving—Mercy Speaks Digital."
      icon={Phone}
      h1="AI phone receptionist"
      intro="Answer more calls, capture cleaner leads, and book appointments—even when your team is busy or the business is closed."
      atAGlance="Mercy Speaks Digital designs and installs an AI-powered phone receptionist that follows scripts you approve: greet callers, answer common questions, qualify intent, and route or book against your calendar. It complements—not replaces—your team for high-touch moments, while making sure routine calls still convert."
      serviceType="AI receptionist"
      sections={[
        {
          title: "What it is",
          body: "An AI receptionist is software that answers inbound phone calls with natural language, collects details you need, and takes the next step you define—such as booking, sending a text recap, or notifying a human. It is configured for your industry, hours, and escalation rules.",
        },
        {
          title: "Who it helps",
          body: "Service businesses, professional practices, and any team that loses revenue when calls roll to voicemail—especially after hours, during peak blocks, or when the front desk is slammed.",
        },
        {
          title: "Outcomes we design for",
          body: "Fewer abandoned calls, faster response to new inquiries, cleaner handoffs to your staff, and calendar slots filled without phone tag. Reporting focuses on call volume, outcomes, and where leads stall so you can adjust scripts and routing.",
        },
        {
          title: "How we work with you",
          body: "We start with a strategy call to map your call types, compliance needs, and calendar tools. Then we implement routing, handoff paths, and notifications; you review before traffic is pointed live. Ongoing tweaks happen as you hear real caller behavior.",
        },
      ]}
      related={[
        { to: NAV_PATHS.websiteDesign, label: "Conversion websites" },
        { to: NAV_PATHS.websiteChatbot, label: "Website chat" },
        { to: NAV_PATHS.workflowAutomation, label: "Workflow automation" },
        { to: NAV_PATHS.socialMediaManagement, label: "Social Media Management" },
        { to: NAV_PATHS.reviewGeneration, label: "Reputation Management" },
        { to: NAV_PATHS.services, label: "All services" },
      ]}
      faqs={AI_RECEPTIONIST_SERVICE_FAQS}
    />
  );
}
