"use client";

import { useEffect, useId } from "react";
import { CAL_COM_EMBED } from "@/lib/site-config";
import { cn } from "@/lib/utils";

type CalInlineEmbedProps = {
  className?: string;
};

/**
 * Inline Cal.com scheduler via their public embed script (no npm package).
 * Parent pages should still show a fallback link to {@link CAL_COM_EMBED.url}.
 */
export function CalInlineEmbed({ className }: CalInlineEmbedProps) {
  const reactId = useId().replace(/:/g, "");
  const elementId = `cal-inline-${reactId}`;
  const namespace = `bookDemo${reactId}`;

  useEffect(() => {
    type CalFn = ((...args: unknown[]) => void) & {
      loaded?: boolean;
      ns?: Record<string, CalFn>;
      q?: unknown[];
    };

    const w = window as Window & { Cal?: CalFn };

    // Official Cal.com bootstrap (namespaced)
    (function (C: Window & { Cal?: CalFn }, A: string, L: string) {
      const p = (a: CalFn, ar: IArguments | unknown[]) => {
        a.q = a.q || [];
        a.q.push(ar);
      };
      const d = C.document;
      C.Cal =
        C.Cal ||
        function (...args: unknown[]) {
          const cal = C.Cal!;
          if (!cal.loaded) {
            cal.ns = {};
            cal.q = cal.q || [];
            d.head.appendChild(d.createElement("script")).src = A;
            cal.loaded = true;
          }
          if (args[0] === L) {
            const api = function (...apiArgs: unknown[]) {
              p(api as CalFn, apiArgs);
            } as CalFn;
            const ns = args[1];
            api.q = api.q || [];
            if (typeof ns === "string") {
              cal.ns = cal.ns || {};
              cal.ns[ns] = cal.ns[ns] || api;
              p(api, args);
              p(cal, ["initNamespace", ns]);
            } else {
              p(cal, args);
            }
            return;
          }
          p(cal, args);
        } as CalFn;
    })(w, CAL_COM_EMBED.embedScriptSrc, "init");

    const Cal = w.Cal;
    if (!Cal) return;

    Cal("init", namespace, { origin: CAL_COM_EMBED.origin });
    Cal.ns?.[namespace]?.("inline", {
      elementOrSelector: `#${elementId}`,
      calLink: CAL_COM_EMBED.calLink,
      config: { layout: "month_view", theme: "dark" },
    });
    Cal.ns?.[namespace]?.("ui", {
      theme: "dark",
      hideEventTypeDetails: false,
      layout: "month_view",
    });
  }, [elementId, namespace]);

  return (
    <div
      id={elementId}
      className={cn("h-full min-h-[620px] w-full overflow-auto", className)}
    />
  );
}
