import { Link } from "react-router-dom";
import { PageShell } from "@/components/ui/page-shell";
import { SeoHead } from "@/components/seo/seo-head";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, faqPageSchema } from "@/lib/schema";
import { body, divided, FaqList, h2, inlineLink, inner, narrow, PageHero, PriceColumns, primaryBtn, QuietList, section } from "@/components/home-v3/v3-ui";

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
        <PageHero
          title="Conversion websites for growing businesses"
          intro="Fast, modern websites that make it easy for the people who find you to call, request a quote, or request an appointment."
        >
          <Link to="/contact" className={primaryBtn}>
            Get a Website Quote
          </Link>
        </PageHero>

        <section className={`${section} ${divided}`} aria-labelledby="packages-heading">
          <div className={inner}>
            <h2 id="packages-heading" className={`${h2} mb-10`}>
              Packages
            </h2>
            <PriceColumns items={PACKAGES} />
            <div className="mt-10 max-w-3xl mx-0 space-y-5">
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

        <section className={`${section} ${divided}`}>
          <div className={`${inner} grid gap-14 md:grid-cols-[1fr_2fr] md:gap-x-16`}>
            <h2 className={h2}>Add-ons</h2>
            <QuietList items={ADDONS} />

            <h2 className={h2}>Payment</h2>
            <p className={body}>50% to begin, 50% before launch. Quotes are valid for 30 calendar days.</p>

            <h2 className={h2}>Timeline</h2>
            <p className={body}>{TIMELINE}</p>

            <h2 className={h2}>Hosting, domain, and ownership</h2>
            <div className="space-y-5">
              <p className={body}>
                Hosting and domain are not included. You own both accounts, give us delegated access, and pay any
                third-party costs.
              </p>
              <p className={body}>{OWNERSHIP}</p>
            </div>

            <h2 className={h2}>After launch</h2>
            <p className={body}>
              14 calendar days of bug fixes for defects in delivered work, then an optional care plan (see{" "}
              <Link to="/website-care" className={inlineLink}>
                /website-care
              </Link>
              ).
            </p>
          </div>
        </section>

        <section className={`${section} ${divided}`} aria-labelledby="websites-faq-heading">
          <div className={narrow}>
            <h2 id="websites-faq-heading" className={`${h2} mb-8`}>
              FAQ
            </h2>
            <FaqList faqs={FAQS} />
          </div>
        </section>

        <section className={`${section} ${divided}`}>
          <div className={inner}>
            <Link to="/contact" className={primaryBtn}>
              Get a Website Quote
            </Link>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
