import { Link } from "react-router-dom";
import { SelectedWork } from "@/components/home-v3/selected-work";
import { ServiceSummaries } from "@/components/home-v3/service-summaries";
import { PageShell } from "@/components/ui/page-shell";
import { SeoHead } from "@/components/seo/seo-head";
import { JsonLd } from "@/components/seo/json-ld";
import { faqPageSchema, websiteSchema } from "@/lib/schema";
import { body, divided, FaqList, h1, h2, inner, narrow, primaryBtn, section, secondaryBtn, smallPrint } from "@/components/home-v3/v3-ui";
import { AFTER_LAUNCH, DELIVERY_STEPS, OWNERSHIP, PAYMENT_TERMS, TIMELINE } from "@/content/offers";
import { VERIFIED_WORK } from "@/content/verified-work";

/**
 * Homepage (customer-experience correction, 2026-10-13). Order per CEO brief:
 * hero → three services → selected work → [recorded pilot demo: omitted until an approved recording exists]
 * → delivery process → FAQ → final inquiry. All offers/prices/terms come from content/offers.ts.
 */
export const HOME_V3_FAQS = [
  { question: "How long does a website take?", answer: TIMELINE },
  {
    question: "What's included?",
    answer:
      "Each package covers a set number of pages and revision rounds. Hosting, domain, and other third-party costs are not included unless specifically listed in your approved quote.",
  },
  {
    question: "Do I own my website?",
    answer: `Yes. You own your hosting and domain accounts and give us delegated access. ${OWNERSHIP}`,
  },
  { question: "How does payment work?", answer: "50% to begin and 50% before launch. Quotes are valid for 30 calendar days." },
  { question: "What happens after launch?", answer: AFTER_LAUNCH },
  {
    question: "Can you build my site in Spanish?",
    answer: "Yes. A Spanish-language version is available for +40%, subject to scope and page count.",
  },
  {
    question: "Is the AI Receptionist part of a website package?",
    answer:
      "No. The AI Receptionist is a limited pilot offered separately, by invitation. It answers during the hours you configure and captures messages and service requests for your team to review. It does not confirm appointments.",
  },
] as const;

const hero = VERIFIED_WORK[0];

export default function Home() {
  return (
    <PageShell className="min-h-screen w-full bg-slate-950">
      <SeoHead
        path="/"
        title="Conversion Websites for Growing Businesses | Mercy Speaks Digital"
        description="Mercy Speaks Digital builds conversion websites that explain your business clearly and make it easy for visitors to call or request a quote, plus website care plans."
        ogImageAlt="Mercy Speaks Digital — conversion websites for growing businesses."
      />
      <JsonLd data={[websiteSchema(), faqPageSchema(HOME_V3_FAQS.map((f) => ({ ...f })))]} />
      <main className="w-full">
        {/* 1. Hero — one primary website-quote action + a real project visual */}
        <section className={`${section} pt-10 md:pt-20`} aria-labelledby="hero-heading">
          <div className={`${inner} grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-14`}>
            <div className="min-w-0">
              <p className="mb-4 text-sm font-medium tracking-wide text-violet-300">Mercy Speaks Digital · Websites for growing businesses</p>
              <h1 id="hero-heading" className={`${h1} max-w-3xl mx-0`}>
                The digital front door for growing businesses.
              </h1>
              <p className={`${body} mt-6 max-w-xl mx-0`}>
                We build conversion websites that explain your business clearly and make it easy for visitors to call or
                request a quote, then keep them up to date with optional care plans.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link to="/contact" className={primaryBtn}>
                  Get a Website Quote
                </Link>
                <Link to="/results" className={secondaryBtn}>
                  See our work
                </Link>
              </div>
              <p className={`${smallPrint} mt-6`}>Website packages from $997. Written quote before any work begins.</p>
            </div>
            <figure className="min-w-0">
              <img
                src={hero.image}
                alt={`Homepage of ${hero.title}, a website built by Mercy Speaks Digital`}
                width={hero.width}
                height={hero.height}
                fetchPriority="high"
                decoding="async"
                className="block h-auto w-full rounded-xl border border-slate-700"
              />
              <figcaption className="mt-3 text-sm text-slate-400">
                {hero.title} · {hero.label}
              </figcaption>
            </figure>
          </div>
        </section>

        {/* 2. Three service summaries, websites first */}
        <ServiceSummaries title="How we help" />

        {/* 3. Selected website work (shared verified source) */}
        <SelectedWork
          title="Selected website work"
          intro="Real projects, each labeled as client work or a demo build."
        />

        {/* 4. Recorded AI pilot demonstration: intentionally not rendered. No approved recording exists yet. */}

        {/* 5. Short delivery process */}
        <section className={`${section} ${divided}`} aria-labelledby="how-heading">
          <div className={inner}>
            <h2 id="how-heading" className={`${h2} mb-10`}>
              How a website project works
            </h2>
            <ol className="divide-y divide-slate-800 border-y border-slate-800">
              {DELIVERY_STEPS.map((s, i) => (
                <li key={s.title} className="grid gap-1 py-5 sm:grid-cols-[4rem_10rem_1fr] sm:gap-4">
                  <span className="text-sm tabular-nums text-slate-400" aria-hidden>
                    0{i + 1}
                  </span>
                  <h3 className="text-base font-semibold text-white md:text-lg">{s.title}</h3>
                  <p className="text-base leading-relaxed text-slate-300">{s.body}</p>
                </li>
              ))}
            </ol>
            <p className={`${smallPrint} mt-6 max-w-3xl mx-0`}>
              {TIMELINE} {PAYMENT_TERMS}
            </p>
          </div>
        </section>

        {/* 6. FAQ */}
        <section className={`${section} ${divided}`} aria-labelledby="faq-heading">
          <div className={narrow}>
            <h2 id="faq-heading" className={`${h2} mb-8`}>
              Common questions
            </h2>
            <FaqList faqs={HOME_V3_FAQS} />
          </div>
        </section>

        {/* 7. Final inquiry */}
        <section className={`${section} ${divided}`} aria-labelledby="final-cta-heading">
          <div className={`${inner} grid gap-8 md:grid-cols-[2fr_1fr] md:items-end`}>
            <div>
              <h2 id="final-cta-heading" className={`${h2} max-w-2xl mx-0`}>
                Ready for a website that makes it easy to choose you?
              </h2>
              <p className={`${body} mt-4`}>Tell us about your business and we'll send a written quote.</p>
            </div>
            <div className="md:text-right">
              <Link to="/contact" className={primaryBtn}>
                Get a Website Quote
              </Link>
            </div>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
