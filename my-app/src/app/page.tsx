import { PageShell } from "@/components/ui/page-shell";
import { Hero } from "@/components/sections/hero";
import { ServicesOverview } from "@/components/sections/services-overview";
import { ProblemRow } from "@/components/sections/problem-row";
import { WhatWeInstall } from "@/components/sections/what-we-install";
import { HowItWorks } from "@/components/sections/how-it-works";
import { WebsiteServicesHome } from "@/components/sections/website-services-home";
import { Results } from "@/components/sections/results";
import { LiveDemoHome } from "@/components/sections/live-demo-home";
import { PricingPreview } from "@/components/sections/pricing-preview";
import { FAQ } from "@/components/sections/faq";
import { FinalCTA } from "@/components/sections/final-cta";
import { PortfolioGallery, type PortfolioItem } from "@/components/sections/portfolio-gallery";
import { Testimonials } from "@/components/sections/testimonials";

export default function Home() {
  const portfolioItems: PortfolioItem[] = [
    {
      id: "primeglobal",
      title: "PRIME Global Logistics",
      url: "https://primeglobal-logistics-dzls.vercel.app/",
      category: "Websites",
      industryTag: "Logistics / Solar Supply",
      description:
        "Premium marketing site with product categories, gallery, FAQs, and a quote flow.",
      outcome: "Professional business website launch for stronger online presence and easier quote requests.",
      stack: ["Next.js", "Tailwind", "Vercel"],
      thumbnail: "/portfolio/primeglobal-logistics.png",
      liveUrl: "https://primeglobal-logistics-dzls.vercel.app/",
      ctaLabel: "View Live Site",
      featured: true,
    },
    {
      id: "davita-auto-logistics",
      title: "Davita Auto Logistics",
      url: "https://davita-auto-logistics.vercel.app/",
      category: "Websites",
      industryTag: "Logistics / Solar Supply",
      description:
        "Clean-energy logistics brand: Tier-1 solar supply, luxury auto transport, Texas-based coordination, and global shipping stories.",
      outcome:
        "High-trust marketing site with product tiers, gallery, shipping lanes, and quote capture for export-heavy buyers.",
      stack: ["Next.js", "Tailwind", "Vercel"],
      thumbnail: "/portfolio/davita-auto-logistics.png",
      liveUrl: "https://davita-auto-logistics.vercel.app/",
      ctaLabel: "View Live Site",
      featured: true,
    },
    {
      id: "mercy-speaks-digital",
      title: "Mercy Speaks Digital",
      url: "https://www.mercyspeaksdigital.com",
      category: "Websites",
      industryTag: "AI Automation Agency",
      description:
        "Agency website with clear service positioning, premium layout, and conversion-focused inquiry flow.",
      outcome: "Premium redesign for stronger online presence and clearer service presentation.",
      stack: ["Next.js", "Tailwind"],
      thumbnail: "/portfolio/mercyspeaks-ai-home.png",
      liveUrl: "https://www.mercyspeaksdigital.com",
      ctaLabel: "View Site",
    },
    {
      id: "widget-portal",
      title: "Chat Widget Install Experience",
      url: "/widget/install",
      // This is a product/demo experience (not a client marketing website).
      // Keeping it visible, but positioning it under Automation so the Website filter stays focused on core site builds.
      category: "Automation",
      industryTag: "Product UI / Embed Flow",
      description:
        "Self-serve install flow for embedding a branded website chat widget—clear steps, copy-paste snippet, and preview.",
      outcome: "Simplifies setup and reduces friction for getting the widget live on a business website.",
      stack: ["Next.js", "TypeScript"],
      thumbnail: "/portfolio/widget-install.png",
      ctaLabel: "View Install Flow",
    },
  ];

  return (
    <PageShell className="min-h-screen bg-slate-950 w-full">
      <main className="w-full">
        {/* 1) Minimal Hero */}
        <Hero />

        {/* 1.5) Services overview (Websites + AI + Automation + E-commerce) */}
        <ServicesOverview />

        {/* 2) Problem row (4 bullets): After-hours, Busy staff, No follow-up, Lost bookings */}
        <ProblemRow />

        {/* 3) What we install (3 cards): AI Receptionist, Missed-Call Text Back, Missed Revenue Dashboard */}
        <WhatWeInstall />

        {/* 4) How it works (3 steps) */}
        <HowItWorks />

        {/* 4.5) Website services (new builds, redesigns, landing pages) */}
        <WebsiteServicesHome />

        {/* 5) Results (3 case studies max) */}
        <Results />

        {/* 5.5) Featured work — lead with Websites */}
        <PortfolioGallery
          items={portfolioItems}
          defaultFilter="Websites"
          sectionId="portfolio"
          eyebrow="Featured Work"
          title="Explore our website projects"
          description="A preview of premium websites we’ve built for businesses—designed for trust, speed, and conversion."
          layout="row"
        />

        {/* 5.75) Website testimonials (placeholder-safe; no fabricated feedback) */}
        <Testimonials />

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
