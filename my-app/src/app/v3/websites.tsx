import { Link } from "react-router-dom";
import { SelectedWork } from "@/components/home-v3/selected-work";
import { PageShell } from "@/components/ui/page-shell";
import { SeoHead } from "@/components/seo/seo-head";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, faqPageSchema } from "@/lib/schema";
import { ADDONS, AFTER_LAUNCH, DELIVERY_STEPS, HOSTING, OWNERSHIP, PACKAGE_INCLUDES, PACKAGE_TIER_NOTES, PAYMENT_TERMS, TIMELINE, WEBSITE_PACKAGES } from "@/content/offers";
import { body, divided, FaqList, h2, inlineLink, inner, narrow, PageHero, PriceColumns, primaryBtn, QuietList, section } from "@/components/home-v3/v3-ui";

/** /websites — copy: project-001/pages-copy-v3.md (CEO-locked). Prices/terms from content/offers.ts. */
const PACKAGES = WEBSITE_PACKAGES;

const FAQS = [
  { question: "How long does a website take?", answer: TIMELINE },
  {
    question: "What's included?",
    answer:
      "Each package covers a set number of pages and revision rounds. Hosting, domain, and other third-party costs are not included unless specifically listed in your approved quote.",
  },
  {
    question: "What if I need more pages or revisions?",
    answer: "Extra pages are $150 each and extra revision rounds are $150 each, or you can move up a package.",
  },
  {
    question: "What do I need to provide?",
    answer:
      "(1) Your logo file, or the Logo add-on. (2) Your list of services. (3) Business hours, address or service area, and the phone number to show. (4) Photos of your business, team, or work, or approval to use licensed images. (5) Page text, or the Copywriting add-on. (6) Proof of any certifications, warranties, or reviews you want shown, and permission to show them. (7) Delegated access to your domain and hosting accounts. Never send passwords by email, text, or chat. (8) One named person who can approve the work.",
  },
  {
    question: "Can you build my site in Spanish?",
    answer: "Yes. A Spanish-language version is available for +40%, subject to scope and page count.",
  },
  {
    question: "How does payment work?",
    answer: "50% to begin and 50% before launch. Quotes are valid for 30 calendar days.",
  },
] as const;

export default function WebsitesPage() {
  return (
    <PageShell className="min-h-screen w-full bg-slate-950">
      <SeoHead
        path="/websites"
        title="Conversion websites for growing businesses | Mercy Speaks Digital"
        description="New websites and redesigns that explain your business clearly and make it easy for visitors to call or request a quote. Packages from $997."
      />
      <JsonLd
        data={[
          faqPageSchema(FAQS.map((f) => ({ ...f }))),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Websites", path: "/websites" },
          ]),
        ]}
      />
      <main className="w-full">
        <PageHero
          title="Conversion websites for growing businesses"
          intro="New websites and redesigns that explain your business clearly and make it easy for visitors to call or request a quote."
        >
          <Link to="/contact" className={primaryBtn}>
            Get a Website Quote
          </Link>
        </PageHero>

        <section className={`${section} ${divided}`} aria-labelledby="packages-heading">
          <div className={inner}>
            <h2 id="packages-heading" className={`${h2} mb-10`}>
              Packages
            </h2>
            <PriceColumns items={PACKAGES} />
            <div className="mt-10 max-w-3xl mx-0 space-y-5">
              <p className={body}>{PACKAGE_INCLUDES}</p>
              <p className={body}>{PACKAGE_TIER_NOTES}</p>
            </div>
          </div>
        </section>

        <SelectedWork headingId="websites-work-heading" variant="compact" />
        <section className={`${section} ${divided}`}>
          <div className={`${inner} grid gap-14 md:grid-cols-[1fr_2fr] md:gap-x-16`}>
            <h2 className={h2}>Add-ons</h2>
            <QuietList items={ADDONS} />

            <h2 className={h2}>Payment</h2>
            <p className={body}>{PAYMENT_TERMS}</p>

            <h2 className={h2}>Timeline</h2>
            <p className={body}>{TIMELINE}</p>

            <h2 className={h2}>Hosting, domain, and ownership</h2>
            <div className="space-y-5">
<p className={body}>{HOSTING}</p>
              <p className={body}>{OWNERSHIP}</p>
            </div>

            <h2 className={h2}>After launch</h2>
            <p className={body}>
              {AFTER_LAUNCH}{" "}
              <Link to="/website-care" className={inlineLink}>
                See Website Care plans
              </Link>
              .
            </p>

            <h2 className={h2}>How it works</h2>
            <ol className="divide-y divide-slate-800 border-y border-slate-800">
              {DELIVERY_STEPS.map((s) => (
                <li key={s.title} className="py-4">
                  <h3 className="text-base font-semibold text-white">{s.title}</h3>
                  <p className="mt-1 text-base leading-relaxed text-slate-300">{s.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className={`${section} ${divided}`} aria-labelledby="websites-faq-heading">
          <div className={narrow}>
            <h2 id="websites-faq-heading" className={`${h2} mb-8`}>
              FAQ
            </h2>
            <FaqList faqs={FAQS} />
          </div>
        </section>

        <section className={`${section} ${divided}`} aria-labelledby="websites-cta-heading">
          <div className={inner}>
            <h2 id="websites-cta-heading" className={h2}>
              Tell us about your business
            </h2>
            <p className={`${body} mt-4 max-w-2xl mx-0`}>We'll recommend a package and send a written quote.</p>
            <div className="mt-8">
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
