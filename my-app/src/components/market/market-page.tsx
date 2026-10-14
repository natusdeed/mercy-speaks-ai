import { Link } from "react-router-dom";
import { PageShell } from "@/components/ui/page-shell";
import { SeoHead } from "@/components/seo/seo-head";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, serviceSchema } from "@/lib/schema";
import { SelectedWork } from "@/components/home-v3/selected-work";
import { body, divided, h2, inner, PageHero, PriceColumns, primaryBtn, QuietList, section, smallPrint, textLink } from "@/components/home-v3/v3-ui";
import { PACKAGE_INCLUDES, PAYMENT_TERMS, WEBSITE_PACKAGES } from "@/content/offers";
import type { MarketPage } from "@/content/market-pages";

/** Shared template for industry and location pages (website-first). */
export function MarketPageView({ page }: { page: MarketPage }) {
  const crumbs =
    page.kind === "industry" && page.path.startsWith("/industries/")
      ? [
          { name: "Home", path: "/" },
          { name: "Industries", path: "/industries" },
          { name: page.navLabel, path: page.path },
        ]
      : [
          { name: "Home", path: "/" },
          { name: page.navLabel, path: page.path },
        ];
  return (
    <PageShell className="min-h-screen w-full bg-slate-950">
      <SeoHead path={page.path} title={page.seoTitle} description={page.seoDescription} />
      <JsonLd
        data={[
          serviceSchema({ name: page.h1, description: page.seoDescription, path: page.path, serviceType: "Website design" }),
          breadcrumbSchema(crumbs),
        ]}
      />
      <main className="w-full">
        <PageHero title={page.h1} intro={page.intro}>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-8">
            <Link to="/contact" className={primaryBtn}>
              Get a Website Quote
            </Link>
            <Link to="/websites" className={textLink}>
              See website packages
            </Link>
          </div>
        </PageHero>

        <section className={`${section} ${divided}`}>
          <div className={`${inner} grid gap-10 md:grid-cols-[1fr_2fr] md:gap-x-16 md:gap-y-14`}>
            <h2 className={h2}>{page.needsTitle}</h2>
            <QuietList items={page.needs} />
            <h2 className={h2}>Included in every package</h2>
            <p className={body}>{PACKAGE_INCLUDES}</p>
            {page.pilotNote && (
              <>
                <h2 className={h2}>HVAC Call Recovery pilot</h2>
                <div>
                  <p className={body}>{page.pilotNote}</p>
                  <div className="mt-4">
                    <Link to="/ai-pilot" className={textLink}>
                      How the pilot works
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>
        </section>

        <SelectedWork variant="compact" headingId="market-work-heading" title="Our website work" />

        <section className={`${section} ${divided}`} aria-labelledby="market-packages-heading">
          <div className={inner}>
            <h2 id="market-packages-heading" className={`${h2} mb-10`}>
              Website packages
            </h2>
            <PriceColumns items={WEBSITE_PACKAGES} />
            <p className={`${smallPrint} mt-6`}>{PAYMENT_TERMS}</p>
            <div className="mt-10">
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
