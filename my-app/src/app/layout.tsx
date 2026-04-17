import type { ReactNode } from "react";
import { AnimatedWidgetWrapper } from "@/components/AnimatedWidgetWrapper";
import { ElevenLabsWidget } from "@/components/ElevenLabsWidget";

export function RootLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <AnimatedWidgetWrapper>
        <ElevenLabsWidget />
      </AnimatedWidgetWrapper>
    </>
  );
}
