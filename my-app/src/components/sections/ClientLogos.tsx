// TODO: Replace placeholder boxes with actual client logo images

const PLACEHOLDER_CLIENTS = [
  "Houston Legal Group",
  "Bayou Auto Care",
  "Gulf Coast HVAC",
  "Heights Plumbing Co.",
  "Sugar Land Dental",
] as const;

export function ClientLogos() {
  return (
    <section className="section bg-slate-950" aria-labelledby="client-logos-heading">
      <div className="section-inner max-w-5xl mx-auto">
        <h2
          id="client-logos-heading"
          className="text-center text-sm font-semibold uppercase tracking-widest text-slate-500 mb-8"
        >
          Trusted by local businesses across Houston
        </h2>
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
          {PLACEHOLDER_CLIENTS.map((name) => (
            <li key={name}>
              <div className="flex h-16 md:h-20 items-center justify-center rounded-xl border border-slate-700/80 bg-slate-800/50 px-3 text-center shadow-inner">
                <span className="text-xs font-medium text-slate-400 leading-snug">{name}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
