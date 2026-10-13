import { Link } from "react-router-dom";
import { PageShell } from "@/components/ui/page-shell";
import { SeoHead } from "@/components/seo/seo-head";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, faqPageSchema } from "@/lib/schema";
import { body, card, cardRecommended, FaqList, h1, h2, inner, primaryBtn, RecommendedBadge, section } from "@/components/home-v3/v3-ui";

/** /websites — copy: project-001/pages-copy-v3.md (CEO-locked). Do not edit copy. */
const PACKAGES = [
  { name: "Starter", price: "$997", details: "Up to 5 pages, 2 revision rounds. Best for new or simple businesses that need a professional site.", recommended: false },
  { name: "Business", price: "$1,997", details: "Up to 10 pages, 2 revision rounds. Best for service businesses that need a page for each service.", recommended: true },
  { name: "Premium", price: "from $3,500", details: "Pages based on your approved scope, 3 revision rounds. Best for multi-location or custom needs.", recommended: false },
] as const;

const ADDONS = [
  "Extra page: $150",
  "Logo design: $250 when separately scoped",
  "Copywriting: $100 per page",
  "Extra revision round: $150",
  "Spanish-language version: +40%, subject to scope and page count",
];

const TIMELINE =
  "10–15 business days of active Mercy Speaks production time after the initial payment and all required starting assets are received. The delivery clock pauses while Mercy Speaks is waiting for client content, assets, credentials/access, feedback, revisions, or approvals.";

const OWNERSHIP =
  "After full payment, the client owns the final client-specific website deliverables created for the approved project, excluding Mercy Speaks Digital's pre-existing tools, frameworks, reusable code/components, templates, processes, methods, and know-how. Third-party software, plugins, fonts, images, licensed assets, and services remain subject to their respective licenses and ownership terms. [DRAFT — PENDING LEGAL REVIEW]";

const FAQS = [
  { question: "How long does a website take?", answer: TIMELINE },
  {
    question: "What's included?",
    answer:
      "Each package covers a set number of pages and revision rounds. Hosting, domain, and other third-party costs are not included unless specifically listed in your approved quote.",
  },
  {
    question: "What if I need more pages or revisions?",
    answer: "Extra pages are $150 each and extra revision rounds are $150 each, or you can move up a package.",
  },
  {
    question: "What do I need to provide?",
    answer:
      "(1) Your logo file, or the Logo add-on. (2) Your list of services. (3) Business hours, address or service area, and the phone number to show. (4) Photos of your business, team, or work, or approval to use licensed images. (5) Page text, or the Copywriting add-on. (6) Proof of any certifications, warranties, or reviews you want shown, and permission to show them. (7) Delegated access to your domain and hosting accounts. Never send passwords by email, text, or chat. (8) One named person who can approve the work.",
  },
  {
    question: "Can you build my site in Spanish?",
    answer: "Yes. A Spanish-language version is available for +40%, subject to scope and page count.",
  },
  {
    question: "How does payment work?",
    answer: "50% to begin and 50% before launch. Quotes are valid for 30 calendar days.",
  },
] as const;

export default function WebsitesPage() {
  return (
    <PageShell className="min-h-screen w-full bg-slate-950">
      <SeoHead
        path="/websites"
        title="Conversion websites for growing businesses | Mercy Speaks Digital"
        description="Fast, modern websites that make it easy for the people who find you to call, request a quote, or request an appointment."
      />
      <JsonLd
        data={[
          faqPageSchema(FAQS.map((f) => ({ ...f }))),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Websites", path: "/websites" },
          ]),
        ]}
      />
      <main className="w-full">
        <section className={`${section} pt-16 md:pt-24`} aria-labelledby="websites-heading">
          <div className="mx-auto max-w-4xl text-center">
            <h1 id="websites-heading" className={h1}>
              Conversion websites for growing businesses
            </h1>
            <p className={`${body} mx-auto mb-8 max-w-2xl`}>
              Fast, modern websites that make it easy for the people who find you to call, request a quote, or request an
              appointment.
            </p>
            <Link to="/contact" className={primaryBtn}>
              Get a Website Quote
            </Link>
          </div>
        </section>

        <section className={`${section} bg-slate-900/40`} aria-labelledby="packages-heading">
          <div className={inner}>
            <h2 id="packages-heading" className={`${h2} mb-8 text-center`}>
              Packages
            </h2>
            <ul className="grid grid-cols-1 gap-5 md:grid-cols-3">
              {PACKAGES.map((p) => (
                <li key={p.name} className={`flex flex-col ${p.recommended ? cardRecommended : card}`}>
                  <h3 className="text-xl font-semibold text-slate-50">
                    {p.name}
                    {p.recommended && <RecommendedBadge />}
                  </h3>
                  <p className="mt-2 text-3xl font-bold text-slate-50">{p.price}</p>
                  <p className="mt-3 text-base leading-relaxed text-slate-300">{p.details}</p>
                </li>
              ))}
            </ul>
            <div className="mx-auto mt-8 max-w-3xl space-y-4">
              <p className={body}>
                Every package includes mobile-first design checked on phones and desktops, tap-to-call to your existing
                number, a contact form, a Google Map embed or link, basic on-page SEO (page titles, meta descriptions,
                local business schema), a private preview before launch, launch to your domain, 14 days of defect fixes,
                and a handoff. Included content is limited to what you supply or approve.
              </p>
              <p className={body}>
                Business ($1,997) may include service-specific pages within the 10-page limit, a quote form, analytics
                setup when you provide or approve the account and access, and a review or testimonial section only when
                real, verified, permissioned content is supplied. Premium (from $3,500) may include custom features based
                on the approved project scope.
              </p>
            </div>
          </div>
        </section>

        <section className={section}>
          <div className={`${inner} max-w-3xl space-y-12`}>
            <div>
              <h2 className={`${h2} mb-5`}>Add-ons</h2>
              <ul className="space-y-3">
                {ADDONS.map((a) => (
                  <li key={a} className={`${body} flex gap-3`}>
                    <span aria-hidden className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-neon-cyan" />
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className={`${h2} mb-5`}>Payment</h2>
              <p className={body}>50% to begin, 50% before launch. Quotes are valid for 30 calendar days.</p>
            </div>
            <div>
              <h2 className={`${h2} mb-5`}>Timeline</h2>
              <p className={body}>{TIMELINE}</p>
            </div>
            <div>
              <h2 className={`${h2} mb-5`}>Hosting, domain, and ownership</h2>
              <p className={`${body} mb-4`}>
                Hosting and domain are not included. You own both accounts, give us delegated access, and pay any
                third-party costs.
              </p>
              <p className={body}>{OWNERSHIP}</p>
            </div>
            <div>
              <h2 className={`${h2} mb-5`}>After launch</h2>
              <p className={body}>
                14 calendar days of bug fixes for defects in delivered work, then an optional care plan (see{" "}
                <Link to="/website-care" className="text-neon-cyan underline underline-offset-4 hover:text-slate-50">
                  /website-care
                </Link>
                ).
              </p>
            </div>
          </div>
        </section>

        <section className={`${section} bg-slate-900/40`} aria-labelledby="websites-faq-heading">
          <div className={`${inner} max-w-3xl`}>
            <h2 id="websites-faq-heading" className={`${h2} mb-8 text-center`}>
              FAQ
            </h2>
            <FaqList faqs={FAQS} />
          </div>
        </section>

        <section className={`${section} text-center`}>
          <Link to="/contact" className={primaryBtn}>
            Get a Website Quote
          </Link>
        </section>
      </main>
    </PageShell>
  );
}
