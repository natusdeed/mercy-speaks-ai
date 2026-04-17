"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Globe,
  LayoutTemplate,
  RefreshCw,
  FileText,
  CalendarCheck,
  Shield,
  Zap,
  Search,
  Smartphone,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/ui/page-shell";
import { PortfolioGallery, type PortfolioItem } from "@/components/sections/portfolio-gallery";
import { Link } from "react-router-dom";
import { BookingLink } from "@/components/cta/booking-link";
import { SeoHead } from "@/components/seo/seo-head";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { BRAND_TAGLINE, NAV_PATHS } from "@/lib/site-config";
import { ServicePairCallout } from "@/components/marketing/service-pair-callout";
import {
  breadcrumbSchema,
  organizationSchema,
  serviceSchema,
  webPageSchema,
} from "@/lib/schema";

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45 },
};

const fadeUpInView = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.45 },
};

const whatWeBuild = [
  {
    icon: LayoutTemplate,
    title: "Business Websites",
    description:
      "A premium, trust-building site that explains your services clearly and makes it easy to contact you or book.",
  },
  {
    icon: RefreshCw,
    title: "Website Redesigns",
    description:
      "A modern rebuild that upgrades credibility, clarity, and speed—so your business looks established and wins more inquiries.",
  },
  {
    icon: FileText,
    title: "Landing Pages",
    description:
      "Offer-focused pages built for one job: convert traffic into quote requests, calls, and booked appointments.",
  },
  {
    icon: CalendarCheck,
    title: "Booking & Lead Capture Websites",
    description:
      "Forms, calendars, and follow-up flows that remove friction and turn interest into a next step—fast.",
  },
] as const;

const whyItMatters = [
  {
    title: "Look credible the moment they land",
    description:
      "First impressions happen in seconds. A premium design signals trust, stability, and professionalism.",
  },
  {
    title: "Turn visitors into inquiries (not browsers)",
    description:
      "Clear positioning, strong CTAs, and a conversion-led layout guide people toward booking or contacting you.",
  },
  {
    title: "Make your services easy to understand",
    description:
      "If your offer feels confusing, people leave. We structure pages so buyers quickly “get it.”",
  },
  {
    title: "Win on mobile (where most decisions happen)",
    description:
      "Mobile-first design ensures your site is fast, readable, and effortless to navigate on phones.",
  },
] as const;

const included = [
  "Custom, brand-aligned design (premium dark aesthetic)",
  "Mobile-responsive layout (mobile-first)",
  "Service/offer pages with trust-building structure",
  "Contact or lead-capture form (with clean handoff)",
  "Conversion-focused calls-to-action across key pages",
  "On-page SEO foundations (titles, meta, structure)",
  "Performance-first build for speed and clarity",
  "Optional: booking/calendar integration if needed",
  "Optional: website chat / lead capture integrations",
] as const;

const trustChips = ["Mobile-first", "SEO-ready", "Built for conversion", "Fast + clean UX"] as const;

const portfolioItems: PortfolioItem[] = [
  {
    id: "primeglobal",
    title: "PRIME Global Logistics",
    url: "https://primeglogistics.com/",
    category: "Websites",
    industryTag: "Logistics / Solar Supply",
    description:
      "Premium marketing site with product categories, gallery, FAQs, and a conversion-ready quote flow—built to look established and make the next step obvious.",
    outcome: "Professional business website launch for stronger online presence and easier quote requests.",
    stack: ["Next.js", "Tailwind", "Vercel"],
    thumbnail: "/portfolio/primeglobal-logistics.png",
    liveUrl: "https://primeglogistics.com/",
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
      "Clean-energy logistics brand: Tier-1 solar supply, luxury auto transport, Texas-based coordination, and global shipping stories—messaged for export-heavy buyers.",
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
      "Agency website with clear service positioning, premium layout, and conversion-led inquiry paths—built to communicate AI ROI without noise.",
    outcome: "Premium redesign for stronger online presence and clearer service presentation.",
    stack: ["Next.js", "Tailwind"],
    thumbnail: "/portfolio/mercyspeaks-ai-home.png",
    liveUrl: "https://www.mercyspeaksdigital.com",
    ctaLabel: "View Site",
  },
];

export default function WebsiteDesignPage() {
  const seoDescription =
    "Premium website design, redesigns, and landing pages built for trust and conversion—mobile-first, fast, and SEO-aware. Mercy Speaks Digital.";

  return (
    <PageShell className="min-h-screen bg-slate-950">
      <SeoHead
        path={NAV_PATHS.websiteDesign}
        title="Website design & development"
        description={seoDescription}
      />
      <JsonLd
        data={[
          organizationSchema(),
          webPageSchema({
            name: "Website design & development",
            description: seoDescription,
            path: NAV_PATHS.websiteDesign,
          }),
          serviceSchema({
            name: "Website design & development",
            description: seoDescription,
            path: NAV_PATHS.websiteDesign,
            serviceType: "Web design",
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: NAV_PATHS.services },
            { name: "Website design", path: NAV_PATHS.websiteDesign },
          ]),
        ]}
      />
      <main>
        {/* Hero */}
        <section className="section section-hero" aria-labelledby="website-design-title">
          <div className="section-inner max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              <motion.div {...fadeUp} className="lg:col-span-7">
                <Breadcrumbs
                  className="mb-5 text-left"
                  items={[
                    { name: "Services", path: NAV_PATHS.services },
                    { name: "Website design" },
                  ]}
                />
                <p className="text-sm text-slate-400 leading-relaxed max-w-2xl mb-5 border-l-2 border-neon-cyan/40 pl-4">
                  {BRAND_TAGLINE}
                </p>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-electric-purple/15 border border-electric-purple/20 mb-5">
                  <Globe className="w-4 h-4 text-electric-purple" />
                  <span className="text-xs sm:text-sm text-electric-purple font-semibold tracking-wide">
                    Website Development
                  </span>
                </div>

                <h1
                  id="website-design-title"
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-50 tracking-tight mb-5 title-3d"
                >
                  Conversion‑Focused Websites That Help You{" "}
                  <span className="text-neon-cyan">Win More Clients</span>
                </h1>

                <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mb-7">
                  We design premium, mobile-first websites that make your business look credible, explain your
                  services clearly, and convert visitors into inquiries and booked customers.
                </p>

                <ServicePairCallout>
                  Pair it with an{" "}
                  <Link
                    to={NAV_PATHS.aiReceptionist}
                    className="font-medium text-sky-200 underline-offset-2 hover:underline"
                  >
                    AI Receptionist
                  </Link>{" "}
                  to turn your site visitors into booked customers.
                </ServicePairCallout>

                <div className="mt-7 flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center">
                  <Button variant="primary" size="lg" asChild className="rounded-xl">
                    <BookingLink className="flex items-center justify-center gap-2">
                      Book a Website Strategy Call
                      <ArrowRight className="w-5 h-5" />
                    </BookingLink>
                  </Button>
                  <Button variant="outline" size="lg" asChild className="rounded-xl">
                    <a href="#website-work" className="flex items-center justify-center gap-2">
                      View Website Work
                      <ArrowRight className="w-5 h-5" />
                    </a>
                  </Button>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {trustChips.map((chip) => (
                    <span
                      key={chip}
                      className="px-3 py-1.5 rounded-xl bg-slate-900/30 border border-slate-800/60 text-xs text-slate-300"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Right-side premium panel */}
              <motion.aside {...fadeUp} className="lg:col-span-5">
                <div className="card-premium rounded-2xl relative overflow-hidden">
                  <div className="absolute -top-24 -right-24 h-56 w-56 bg-electric-purple/10 blur-3xl rounded-full" />
                  <div className="absolute -bottom-24 -left-24 h-56 w-56 bg-neon-cyan/10 blur-3xl rounded-full" />

                  <div className="relative">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">
                      Built for trust + conversion
                    </p>
                    <h2 className="text-lg sm:text-xl font-bold text-slate-50 mb-3">
                      A website should do more than “look nice.”
                    </h2>
                    <p className="text-sm sm:text-base text-slate-400 leading-relaxed mb-6">
                      We build pages with clear messaging, clean hierarchy, and conversion paths—so visitors know
                      what you do, why you’re the right choice, and exactly how to take the next step.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        { icon: Smartphone, label: "Mobile-first UX" },
                        { icon: Search, label: "SEO foundations" },
                        { icon: Zap, label: "Performance-led build" },
                        { icon: Shield, label: "Trust-first structure" },
                      ].map(({ icon: Icon, label }) => (
                        <div
                          key={label}
                          className="rounded-2xl bg-slate-900/20 border border-slate-800/60 p-4 flex items-center gap-3"
                        >
                          <span className="p-2 rounded-xl bg-neon-cyan/10">
                            <Icon className="w-4 h-4 text-neon-cyan" />
                          </span>
                          <span className="text-sm text-slate-200">{label}</span>
                        </div>
                      ))}
                    </div>

                    <p className="mt-5 text-xs text-slate-500">
                      Clean build • Premium design • No clutter • Designed to convert
                    </p>
                  </div>
                </div>
              </motion.aside>
            </div>
          </div>
        </section>

        {/* Live website gallery — directly under hero for immediate proof */}
        <PortfolioGallery
          items={portfolioItems}
          defaultFilter="Websites"
          sectionId="website-work"
          eyebrow="Explore our website projects"
          title="Real launches. Premium builds. Built to convert."
          description="Three live client-grade sites in production today—each paired with sharp visuals, credible storytelling, and a clear path to quotes, calls, and bookings. Tap a preview or button to open the live URL."
          layout="grid"
          variant="showcase"
          showFilters={false}
          gridColumns={3}
        />

        {/* What we build */}
        <section className="section pt-0" aria-labelledby="what-we-build-title">
          <div className="section-inner max-w-6xl mx-auto">
            <motion.div {...fadeUpInView} className="mb-7">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">
                What we build
              </p>
              <h2 id="what-we-build-title" className="text-2xl md:text-3xl font-bold text-slate-50 mb-3">
                Premium websites built for real business outcomes
              </h2>
              <p className="text-slate-400 text-base md:text-lg max-w-3xl">
                Whether you need a new site, a redesign, or a focused landing page—everything is structured to
                build trust, capture leads, and guide visitors toward booking.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {whatWeBuild.map(({ icon: Icon, title, description }) => (
                <motion.div key={title} {...fadeUpInView} className="card-premium rounded-2xl">
                  <div className="p-2.5 rounded-xl w-fit bg-electric-purple/10 mb-4">
                    <Icon className="w-5 h-5 text-electric-purple" />
                  </div>
                  <h3 className="text-base font-semibold text-slate-50 mb-2">{title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why it matters */}
        <section className="section pt-0" aria-labelledby="why-it-matters-title">
          <div className="section-inner max-w-6xl mx-auto">
            <motion.div {...fadeUpInView} className="card-premium rounded-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
                <div className="lg:col-span-5">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">
                    Why it matters
                  </p>
                  <h2 id="why-it-matters-title" className="text-2xl md:text-3xl font-bold text-slate-50 mb-3">
                    Your website is your credibility engine.
                  </h2>
                  <p className="text-slate-400 text-base md:text-lg leading-relaxed">
                    In most industries, people decide whether to trust you before they ever call. A premium,
                    conversion-led site helps you win the decision—then makes the next step effortless.
                  </p>
                </div>

                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {whyItMatters.map((b) => (
                    <div
                      key={b.title}
                      className="rounded-2xl bg-slate-900/20 border border-slate-800/60 p-5"
                    >
                      <h3 className="text-sm font-semibold text-slate-50 mb-2">{b.title}</h3>
                      <p className="text-sm text-slate-400 leading-relaxed">{b.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* What's included */}
        <section className="section pt-0" aria-labelledby="included-title">
          <div className="section-inner max-w-6xl mx-auto">
            <motion.div {...fadeUpInView} className="card-premium rounded-2xl">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
                <div className="max-w-2xl">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">
                    What’s included
                  </p>
                  <h2 id="included-title" className="text-2xl md:text-3xl font-bold text-slate-50 mb-3">
                    A clear, complete offer—no mystery deliverables.
                  </h2>
                  <p className="text-slate-400 text-base md:text-lg leading-relaxed">
                    You get the foundations that make a website feel premium and perform: structure, copy
                    hierarchy, conversion paths, and a clean build that supports growth.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                  {included.map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-2xl bg-slate-900/20 border border-slate-800/60 p-4">
                      <CheckCircle2 className="w-5 h-5 text-neon-cyan shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-200 leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Website + AI Receptionist */}
        <section className="section pt-0" aria-labelledby="combo-title">
          <div className="section-inner max-w-6xl mx-auto">
            <motion.div {...fadeUpInView} className="card-premium rounded-2xl relative overflow-hidden">
              <div className="absolute -top-28 left-1/2 h-72 w-72 -translate-x-1/2 bg-electric-purple/10 blur-3xl rounded-full" />
              <div className="relative">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">
                  Better together
                </p>
                <h2 id="combo-title" className="text-2xl md:text-3xl font-bold text-slate-50 mb-3">
                  Build the Website. Capture the Lead. Book the Client.
                </h2>
                <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-3xl mb-6">
                  Your website attracts and educates. Your AI receptionist answers questions, qualifies intent,
                  and books appointments—so you don’t lose opportunities after-hours or between follow-ups.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-7">
                  {[
                    {
                      title: "Website",
                      body: "Clear offers, trust-building layout, and conversion paths that guide visitors to the next step.",
                      icon: Globe,
                      accent: "bg-neon-cyan/10 text-neon-cyan",
                    },
                    {
                      title: "AI Receptionist",
                      body: "Answers, qualifies, and routes leads—so every inquiry gets handled fast and professionally.",
                      icon: MessageSquare,
                      accent: "bg-electric-purple/10 text-electric-purple",
                    },
                    {
                      title: "Booking System",
                      body: "Calendar + follow-up that closes the loop and turns intent into booked appointments.",
                      icon: CalendarCheck,
                      accent: "bg-neon-cyan/10 text-neon-cyan",
                    },
                  ].map(({ title, body, icon: Icon, accent }) => (
                    <div key={title} className="rounded-2xl bg-slate-900/20 border border-slate-800/60 p-5">
                      <div className={`p-2.5 rounded-xl w-fit mb-4 ${accent.split(" ")[0]}`}>
                        <Icon className={`w-5 h-5 ${accent.split(" ")[1]}`} />
                      </div>
                      <h3 className="text-base font-semibold text-slate-50 mb-2">{title}</h3>
                      <p className="text-sm text-slate-400 leading-relaxed">{body}</p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button variant="primary" size="default" asChild className="rounded-xl">
                    <BookingLink className="flex items-center justify-center gap-2">
                      Book Demo
                      <ArrowRight className="w-4 h-4" />
                    </BookingLink>
                  </Button>
                  <Button variant="outline" size="default" asChild className="rounded-xl">
                    <Link to="/contact" className="flex items-center justify-center gap-2">
                      Get a Website Quote
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="section pt-0 pb-24 md:pb-32" aria-label="Website development call to action">
          <div className="section-inner max-w-4xl mx-auto">
            <motion.div {...fadeUpInView} className="card-premium rounded-2xl text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-50 mb-3">
                Ready for a website that feels premium—and performs like it?
              </h2>
              <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-7">
                If your current site feels outdated, unclear, or hard to act on, we’ll rebuild it with stronger
                messaging, better structure, and booking-ready conversion paths.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button variant="primary" size="lg" asChild className="rounded-xl">
                  <BookingLink className="flex items-center justify-center gap-2">
                    Book a Website Strategy Call
                    <ArrowRight className="w-5 h-5" />
                  </BookingLink>
                </Button>
                <Button variant="outline" size="lg" asChild className="rounded-xl">
                  <Link to="/contact" className="flex items-center justify-center gap-2">
                    Get a Website Quote
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
              </div>

              <p className="mt-4 text-sm text-slate-500">
                Mobile-first • SEO-ready foundations • Built for conversion
              </p>
            </motion.div>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
