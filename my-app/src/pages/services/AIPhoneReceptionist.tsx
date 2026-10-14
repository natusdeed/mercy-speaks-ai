import { Link } from "react-router-dom";
import { PageShell } from "@/components/ui/page-shell";
import { SeoHead } from "@/components/seo/seo-head";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/schema";
import { NAV_PATHS } from "@/lib/site-config";
import { body, divided, h2, inner, PageHero, PILOT_CAPABILITIES, QuietList, section, secondaryBtn, textLink } from "@/components/home-v3/v3-ui";

/**
 * /services/ai-phone-receptionist — legacy URL kept, content aligned to the AI Receptionist pilot.
 * Only the pilot's supported functions; no booking confirmation, no always-on claims, no pricing, no demo number.
 */
const DESCRIPTION =
  "An AI receptionist for business phone lines, offered as a limited pilot separate from our website packages.";

export default function ServiceAIPhoneReceptionist() {
  return (
    <PageShell className="min-h-screen w-full bg-slate-950">
      <SeoHead
        path={NAV_PATHS.aiReceptionist}
        title="AI Phone Receptionist — Pilot | Mercy Speaks Digital"
        description={DESCRIPTION}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: NAV_PATHS.services },
          { name: "AI Phone Receptionist — Pilot", path: NAV_PATHS.aiReceptionist },
        ])}
      />
      <main className="w-full">
        <PageHero title="AI Phone Receptionist — Pilot" intro={DESCRIPTION} />
        <section className={`${section} ${divided}`}>
          <div className={`${inner} grid gap-10 md:grid-cols-[1fr_2fr] md:gap-x-16 md:gap-y-14`}>
            <h2 className={h2}>What it can do</h2>
            <QuietList items={[...PILOT_CAPABILITIES]} />
            <h2 className={h2}>How the pilot works</h2>
            <p className={body}>
              The pilot is open to a small number of businesses by invitation, with scope and terms set individually. It
              follows scripts you approve. Booking requests are recorded for your team to confirm, and any call it
              transfers is flagged as an unverified handoff.
            </p>
            <h2 className={h2}>Call recording and regulated industries</h2>
            <p className={body}>
              When calls are recorded or monitored, we configure disclosure language in the greeting so callers know what
              is happening. Healthcare, legal, and similar businesses get scoped guardrails and human-escalation rules.
              This describes how we set up the pilot; it is not legal advice.
            </p>
            <h2 className={h2}>What it is not</h2>
            <div>
              <QuietList
                items={["Not included in any website package or care plan", "Not a finished product", "No published pricing"]}
              />
              <div className="mt-10 flex flex-wrap items-center gap-6">
                <Link to="/contact?interest=ai-pilot" className={secondaryBtn}>
                  Request Pilot Information
                </Link>
                <Link to="/ai-pilot" className={textLink}>
                  About the AI Receptionist pilot
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
