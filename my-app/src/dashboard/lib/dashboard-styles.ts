import { cn } from "@/lib/utils";

/** Primary app canvas — aligns with slate-950 / #020617 executive shell */
export const dashboardCanvasClass = "bg-slate-950 text-zinc-100";

/** Card-style panels (tables, forms, filters) */
export const dashboardPanelClass =
  "rounded-xl border border-zinc-800/80 bg-zinc-950/50 shadow-none";

/** Standard text inputs */
export const dashboardInputClass = cn(
  "h-10 w-full rounded-md border border-zinc-800 bg-zinc-950/60 px-3 text-sm text-zinc-100",
  "placeholder:text-zinc-600",
  "focus:border-zinc-600 focus:outline-none focus:ring-1 focus:ring-zinc-500/30"
);

/** Compact inputs (dialogs, dense grids) */
export const dashboardInputSmClass = cn(
  "h-9 w-full rounded-md border border-zinc-800 bg-zinc-950/60 px-2 text-sm text-zinc-100",
  "placeholder:text-zinc-600",
  "focus:border-zinc-600 focus:outline-none focus:ring-1 focus:ring-zinc-500/30"
);

/** Native selects — table cells and forms */
export const dashboardSelectClass = cn(
  "rounded-md border border-zinc-800 bg-zinc-950/60 px-2 py-1.5 text-xs text-zinc-200",
  "focus:border-zinc-600 focus:outline-none focus:ring-1 focus:ring-zinc-500/30"
);

export const dashboardSelectMdClass = cn(
  "h-10 w-full rounded-md border border-zinc-800 bg-zinc-950/60 px-3 text-sm text-zinc-200",
  "focus:border-zinc-600 focus:outline-none focus:ring-1 focus:ring-zinc-500/30"
);

export const dashboardSelectSmClass = cn(
  "h-9 w-full rounded-md border border-zinc-800 bg-zinc-950/60 px-2 text-sm text-zinc-200",
  "focus:border-zinc-600 focus:outline-none focus:ring-1 focus:ring-zinc-500/30"
);

export const dashboardTextareaClass = cn(
  "w-full rounded-md border border-zinc-800 bg-zinc-950/60 px-2 py-2 text-sm text-zinc-100",
  "placeholder:text-zinc-600",
  "focus:border-zinc-600 focus:outline-none focus:ring-1 focus:ring-zinc-500/30"
);

/** Data table primitives */
export const dashboardTableClass = "w-full min-w-[960px] text-left text-sm";

export const dashboardTableHeadRowClass =
  "border-b border-zinc-800 bg-zinc-950/90 text-xs font-medium uppercase tracking-wider text-zinc-500";

export const dashboardTableBodyRowClass =
  "border-b border-zinc-800/50 text-zinc-300 transition-colors hover:bg-zinc-900/35";

export const dashboardTableThClass = "px-4 py-3 font-medium";
export const dashboardTableTdClass = "px-4 py-3 align-middle";
