import { Link } from "react-router-dom";
import { PageShell } from "@/components/ui/page-shell";
import { SeoHead } from "@/components/seo/seo-head";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/schema";
import { body, divided, h2, inner, PageHero, PILOT_CAPABILITIES, QuietList, section, secondaryBtn } from "@/components/home-v3/v3-ui";

/** /ai-pilot — copy: project-001/pages-copy-v3.md (CEO-locked). PILOT only: no pricing, no widget, no demo number. */
export default function AiPilotPage() {
  return (
    <PageShell className="min-h-screen w-full bg-slate-950">
      <SeoHead
        path="/ai-pilot"
        title="AI Receptionist — Pilot | Mercy Speaks Digital"
        description="We're testing AI communication tools separately from our website services. The pilot has limited availability and is not part of our website packages."
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "AI Receptionist — Pilot", path: "/ai-pilot" },
        ])}
      />
      <main className="w-full">
        <PageHero
          title="AI Receptionist — Pilot"
          intro="We're testing AI communication tools separately from our website services. The pilot has limited availability and is not part of our website packages."
        />
        <section className={`${section} ${divided}`}>
          <div className={`${inner} grid gap-10 md:grid-cols-[1fr_2fr] md:gap-x-16 md:gap-y-14`}>
            <h2 className={h2}>What the pilot is</h2>
            <p className={body}>
              A limited test of an AI receptionist for business phone lines. The pilot is open to a small number of
              businesses by invitation, with scope and terms set individually. Any call it transfers is flagged as an
              unverified handoff.
            </p>
            <h2 className={h2}>What it can do</h2>
            <QuietList items={[...PILOT_CAPABILITIES]} />
            <h2 className={h2}>What it is not</h2>
            <div>
              <QuietList
                items={["Not included in any website package or care plan", "Not a finished product", "No published pricing"]}
              />
              <div className="mt-10">
                {/* Pilot CTA is intentionally secondary-styled: the site's primary action is a website quote. */}
                <Link to="/contact?interest=ai-pilot" className={secondaryBtn}>
                  Request Pilot Information
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
