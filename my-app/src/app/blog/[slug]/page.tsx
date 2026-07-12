import { useParams } from "react-router-dom";
import { getBlogPost } from "@/content/blog-posts";
import { BlogPostPage } from "@/components/blog/blog-post-page";
import NotFound from "@/pages/NotFound";

/**
 * /blog/:slug — looks up a published post; unknown or draft slugs render NotFound.
 */
export default function BlogSlugPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPost(slug) : undefined;

  if (!post) {
    return <NotFound />;
  }

  return <BlogPostPage post={post} />;
}
