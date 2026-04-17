import type { ReactNode } from "react";
import { ElevenLabsWidget } from "@/components/ElevenLabsWidget";

export function RootLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <ElevenLabsWidget />
    </>
  );
}
