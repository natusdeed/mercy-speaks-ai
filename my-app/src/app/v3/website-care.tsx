import { Link } from "react-router-dom";
import { PageShell } from "@/components/ui/page-shell";
import { SeoHead } from "@/components/seo/seo-head";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/schema";
import { CARE_PLANS, CARE_RULES, SERVICES } from "@/content/offers";
import { body, divided, h2, inner, PageHero, PriceColumns, primaryBtn, QuietList, section, textLink } from "@/components/home-v3/v3-ui";

/** /website-care — copy: project-001/pages-copy-v3.md (CEO-locked). Plans/rules from content/offers.ts. */
const PLANS = CARE_PLANS;
const RULES = CARE_RULES;

export default function WebsiteCarePage() {
  return (
    <PageShell className="min-h-screen w-full bg-slate-950">
      <SeoHead
        path="/website-care"
        title="Website Care & Optimization | Mercy Speaks Digital"
        description="Keep your site up to date after launch with an optional monthly care plan."
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Website Care", path: "/website-care" },
        ])}
      />
      <main className="w-full">
        <PageHero
          title="Website Care & Optimization"
          intro={SERVICES[1].summary}
        >
          <Link to="/contact?interest=care" className={primaryBtn}>
            Ask about a care plan
          </Link>
        </PageHero>
        <section className={`${section} ${divided}`} aria-label="Care plans">
          <div className={inner}>
            <h2 className="sr-only">Care plans</h2>
            <PriceColumns items={PLANS} cols={2} />
          </div>
        </section>
        <section className={`${section} ${divided}`} aria-labelledby="rules-heading">
          <div className={`${inner} grid gap-10 md:grid-cols-[1fr_2fr] md:gap-16`}>
            <h2 id="rules-heading" className={h2}>
              Plan rules
            </h2>
            <div>
              <QuietList items={RULES} />
              <p className={`${body} mt-10`}>Need a new website first? Start with a website quote.</p>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-8">
                <Link to="/contact?interest=care" className={primaryBtn}>
                  Ask about a care plan
                </Link>
                <Link to="/contact" className={textLink}>
                  Get a Website Quote
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
