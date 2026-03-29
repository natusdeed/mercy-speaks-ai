import { Star } from "lucide-react";
import { ServiceMarketingPage } from "@/components/templates/service-marketing-page";
import { NAV_PATHS } from "@/lib/site-config";

export default function ServiceReviewGeneration() {
  return (
    <ServiceMarketingPage
      path={NAV_PATHS.reviewGeneration}
      seoTitle="Reviews & follow-up automation"
      seoDescription="Request reviews and run respectful follow-up after the job—without chasing manually. Mercy Speaks Digital."
      icon={Star}
      h1="Reviews & follow-up automations"
      intro="Turn completed work into proof people can see—and keep relationships warm between visits or purchases."
      atAGlance="We configure timing, messaging, and channels so customers receive clear, polite requests after a defined success moment. The system tracks who responded, routes happy customers toward public review surfaces, and flags issues for your team before they escalate quietly."
      serviceType="Reputation management"
      sections={[
        {
          title: "What it is",
          body: "Structured follow-up: after service completion or delivery, an automation sends the right message via SMS or email, captures feedback, and optionally links to your preferred review platform—always aligned with the platform’s guidelines.",
        },
        {
          title: "Who it helps",
          body: "Local and regional businesses that live on trust signals: trades, medical-adjacent services, professional firms, and anyone rebuilding credibility after a dated online presence.",
        },
        {
          title: "Principles",
          body: "No spam cadences, no fabricated testimonials, no incentive schemes that violate platform rules. We help you ask honestly and make it easy for satisfied customers to say yes.",
        },
        {
          title: "Connection to automation",
          body: "Often paired with workflow automation so CRM updates, tagging, and future nurture sequences stay accurate as reviews arrive.",
        },
      ]}
      related={[
        { to: NAV_PATHS.workflowAutomation, label: "Workflow automation" },
        { to: NAV_PATHS.websiteDesign, label: "Website design" },
      ]}
    />
  );
}
