import { PageShell } from "@/components/ui/page-shell";
import { Hero } from "@/components/sections/hero";
import { ProblemRow } from "@/components/sections/problem-row";
import { WhatWeInstall } from "@/components/sections/what-we-install";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Results } from "@/components/sections/results";
import { LiveDemoHome } from "@/components/sections/live-demo-home";
import { PricingPreview } from "@/components/sections/pricing-preview";
import { FAQ } from "@/components/sections/faq";
import { FinalCTA } from "@/components/sections/final-cta";

export default function Home() {
  return (
    <PageShell className="min-h-screen bg-slate-950 w-full">
      <main className="w-full">
        {/* 1) Minimal Hero */}
        <Hero />

        {/* 2) Problem row (4 bullets): After-hours, Busy staff, No follow-up, Lost bookings */}
        <ProblemRow />

        {/* 3) What we install (3 cards): AI Receptionist, Missed-Call Text Back, Missed Revenue Dashboard */}
        <WhatWeInstall />

        {/* 4) How it works (3 steps) */}
        <HowItWorks />

        {/* 5) Results (3 case studies max) */}
        <Results />

        {/* 6) Live Demo — id="live-demo" (audio + short video placeholder + 3 screenshots placeholder) */}
        <LiveDemoHome />

        {/* 7) Pricing preview (3 tiers summary + link to /pricing) */}
        <PricingPreview />

        {/* 8) FAQ accordion (6–8) */}
        <FAQ />

        {/* 9) Final CTA (Book Demo) */}
        <FinalCTA />
      </main>
    </PageShell>
  );
}
