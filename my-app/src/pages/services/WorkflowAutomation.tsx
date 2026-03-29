import { Workflow } from "lucide-react";
import { ServiceMarketingPage } from "@/components/templates/service-marketing-page";
import { NAV_PATHS } from "@/lib/site-config";

export default function ServiceWorkflowAutomation() {
  return (
    <ServiceMarketingPage
      path={NAV_PATHS.workflowAutomation}
      seoTitle="Business workflow automation"
      seoDescription="Automate follow-ups, handoffs, and repetitive tasks between your website, AI receptionist, CRM, and inbox—Mercy Speaks Digital."
      icon={Workflow}
      h1="Workflow automation"
      intro="Connect the tools you already use so leads progress automatically—less copy-paste, fewer dropped handoffs, faster responses."
      atAGlance="We map how work should move—new lead → qualify → notify → book or nurture—then implement automations that respect your rules. The goal is operational clarity: the right person or system gets the right information at the right time."
      serviceType="Business automation"
      sections={[
        {
          title: "What it is",
          body: "Workflow automation uses triggers and rules (for example: a new form submission, a booked call, or a missed call) to start the next steps you want—SMS, email, CRM updates, internal alerts, or delegated tasks—without relying on memory or manual chasing.",
        },
        {
          title: "Who it helps",
          body: "Teams that feel held together by spreadsheets and group chats: offices with multiple intake channels, service businesses coordinating dispatch, and anyone scaling lead volume without scaling chaos.",
        },
        {
          title: "Typical use cases",
          body: "Instant lead notifications, appointment confirmations and reminders, post-call summaries routed to email or Slack, CRM hygiene, review requests after completed jobs, and nurturing sequences that stay on-brand.",
        },
        {
          title: "How engagement usually flows",
          body: "We document your current path from first touch to booked job, identify failure points, then prototype automations with clear fallbacks when something needs a human. You approve each path before it runs in production.",
        },
      ]}
      related={[
        { to: NAV_PATHS.aiReceptionist, label: "AI receptionist" },
        { to: NAV_PATHS.appointmentAutomation, label: "Appointment automation" },
        { to: NAV_PATHS.services, label: "All services" },
      ]}
    />
  );
}
