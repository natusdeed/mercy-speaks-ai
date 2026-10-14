import { Link } from "react-router-dom";
import { PageShell } from "@/components/ui/page-shell";
import { SeoHead } from "@/components/seo/seo-head";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { divided, h2, inner, PageHero, primaryBtn, section } from "@/components/home-v3/v3-ui";
import { INDUSTRY_MARKET_PAGES, INDUSTRY_SLUGS, LOCATION_PAGES, ROOFING_PAGE } from "@/content/market-pages";

const DESCRIPTION = "Conversion websites for service businesses, churches and professional practices.";

export default function IndustriesIndexPage() {
  const industries = [...INDUSTRY_SLUGS.map((s) => INDUSTRY_MARKET_PAGES[s]), ROOFING_PAGE];
  const locations = Object.values(LOCATION_PAGES);
  const rowCls =
    "flex min-h-14 flex-col justify-center gap-1 py-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 rounded sm:flex-row sm:items-center sm:justify-between sm:gap-8";
  return (
    <PageShell className="min-h-screen w-full bg-slate-950">
      <SeoHead path="/industries" title="Industries We Serve | Mercy Speaks Digital" description={DESCRIPTION} />
      <JsonLd
        data={[
          webPageSchema({ name: "Industries we serve", description: DESCRIPTION, path: "/industries" }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Industries", path: "/industries" },
          ]),
        ]}
      />
      <main className="w-full">
        <PageHero title="Industries we serve" intro={DESCRIPTION} />
        {[
          { id: "ind-heading", title: "Industries", items: industries },
          { id: "loc-heading", title: "Locations", items: locations },
        ].map((g) => (
          <section key={g.id} className={`${section} ${divided}`} aria-labelledby={g.id}>
            <div className={inner}>
              <h2 id={g.id} className={`${h2} mb-8`}>
                {g.title}
              </h2>
              <ul className="divide-y divide-slate-800 border-y border-slate-800">
                {g.items.map((p) => (
                  <li key={p.path}>
                    <Link to={p.path} className={rowCls}>
                      <span className="text-lg font-semibold text-white underline decoration-slate-600 underline-offset-4">{p.h1}</span>
                      <span className="text-base text-slate-400 sm:max-w-md sm:text-right">{p.indexBlurb}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ))}
        <section className={`${section} ${divided}`}>
          <div className={inner}>
            <Link to="/contact" className={primaryBtn}>
              Get a Website Quote
            </Link>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
