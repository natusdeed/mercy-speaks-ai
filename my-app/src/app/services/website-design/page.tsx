import { Link } from "react-router-dom";
import { PageShell } from "@/components/ui/page-shell";
import { SeoHead } from "@/components/seo/seo-head";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, serviceSchema, webPageSchema } from "@/lib/schema";
import { SelectedWork } from "@/components/home-v3/selected-work";
import { body, divided, h2, inner, PageHero, PriceColumns, primaryBtn, QuietList, section, smallPrint, textLink } from "@/components/home-v3/v3-ui";
import { DELIVERY_STEPS, PACKAGE_INCLUDES, PAYMENT_TERMS, SERVICES, TIMELINE, WEBSITE_PACKAGES } from "@/content/offers";

/**
 * /services/website-design — website design & redesign service page (2026-10-13 correction).
 * Portfolio from content/verified-work.ts; packages and terms from content/offers.ts. No invented claims.
 */
const DESCRIPTION = SERVICES[0].summary;

const WHAT_WE_BUILD = [
  "New business websites for companies that don't have one yet, or have outgrown a template",
  "Redesigns of existing sites that are hard to use on a phone or no longer match the business",
  "Service pages that explain what you do, where you work and how to reach you",
  "Clear calls to action: tap-to-call and quote-request forms placed where visitors look",
] as const;

export default function WebsiteDesignPage() {
  return (
    <PageShell className="min-h-screen w-full bg-slate-950">
      <SeoHead
        path="/services/website-design"
        title="Website Design & Redesign | Mercy Speaks Digital"
        description={`${DESCRIPTION} Packages from $997.`}
      />
      <JsonLd
        data={[
          webPageSchema({ name: "Website Design & Redesign", description: DESCRIPTION, path: "/services/website-design" }),
          serviceSchema({
            name: "Website Design & Redesign",
            description: DESCRIPTION,
            path: "/services/website-design",
            serviceType: "Website design",
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: "Website Design", path: "/services/website-design" },
          ]),
        ]}
      />
      <main className="w-full">
        <PageHero title="Website design and redesigns" intro={DESCRIPTION}>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-8">
            <Link to="/contact" className={primaryBtn}>
              Get a Website Quote
            </Link>
            <Link to="/websites" className={textLink}>
              Compare packages
            </Link>
          </div>
        </PageHero>

        <section className={`${section} ${divided}`}>
          <div className={`${inner} grid gap-10 md:grid-cols-[1fr_2fr] md:gap-16`}>
            <h2 className={h2}>What we build</h2>
            <div>
              <QuietList items={WHAT_WE_BUILD} />
              <p className={`${body} mt-8`}>{PACKAGE_INCLUDES}</p>
            </div>
          </div>
        </section>

        <SelectedWork headingId="wd-work-heading" title="Website work" />

        <section className={`${section} ${divided}`} aria-labelledby="wd-packages-heading">
          <div className={inner}>
            <h2 id="wd-packages-heading" className={`${h2} mb-10`}>
              Packages
            </h2>
            <PriceColumns items={WEBSITE_PACKAGES} />
            <p className={`${smallPrint} mt-6`}>
              {PAYMENT_TERMS} Add-ons and full terms are on the{" "}
              <Link to="/websites" className="underline underline-offset-4">
                Conversion Websites page
              </Link>
              .
            </p>
          </div>
        </section>

        <section className={`${section} ${divided}`} aria-labelledby="wd-process-heading">
          <div className={inner}>
            <h2 id="wd-process-heading" className={`${h2} mb-10`}>
              How it works
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
            <p className={`${smallPrint} mt-6 max-w-3xl`}>{TIMELINE}</p>
          </div>
        </section>

        <section className={`${section} ${divided}`}>
          <div className={inner}>
            <h2 className={h2}>Start with a written quote</h2>
            <p className={`${body} mt-4 max-w-2xl mx-0`}>Tell us about your business and what your website needs to do.</p>
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
