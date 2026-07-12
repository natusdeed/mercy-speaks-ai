import { Navigate, useParams } from "react-router-dom";
import { IndustryPage } from "@/components/industry/industry-page";
import { getIndustryPage } from "@/content/industry-pages";
import NotFound from "@/pages/NotFound";

/**
 * /industries/:slug — looks up config; unknown slugs render NotFound.
 */
export default function IndustrySlugPage() {
  const { slug } = useParams<{ slug: string }>();
  const config = slug ? getIndustryPage(slug) : undefined;

  if (!slug) {
    return <Navigate to="/industries" replace />;
  }

  if (!config) {
    return <NotFound />;
  }

  return <IndustryPage config={config} />;
}
