import { Link } from "react-router-dom";
import { PageShell } from "@/components/ui/page-shell";
import { SeoHead } from "@/components/seo/seo-head";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, faqPageSchema } from "@/lib/schema";
import { body, divided, FaqList, h2, inner, PageHero, primaryBtn, QuietList, section, smallPrint, textLink } from "@/components/home-v3/v3-ui";
import { PILOT_CAPABILITIES, PILOT_LIMITS, SERVICES } from "@/content/offers";

/**
 * /ai-pilot — customer-language rewrite (2026-10-13 correction). PILOT only:
 * no pricing, no widget, no demo number, no 24/7, no confirmed bookings, transfers described as attempts.
 * Recorded demonstration: the player + script live in components/ai-pilot/ and content/ai-pilot-demo.ts but are
 * deliberately NOT rendered here until an approved recording exists (see AI_PILOT_RECORDING in that file).
 */
const STEPS = [
  { title: "A customer calls", body: "When a call reaches it, the AI receptionist answers with your business name and greeting." },
  { title: "It listens and asks", body: "It asks what the caller needs and collects their name, callback number and a short description." },
  { title: "It captures the request", body: "It records a message or a service request. If the caller asks for a person and you've set up transfers, it attempts one." },
  { title: "Your team follows up", body: "Your team reviews each message and request, then calls the customer back to confirm details and any appointment." },
] as const;

const FAQS = [
  {
    question: "Does it book appointments?",
    answer:
      "No. It captures appointment and service requests for your team to review. Your team confirms any appointment directly with the customer.",
  },
  {
    question: "Can it transfer a caller to my team?",
    answer:
      "It can attempt to transfer to a number you choose. If no one answers, the caller can leave a message.",
  },
  {
    question: "Is it part of a website package?",
    answer: "No. The pilot is separate from our website packages and care plans, with scope and terms agreed in writing.",
  },
  {
    question: "Who can join?",
    answer:
      "The pilot is open to a small number of businesses by invitation. Tell us about your business and how calls reach you today, and we'll let you know whether the pilot is a fit.",
  },
] as const;

export default function AiPilotPage() {
  return (
    <PageShell className="min-h-screen w-full bg-slate-950">
      <SeoHead
        path="/ai-pilot"
        title="AI Receptionist — Pilot | Mercy Speaks Digital"
        description="A limited pilot: AI-assisted answering for the calls you send to it, with messages and service requests passed to your team to review."
      />
      <JsonLd
        data={[
          faqPageSchema(FAQS.map((f) => ({ ...f }))),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "AI Receptionist — Pilot", path: "/ai-pilot" },
          ]),
        ]}
      />
      <main className="w-full">
        <PageHero title="AI Receptionist — Pilot" intro={`${SERVICES[2].summary} Offered as a limited pilot, by invitation.`}>
          <Link to="/contact?interest=ai-pilot" className={primaryBtn}>
            Request pilot information
          </Link>
        </PageHero>

        <section className={`${section} ${divided}`} aria-labelledby="pilot-how-heading">
          <div className={inner}>
            <h2 id="pilot-how-heading" className={`${h2} mb-10`}>
              How a pilot call works
            </h2>
            <ol className="grid grid-cols-1 divide-y divide-slate-800 border-y border-slate-800 md:grid-cols-4 md:divide-x md:divide-y-0">
              {STEPS.map((s, i) => (
                <li key={s.title} className="py-6 md:px-6 md:first:pl-0 md:last:pr-0">
                  <span className="text-sm tabular-nums text-violet-300" aria-hidden>
                    0{i + 1}
                  </span>
                  <h3 className="mt-2 text-base font-semibold text-white md:text-lg">{s.title}</h3>
                  <p className="mt-2 text-base leading-relaxed text-slate-300">{s.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className={`${section} ${divided}`}>
          <div className={`${inner} grid gap-10 md:grid-cols-[1fr_2fr] md:gap-x-16 md:gap-y-14`}>
            <h2 className={h2}>What it does</h2>
            <QuietList items={PILOT_CAPABILITIES} />

            <h2 className={h2}>Good to know</h2>
            <QuietList items={PILOT_LIMITS} />

            <h2 className={h2}>HVAC Call Recovery</h2>
            <p className={body}>
              HVAC Call Recovery is in early pilot. It's designed to answer calls you route to it and capture each caller's details and service request for your team to follow up.
            </p>
          </div>
        </section>

        <section className={`${section} ${divided}`} aria-labelledby="pilot-faq-heading">
          <div className={inner}>
            <h2 id="pilot-faq-heading" className={`${h2} mb-8`}>
              Questions about the pilot
            </h2>
            <FaqList faqs={FAQS} />
          </div>
        </section>

        <section className={`${section} ${divided}`} aria-labelledby="pilot-cta-heading">
          <div className={inner}>
            <h2 id="pilot-cta-heading" className={h2}>
              Interested in the pilot?
            </h2>
            <p className={`${body} mt-4 max-w-2xl mx-0`}>
              Tell us about your business and how calls reach you today. We'll explain how the pilot would work for you.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-8">
              <Link to="/contact?interest=ai-pilot" className={primaryBtn}>
                Request pilot information
              </Link>
              <Link to="/websites" className={textLink}>
                Looking for a website instead?
              </Link>
            </div>
            <p className={`${smallPrint} mt-6`}>Pilot availability is limited and not every business will be a fit.</p>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
