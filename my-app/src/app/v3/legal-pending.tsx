import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { PageShell } from "@/components/ui/page-shell";
import { SeoHead } from "@/components/seo/seo-head";
import { h1, inlineLink, inner, MAILING_ADDRESS, section } from "@/components/home-v3/v3-ui";
import { BUSINESS } from "@/lib/site-config";

/**
 * /privacy and /terms — INTERNAL DRAFT FOR DONATUS'S / COUNSEL'S REVIEW (prepared 2026-10-13).
 * No approved legal text existed (pages-copy-v3.md: "Left to counsel"; no earlier version in git history).
 * Drafted only from the site's actual practices as found in the code:
 *  - contact form → /api/contact → email via Resend to don@mercyspeaksdigital.com (no database, no PII logs);
 *  - hosting on Vercel; Geist fonts from Google Fonts; Cal.com scheduler embedded on /book-demo only;
 *  - no analytics, advertising pixels or tracking scripts are loaded; cookie-banner choice stored in localStorage.
 * Kept noindex and out of the sitemap until reviewed. No public "draft" banner by CEO instruction.
 */
const LAST_UPDATED = "October 13, 2026";

function LegalPage({ path, heading, children }: { path: "/privacy" | "/terms"; heading: string; children: ReactNode }) {
  return (
    <PageShell className="min-h-screen w-full bg-slate-950">
      <SeoHead
        path={path}
        title={`${heading} | Mercy Speaks Digital`}
        description={path === "/privacy" ? "How Mercy Speaks Digital collects, uses and protects the information you share through this website." : "The terms that apply when you use the Mercy Speaks Digital website and request our services."}
        noindex
      />
      <main className={`${section} pt-12 md:pt-20`}>
        <article className={`${inner} max-w-3xl`}>
          <h1 className={h1}>{heading}</h1>
          <p className="mt-4 text-sm text-slate-400">Last updated {LAST_UPDATED}</p>
          <div className="legal-body mt-10 space-y-5 text-base leading-relaxed text-slate-300 [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-white [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6">
            {children}
          </div>
        </article>
      </main>
    </PageShell>
  );
}

const contactBlock = (
  <p>
    Mercy Speaks Digital, {MAILING_ADDRESS.replace("Mercy Speaks Digital, ", "")} (mailing address) ·{" "}
    <a href={`mailto:${BUSINESS.email}`} className={inlineLink}>
      {BUSINESS.email}
    </a>{" "}
    · {BUSINESS.phoneDisplay}
  </p>
);

export function PrivacyPage() {
  return (
    <LegalPage path="/privacy" heading="Privacy">
      <p>
        This page explains what information Mercy Speaks Digital collects through this website, how we use it, and the
        choices you have.
      </p>
      <h2>Information you give us</h2>
      <p>
        When you use our contact form, we collect the details you enter: your name, email address, phone number,
        business type, the service you're interested in, and any message you write. If you book a call through our
        scheduler, the scheduling service collects the details you enter there.
      </p>
      <h2>How we use it</h2>
      <ul>
        <li>To reply to your inquiry, prepare a quote, or discuss the service you asked about.</li>
        <li>To keep a record of our conversation with you about a project.</li>
      </ul>
      <p>We do not sell your information, and we do not add you to a marketing list from the contact form.</p>
      <h2>Services that help us run this website</h2>
      <ul>
        <li>Vercel hosts this website and processes requests to it, including standard technical request logs.</li>
        <li>Resend delivers contact-form submissions to our business email inbox.</li>
        <li>Google Fonts provides the typeface used on this site, so your browser requests font files from Google.</li>
        <li>Cal.com provides the scheduler on our booking page, and only loads on that page.</li>
      </ul>
      <p>Each of these services handles data under its own privacy terms.</p>
      <h2>Cookies and similar technology</h2>
      <p>
        This website does not load analytics or advertising trackers. Your cookie-banner choice is saved in your
        browser. See our{" "}
        <Link to="/cookie-policy" className={inlineLink}>
          Cookie Policy
        </Link>{" "}
        for details.
      </p>
      <h2>How long we keep information</h2>
      <p>
        Contact-form messages are kept in our business email for as long as they are useful for the inquiry or project,
        or as needed for our business records.
      </p>
      <h2>Your choices</h2>
      <p>
        You can ask us to tell you what information we have about you from this website, to correct it, or to delete it,
        by emailing us at the address below.
      </p>
      <h2>Contact</h2>
      {contactBlock}
    </LegalPage>
  );
}

export function TermsPage() {
  return (
    <LegalPage path="/terms" heading="Terms">
      <p>These terms cover your use of the Mercy Speaks Digital website. By using the site, you agree to them.</p>
      <h2>Information on this site</h2>
      <p>
        We work to keep service descriptions, prices and terms on this site accurate. Prices and package details shown
        here are a summary; the written quote you receive, and any agreement you sign, describe the actual scope, price
        and terms of a project. Quotes are valid for 30 calendar days.
      </p>
      <h2>Projects and services</h2>
      <p>
        Website projects, care plans and pilot services are provided under a written quote or agreement. If anything on
        this website differs from your signed quote or agreement, the quote or agreement applies.
      </p>
      <h2>AI Receptionist pilot</h2>
      <p>
        The AI Receptionist is offered as a limited pilot. Its scope and terms are agreed in writing with each pilot
        business. It does not confirm appointments, and call transfers are attempted, not guaranteed.
      </p>
      <h2>Portfolio and links</h2>
      <p>
        Our portfolio shows projects labeled as client work or demo builds. Links to other websites are provided for
        reference; we are not responsible for the content of sites we don't operate.
      </p>
      <h2>Use of this site</h2>
      <p>
        Please don't misuse the site, for example by attempting to disrupt it or by submitting false or harmful content
        through the contact form. The site's design, text and code belong to Mercy Speaks Digital unless stated
        otherwise.
      </p>
      <h2>Changes</h2>
      <p>We may update these terms. The date at the top shows when they last changed.</p>
      <h2>Contact</h2>
      {contactBlock}
    </LegalPage>
  );
}

/** Kept for any older import. */
export function LegalPendingPage({ path, heading }: { path: "/privacy" | "/terms"; heading: string }) {
  return path === "/privacy" ? <PrivacyPage /> : heading ? <TermsPage /> : null;
}
