import { Routes, Route, Outlet } from 'react-router-dom';
import { Header } from '@/components/navigation/header';
import { Footer } from '@/components/navigation/footer';
import { ElevenLabsWidgetMount } from '@/components/ElevenLabsWidgetMount';
import { ClientErrorHandler } from '@/components/debug/ClientErrorHandler';
import { DashboardApp } from '@/dashboard/dashboard-app';

// Pages (homepage from app/page.tsx)
import Home from './app/page';
import About from './pages/About';
import Contact from './app/contact/page';
import Portfolio from './app/portfolio/page';
import Pricing from './app/pricing/page';
import BookDemo from './app/book-demo/page';
import Services from './pages/Services';
import Solutions from './app/solutions/page';
import Results from './app/results/page';
import ServiceAIPhoneReceptionist from './pages/services/AIPhoneReceptionist';
import ServiceAppointmentAutomation from './pages/services/AppointmentAutomation';
import ServiceRAGData from './pages/services/RAGData';
import ServiceReviewGeneration from './pages/services/ReviewGeneration';
import ServiceVoiceAgents from './pages/services/VoiceAgents';
import ServiceWebsiteChatbot from './pages/services/WebsiteChatbot';
import ServiceWebsiteDesign from './app/services/website-design/page';
import ServiceWorkflowAutomation from './pages/services/WorkflowAutomation';
import WidgetFramePage from './app/widget/frame/page';
import WidgetInstallPage from './app/widget/install/page';

function PublicChrome() {
  return (
    <>
      <Header />
      <div className="flex min-h-screen flex-col">
        <main className="flex-1 pt-24 md:pt-28">
          <Outlet />
        </main>
        <Footer />
        <ElevenLabsWidgetMount />
      </div>
    </>
  );
}

function App() {
  return (
    <>
      <ClientErrorHandler />
      <Routes>
        <Route path="/dashboard/*" element={<DashboardApp />} />
        <Route element={<PublicChrome />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/book-demo" element={<BookDemo />} />
          <Route path="/services" element={<Services />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/results" element={<Results />} />
          <Route path="/services/ai-phone-receptionist" element={<ServiceAIPhoneReceptionist />} />
          <Route path="/services/appointment-automation" element={<ServiceAppointmentAutomation />} />
          <Route path="/services/rag-data" element={<ServiceRAGData />} />
          <Route path="/services/review-generation" element={<ServiceReviewGeneration />} />
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
