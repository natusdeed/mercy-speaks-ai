import { IndustryLandingPage } from "@/components/industry/industry-landing-page";
import { INDUSTRY_LANDING_CONFIG } from "@/content/industry-landings";

export default function PlumbingPage() {
  return <IndustryLandingPage config={INDUSTRY_LANDING_CONFIG.plumbing} />;
}
