import type { ComponentType, PropsWithChildren } from "react";
import { Helmet as HelmetBase, HelmetProvider as HelmetProviderBase } from "react-helmet-async";

/**
 * Client / Vite bundle: use the package ESM entry (Rollup resolves `exports` correctly).
 * react-helmet-async types still model class components; React 19 JSX expects a compatible construct type.
 */
export const HelmetProvider = HelmetProviderBase as unknown as ComponentType<
  PropsWithChildren<{ context?: { helmet?: unknown } }>
>;

export const Helmet = HelmetBase as unknown as ComponentType<PropsWithChildren>;
