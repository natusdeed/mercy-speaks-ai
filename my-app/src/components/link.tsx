'use client';

import NextLink from 'next/link';
import type { ComponentProps } from 'react';

/** Next.js Link compatible with react-router-dom usage: "to" prop maps to href. */
export function Link({
  to,
  href,
  ...rest
}: ComponentProps<typeof NextLink> & { to?: string }) {
  return <NextLink href={href ?? to ?? '#'} {...rest} />;
}
