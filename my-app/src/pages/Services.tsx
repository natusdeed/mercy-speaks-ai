import { Link } from "react-router-dom";
import { PageShell } from "@/components/ui/page-shell";
import { SeoHead } from "@/components/seo/seo-head";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { NAV_PATHS } from "@/lib/site-config";
import { body, divided, h2, inner, PageHero, PILOT_CAPABILITIES, primaryBtn, QuietList, section, textLink } from "@/components/home-v3/v3-ui";

/**
 * /services — aligned to the locked hierarchy: Conversion Websites → Website Care → AI Receptionist (pilot).
 * Prices shown are the locked package/care prices only. No AI pricing, no withdrawn services.
 */
const DESCRIPTION =
  "Conversion websites first, ongoing website care, and an AI receptionist offered as a limited pilot.";

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
        <PageHero title="Services" intro={DESCRIPTION} />

        <section className={`${section} ${divided}`} aria-labelledby="svc-websites">
          <div className={`${inner} grid gap-6 md:grid-cols-[1fr_2fr] md:gap-16`}>
            <h2 id="svc-websites" className={h2}>
              Conversion Websites
            </h2>
            <div>
              <p className={body}>
                Fast, modern websites that make it easy for the people who find you to call, request a quote, or request
                an appointment. Packages: Starter $997, Business $1,997, Premium from $3,500.
              </p>
              <div className="mt-4">
                <Link to="/websites" className={textLink}>
                  See website packages
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className={`${section} ${divided}`} aria-labelledby="svc-care">
          <div className={`${inner} grid gap-6 md:grid-cols-[1fr_2fr] md:gap-16`}>
            <h2 id="svc-care" className={h2}>
              Website Care
            </h2>
            <div>
              <p className={body}>Ongoing care for your website: Care $79 a month, Care Plus $149 a month.</p>
              <div className="mt-4">
                <Link to="/website-care" className={textLink}>
                  See Website Care plans
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className={`${section} ${divided}`} aria-labelledby="svc-ai">
          <div className={`${inner} grid gap-6 md:grid-cols-[1fr_2fr] md:gap-16`}>
            <h2 id="svc-ai" className={h2}>
              AI Receptionist — Pilot
            </h2>
            <div>
              <p className={body}>
                A limited, invitation-only pilot, separate from our website packages. No published pricing. In the pilot,
                the AI receptionist:
              </p>
              <div className="mt-6">
                <QuietList items={[...PILOT_CAPABILITIES]} />
              </div>
              <div className="mt-4">
                <Link to="/ai-pilot" className={textLink}>
                  Learn about the AI Receptionist pilot
                </Link>
              </div>
            </div>
          </div>
        </section>

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
