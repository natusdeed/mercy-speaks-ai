/** Shared blog types — used by the generator and the runtime registry. */

export type BlogHeading = {
  id: string;
  text: string;
};

export type BlogFaq = {
  question: string;
  answer: string;
};

export type BlogPostMeta = {
  slug: string;
  path: `/blog/${string}`;
  title: string;
  description: string;
  /**
   * Optional SEO `<title>` (≤60 chars recommended). Falls back to `title`.
   * H1 always uses `title`.
   */
  metaTitle?: string;
  /** ISO date string (YYYY-MM-DD or full ISO). */
  publishedAt: string;
  /** ISO date string when set; falls back to publishedAt for display/schema. */
  updatedAt?: string;
  tags: string[];
  draft: boolean;
  readingTimeMinutes: number;
  ogImagePath?: string;
  ctaTitle?: string;
  ctaDescription?: string;
  /** Prefer LiveDemo end CTA when true; otherwise FinalCTA (book demo). */
  useLiveDemoCta?: boolean;
};

export type BlogPost = BlogPostMeta & {
  /** Sanitized HTML from markdown (headings include id attributes). */
  html: string;
  /** H2 headings extracted for the table of contents. */
  headings: BlogHeading[];
  /** Plain markdown body (no frontmatter) — used for RSS descriptions if needed. */
  excerpt: string;
  /** FAQ pairs extracted from the FAQ H2 section (for FAQPage JSON-LD). */
  faqs: BlogFaq[];
};

export const BLOG_AUTHOR = "Mercy Speaks Digital team" as const;
export const BLOG_AUTHOR_ORG = "Mercy Speaks Digital" as const;
