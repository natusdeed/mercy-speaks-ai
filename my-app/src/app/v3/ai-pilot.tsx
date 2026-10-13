import { Link } from "react-router-dom";
import { PageShell } from "@/components/ui/page-shell";
import { SeoHead } from "@/components/seo/seo-head";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/schema";
import { body, h1, h2, inner, primaryBtn, section } from "@/components/home-v3/v3-ui";

/** /ai-pilot — copy: project-001/pages-copy-v3.md (CEO-locked). PILOT only: no pricing, no widget, no demo number. */
export default function AiPilotPage() {
  return (
    <PageShell className="min-h-screen w-full bg-slate-950">
      <SeoHead
        path="/ai-pilot"
        title="AI communication tools: limited pilot | Mercy Speaks Digital"
        description="We're testing AI communication tools separately from our website services. The pilot has limited availability and is not part of our website packages."
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "AI Pilot", path: "/ai-pilot" },
        ])}
      />
      <main className="w-full">
        <section className={`${section} pt-16 md:pt-24`} aria-labelledby="pilot-heading">
          <div className="mx-auto max-w-4xl text-center">
            <h1 id="pilot-heading" className={h1}>
              AI communication tools: limited pilot
            </h1>
            <p className={`${body} mx-auto max-w-2xl`}>
              We're testing AI communication tools separately from our website services. The pilot has limited
              availability and is not part of our website packages.
            </p>
          </div>
        </section>
        <section className={`${section} bg-slate-900/40`}>
          <div className={`${inner} max-w-3xl space-y-12`}>
            <div>
              <h2 className={`${h2} mb-5`}>What the pilot is</h2>
              <p className={body}>
                A limited test of AI tools that help businesses handle customer communication. The pilot is open to a
                small number of businesses by invitation, with scope and terms set individually. In the pilot, the AI
                receptionist can answer your business line during the hours you set, take messages, and capture service
                requests. It records booking requests for your team to confirm; it does not book appointments itself. Any
                call it transfers is flagged as an unverified handoff. It is not a 24/7 service.
              </p>
            </div>
            <div>
              <h2 className={`${h2} mb-5`}>What it is not</h2>
              <ul className="space-y-3">
                {["Not included in any website package or care plan", "Not a finished product", "No published pricing"].map(
                  (t) => (
                    <li key={t} className={`${body} flex gap-3`}>
                      <span aria-hidden className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-neon-cyan" />
                      <span>{t}</span>
                    </li>
                  )
                )}
              </ul>
            </div>
            <Link to="/contact?interest=ai-pilot" className={primaryBtn}>
              Request pilot info
            </Link>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
