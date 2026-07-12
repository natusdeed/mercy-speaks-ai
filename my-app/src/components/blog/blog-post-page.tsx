import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import { PageShell } from "@/components/ui/page-shell";
import { SeoHead } from "@/components/seo/seo-head";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { Button } from "@/components/ui/button";
import { BookingLink } from "@/components/cta/booking-link";
import { LiveDemo } from "@/components/sections/live-demo";
import { FinalCTA } from "@/components/sections/final-cta";
import { Helmet } from "@/lib/react-helmet-compat";
import { absoluteUrl, NAV_PATHS } from "@/lib/site-config";
import {
  blogPostingSchema,
  breadcrumbSchema,
  faqPageSchema,
} from "@/lib/schema";
import {
  BLOG_AUTHOR,
  formatBlogDate,
  getRelatedBlogPosts,
  type BlogPost,
} from "@/content/blog-posts";

type BlogPostPageProps = {
  post: BlogPost;
};

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45 },
};

export function BlogPostPage({ post }: BlogPostPageProps) {
  const related = getRelatedBlogPosts(post.slug, 3);
  const updatedAt = post.updatedAt ?? post.publishedAt;
  const showUpdated =
    Boolean(post.updatedAt) &&
    new Date(post.updatedAt!).toDateString() !== new Date(post.publishedAt).toDateString();

  return (
    <PageShell className="min-h-screen bg-slate-950">
      <SeoHead
        path={post.path}
        title={post.metaTitle ?? post.title}
        description={post.description}
        ogType="article"
        ogImagePath={post.ogImagePath}
      />
      <Helmet>
        <meta property="article:published_time" content={post.publishedAt} />
        <meta property="article:modified_time" content={updatedAt} />
        <meta property="article:author" content={BLOG_AUTHOR} />
        {post.tags.map((tag) => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Mercy Speaks Digital Blog RSS"
          href={absoluteUrl("/blog/rss.xml")}
        />
      </Helmet>
      <JsonLd
        data={[
          blogPostingSchema({
            title: post.title,
            description: post.description,
            path: post.path,
            publishedAt: post.publishedAt,
            updatedAt,
            authorName: BLOG_AUTHOR,
            imagePath: post.ogImagePath,
            tags: post.tags,
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Blog", path: NAV_PATHS.blog },
            { name: post.title, path: post.path },
          ]),
          ...(post.faqs.length > 0 ? [faqPageSchema(post.faqs)] : []),
        ]}
      />

      <main>
        <article>
          <section className="section pt-6 pb-0" aria-label="Breadcrumb">
            <div className="section-inner max-w-3xl mx-auto">
              <Breadcrumbs
                items={[
                  { name: "Blog", path: NAV_PATHS.blog },
                  { name: post.title },
                ]}
                className="mb-2"
              />
            </div>
          </section>

          <header className="section pt-8 md:pt-10 pb-0">
            <div className="section-inner max-w-3xl mx-auto">
              <motion.h1
                {...fadeUp}
                className="text-3xl sm:text-4xl md:text-[2.75rem] font-bold text-slate-50 tracking-tight leading-tight mb-5"
              >
                {post.title}
              </motion.h1>
              <motion.p
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: 0.05 }}
                className="text-lg text-slate-400 leading-relaxed mb-6"
              >
                {post.description}
              </motion.p>

              <motion.div
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: 0.08 }}
                className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 pb-8 border-b border-slate-800/80"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-neon-cyan/30 bg-neon-cyan/10 text-sm font-bold text-neon-cyan"
                    aria-hidden
                  >
                    MS
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-200">{BLOG_AUTHOR}</p>
                    <p className="text-xs text-slate-500">AI automation &amp; web systems</p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 sm:ml-auto">
                  <span>
                    Published{" "}
                    <time dateTime={post.publishedAt}>{formatBlogDate(post.publishedAt)}</time>
                  </span>
                  {showUpdated ? (
                    <span>
                      Updated{" "}
                      <time dateTime={updatedAt}>{formatBlogDate(updatedAt)}</time>
                    </span>
                  ) : null}
                  <span className="inline-flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" aria-hidden />
                    {post.readingTimeMinutes} min read
                  </span>
                </div>
              </motion.div>
            </div>
          </header>

          <div className="section pt-10">
            <div className="section-inner max-w-3xl mx-auto lg:max-w-5xl lg:grid lg:grid-cols-[minmax(0,1fr)_14rem] lg:gap-10 lg:items-start">
              {post.headings.length > 0 ? (
                <nav
                  aria-label="Table of contents"
                  className="mb-10 lg:mb-0 lg:order-2 lg:sticky lg:top-28"
                >
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                    On this page
                  </p>
                  <ol className="space-y-1 border-l border-slate-800 pl-3">
                    {post.headings.map((h) => (
                      <li key={h.id}>
                        <a
                          href={`#${h.id}`}
                          className="block min-h-11 py-2 text-sm text-slate-300 underline-offset-2 hover:text-neon-cyan hover:underline transition-colors leading-snug"
                        >
                          {h.text}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              ) : null}

              <div
                className={`blog-prose max-w-none lg:order-1 ${
                  post.headings.length === 0 ? "lg:col-span-2 max-w-3xl mx-auto w-full" : ""
                }`}
                dangerouslySetInnerHTML={{ __html: post.html }}
              />
            </div>
          </div>
        </article>

        {related.length > 0 ? (
          <section className="section pt-4" aria-labelledby="related-posts-title">
            <div className="section-inner max-w-3xl mx-auto">
              <h2
                id="related-posts-title"
                className="text-xl font-bold text-slate-50 mb-5"
              >
                Related articles
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {related.map((item) => (
                  <li key={item.slug}>
                    <Link
                      to={item.path}
                      className="group block h-full rounded-xl border border-slate-800/60 bg-slate-900/30 p-4 hover:border-neon-cyan/40 transition-colors"
                    >
                      <span className="text-sm font-semibold text-slate-100 group-hover:text-neon-cyan transition-colors line-clamp-2">
                        {item.title}
                      </span>
                      <span className="mt-2 block text-xs text-slate-500">
                        {formatBlogDate(item.publishedAt)} · {item.readingTimeMinutes} min
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ) : null}

        {post.useLiveDemoCta !== false ? (
          <section
            className="section scroll-mt-24"
            aria-labelledby="blog-post-cta-title"
          >
            <div className="section-inner max-w-3xl mx-auto text-center mb-10">
              <h2
                id="blog-post-cta-title"
                className="text-2xl md:text-3xl font-bold text-slate-50 mb-4"
              >
                {post.ctaTitle ?? "Ready to stop missing leads?"}
              </h2>
              <p className="text-slate-400 leading-relaxed max-w-2xl mx-auto">
                {post.ctaDescription ??
                  "Hear the AI receptionist live, then book a short demo if you want it installed for your business."}
              </p>
            </div>
            <LiveDemo location={`blog-${post.slug}`} />
            <div className="section-inner max-w-3xl mx-auto flex justify-center mt-8 pb-4">
              <Button variant="primary" size="lg" asChild>
                <BookingLink kind="aiReceptionistDemo" className="flex items-center gap-2">
                  Book a free demo
                  <ArrowRight className="w-5 h-5" />
                </BookingLink>
              </Button>
            </div>
          </section>
        ) : (
          <FinalCTA
            title={post.ctaTitle ?? "Ready to stop missing leads?"}
            description={
              post.ctaDescription ??
              "Book a demo. See how AI can answer your calls, book appointments, and follow up—without hiring more staff."
            }
          />
        )}
      </main>
    </PageShell>
  );
}
