import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SeoHead } from "@/components/seo/seo-head";
import { PageShell } from "@/components/ui/page-shell";
import { BRAND_TAGLINE } from "@/lib/site-config";

/**
 * Proof and case studies live on /results. This route stays for legacy/bookmarks; canonical points there.
 */
export default function PortfolioPage() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/results", { replace: true });
  }, [navigate]);

  return (
    <PageShell className="min-h-screen bg-slate-950 flex flex-col items-center justify-center px-4 py-20">
      <SeoHead
        path="/portfolio"
        canonicalPath="/results"
        title="Portfolio"
        description="Case studies and proof now live on our Results page—outcomes, screenshots, and engagement details."
      />
      <main className="text-center max-w-lg space-y-4">
        <h1 className="text-2xl font-semibold text-slate-50">Portfolio has moved</h1>
        <p className="text-slate-400">
          See case studies and proof on the{" "}
          <Link to="/results" className="text-neon-cyan underline-offset-4 hover:underline">
            Results
          </Link>{" "}
          page. {BRAND_TAGLINE.slice(0, 120)}…
        </p>
        <p className="text-sm text-slate-500">
          If you are not redirected,{" "}
          <Link to="/results" className="text-electric-purple hover:underline">
            continue here
          </Link>
          .
        </p>
      </main>
    </PageShell>
  );
}
