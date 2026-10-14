import { Link } from "react-router-dom";
import { PageShell } from "@/components/ui/page-shell";
import { SeoHead } from "@/components/seo/seo-head";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { body, divided, h2, inner, PageHero, primaryBtn, section } from "@/components/home-v3/v3-ui";
import { SelectedWork } from "@/components/home-v3/selected-work";

/** /results — "Our Work". Uses the shared verified project list; no metrics or testimonials. */
const DESCRIPTION = "Website projects built by Mercy Speaks Digital, each labeled as client work or a demo build.";

export default function ResultsPage() {
  return (
    <PageShell className="min-h-screen w-full bg-slate-950">
      <SeoHead path="/results" title="Our Work" description={DESCRIPTION} />
      <JsonLd
        data={[
          webPageSchema({ name: "Our Work", description: DESCRIPTION, path: "/results" }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Our Work", path: "/results" },
          ]),
        ]}
      />
      <main className="w-full">
        <PageHero
          title="Our Work"
          intro="Website projects we have built, each labeled as client work or a demo build. For each one: the need, what we built, and the features you can see on the live site."
        />
        <SelectedWork headingId="results-work-heading" title="Website projects" />
        <section className={`${section} ${divided}`} aria-labelledby="results-cta-heading">
          <div className={inner}>
            <h2 id="results-cta-heading" className={h2}>
              Want a website like these?
            </h2>
            <p className={`${body} mx-0 mt-4 max-w-2xl`}>Tell us about your business and we&apos;ll send a written quote.</p>
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
