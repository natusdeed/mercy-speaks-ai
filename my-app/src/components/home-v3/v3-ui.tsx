import type { ReactNode } from "react";

/**
 * Project #001 V3 design system — "premium, quiet, conversion-focused".
 * One accent (violet) used sparingly; white primary CTA; hairline dividers instead of filled bands/cards;
 * no gradients, glows, motion, or decorative icons. Static markup only.
 */
const focus =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950";
export const primaryBtn = `inline-flex min-h-12 w-full sm:w-auto items-center justify-center rounded-lg bg-white px-6 py-3 text-base font-semibold text-slate-950 transition-colors hover:bg-slate-200 ${focus}`;
export const secondaryBtn = `inline-flex min-h-12 w-full sm:w-auto items-center justify-center rounded-lg border border-slate-700 px-6 py-3 text-base font-medium text-slate-100 transition-colors hover:border-slate-500 ${focus}`;
export const textLink = `inline-flex min-h-11 items-center font-medium text-slate-100 underline decoration-slate-500 underline-offset-4 hover:decoration-slate-200 rounded ${focus}`;
export const inlineLink = "text-slate-100 underline decoration-slate-500 underline-offset-4 hover:decoration-slate-200";
export const section = "px-5 sm:px-8 py-16 md:py-24";
export const divided = "border-t border-slate-800";
export const inner = "mx-auto w-full max-w-5xl";
export const narrow = "mx-auto w-full max-w-5xl";
export const eyebrow = "mb-3 text-sm font-medium tracking-wide text-slate-400";
export const h1 = "text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl";
export const h2 = "text-2xl font-semibold tracking-tight text-white sm:text-3xl";
export const h3 = "text-lg font-semibold text-white";
export const body = "text-base leading-relaxed text-slate-300 md:text-lg";
export const smallPrint = "text-sm leading-relaxed text-slate-400";
// Kept for compatibility with the contact page wrapper.
export const card = "rounded-xl border border-slate-800 p-6";

export function RecommendedBadge() {
  return <span className="ml-2 inline-block align-middle text-sm font-medium text-violet-300">Recommended</span>;
}

/** Plain divided list — no icons, no neon dots. */
export function QuietList({ items }: { items: readonly string[] }) {
  return (
    <ul className="divide-y divide-slate-800 border-y border-slate-800">
      {items.map((t) => (
        <li key={t} className={`${body} py-4`}>
          {t}
        </li>
      ))}
    </ul>
  );
}

/** Price table: rows on mobile, columns on desktop. One visual idea: name, price, what you get. */
export function PriceColumns({
  items,
  cols = 3,
}: {
  items: readonly { name: string; price: string; details: string; recommended?: boolean }[];
  cols?: 2 | 3;
}) {
  return (
    <ul
      className={`grid grid-cols-1 divide-y divide-slate-800 border-y border-slate-800 md:divide-x md:divide-y-0 ${
        cols === 3 ? "md:grid-cols-3" : "md:grid-cols-2"
      }`}
    >
      {items.map((p) => (
        <li key={p.name} className="py-8 md:px-8 md:first:pl-0 md:last:pr-0">
          <h3 className={h3}>
            {p.name}
            {p.recommended && <RecommendedBadge />}
          </h3>
          <p className="mt-3 text-3xl font-semibold tracking-tight text-white">{p.price}</p>
          <p className="mt-4 text-base leading-relaxed text-slate-300">{p.details}</p>
        </li>
      ))}
    </ul>
  );
}

export function FaqList({ faqs }: { faqs: readonly { question: string; answer: string }[] }) {
  return (
    <div className="max-w-3xl mx-0 divide-y divide-slate-800 border-y border-slate-800">
      {faqs.map((f) => (
        <details key={f.question} className="group">
          <summary
            className={`flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 py-4 text-base font-medium text-white md:text-lg ${focus}`}
          >
            <span>{f.question}</span>
            <span aria-hidden className="text-xl font-light text-slate-400 transition-transform group-open:rotate-45">
              +
            </span>
          </summary>
          <p className="pb-6 pr-8 text-base leading-relaxed text-slate-300">{f.answer}</p>
        </details>
      ))}
    </div>
  );
}

export function PageHero({ title, intro, children }: { title: string; intro: ReactNode; children?: ReactNode }) {
  return (
    <section className={`${section} pt-12 md:pt-20`} aria-labelledby="page-heading">
      <div className={inner}>
        <h1 id="page-heading" className={`${h1} max-w-3xl mx-0`}>
          {title}
        </h1>
        <p className={`${body} mt-6 max-w-2xl mx-0`}>{intro}</p>
        {children && <div className="mt-10">{children}</div>}
      </div>
    </section>
  );
}

export const MAILING_ADDRESS = "Mercy Speaks Digital, 5554 S Peek Road, PMB #2144, Katy, TX 77450";
