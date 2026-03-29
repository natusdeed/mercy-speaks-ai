import {
  Helmet as HelmetBase,
  HelmetProvider as HelmetProviderBase,
} from "react-helmet-async";
import type { ComponentType, PropsWithChildren } from "react";

/**
 * react-helmet-async types still model class components; React 19 JSX expects a compatible construct type.
 * Narrow re-exports keep runtime identical while satisfying tsc.
 */
export const HelmetProvider = HelmetProviderBase as unknown as ComponentType<
  PropsWithChildren<{ context?: { helmet?: unknown } }>
>;

export const Helmet = HelmetBase as unknown as ComponentType<PropsWithChildren>;
