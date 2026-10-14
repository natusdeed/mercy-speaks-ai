import { Link } from "react-router-dom";
import { PageShell } from "@/components/ui/page-shell";
import { CalInlineEmbed } from "@/components/booking/cal-inline-embed";
import { BUSINESS, CAL_COM_EMBED, telHref } from "@/lib/site-config";
import { SeoHead } from "@/components/seo/seo-head";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { body, h1, inlineLink, inner, section, textLink } from "@/components/home-v3/v3-ui";

/**
 * /book-demo — website consultation scheduler (wording per project-001/booking-wording-proposal.md).
 * The Cal.com event itself (slug/title) is unchanged; only on-site wording is aligned to its actual purpose.
 */
const DESCRIPTION =
  "Book a short website consultation. We'll talk through your business, your goals for the site, and which package fits.";

export default function BookDemoPage() {
  return (
    <PageShell className="min-h-screen w-full bg-slate-950">
      <SeoHead path="/book-demo" title="Book a Website Consultation | Mercy Speaks Digital" description={DESCRIPTION} />
      <JsonLd
        data={[
          webPageSchema({ name: "Book a website consultation", description: DESCRIPTION, path: "/book-demo" }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Book a website consultation", path: "/book-demo" },
          ]),
        ]}
      />
      <main className="w-full">
        <section className={`${section} pt-12 md:pt-20`} aria-labelledby="page-heading">
          <div className={inner}>
            <h1 id="page-heading" className={`${h1} max-w-3xl`}>
              Book a website consultation
            </h1>
            <p className={`${body} mt-6 max-w-2xl`}>
              Pick a time that works for you. We'll talk through your business, your goals for the site, and which
              package fits. Prefer writing?{" "}
              <Link to="/contact" className={inlineLink}>
                Request a website quote
              </Link>{" "}
              instead.
            </p>
            <div className="mt-10 overflow-hidden rounded-xl border border-slate-800 p-3 sm:p-4">
              <CalInlineEmbed />
            </div>
            <div className="mt-4 flex flex-col gap-1 text-sm text-slate-400 sm:flex-row sm:items-center sm:gap-8">
              <a href={CAL_COM_EMBED.url} target="_blank" rel="noopener noreferrer" className={textLink}>
                Scheduler not loading? Open the booking page
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              <a href={telHref()} className={textLink}>
                Or call {BUSINESS.phoneDisplay}
              </a>
            </div>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
