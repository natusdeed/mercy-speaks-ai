import { Link } from "react-router-dom";
import { PageShell } from "@/components/ui/page-shell";
import { SeoHead } from "@/components/seo/seo-head";
import { JsonLd } from "@/components/seo/json-ld";
import { faqPageSchema, websiteSchema } from "@/lib/schema";
import { primaryBtn, secondaryBtn, textLink, section, inner, h2, smallPrint, FaqList } from "@/components/home-v3/v3-ui";

/**
 * Homepage V3 (Project #001, CEO-locked copy 2026-10-13).
 * Copy source: /workspace/mercy-speaks/project-001/homepage-copy-v3.md — do not edit copy here without CEO approval.
 * Static markup only (no Framer Motion / no demo widgets) to keep first paint light (QA P1: homepage LCP/TBT).
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
      "You own your hosting and domain accounts and give us delegated access. After full payment, the client owns the final client-specific website deliverables created for the approved project, excluding Mercy Speaks Digital's pre-existing tools, frameworks, reusable code/components, templates, processes, methods, and know-how. Third-party software, plugins, fonts, images, licensed assets, and services remain subject to their respective licenses and ownership terms. [DRAFT — PENDING LEGAL REVIEW]",
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
        {/* 1. Hero */}
        <section className={`${section} pt-16 md:pt-24`} aria-labelledby="hero-heading">
          <div className="mx-auto max-w-4xl text-center">
            <h1
              id="hero-heading"
              className="mb-5 text-3xl font-bold leading-[1.12] tracking-tight text-slate-50 sm:text-4xl md:text-5xl lg:text-6xl"
            >
              The digital front door for growing businesses.
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg md:text-xl">
              Mercy Speaks Digital builds fast, modern conversion websites that make it easy for the people who find you
              to call, request a quote, or request an appointment. We keep your site up to date with optional care plans.
            </p>
            <div className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
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
        <section className={`${section} bg-slate-900/40`} aria-labelledby="problem-heading">
          <div className={`${inner} max-w-3xl`}>
            <h2 id="problem-heading" className={`${h2} mb-5`}>
              Your website should make it easy to choose you.
            </h2>
            <p className="mb-4 text-base leading-relaxed text-slate-300 md:text-lg">
              Most visitors decide fast, usually on a phone. If your services are hard to find, your phone number is
              buried, or the page loads slowly, they move on before they reach out.
            </p>
            <p className="mb-6 text-base leading-relaxed text-slate-300 md:text-lg">
              We build websites with one job: help visitors understand what you do and contact you without friction.
            </p>
            <ul className="space-y-3 text-base text-slate-200 md:text-lg">
              {[
                "Clear services and pricing information you approve",
                "Tap-to-call and quote-request forms placed where people look",
                "Mobile-first design built to load quickly",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span aria-hidden className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-neon-cyan" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 3. Website packages */}
        <section id="packages" className={`${section} scroll-mt-24`} aria-labelledby="packages-heading">
          <div className={inner}>
            <h2 id="packages-heading" className={`${h2} mb-8 text-center`}>
              Website packages
            </h2>
            <ul className="grid grid-cols-1 gap-5 md:grid-cols-3">
              {PACKAGES.map((p) => (
                <li
                  key={p.name}
                  className={`flex flex-col rounded-2xl border p-6 ${
                    p.recommended
                      ? "border-electric-purple bg-electric-purple/10"
                      : "border-slate-700 bg-slate-900/60"
                  }`}
                >
                  <h3 className="text-xl font-semibold text-slate-50">
                    {p.name}
                    {p.recommended && (
                      <span className="ml-2 inline-block rounded-full bg-violet-700 px-2.5 py-0.5 align-middle text-xs font-semibold text-white">
                        Recommended
                      </span>
                    )}
                  </h3>
                  <p className="mt-2 text-3xl font-bold text-slate-50">{p.price}</p>
                  <p className="mt-3 text-base leading-relaxed text-slate-300">{p.details}</p>
                </li>
              ))}
            </ul>
            <p className={`${smallPrint} mt-6 text-center`}>
              50% to begin, 50% before launch. Hosting and domain not included. Add-ons and full terms on the Websites
              page.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-6">
              <Link to="/contact" className={primaryBtn}>
                Get a Website Quote
              </Link>
              <Link to="/websites" className={textLink}>
                Compare full package details
              </Link>
            </div>
          </div>
        </section>

        {/* 4. How it works */}
        <section className={`${section} bg-slate-900/40`} aria-labelledby="how-heading">
          <div className={inner}>
            <h2 id="how-heading" className={`${h2} mb-8 text-center`}>
              How it works
            </h2>
            <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {STEPS.map((s, i) => (
                <li key={s.title} className="rounded-2xl border border-slate-700 bg-slate-900/60 p-5">
                  <p className="text-sm font-semibold text-neon-cyan">Step {i + 1}</p>
                  <h3 className="mt-1 text-lg font-semibold text-slate-50">{s.title}</h3>
                  <p className="mt-2 text-base leading-relaxed text-slate-300">{s.body}</p>
                </li>
              ))}
            </ol>
            <p className={`${smallPrint} mt-6 text-center`}>
              10–15 business days of active Mercy Speaks production time after the initial payment and all required
              starting assets are received. The delivery clock pauses while Mercy Speaks is waiting for client content,
              assets, credentials/access, feedback, revisions, or approvals.
            </p>
          </div>
        </section>

        {/* 5. Website Care & Optimization */}
        <section className={section} aria-labelledby="care-heading">
          <div className={inner}>
            <p className="mb-2 text-center text-sm font-semibold uppercase tracking-wider text-neon-cyan">
              Website Care &amp; Optimization
            </p>
            <h2 id="care-heading" className={`${h2} mb-8 text-center`}>
              Keep your site up to date after launch
            </h2>
            <ul className="mx-auto grid max-w-4xl grid-cols-1 gap-5 md:grid-cols-2">
              {CARE_PLANS.map((c) => (
                <li key={c.name} className="rounded-2xl border border-slate-700 bg-slate-900/60 p-6">
                  <h3 className="text-xl font-semibold text-slate-50">{c.name}</h3>
                  <p className="mt-2 text-2xl font-bold text-slate-50">{c.price}</p>
                  <p className="mt-3 text-base leading-relaxed text-slate-300">{c.details}</p>
                </li>
              ))}
            </ul>
            <p className={`${smallPrint} mt-6 text-center`}>
              3-month minimum, then 30 days' written notice to cancel. Unused time does not roll over. Out-of-scope work
              requires approval and is $95/hour.
            </p>
            <div className="mt-6 text-center">
              <Link to="/website-care" className={textLink}>
                Learn about Website Care
              </Link>
            </div>
          </div>
        </section>

        {/* 6. AI pilot strip */}
        <section className="px-4 py-10 sm:px-6 lg:px-8" aria-labelledby="ai-pilot-heading">
          <div className="mx-auto max-w-4xl rounded-2xl border border-slate-700 bg-slate-900/60 p-6 md:p-8">
            <h2 id="ai-pilot-heading" className="text-xl font-semibold text-slate-50 md:text-2xl">
              AI communication tools: limited pilot
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-300">
              We're testing AI communication tools separately from our website services. The pilot has limited
              availability and is not part of our website packages.
            </p>
            <div className="mt-4">
              <Link to="/ai-pilot" className={textLink}>
                Learn about the AI pilot
              </Link>
            </div>
          </div>
        </section>

        {/* 7. FAQ */}
        <section className={`${section} bg-slate-900/40`} aria-labelledby="faq-heading">
          <div className={`${inner} max-w-3xl`}>
            <h2 id="faq-heading" className={`${h2} mb-8 text-center`}>
              FAQ
            </h2>
            <FaqList faqs={HOME_V3_FAQS} />
          </div>
        </section>

        {/* 8. Final CTA */}
        <section className={section} aria-labelledby="final-cta-heading">
          <div className="mx-auto max-w-3xl text-center">
            <h2 id="final-cta-heading" className={`${h2} mb-4`}>
              Ready for a website that makes it easy to choose you?
            </h2>
            <p className="mb-8 text-base text-slate-300 md:text-lg">
              Tell us about your business and we'll send a written quote.
            </p>
            <div className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
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
