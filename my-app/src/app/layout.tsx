import type { ReactNode } from "react";
import { SiteChatWidget } from "@/components/SiteChatWidget";

export function RootLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <SiteChatWidget />
    </>
  );
}
