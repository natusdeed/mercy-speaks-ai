import { lazy, Suspense } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import { Header } from '@/components/navigation/header';
import { Footer } from '@/components/navigation/footer';
import { ClientErrorHandler } from '@/components/debug/ClientErrorHandler';

/**
 * Eager imports: required for `renderToString` prerender (React.lazy + Suspense only renders fallback in SSR).
 * Route-level chunks still come from `manualChunks` + dynamic import() inside pages where safe.
 */
import Home from './app/page';
import About from './pages/About';
import Contact from './app/contact/page';
import Portfolio from './app/portfolio/page';
import Pricing from './app/pricing/page';
import BookDemo from './app/book-demo/page';
import Services from './pages/Services';
import Solutions from './app/solutions/page';
import Results from './app/results/page';
import TestimonialsPage from './app/testimonials/page';
import ServiceAIPhoneReceptionist from './pages/services/AIPhoneReceptionist';
import ServiceAppointmentAutomation from './pages/services/AppointmentAutomation';
import ServiceRAGData from './pages/services/RAGData';
import ServiceReviewGeneration from './pages/services/ReviewGeneration';
import ServiceSocialMediaManagement from './pages/services/SocialMediaManagement';
import ServiceVoiceAgents from './pages/services/VoiceAgents';
import ServiceWebsiteChatbot from './pages/services/WebsiteChatbot';
import ServiceWebsiteDesign from './app/services/website-design/page';
import ServiceWorkflowAutomation from './pages/services/WorkflowAutomation';
import WidgetFramePage from './app/widget/frame/page';
import WidgetInstallPage from './app/widget/install/page';
import RoofingPage from './app/roofing/page';
import HvacPage from './app/hvac/page';
import PlumbingPage from './app/plumbing/page';

/** Code-split below-the-fold / secondary dashboards later without breaking prerender. */
const LazyDashboardApp = lazy(() =>
  import('@/dashboard/dashboard-app').then((m) => ({ default: m.DashboardApp }))
);

function DashboardRouteFallback() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 text-slate-400">
      <p className="text-sm">Loading dashboard…</p>
    </div>
  );
}

function PublicChrome() {
  return (
    <>
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
        <Footer />
      </div>
    </>
  );
}

function App() {
  return (
    <>
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
        <Route element={<PublicChrome />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/book-demo" element={<BookDemo />} />
          <Route path="/services" element={<Services />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/roofing" element={<RoofingPage />} />
          <Route path="/hvac" element={<HvacPage />} />
          <Route path="/plumbing" element={<PlumbingPage />} />
          <Route path="/results" element={<Results />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
          <Route path="/services/ai-phone-receptionist" element={<ServiceAIPhoneReceptionist />} />
          <Route path="/services/appointment-automation" element={<ServiceAppointmentAutomation />} />
          <Route path="/services/rag-data" element={<ServiceRAGData />} />
          <Route path="/services/review-generation" element={<ServiceReviewGeneration />} />
          <Route path="/services/reputation-management" element={<ServiceReviewGeneration />} />
          <Route path="/services/social-media-management" element={<ServiceSocialMediaManagement />} />
          <Route path="/services/voice-agents" element={<ServiceVoiceAgents />} />
          <Route path="/services/website-chatbot" element={<ServiceWebsiteChatbot />} />
          <Route path="/services/website-design" element={<ServiceWebsiteDesign />} />
          <Route path="/services/workflow-automation" element={<ServiceWorkflowAutomation />} />
          <Route path="/widget/frame" element={<WidgetFramePage />} />
          <Route path="/widget/install" element={<WidgetInstallPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
