import { BUSINESS } from "@/lib/site-config";

/**
 * Short, scannable summary for humans and answer engines—placed high on the homepage.
 */
export function EntitySummaryStrip() {
  return (
    <section
      className="section py-8 sm:py-10 border-y border-slate-800/40 bg-slate-900/20"
      aria-labelledby="entity-summary-heading"
    >
      <div className="section-inner max-w-4xl mx-auto text-center px-1">
        <h2 id="entity-summary-heading" className="sr-only">
          What Mercy Speaks Digital does
        </h2>
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
          <span className="font-semibold text-slate-100">{BUSINESS.name}</span> is a U.S.-based digital agency. We build
          conversion-ready websites and storefronts, install AI phone receptionists, and automate follow-up so inbound
          leads move to a booked outcome. Based in the Houston metro (Richmond, TX); serving businesses nationwide.
        </p>
      </div>
    </section>
  );
}
