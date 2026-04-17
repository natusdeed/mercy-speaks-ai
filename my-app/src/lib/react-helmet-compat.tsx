import * as HelmetAsync from "react-helmet-async";
import type { ComponentType, PropsWithChildren } from "react";

/**
 * Namespace import avoids Node/tsx prerender failing with
 * "does not provide an export named 'Helmet'" when the package resolves as CJS.
 * (Vite still bundles the ESM build; property access is fine for both.)
 */
const HelmetBase = HelmetAsync.Helmet;
const HelmetProviderBase = HelmetAsync.HelmetProvider;

/**
 * react-helmet-async types still model class components; React 19 JSX expects a compatible construct type.
 * Narrow re-exports keep runtime identical while satisfying tsc.
 */
export const HelmetProvider = HelmetProviderBase as unknown as ComponentType<
  PropsWithChildren<{ context?: { helmet?: unknown } }>
>;

export const Helmet = HelmetBase as unknown as ComponentType<PropsWithChildren>;
