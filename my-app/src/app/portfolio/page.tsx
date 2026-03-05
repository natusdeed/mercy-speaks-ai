import { Navigate } from "react-router-dom";

/**
 * v1: Single proof page is /results. Portfolio redirects there.
 */
export default function PortfolioPage() {
  return <Navigate to="/results" replace />;
}
