import { Navigate, useParams } from "react-router-dom";
import { MarketPageView } from "@/components/market/market-page";
import { getIndustryMarketPage } from "@/content/market-pages";
import NotFound from "@/pages/NotFound";

/** /industries/:slug — unknown slugs render NotFound. */
export default function IndustrySlugPage() {
  const { slug } = useParams<{ slug: string }>();
  if (!slug) return <Navigate to="/industries" replace />;
  const page = getIndustryMarketPage(slug);
  if (!page) return <NotFound />;
  return <MarketPageView page={page} />;
}
