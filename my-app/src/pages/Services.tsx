import { Link } from "react-router-dom";
import { PageShell } from "@/components/ui/page-shell";
import { SeoHead } from "@/components/seo/seo-head";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { NAV_PATHS } from "@/lib/site-config";
import { body, divided, h2, inner, PageHero, primaryBtn, section, textLink } from "@/components/home-v3/v3-ui";
import { ServiceSummaries } from "@/components/home-v3/service-summaries";
import { SelectedWork } from "@/components/home-v3/selected-work";

/** /services — hub for the three public services (website-first). Copy and prices from content/offers.ts. */
const DESCRIPTION =
  "Conversion websites, website care and optimization, and an AI receptionist offered as a limited pilot.";

export default function ServicesPage() {
  return (
    <PageShell className="min-h-screen w-full bg-slate-950">
      <SeoHead title="Services" description={DESCRIPTION} path={NAV_PATHS.services} />
      <JsonLd
        data={[
          webPageSchema({ name: "Services", description: DESCRIPTION, path: NAV_PATHS.services }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: NAV_PATHS.services },
          ]),
        ]}
      />
      <main className="w-full">
        <PageHero title="Services" intro={DESCRIPTION}>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-8">
            <Link to="/contact" className={primaryBtn}>
              Get a Website Quote
            </Link>
            <Link to="/pricing" className={textLink}>
              See all prices
            </Link>
          </div>
        </PageHero>
        <ServiceSummaries title="Our services" />
        <SelectedWork variant="compact" headingId="services-work-heading" />
        <section className={`${section} ${divided}`} aria-labelledby="services-cta-heading">
          <div className={inner}>
            <h2 id="services-cta-heading" className={h2}>
              Not sure where to start?
            </h2>
            <p className={`${body} mt-4 max-w-2xl mx-0`}>
              Most businesses start with a website. Tell us what you need and choose the service you're interested in on
              the form.
            </p>
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
