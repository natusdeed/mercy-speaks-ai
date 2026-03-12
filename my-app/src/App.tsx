import { Routes, Route } from 'react-router-dom';
import { Header } from '@/components/navigation/header';
import { Footer } from '@/components/navigation/footer';
import { SiteChatbotWrapper } from '@/components/SiteChatbotWrapper';
import { ClientErrorHandler } from '@/components/debug/ClientErrorHandler';

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
import ServiceWebsiteDesign from './pages/services/WebsiteDesign';
import ServiceWorkflowAutomation from './pages/services/WorkflowAutomation';

function App() {
  return (
    <>
      <ClientErrorHandler />
      <Header />
      <div className="min-h-screen flex flex-col">
        <main className="flex-1 pt-24 md:pt-28">
          <Routes>
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
          </Routes>
        </main>
        <Footer />
        <SiteChatbotWrapper />
      </div>
    </>
  );
}

export default App;
