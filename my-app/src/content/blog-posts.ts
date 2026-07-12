/**
 * Blog post registry — generated from `src/content/blog/posts/*.md`.
 * Run `npm run generate:blog` after adding or editing posts (also runs in `npm run build`).
 */
import { GENERATED_BLOG_POSTS } from "@/content/blog-posts.generated";
import type { BlogPost } from "@/lib/blog/types";

export type { BlogPost, BlogHeading, BlogPostMeta } from "@/lib/blog/types";
export { BLOG_AUTHOR, BLOG_AUTHOR_ORG } from "@/lib/blog/types";

function byNewest(a: BlogPost, b: BlogPost): number {
  return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
}

/** All non-draft posts, newest first. */
export function getPublishedBlogPosts(): BlogPost[] {
  return GENERATED_BLOG_POSTS.filter((p) => !p.draft).slice().sort(byNewest);
}

/** Paths for sitemap + prerender (published only). */
export function getPublishedBlogPaths(): string[] {
  return getPublishedBlogPosts().map((p) => p.path);
}

export function getBlogPost(slug: string): BlogPost | undefined {
  return getPublishedBlogPosts().find((p) => p.slug === slug);
}

/**
 * Related posts: shared tags first, then fill with newest others.
 */
export function getRelatedBlogPosts(slug: string, limit = 3): BlogPost[] {
  const current = getBlogPost(slug);
  if (!current) return [];

  const others = getPublishedBlogPosts().filter((p) => p.slug !== slug);
  const tagSet = new Set(current.tags.map((t) => t.toLowerCase()));

  const scored = others
    .map((post) => {
      const overlap = post.tags.filter((t) => tagSet.has(t.toLowerCase())).length;
      return { post, overlap };
    })
    .sort((a, b) => {
      if (b.overlap !== a.overlap) return b.overlap - a.overlap;
      return byNewest(a.post, b.post);
    });

  return scored.slice(0, limit).map((s) => s.post);
}

/** Format a post date for display (e.g. Jul 11, 2026). */
export function formatBlogDate(iso: string): string {
  const d = new Date(iso.includes("T") ? iso : `${iso}T12:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
