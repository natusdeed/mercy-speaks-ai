import type { ComponentType, PropsWithChildren } from "react";
import { createRequire } from "node:module";

/**
 * Node (tsx prerender): load the CommonJS build via `require` so nothing emits
 * `import { Helmet } from "react-helmet-async"` — esbuild/tsx can rewrite namespace imports
 * to named ESM imports, which then fail against the CJS build with "does not provide an export named 'Helmet'".
 */
const require = createRequire(import.meta.url);
const rh = require("react-helmet-async") as typeof import("react-helmet-async");

export const HelmetProvider = rh.HelmetProvider as unknown as ComponentType<
  PropsWithChildren<{ context?: { helmet?: unknown } }>
>;

export const Helmet = rh.Helmet as unknown as ComponentType<PropsWithChildren>;
