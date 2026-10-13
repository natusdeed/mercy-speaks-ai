import { PageShell } from "@/components/ui/page-shell";
import { SeoHead } from "@/components/seo/seo-head";
import { h1, inner, section } from "@/components/home-v3/v3-ui";

/**
 * /privacy and /terms — pages-copy-v3.md: "Left to counsel. No draft text."
 * Heading-only placeholder (noindex) so footer links resolve; no legal text is drafted here.
 */
export function LegalPendingPage({ path, heading }: { path: "/privacy" | "/terms"; heading: string }) {
  return (
    <PageShell className="min-h-screen w-full bg-slate-950">
      <SeoHead path={path} title={`${heading} | Mercy Speaks Digital`} noindex />
      <main className={`${section} pt-12 md:pt-20`}>
        <h1 className={`${h1} ${inner}`}>{heading}</h1>
      </main>
    </PageShell>
  );
}

export function PrivacyPage() {
  return <LegalPendingPage path="/privacy" heading="Privacy" />;
}

export function TermsPage() {
  return <LegalPendingPage path="/terms" heading="Terms" />;
}
