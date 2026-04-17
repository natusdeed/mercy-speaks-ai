import type { ReactNode } from "react";
import { CornerDownRight } from "lucide-react";
import { cn } from "@/lib/utils";

type ServicePairCalloutProps = {
  children: ReactNode;
  className?: string;
};

/** Subtle info banner for upsell / cross-sell pairings (not a CTA button). */
export function ServicePairCallout({ children, className }: ServicePairCalloutProps) {
  return (
    <div
      role="note"
      className={cn(
        "mt-5 rounded-xl border border-sky-500/25 bg-sky-500/10 px-4 py-3.5 flex gap-3 items-start backdrop-blur-sm text-left max-w-2xl",
        className
      )}
    >
      <CornerDownRight className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" aria-hidden />
      <p className="text-sm sm:text-base text-sky-100/90 leading-relaxed">{children}</p>
    </div>
  );
}
