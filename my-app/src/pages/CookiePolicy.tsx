import { Link } from "react-router-dom";
import { SeoHead } from "@/components/seo/seo-head";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { PageShell } from "@/components/ui/page-shell";
import { h1, inlineLink, inner, section } from "@/components/home-v3/v3-ui";
import { BUSINESS } from "@/lib/site-config";

/**
 * /cookie-policy — rewritten 2026-10-13 to match the tools ACTUALLY enabled in the code:
 * no analytics, no ad pixels; consent choice in localStorage (msd_cookie_consent); Google Fonts; Cal.com embed on
 * /book-demo only; Vercel hosting. INTERNAL: needs Donatus's review alongside /privacy and /terms.
 */
const DESCRIPTION = "Which cookies and similar technology the Mercy Speaks Digital website uses, and how to control them.";

export default function CookiePolicy() {
  return (
    <PageShell className="min-h-screen w-full bg-slate-950">
      <SeoHead title="Cookie Policy | Mercy Speaks Digital" description={DESCRIPTION} path="/cookie-policy" />
      <JsonLd
        data={[
          webPageSchema({ name: "Cookie Policy", description: DESCRIPTION, path: "/cookie-policy" }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Cookie Policy", path: "/cookie-policy" },
          ]),
        ]}
      />
      <main className={`${section} pt-12 md:pt-20`}>
        <article className={`${inner} max-w-3xl`}>
          <h1 className={h1}>Cookie Policy</h1>
          <p className="mt-4 text-sm text-slate-400">Last updated October 13, 2026</p>
          <div className="mt-10 space-y-5 text-base leading-relaxed text-slate-300 [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-white [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6">
            <p>
              This website keeps tracking to a minimum. We do not load analytics tools, advertising pixels or
              retargeting scripts.
            </p>
            <h2>What this site stores</h2>
            <ul>
              <li>
                Your cookie choice. When you choose an option in the cookie banner, your browser saves that choice
                (in local storage) so the banner doesn't appear again on every page.
              </li>
            </ul>
            <h2>Third-party services</h2>
            <ul>
              <li>Vercel hosts the site and serves every page.</li>
              <li>Google Fonts supplies the typeface, so your browser requests font files from Google.</li>
              <li>
                Cal.com runs the scheduler on our{" "}
                <Link to="/book-demo" className={inlineLink}>
                  booking page
                </Link>
                . It loads only on that page and may set its own cookies under Cal.com's policies.
              </li>
            </ul>
            <h2>Your choices</h2>
            <p>
              You can clear this site's stored data in your browser settings at any time, which also resets your cookie
              choice. Most browsers also let you block cookies from specific sites.
            </p>
            <h2>Questions</h2>
            <p>
              Email{" "}
              <a href={`mailto:${BUSINESS.email}`} className={inlineLink}>
                {BUSINESS.email}
              </a>
              . See also our{" "}
              <Link to="/privacy" className={inlineLink}>
                Privacy
              </Link>{" "}
              page.
            </p>
          </div>
        </article>
      </main>
    </PageShell>
  );
}
