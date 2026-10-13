import { Link } from "react-router-dom";
import { PageShell } from "@/components/ui/page-shell";
import { SeoHead } from "@/components/seo/seo-head";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/schema";
import { body, h1, h2, inner, MAILING_ADDRESS, primaryBtn, section } from "@/components/home-v3/v3-ui";

/**
 * /about — copy: project-001/pages-copy-v3.md (CEO-locked).
 * Founder photo area intentionally omitted until a real CEO-approved photo is supplied.
 * Mailing address is display-only; never used in schema.
 */
export default function AboutPage() {
  return (
    <PageShell className="min-h-screen w-full bg-slate-950">
      <SeoHead
        path="/about"
        title="About Mercy Speaks Digital"
        description="Mercy Speaks Digital builds the digital front door for growing businesses: fast, modern conversion websites, ongoing care, and AI communication tools offered as a limited pilot."
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
      <main className="w-full">
        <section className={`${section} pt-16 md:pt-24`} aria-labelledby="about-heading">
          <div className="mx-auto max-w-4xl text-center">
            <h1 id="about-heading" className={h1}>
              About Mercy Speaks Digital
            </h1>
            <p className={`${body} mx-auto max-w-2xl`}>
              Mercy Speaks Digital builds the digital front door for growing businesses: fast, modern conversion
              websites, ongoing care, and AI communication tools offered as a limited pilot.
            </p>
          </div>
        </section>
        <section className={`${section} bg-slate-900/40`}>
          <div className={`${inner} max-w-3xl space-y-12`}>
            <div>
              <h2 className={`${h2} mb-5`}>Founder</h2>
              <div className="space-y-4">
                <p className={body}>
                  Donatus Udofia is the founder of Mercy Speaks Digital, a Texas-based digital solutions company focused
                  on helping growing businesses improve how customers find, contact, and engage with them.
                </p>
                <p className={body}>
                  He founded Mercy Speaks Digital to bring practical technology to small businesses without unnecessary
                  complexity. The company's current focus is conversion-focused websites, ongoing website care, and the
                  development of AI-powered customer communication tools.
                </p>
                <p className={body}>
                  Donatus believes technology should solve real business problems, make customer experiences easier, and
                  give business owners systems they can understand and control.
                </p>
              </div>
            </div>
            <div>
              <h2 className={`${h2} mb-5`}>How we work</h2>
              <ul className="space-y-3">
                {[
                  "Clear packages, prices, and timelines",
                  "You own your hosting and domain",
                  "Written quotes before work begins",
                ].map((t) => (
                  <li key={t} className={`${body} flex gap-3`}>
                    <span aria-hidden className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-neon-cyan" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className={`${h2} mb-5`}>Company details</h2>
              <p className={body}>Mailing address: {MAILING_ADDRESS}</p>
            </div>
            <Link to="/contact" className={primaryBtn}>
              Get a Website Quote
            </Link>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
