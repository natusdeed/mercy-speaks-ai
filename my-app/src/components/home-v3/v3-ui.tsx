/** Shared V3 (Project #001) styles + small presentational pieces. Static markup only. */
export const primaryBtn =
  "inline-flex min-h-12 w-full sm:w-auto items-center justify-center rounded-xl bg-violet-700 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-electric-purple/25 transition-colors hover:bg-violet-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950";
export const secondaryBtn =
  "inline-flex min-h-12 w-full sm:w-auto items-center justify-center rounded-xl border border-slate-600 px-6 py-3 text-base font-semibold text-slate-100 transition-colors hover:border-slate-400 hover:bg-slate-800/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950";
export const textLink =
  "inline-flex min-h-11 items-center font-medium text-neon-cyan underline underline-offset-4 hover:text-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-cyan rounded";
export const section = "px-4 sm:px-6 lg:px-8 py-14 md:py-20";
export const inner = "mx-auto w-full max-w-6xl";
export const h2 = "text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-50";
export const h1 = "mb-5 text-3xl font-bold leading-[1.12] tracking-tight text-slate-50 sm:text-4xl md:text-5xl";
export const body = "text-base leading-relaxed text-slate-300 md:text-lg";
export const smallPrint = "text-sm leading-relaxed text-slate-400";
export const card = "rounded-2xl border border-slate-700 bg-slate-900/60 p-6";
export const cardRecommended = "rounded-2xl border border-electric-purple bg-electric-purple/10 p-6";

export function RecommendedBadge() {
  return (
    <span className="ml-2 inline-block rounded-full bg-violet-700 px-2.5 py-0.5 align-middle text-xs font-semibold text-white">
      Recommended
    </span>
  );
}

export function FaqList({ faqs }: { faqs: readonly { question: string; answer: string }[] }) {
  return (
    <div className="space-y-3">
      {faqs.map((f) => (
        <details key={f.question} className="group rounded-xl border border-slate-700 bg-slate-900/60">
          <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 rounded-xl px-5 py-3 text-base font-semibold text-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-cyan md:text-lg">
            <span>{f.question}</span>
            <span aria-hidden className="text-xl text-neon-cyan transition-transform group-open:rotate-45">
              +
            </span>
          </summary>
          <p className="px-5 pb-5 text-base leading-relaxed text-slate-300">{f.answer}</p>
        </details>
      ))}
    </div>
  );
}

export const MAILING_ADDRESS = "Mercy Speaks Digital, 5554 S Peek Road, PMB #2144, Katy, TX 77450";
