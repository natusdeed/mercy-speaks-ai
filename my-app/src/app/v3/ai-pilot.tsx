import { Link } from "react-router-dom";
import { PageShell } from "@/components/ui/page-shell";
import { SeoHead } from "@/components/seo/seo-head";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/schema";
import { body, divided, h2, inner, PageHero, QuietList, section, secondaryBtn } from "@/components/home-v3/v3-ui";

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
        <PageHero
          title="AI communication tools: limited pilot"
          intro="We're testing AI communication tools separately from our website services. The pilot has limited availability and is not part of our website packages."
        />
        <section className={`${section} ${divided}`}>
          <div className={`${inner} grid gap-10 md:grid-cols-[1fr_2fr] md:gap-x-16 md:gap-y-14`}>
            <h2 className={h2}>What the pilot is</h2>
            <p className={body}>
              A limited test of AI tools that help businesses handle customer communication. The pilot is open to a small
              number of businesses by invitation, with scope and terms set individually. In the pilot, the AI
              receptionist can answer your business line during the hours you set, take messages, and capture service
              requests. It records booking requests for your team to confirm; it does not book appointments itself. Any
              call it transfers is flagged as an unverified handoff.
            </p>
            <h2 className={h2}>What it is not</h2>
            <div>
              <QuietList
                items={["Not included in any website package or care plan", "Not a finished product", "No published pricing"]}
              />
              <div className="mt-10">
                {/* Pilot CTA is intentionally secondary-styled: the site's primary action is a website quote. */}
                <Link to="/contact?interest=ai-pilot" className={secondaryBtn}>
                  Request pilot info
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
