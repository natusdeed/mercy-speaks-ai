import type { DetailedHTMLProps, HTMLAttributes } from "react";

/** Custom element from ElevenLabs embed script (see ElevenLabsWidgetMount). */
declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "elevenlabs-convai": DetailedHTMLProps<
        HTMLAttributes<HTMLElement> & { "agent-id"?: string },
        HTMLElement
      >;
    }
  }
}

export {};
