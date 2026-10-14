import { Link } from "react-router-dom";
import { PageShell } from "@/components/ui/page-shell";
import { SeoHead } from "@/components/seo/seo-head";
import { JsonLd } from "@/components/seo/json-ld";
import { faqPageSchema, websiteSchema } from "@/lib/schema";
import { body, divided, eyebrow, FaqList, h1, h2, inner, narrow, PriceColumns, primaryBtn, section, secondaryBtn, smallPrint, textLink } from "@/components/home-v3/v3-ui";

/**
 * Homepage V3 (Project #001, CEO-locked copy 2026-10-13).
 * Copy source: /workspace/mercy-speaks/project-001/homepage-copy-v3.md — do not edit copy here without CEO approval.
 * Static markup only (no Framer Motion / no demo widgets) to keep first paint light (QA P1: homepage LCP/TBT).
 * Design: premium, quiet, conversion-focused (CEO principle) — see v3-ui.tsx.
 */

const PACKAGES = [
  {
    name: "Starter",
    price: "$997",
    details: "Up to 5 pages, 2 revision rounds. Best for new or simple businesses that need a professional site.",
    recommended: false,
  },
  {
    name: "Business",
    price: "$1,997",
    details: "Up to 10 pages, 2 revision rounds. Best for service businesses that need a page for each service.",
    recommended: true,
  },
  {
    name: "Premium",
    price: "from $3,500",
    details: "Pages based on your approved scope, 3 revision rounds. Best for multi-location or custom needs.",
    recommended: false,
  },
] as const;

const STEPS = [
  { title: "Quote", body: "tell us about your business; we send a written quote, valid 30 calendar days." },
  { title: "Kickoff", body: "you pay 50% and send the required assets, content, and access." },
  { title: "Build", body: "10–15 business days of active Mercy Speaks production time." },
  { title: "Launch", body: "you pay the final 50%; we launch on hosting and a domain you own, with delegated access for us." },
  { title: "Support", body: "14 calendar days of bug fixes for defects in delivered work, then an optional care plan." },
] as const;

const CARE_PLANS = [
  {
    name: "Care",
    price: "$79/month",
    details:
      "Routine updates, backups and security monitoring where applicable, and up to 30 minutes of minor content edits each month.",
  },
  {
    name: "Care Plus",
    price: "$149/month",
    details: "Everything in Care, plus up to 90 minutes of edits or maintenance each month and priority handling.",
  },
] as const;

export const HOME_V3_FAQS = [
  {
    question: "How long does a website take?",
    answer:
      "10–15 business days of active Mercy Speaks production time after the initial payment and all required starting assets are received. The delivery clock pauses while Mercy Speaks is waiting for client content, assets, credentials/access, feedback, revisions, or approvals.",
  },
  {
    question: "What's included?",
    answer:
      "Each package covers a set number of pages and revision rounds. Hosting, domain, and other third-party costs are not included unless specifically listed in your approved quote.",
  },
  {
    question: "Do I own my website?",
    answer:
      "Yes. You own your hosting and domain accounts and give us delegated access. Once your project is paid in full, you own the final website deliverables we created specifically for your approved project. Mercy Speaks Digital keeps ownership of its pre-existing tools, frameworks, reusable code and components, templates, processes, methods, and know-how. Third-party software, plugins, fonts, images, licensed assets, and services stay subject to their own licenses and ownership terms.",
  },
  {
    question: "How does payment work?",
    answer: "50% to begin and 50% before launch. Quotes are valid for 30 calendar days.",
  },
  {
    question: "What happens after launch?",
    answer: "14 calendar days of bug fixes for defects in delivered work, then an optional care plan.",
  },
  {
    question: "Can you build my site in Spanish?",
    answer: "Yes. A Spanish-language version is available for +40%, subject to scope and page count.",
  },
] as const;

export default function Home() {
  return (
    <PageShell className="min-h-screen w-full bg-slate-950">
      <SeoHead
        path="/"
        title="Conversion Websites for Growing Businesses | Mercy Speaks Digital"
        description="Mercy Speaks Digital builds fast, modern conversion websites that make it easy for visitors to call or request a quote, plus optional website care plans."
        ogImageAlt="Mercy Speaks Digital — conversion websites for growing businesses."
      />
      <JsonLd data={[websiteSchema(), faqPageSchema(HOME_V3_FAQS.map((f) => ({ ...f })))]} />
      <main className="w-full">
        {/* 1. Hero — the one primary CTA in the first view */}
        <section className={`${section} pt-12 md:pt-24`} aria-labelledby="hero-heading">
          <div className={inner}>
            <h1 id="hero-heading" className={`${h1} max-w-3xl mx-0`}>
              The digital front door for growing businesses.
            </h1>
            <p className={`${body} mt-6 max-w-2xl mx-0`}>
              Mercy Speaks Digital builds fast, modern conversion websites that make it easy for the people who find you
              to call, request a quote, or request an appointment. We keep your site up to date with optional care plans.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link to="/contact" className={primaryBtn}>
                Get a Website Quote
              </Link>
              <a href="#packages" className={secondaryBtn}>
                See Website Packages
              </a>
            </div>
          </div>
        </section>

        {/* 2. The problem */}
        <section className={`${section} ${divided}`} aria-labelledby="problem-heading">
          <div className={`${inner} grid gap-10 md:grid-cols-2 md:gap-16`}>
            <div>
              <h2 id="problem-heading" className={h2}>
                Your website should make it easy to choose you.
              </h2>
            </div>
            <div className="space-y-5">
              <p className={body}>
                Most visitors decide fast, usually on a phone. If your services are hard to find, your phone number is
                buried, or the page loads slowly, they move on before they reach out.
              </p>
              <p className={body}>
                We build websites with one job: help visitors understand what you do and contact you without friction.
              </p>
              <ul className="space-y-2 pt-2 text-base text-slate-200 md:text-lg">
                {[
                  "Clear services and pricing information you approve",
                  "Tap-to-call and quote-request forms placed where people look",
                  "Mobile-first design built to load quickly",
                ].map((item) => (
                  <li key={item} className="border-l border-slate-700 pl-4">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 3. Website packages — prices are the visual idea; no extra primary button here */}
        <section id="packages" className={`${section} ${divided} scroll-mt-24`} aria-labelledby="packages-heading">
          <div className={inner}>
            <h2 id="packages-heading" className={`${h2} mb-10`}>
              Website packages
            </h2>
            <PriceColumns items={PACKAGES} />
            <p className={`${smallPrint} mt-6`}>
              50% to begin, 50% before launch. Hosting and domain not included. Add-ons and full terms on the Websites
              page.
            </p>
            <div className="mt-6 flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-8">
              <Link to="/contact" className={textLink}>
                Get a Website Quote
              </Link>
              <Link to="/websites" className={textLink}>
                Compare full package details
              </Link>
            </div>
          </div>
        </section>

        {/* 4. How it works — numbered list, not a card grid */}
        <section className={`${section} ${divided}`} aria-labelledby="how-heading">
          <div className={inner}>
            <h2 id="how-heading" className={`${h2} mb-10`}>
              How it works
            </h2>
            <ol className="divide-y divide-slate-800 border-y border-slate-800">
              {STEPS.map((s, i) => (
                <li key={s.title} className="grid gap-1 py-5 sm:grid-cols-[4rem_10rem_1fr] sm:gap-4">
                  <span className="text-sm tabular-nums text-slate-400">0{i + 1}</span>
                  <h3 className="text-base font-semibold text-white md:text-lg">{s.title}</h3>
                  <p className="text-base leading-relaxed text-slate-300">{s.body}</p>
                </li>
              ))}
            </ol>
            <p className={`${smallPrint} mt-6 max-w-3xl mx-0`}>
              10–15 business days of active Mercy Speaks production time after the initial payment and all required
              starting assets are received. The delivery clock pauses while Mercy Speaks is waiting for client content,
              assets, credentials/access, feedback, revisions, or approvals.
            </p>
          </div>
        </section>

        {/* 5. Website Care & Optimization */}
        <section className={`${section} ${divided}`} aria-labelledby="care-heading">
          <div className={inner}>
            <p className={eyebrow}>Website Care &amp; Optimization</p>
            <h2 id="care-heading" className={`${h2} mb-10`}>
              Keep your site up to date after launch
            </h2>
            <PriceColumns items={CARE_PLANS} cols={2} />
            <p className={`${smallPrint} mt-6`}>
              3-month minimum, then 30 days' written notice to cancel. Unused time does not roll over. Out-of-scope work
              requires approval and is $95/hour.
            </p>
            <div className="mt-4">
              <Link to="/website-care" className={textLink}>
                Learn about Website Care
              </Link>
            </div>
          </div>
        </section>

        {/* 6. AI pilot — deliberately small and plain */}
        <section className={`${section} ${divided} py-12 md:py-16`} aria-labelledby="ai-pilot-heading">
          <div className={`${inner} grid gap-4 md:grid-cols-[1fr_2fr] md:gap-16`}>
            <h2 id="ai-pilot-heading" className="text-lg font-semibold text-white">
              AI communication tools: limited pilot
            </h2>
            <div>
              <p className="text-base leading-relaxed text-slate-400">
                We're testing AI communication tools separately from our website services. The pilot has limited
                availability and is not part of our website packages.
              </p>
              <div className="mt-2">
                <Link to="/ai-pilot" className={textLink}>
                  Learn about the AI pilot
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 7. FAQ */}
        <section className={`${section} ${divided}`} aria-labelledby="faq-heading">
          <div className={narrow}>
            <h2 id="faq-heading" className={`${h2} mb-8`}>
              FAQ
            </h2>
            <FaqList faqs={HOME_V3_FAQS} />
          </div>
        </section>

        {/* 8. Final CTA */}
        <section className={`${section} ${divided}`} aria-labelledby="final-cta-heading">
          <div className={inner}>
            <h2 id="final-cta-heading" className={`${h2} max-w-2xl mx-0`}>
              Ready for a website that makes it easy to choose you?
            </h2>
            <p className={`${body} mt-4`}>Tell us about your business and we'll send a written quote.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link to="/contact" className={primaryBtn}>
                Get a Website Quote
              </Link>
              <Link to="/websites" className={secondaryBtn}>
                See Website Packages
              </Link>
            </div>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
