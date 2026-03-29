import { MessageSquare } from "lucide-react";
import { ServiceMarketingPage } from "@/components/templates/service-marketing-page";
import { NAV_PATHS } from "@/lib/site-config";

export default function ServiceWebsiteChatbot() {
  return (
    <ServiceMarketingPage
      path={NAV_PATHS.websiteChatbot}
      seoTitle="Website chat & lead capture"
      seoDescription="Website chat that answers, qualifies, and books—capture leads when visitors are ready. Mercy Speaks Digital."
      icon={MessageSquare}
      h1="Website chat that books"
      intro="Give every visitor a fast path to answers and next steps—without making them hunt for a form or phone number."
      atAGlance="We implement on-site chat experiences wired to your services, FAQs, and booking or lead capture endpoints. The assistant stays on-message, escalates when needed, and hands structured data to your team instead of vague 'someone asked a question' alerts."
      serviceType="Website chat"
      sections={[
        {
          title: "What it is",
          body: "A guided chat layer on your website that reflects your real offers, service areas, and policies. It can collect contact details, route by intent, and push meetings to the calendar tools you already use.",
        },
        {
          title: "Who it helps",
          body: "Businesses with complex services, long sales questions, or high mobile traffic where visitors bounce if they cannot get a quick answer at night or on weekends.",
        },
        {
          title: "Pairings",
          body: "This works best alongside a conversion-focused site and, when needed, an AI receptionist so web and phone channels feel consistent. Internal links on this site connect those pieces intentionally.",
        },
        {
          title: "Next step",
          body: "On a strategy call we review your pages, common objections, and handoff rules. You get a scoped plan before build—not a generic widget drop-in.",
        },
      ]}
      related={[
        { to: NAV_PATHS.websiteDesign, label: "Website design" },
        { to: NAV_PATHS.aiReceptionist, label: "AI receptionist" },
        { to: NAV_PATHS.services, label: "All services" },
      ]}
    />
  );
}
