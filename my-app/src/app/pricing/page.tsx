import { Link } from "react-router-dom";
import { PageShell } from "@/components/ui/page-shell";
import { SeoHead } from "@/components/seo/seo-head";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, offerCatalogSchema, webPageSchema } from "@/lib/schema";
import { WEBSITE_TIERS } from "@/content/pricing-tiers";
import {
  ADDONS,
  AFTER_LAUNCH,
  CARE_PLANS,
  CARE_RULES,
  HOSTING,
  OWNERSHIP,
  PACKAGE_INCLUDES,
  PACKAGE_TIER_NOTES,
  PAYMENT_TERMS,
  TIMELINE,
  WEBSITE_PACKAGES,
} from "@/content/offers";
import { body, divided, h2, inner, PageHero, PriceColumns, primaryBtn, QuietList, section, smallPrint, textLink } from "@/components/home-v3/v3-ui";

/** /pricing — every price and term comes from content/offers.ts (single source). No AI pricing. */
const DESCRIPTION =
  "Website packages: Starter $997, Business $1,997, Premium from $3,500. Website Care $79/month and $149/month.";

export default function PricingPage() {
  return (
    <PageShell className="min-h-screen w-full bg-slate-950">
      <SeoHead path="/pricing" title="Pricing | Mercy Speaks Digital" description={DESCRIPTION} />
      <JsonLd
        data={[
          webPageSchema({ name: "Pricing", description: DESCRIPTION, path: "/pricing" }),
          offerCatalogSchema({ path: "/pricing", aiTiers: [], websiteTiers: WEBSITE_TIERS }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Pricing", path: "/pricing" },
          ]),
        ]}
      />
      <main className="w-full">
        <PageHero title="Pricing" intro="Clear website packages and care plans. Every project starts with a written quote.">
          <Link to="/contact" className={primaryBtn}>
            Get a Website Quote
          </Link>
        </PageHero>

        <section className={`${section} ${divided}`} aria-labelledby="pricing-websites-heading">
          <div className={inner}>
            <h2 id="pricing-websites-heading" className={`${h2} mb-10`}>
              Website packages
            </h2>
            <PriceColumns items={WEBSITE_PACKAGES} />
            <div className="mt-10 max-w-3xl mx-0 space-y-5">
              <p className={body}>{PACKAGE_INCLUDES}</p>
              <p className={body}>{PACKAGE_TIER_NOTES}</p>
            </div>
          </div>
        </section>

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
            <p className={body}>{AFTER_LAUNCH}</p>
          </div>
        </section>

        <section className={`${section} ${divided}`} aria-labelledby="pricing-care-heading">
          <div className={inner}>
            <h2 id="pricing-care-heading" className={`${h2} mb-10`}>
              Website Care &amp; Optimization
            </h2>
            <PriceColumns items={CARE_PLANS} cols={2} />
            <div className="mt-8 max-w-3xl">
              <QuietList items={CARE_RULES} />
            </div>
          </div>
        </section>

        <section className={`${section} ${divided}`} aria-labelledby="pricing-ai-heading">
          <div className={`${inner} grid gap-4 md:grid-cols-[1fr_2fr] md:gap-16`}>
            <h2 id="pricing-ai-heading" className={h2}>
              AI Receptionist — Pilot
            </h2>
            <div>
              <p className={body}>
                The AI Receptionist is a limited pilot, separate from website packages and care plans. Scope and terms
                are agreed in writing with each pilot business.
              </p>
              <div className="mt-4">
                <Link to="/ai-pilot" className={textLink}>
                  How the pilot works
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className={`${section} ${divided}`}>
          <div className={inner}>
            <h2 className={h2}>Get a written quote</h2>
            <p className={`${body} mt-4 max-w-2xl mx-0`}>Tell us about your business and we'll recommend a package.</p>
            <div className="mt-8">
              <Link to="/contact" className={primaryBtn}>
                Get a Website Quote
              </Link>
            </div>
            <p className={`${smallPrint} mt-6`}>Quotes are valid for 30 calendar days.</p>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
