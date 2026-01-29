import { TrustSignals } from "@/components/trust/trust-signals";
import { BentoGrid } from "@/components/bento/bento-grid";
import { WhatAreDigitalEmployees } from "@/components/sections/what-are-digital-employees";
import { HowWeHelp } from "@/components/sections/how-we-help";
import { WebsiteAsEntry } from "@/components/sections/website-as-entry";
import { Testimonials } from "@/components/sections/testimonials";
import { SocialProof } from "@/components/sections/social-proof";
import { TheProblem } from "@/components/sections/the-problem";
import { TheSolution } from "@/components/sections/the-solution";
import { Proof } from "@/components/sections/proof";
import { FAQ } from "@/components/sections/faq";
import { FinalCTA } from "@/components/sections/final-cta";
import { ProminentCTA } from "@/components/cta/prominent-cta";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 w-full">
      <TrustSignals />
      <main className="w-full">
        {/* Hero: "We Install Digital Employees" */}
        <section className="py-16 md:py-24 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <h2>We Install Digital Employees</h2>
          </div>
        </section>
        
        <BentoGrid />
        
        {/* What are Digital Employees? */}
        <WhatAreDigitalEmployees />
        
        {/* How We Help */}
        <HowWeHelp />
        
        {/* Website service as a starting point */}
        <WebsiteAsEntry />
        
        {/* Social Proof & Testimonials */}
        <Testimonials />
        <SocialProof />
        
        {/* Problem/Solution Flow */}
        <TheProblem />
        <TheSolution />
        
        {/* Proof & ROI */}
        <Proof />
        
        {/* FAQ & Final CTAs */}
        <FAQ />
        <FinalCTA />
        <ProminentCTA />
      </main>
    </div>
  );
}
