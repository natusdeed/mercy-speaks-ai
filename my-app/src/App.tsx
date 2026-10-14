import { lazy, Suspense } from 'react';
import { Navigate, Routes, Route, Outlet, useLocation } from 'react-router-dom';
import { Header } from '@/components/navigation/header';
import { HomeFooterV3 } from '@/components/home-v3/home-footer';
import { ClientErrorHandler } from '@/components/debug/ClientErrorHandler';
import CookieConsent from './components/cookies/CookieConsent';
import { MotionConfig } from 'framer-motion';
import { JsonLd } from '@/components/seo/json-ld';
import { organizationSchema } from '@/lib/schema';

/**
 * Eager imports: required for `renderToString` prerender (React.lazy + Suspense only renders fallback in SSR).
 * Route-level chunks still come from `manualChunks` + dynamic import() inside pages where safe.
 */
import Home from './app/page';
import About from './app/v3/about';
import WebsitesPage from './app/v3/websites';
import WebsiteCarePage from './app/v3/website-care';
import AiPilotPage from './app/v3/ai-pilot';
import { PrivacyPage, TermsPage } from './app/v3/legal-pending';
import Contact from './app/contact/page';
import Pricing from './app/pricing/page';
import BookDemo from './app/book-demo/page';
import Services from './pages/Services';
import Results from './app/results/page';
import ServiceWebsiteDesign from './app/services/website-design/page';
import RoofingPage from './app/roofing/page';
import IndustriesIndexPage from './app/industries/page';
import IndustrySlugPage from './app/industries/[slug]/page';
import HoustonPage from './app/houston/page';
import RichmondTxPage from './app/richmond-tx/page';
import CookiePolicy from './pages/CookiePolicy';
import NotFound from './pages/NotFound';

/** Code-split below-the-fold / secondary dashboards later without breaking prerender. */
const LazyDashboardApp = lazy(() =>
  import('@/dashboard/dashboard-app').then((m) => ({ default: m.DashboardApp }))
);

/** True in Vite dev only; false in Node prerender (no `import.meta.env`) and in production client bundles. */
const viteMetaEnv =
  typeof import.meta !== "undefined" && import.meta.env ? import.meta.env : undefined;
const isViteDev = viteMetaEnv?.DEV === true;

/** Local-only mock previews; lazy chunk omitted when `isViteDev` is false at build time. */
const LazyDevDemoShell = isViteDev ? lazy(() => import('@/demo/dev-demo-shell')) : null;

function DashboardRouteFallback() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 text-slate-400">
      <p className="text-sm">Loading dashboard…</p>
    </div>
  );
}

function DevDemoRouteFallback() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 text-slate-400">
      <p className="text-sm">Loading dev preview…</p>
    </div>
  );
}

function PublicChrome() {
  return (
    <>
      {/* Site-wide Organization / ProfessionalService — one config, every public page */}
      <JsonLd data={organizationSchema()} />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-lg focus:bg-slate-900 focus:px-4 focus:py-3 focus:text-sm focus:font-medium focus:text-slate-50 focus:ring-2 focus:ring-neon-cyan focus:outline-none"
      >
        Skip to main content
      </a>
      <Header />
      <div className="flex min-h-screen flex-col" id="public-layout">
        {/*
          Outer wrapper is a div so each route can expose a single <main> landmark (no nested mains).
          Vertical offset for the fixed header is set in globals.css (.public-main).
        */}
        <div id="main-content" tabIndex={-1} className="flex-1 public-main w-full outline-none">
          <Outlet />
        </div>
        <HomeFooterV3 />
      </div>
    </>
  );
}

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <ClientErrorHandler />
      <Routes>
        <Route
          path="/dashboard/*"
          element={
            <Suspense fallback={<DashboardRouteFallback />}>
              <LazyDashboardApp />
            </Suspense>
          }
        />
        {isViteDev && LazyDevDemoShell ? (
          <Route
            path="/demo/*"
            element={
              <Suspense fallback={<DevDemoRouteFallback />}>
                <LazyDevDemoShell />
              </Suspense>
            }
          />
        ) : null}
        {/*
          Public paths must stay in sync with `src/lib/public-routes.ts`
          (sitemap + prerender). Do not add indexable routes only here.
        */}
        <Route element={<PublicChrome />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/websites" element={<WebsitesPage />} />
          <Route path="/website-care" element={<WebsiteCarePage />} />
          <Route path="/ai-pilot" element={<AiPilotPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/book-demo" element={<BookDemo />} />
          <Route path="/services" element={<Services />} />
          <Route path="/solutions" element={<Navigate to="/services" replace />} />
          <Route path="/industries" element={<IndustriesIndexPage />} />
          <Route path="/industries/:slug" element={<IndustrySlugPage />} />
          <Route path="/roofing" element={<RoofingPage />} />
          <Route path="/hvac" element={<Navigate to="/industries/hvac" replace />} />
          <Route path="/plumbing" element={<Navigate to="/industries/plumbing" replace />} />
          <Route path="/houston" element={<HoustonPage />} />
          <Route path="/richmond-tx" element={<RichmondTxPage />} />
          <Route path="/results" element={<Results />} />
          {/* Genuine duplicates → permanent redirects (also in vercel.json). */}
          <Route path="/portfolio" element={<Navigate to="/results" replace />} />
          <Route path="/testimonials" element={<Navigate to="/results" replace />} />
          <Route path="/services/ai-phone-receptionist" element={<Navigate to="/ai-pilot" replace />} />
          <Route path="/services/voice-agents" element={<Navigate to="/ai-pilot" replace />} />
          <Route path="/services/missed-call-text-back" element={<Navigate to="/ai-pilot" replace />} />
          <Route path="/services/appointment-automation" element={<Navigate to="/ai-pilot" replace />} />
          <Route path="/services/website-design" element={<ServiceWebsiteDesign />} />
          {/*
            Withdrawn 2026-10-13 (not routed → 404): /services/social-media-management, /services/review-generation,
            /services/reputation-management, /services/website-chatbot, /services/workflow-automation,
            /services/rag-data, /ai-employee-system, /widget/install and /widget/frame (widget parked; unrouted 2026-10-14), /blog and /blog/* (AI-first posts unpublished via draft: true).
            Page files are kept in the repo.
          */}
          <Route path="/cookie-policy" element={<CookiePolicy />} />
          {/* Catch-all: client nav + prerender source for dist/404.html — never in sitemap */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      {/* Rendered after page content so the skip link is the first Tab stop; position is fixed, so it looks the same. */}
      <CookieConsent />
    </MotionConfig>
  );
}

export default App;
