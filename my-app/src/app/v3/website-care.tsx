import { Link } from "react-router-dom";
import { PageShell } from "@/components/ui/page-shell";
import { SeoHead } from "@/components/seo/seo-head";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/schema";
import { divided, h2, inner, PageHero, PriceColumns, primaryBtn, QuietList, section, textLink } from "@/components/home-v3/v3-ui";

/** /website-care — copy: project-001/pages-copy-v3.md (CEO-locked). Do not edit copy. */
const PLANS = [
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

const RULES = [
  "3-month minimum, then 30 days' written notice to cancel.",
  "Unused time does not roll over.",
  "Out-of-scope work requires approval and is billed at $95/hour.",
  "Where applicable, Mercy Speaks Digital uses the backup, security and maintenance tools available through the client's hosting environment. Advanced monitoring, premium security software, or other paid third-party services must be separately scoped and approved.",
  "Priority handling means Care Plus requests are placed ahead of standard Care requests in our work queue. It is not a guaranteed response or completion time.",
];

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
          intro="Keep your site up to date after launch with an optional monthly care plan."
        />
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
              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-8">
                <Link to="/contact" className={primaryBtn}>
                  Get a Website Quote
                </Link>
                <Link to="/contact" className={textLink}>
                  Ask about a care plan
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
