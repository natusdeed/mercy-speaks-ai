import { Link } from "react-router-dom";
import { PageShell } from "@/components/ui/page-shell";
import { SeoHead } from "@/components/seo/seo-head";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/schema";
import { body, card, h1, h2, inner, primaryBtn, secondaryBtn, section } from "@/components/home-v3/v3-ui";

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
        <section className={`${section} pt-16 md:pt-24`} aria-labelledby="care-heading">
          <div className="mx-auto max-w-4xl text-center">
            <h1 id="care-heading" className={h1}>
              Website Care &amp; Optimization
            </h1>
            <p className={`${body} mx-auto max-w-2xl`}>
              Keep your site up to date after launch with an optional monthly care plan.
            </p>
          </div>
        </section>
        <section className={`${section} bg-slate-900/40`} aria-label="Care plans">
          <ul className={`${inner} grid max-w-4xl grid-cols-1 gap-5 md:grid-cols-2`}>
            {PLANS.map((p) => (
              <li key={p.name} className={card}>
                <h2 className="text-xl font-semibold text-slate-50">{p.name}</h2>
                <p className="mt-2 text-2xl font-bold text-slate-50">{p.price}</p>
                <p className="mt-3 text-base leading-relaxed text-slate-300">{p.details}</p>
              </li>
            ))}
          </ul>
        </section>
        <section className={section} aria-labelledby="rules-heading">
          <div className={`${inner} max-w-3xl`}>
            <h2 id="rules-heading" className={`${h2} mb-5`}>
              Plan rules
            </h2>
            <ul className="space-y-3">
              {RULES.map((r) => (
                <li key={r} className={`${body} flex gap-3`}>
                  <span aria-hidden className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-neon-cyan" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
              <Link to="/contact" className={primaryBtn}>
                Get a Website Quote
              </Link>
              <Link to="/contact" className={secondaryBtn}>
                Ask about a care plan
              </Link>
            </div>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
