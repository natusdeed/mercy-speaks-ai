"use client";

import type { ReactNode } from "react";

type AnimatedWidgetWrapperProps = {
  children: ReactNode;
};

/**
 * Decorative shell for the ConvAI widget: fixed anchor matches the widget host,
 * pulse ring sits behind (z-99), widget stays z-100. Animations target the
 * widget root via [&>div] without modifying ElevenLabsWidget.tsx.
 */
export function AnimatedWidgetWrapper({ children }: AnimatedWidgetWrapperProps) {
  return (
    <div
      className="pointer-events-none fixed bottom-[max(1.5rem,env(safe-area-inset-bottom,0px))] right-6 z-100 h-0 w-0 max-w-full overflow-visible has-[:hover]:[&>div]:paused [&>div]:animate-convai-widget-host"
    >
      {/* Effect 1 — pulse glow ring (behind widget) */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 flex h-32 w-32 items-center justify-center"
      >
        <span className="animate-convai-glow-ring pointer-events-none absolute inline-flex h-16 w-16 rounded-full border-2 border-neon-cyan/50 bg-linear-to-br from-amber-400/25 via-neon-cyan/20 to-electric-purple/25 shadow-[0_0_24px_rgba(6,182,212,0.35)]" />
        <span className="animate-convai-glow-ring-delayed pointer-events-none absolute inline-flex h-16 w-16 rounded-full border border-amber-300/40 opacity-80" />
      </div>

      {children}
    </div>
  );
}
