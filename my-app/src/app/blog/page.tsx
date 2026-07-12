import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Clock } from "lucide-react";
import { PageShell } from "@/components/ui/page-shell";
import { SeoHead } from "@/components/seo/seo-head";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { Helmet } from "@/lib/react-helmet-compat";
import { absoluteUrl, NAV_PATHS } from "@/lib/site-config";
import {
  breadcrumbSchema,
  itemListSchema,
  webPageSchema,
} from "@/lib/schema";
import {
  formatBlogDate,
  getPublishedBlogPosts,
} from "@/content/blog-posts";

const SEO_TITLE = "Blog & Resources";
const SEO_DESCRIPTION =
  "Practical guides on AI receptionists, missed-call recovery, websites, and automation that help small businesses capture more leads.";

export default function BlogIndexPage() {
  const posts = getPublishedBlogPosts();
  const hasPosts = posts.length > 0;

  return (
    <PageShell className="min-h-screen bg-slate-950">
      <SeoHead path={NAV_PATHS.blog} title={SEO_TITLE} description={SEO_DESCRIPTION} />
      <Helmet>
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Mercy Speaks Digital Blog RSS"
          href={absoluteUrl("/blog/rss.xml")}
        />
      </Helmet>
      <JsonLd
        data={[
          webPageSchema({
            name: SEO_TITLE,
            description: SEO_DESCRIPTION,
            path: NAV_PATHS.blog,
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Blog", path: NAV_PATHS.blog },
          ]),
          ...(hasPosts
            ? [
                itemListSchema({
                  name: "Blog articles",
                  items: posts.map((post) => ({
                    name: post.title,
                    path: post.path,
                  })),
                }),
              ]
            : []),
        ]}
      />

      <main>
        <section className="section pt-6 pb-0" aria-label="Breadcrumb">
          <div className="section-inner max-w-4xl mx-auto">
            <Breadcrumbs items={[{ name: "Blog" }]} className="mb-2" />
          </div>
        </section>

        <section className="section pt-8 md:pt-12" aria-labelledby="blog-index-title">
          <div className="section-inner max-w-4xl mx-auto text-center mb-12">
            <motion.h1
              id="blog-index-title"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-50 tracking-tight mb-6"
            >
              Blog &amp; resources
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.05 }}
              className="text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto"
            >
              Straight talk on AI receptionists, websites, and automation—so you stop losing
              leads after hours and on busy days.
            </motion.p>
          </div>

          <div className="section-inner max-w-5xl mx-auto pb-8">
            {hasPosts ? (
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
                {posts.map((post, index) => (
                  <motion.li
                    key={post.slug}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.4, delay: index * 0.04 }}
                  >
                    <Link
                      to={post.path}
                      className="group flex flex-col h-full rounded-2xl border border-slate-800/60 bg-slate-900/40 backdrop-blur-md p-6 hover:border-neon-cyan/40 transition-colors"
                    >
                      <span className="text-xl font-bold text-slate-50 group-hover:text-neon-cyan transition-colors mb-2">
                        {post.title}
                      </span>
                      <span className="text-slate-400 leading-relaxed flex-1 text-sm md:text-base">
                        {post.description}
                      </span>
                      <span className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                        <time dateTime={post.publishedAt}>{formatBlogDate(post.publishedAt)}</time>
                        <span className="inline-flex items-center gap-1" aria-hidden>
                          <Clock className="w-3.5 h-3.5" />
                          {post.readingTimeMinutes} min read
                        </span>
                      </span>
                      <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-electric-purple">
                        Read article
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="mx-auto max-w-lg rounded-2xl border border-slate-800/60 bg-slate-900/40 backdrop-blur-md px-8 py-14 text-center"
              >
                <BookOpen
                  className="mx-auto mb-4 h-10 w-10 text-neon-cyan/80"
                  aria-hidden
                />
                <h2 className="text-xl font-semibold text-slate-50 mb-2">
                  Articles coming soon
                </h2>
                <p className="text-slate-400 leading-relaxed text-sm md:text-base">
                  We&apos;re drafting practical guides on AI receptionists, missed-call recovery,
                  and automation ROI. Check back shortly—or{" "}
                  <Link
                    to={NAV_PATHS.bookDemo}
                    className="text-neon-cyan hover:underline underline-offset-2"
                  >
                    book a demo
                  </Link>{" "}
                  if you want to talk now.
                </p>
              </motion.div>
            )}
          </div>
        </section>
      </main>
    </PageShell>
  );
}
