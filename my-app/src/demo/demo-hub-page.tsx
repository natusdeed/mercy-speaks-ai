import { Link } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  Bot,
  CheckCircle2,
  Command,
  Megaphone,
  PhoneMissed,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { dashboardPanelClass } from "@/dashboard/lib/dashboard-styles";
import { cn } from "@/lib/utils";

type DemoHubCard = {
  title: string;
  href: string;
  description: string;
  eyebrow: string;
  icon: LucideIcon;
  accent: "cyan" | "violet" | "amber";
  isPublic?: boolean;
};

const DEMO_HUB_CARDS: DemoHubCard[] = [
  {
    title: "Command Center",
    href: "/demo/command-center",
    description: "Executive control room for AI employee performance, revenue signals, and owner-level decisions.",
    eyebrow: "Operations cockpit",
    icon: Command,
    accent: "cyan",
  },
  {
    title: "AI Employees",
    href: "/demo/ai-employees",
    description: "Preview the digital workforce roster, agent lanes, mock run volume, and success signals.",
    eyebrow: "Agent OS",
    icon: Bot,
    accent: "violet",
  },
  {
    title: "Lead Ops",
    href: "/demo/lead-ops",
    description: "Mock lead queue showing how AI can qualify, prioritize, and route high-intent opportunities.",
    eyebrow: "Pipeline control",
    icon: BarChart3,
    accent: "cyan",
  },
  {
    title: "Missed Revenue",
    href: "/demo/missed-revenue",
    description: "A recovery dashboard for abandoned calls, stale leads, and follow-up opportunities.",
    eyebrow: "Revenue recovery",
    icon: PhoneMissed,
    accent: "amber",
  },
  {
    title: "Approvals",
    href: "/demo/approvals",
    description: "Owner review queue for mock AI drafts, proposed follow-ups, and human-in-the-loop approvals.",
    eyebrow: "Human review",
    icon: CheckCircle2,
    accent: "violet",
  },
  {
    title: "Marketing & Social AI",
    href: "/demo/marketing-social",
    description: "Static content command center for campaign ideas, social drafts, and local visibility workflows.",
    eyebrow: "Growth engine",
    icon: Megaphone,
    accent: "cyan",
  },
  {
    title: "Public Sales Page",
    href: "/ai-employee-system",
    description: "Customer-facing AI Employee System page with the premium positioning and conversion story.",
    eyebrow: "Live marketing page",
    icon: Sparkles,
    accent: "violet",
    isPublic: true,
  },
];

const accentClasses = {
  cyan: {
    icon: "border-cyan-500/30 bg-cyan-500/10 text-cyan-200",
    glow: "from-cyan-500/35 via-cyan-500/10 to-transparent",
    text: "text-cyan-200",
  },
  violet: {
    icon: "border-violet-500/30 bg-violet-500/10 text-violet-200",
    glow: "from-violet-500/35 via-violet-500/10 to-transparent",
    text: "text-violet-200",
  },
  amber: {
    icon: "border-amber-500/30 bg-amber-500/10 text-amber-200",
    glow: "from-amber-500/30 via-amber-500/10 to-transparent",
    text: "text-amber-200",
  },
} as const;

function DemoCard({ card }: { card: DemoHubCard }) {
  const Icon = card.icon;
  const styles = accentClasses[card.accent];
  const content = (
    <Card
      className={cn(
        "group relative h-full overflow-hidden bg-zinc-950/55 backdrop-blur-md transition duration-200 hover:-translate-y-0.5 hover:border-zinc-700/90 hover:bg-zinc-950/75",
        dashboardPanelClass
      )}
    >
      <div className={cn("pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r", styles.glow)} />
      <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-cyan-500/10 blur-3xl transition duration-200 group-hover:bg-violet-500/15" />
      <CardContent className="relative flex h-full flex-col p-6">
        <div className="flex items-start justify-between gap-4">
          <span className={cn("flex h-12 w-12 items-center justify-center rounded-2xl border", styles.icon)}>
            <Icon className="h-5 w-5" aria-hidden />
          </span>
          {card.isPublic ? (
            <span className="rounded-full border border-zinc-700 bg-zinc-900/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-300">
              Public
            </span>
          ) : null}
        </div>

        <div className="mt-6 flex-1">
          <p className={cn("text-[11px] font-semibold uppercase tracking-[0.16em]", styles.text)}>
            {card.eyebrow}
          </p>
          <h2 className="mt-2 text-xl font-semibold tracking-tight text-zinc-50">{card.title}</h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400">{card.description}</p>
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-zinc-800/80 pt-4 text-sm font-medium text-zinc-200">
          <span>Open preview</span>
          <ArrowRight className="h-4 w-4 text-zinc-500 transition group-hover:translate-x-1 group-hover:text-zinc-200" aria-hidden />
        </div>
      </CardContent>
    </Card>
  );

  if (card.isPublic) {
    return (
      <a href={card.href} className="block h-full rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400/60">
        {content}
      </a>
    );
  }

  return (
    <Link to={card.href} className="block h-full rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400/60">
      {content}
    </Link>
  );
}

export function DemoHubPage() {
  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-3xl border border-zinc-800/80 bg-zinc-950/70 px-6 py-10 shadow-[0_0_80px_-40px_rgba(6,182,212,0.65)] backdrop-blur-md md:px-10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(6,182,212,0.18),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(139,92,246,0.18),transparent_32%)]" />
        <div className="relative max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-200">
            MercySpeaks AI Demo Hub
          </p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-zinc-50 md:text-5xl">
            One premium launchpad for every AI Employee mock preview.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-400">
            Use this local hub to review the demo experience, jump between static AI employee screens, and keep the
            sales story organized while database wiring remains blocked.
          </p>
        </div>
      </section>

      <section aria-label="Demo pages" className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {DEMO_HUB_CARDS.map((card) => (
          <DemoCard key={card.href} card={card} />
        ))}
      </section>
    </div>
  );
}
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { DashboardPageHeader } from "@/dashboard/components/dashboard-page-header";
import { dashboardPanelClass } from "@/dashboard/lib/dashboard-styles";
import { cn } from "@/lib/utils";
import {
  ArrowUpRight,
  Bot,
  ClipboardCheck,
  ExternalLink,
  LayoutDashboard,
  Megaphone,
  Sparkles,
  TrendingDown,
  Users,
} from "lucide-react";
import type { ComponentType, SVGProps } from "react";

type DemoAccent = "cyan" | "violet" | "amber" | "rose" | "emerald" | "sky" | "fuchsia";

type DemoCard = {
  id: string;
  title: string;
  description: string;
  href: string;
  external: boolean;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  accent: DemoAccent;
  badge: string;
};

const DEMO_CARDS: DemoCard[] = [
  {
    id: "command-center",
    title: "Command Center",
    description:
      "Executive overview of every AI lane — runs, success rate, escalations, and revenue saved at a glance.",
    href: "/demo/command-center",
    external: false,
    icon: LayoutDashboard,
    accent: "cyan",
    badge: "Overview",
  },
  {
    id: "ai-employees",
    title: "AI Employees",
    description:
      "The digital workforce roster. See each specialized agent, the lane it owns, and its mock performance.",
    href: "/demo/ai-employees",
    external: false,
    icon: Bot,
    accent: "violet",
    badge: "Workforce",
  },
  {
    id: "lead-ops",
    title: "Lead Ops",
    description:
      "Inbound capture, qualification, and routing — how new leads move from first touch to booked appointment.",
    href: "/demo/lead-ops",
    external: false,
    icon: Users,
    accent: "sky",
    badge: "Pipeline",
  },
  {
    id: "missed-revenue",
    title: "Missed Revenue",
    description:
      "Recovered opportunities, no-shows, and after-hours calls. The dollar value Mercy AI claws back every day.",
    href: "/demo/missed-revenue",
    external: false,
    icon: TrendingDown,
    accent: "rose",
    badge: "Recovery",
  },
  {
    id: "approvals",
    title: "Approvals",
    description:
      "Owner review queue — high-stakes drafts and outbound actions wait here for a one-click yes or no.",
    href: "/demo/approvals",
    external: false,
    icon: ClipboardCheck,
    accent: "amber",
    badge: "Human-in-the-loop",
  },
  {
    id: "marketing-social",
    title: "Marketing & Social AI",
    description:
      "Social posts, review responses, and outbound campaigns drafted by Mercy — staged for approval, never auto-sent.",
    href: "/demo/marketing-social",
    external: false,
    icon: Megaphone,
    accent: "fuchsia",
    badge: "Outbound",
  },
  {
    id: "public-sales",
    title: "Public Sales Page",
    description:
      "The customer-facing pitch for the AI Employee System — what prospects see before they book a demo.",
    href: "/ai-employee-system",
    external: true,
    icon: Sparkles,
    accent: "emerald",
    badge: "Public site",
  },
];

const ACCENT_RING: Record<DemoAccent, string> = {
  cyan: "ring-1 ring-cyan-500/25 hover:ring-cyan-400/50 shadow-[0_0_50px_-18px_rgba(6,182,212,0.45)]",
  violet:
    "ring-1 ring-violet-500/25 hover:ring-violet-400/50 shadow-[0_0_50px_-18px_rgba(139,92,246,0.45)]",
  sky: "ring-1 ring-sky-500/25 hover:ring-sky-400/50 shadow-[0_0_50px_-18px_rgba(14,165,233,0.45)]",
  rose: "ring-1 ring-rose-500/25 hover:ring-rose-400/50 shadow-[0_0_50px_-18px_rgba(244,63,94,0.45)]",
  amber:
    "ring-1 ring-amber-500/25 hover:ring-amber-400/50 shadow-[0_0_50px_-18px_rgba(245,158,11,0.45)]",
  fuchsia:
    "ring-1 ring-fuchsia-500/25 hover:ring-fuchsia-400/50 shadow-[0_0_50px_-18px_rgba(217,70,239,0.45)]",
  emerald:
    "ring-1 ring-emerald-500/25 hover:ring-emerald-400/50 shadow-[0_0_50px_-18px_rgba(16,185,129,0.45)]",
};

const ACCENT_BAR: Record<DemoAccent, string> = {
  cyan: "from-cyan-500/80 to-cyan-500/0",
  violet: "from-violet-500/80 to-violet-500/0",
  sky: "from-sky-500/80 to-sky-500/0",
  rose: "from-rose-500/80 to-rose-500/0",
  amber: "from-amber-500/80 to-amber-500/0",
  fuchsia: "from-fuchsia-500/80 to-fuchsia-500/0",
  emerald: "from-emerald-500/80 to-emerald-500/0",
};

const ACCENT_ICON: Record<DemoAccent, string> = {
  cyan: "border-cyan-500/35 text-cyan-300",
  violet: "border-violet-500/35 text-violet-300",
  sky: "border-sky-500/35 text-sky-300",
  rose: "border-rose-500/35 text-rose-300",
  amber: "border-amber-500/35 text-amber-300",
  fuchsia: "border-fuchsia-500/35 text-fuchsia-300",
  emerald: "border-emerald-500/35 text-emerald-300",
};

const ACCENT_PILL: Record<DemoAccent, string> = {
  cyan: "border-cyan-500/30 bg-cyan-500/10 text-cyan-200",
  violet: "border-violet-500/30 bg-violet-500/10 text-violet-200",
  sky: "border-sky-500/30 bg-sky-500/10 text-sky-200",
  rose: "border-rose-500/30 bg-rose-500/10 text-rose-200",
  amber: "border-amber-500/30 bg-amber-500/10 text-amber-200",
  fuchsia: "border-fuchsia-500/30 bg-fuchsia-500/10 text-fuchsia-200",
  emerald: "border-emerald-500/30 bg-emerald-500/10 text-emerald-200",
};

function DemoCardBody({ card }: { card: DemoCard }) {
  const Icon = card.icon;
  const ArrowIcon = card.external ? ExternalLink : ArrowUpRight;

  return (
    <Card
      className={cn(
        "group relative h-full overflow-hidden bg-zinc-950/40 backdrop-blur-md transition-all duration-200",
        "hover:-translate-y-0.5 hover:bg-zinc-950/60",
        dashboardPanelClass,
        ACCENT_RING[card.accent]
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 h-1 bg-linear-to-r",
          ACCENT_BAR[card.accent]
        )}
      />
      <CardContent className="flex h-full flex-col gap-4 p-6">
        <div className="flex items-start justify-between gap-3">
          <span
            className={cn(
              "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border bg-zinc-900/80",
              ACCENT_ICON[card.accent]
            )}
          >
            <Icon className="h-5 w-5" aria-hidden />
          </span>
          <span
            className={cn(
              "shrink-0 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
              ACCENT_PILL[card.accent]
            )}
          >
            {card.badge}
          </span>
        </div>

        <div className="space-y-2">
          <h3 className="text-base font-semibold tracking-tight text-zinc-50">{card.title}</h3>
          <p className="text-sm leading-relaxed text-zinc-400">{card.description}</p>
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-zinc-800/80 pt-4 text-xs text-zinc-500">
          <span className="font-mono text-[11px] tracking-tight text-zinc-600">{card.href}</span>
          <span className="inline-flex items-center gap-1 text-zinc-400 transition-colors group-hover:text-zinc-100">
            {card.external ? "Open page" : "Open demo"}
            <ArrowIcon
              className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden
            />
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

export function DemoHubPage() {
  return (
    <div className="space-y-10">
      <DashboardPageHeader
        eyebrow="Demo Hub"
        title="Mercy AI — local preview"
        description="One clean entry point into every AI Employee mock page. Use this as a launchpad while the production database remains gated. Nothing on these pages reads or writes Supabase."
        actions={
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-100">
            <Sparkles className="h-3.5 w-3.5 text-amber-200" aria-hidden />
            Mock data only
          </span>
        }
      />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {DEMO_CARDS.map((card) =>
          card.external ? (
            <a
              key={card.id}
              href={card.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block h-full rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              aria-label={`${card.title} (opens in new tab)`}
            >
              <DemoCardBody card={card} />
            </a>
          ) : (
            <Link
              key={card.id}
              to={card.href}
              className="block h-full rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              aria-label={`Open ${card.title} demo`}
            >
              <DemoCardBody card={card} />
            </Link>
          )
        )}
      </div>

      <footer className="rounded-xl border border-zinc-800/80 bg-zinc-950/40 p-5 text-xs leading-relaxed text-zinc-500">
        <p>
          <span className="font-medium text-zinc-300">Safety notes.</span> These pages never send email,
          SMS, bookings, or social posts. They do not connect to Supabase, ElevenLabs, or any external
          service. Live database wiring is gated on
          {" "}
          <span className="font-mono text-zinc-400">PHASE_3_DATABASE_BLOCKER.md</span> in the repo root.
        </p>
      </footer>
    </div>
  );
}

export default DemoHubPage;
