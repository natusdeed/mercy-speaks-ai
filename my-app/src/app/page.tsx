// #region agent log
if (typeof window === 'undefined') { fetch('http://127.0.0.1:7243/ingest/e6485d11-3b9f-4fe8-abde-87df7488e504',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'page.tsx:1',message:'Page module loading - imports start',data:{step:'imports'},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{}); }
// #endregion
import { TrustSignals } from "@/components/trust/trust-signals";
// #region agent log
if (typeof window === 'undefined') { fetch('http://127.0.0.1:7243/ingest/e6485d11-3b9f-4fe8-abde-87df7488e504',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'page.tsx:3',message:'TrustSignals import',data:{hasTrustSignals:typeof TrustSignals!=='undefined'},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{}); }
// #endregion
import { BentoGrid } from "@/components/bento/bento-grid";
// #region agent log
if (typeof window === 'undefined') { fetch('http://127.0.0.1:7243/ingest/e6485d11-3b9f-4fe8-abde-87df7488e504',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'page.tsx:5',message:'BentoGrid import',data:{hasBentoGrid:typeof BentoGrid!=='undefined'},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{}); }
// #endregion
import { WhatAreDigitalEmployees } from "@/components/sections/what-are-digital-employees";
import { HowWeHelp } from "@/components/sections/how-we-help";
import { WebsiteAsEntry } from "@/components/sections/website-as-entry";
import { Testimonials } from "@/components/sections/testimonials";
import { SocialProof } from "@/components/sections/social-proof";
import { TheProblem } from "@/components/sections/the-problem";
import { TheSolution } from "@/components/sections/the-solution";
import { Proof } from "@/components/sections/proof";
import { FAQ } from "@/components/sections/faq";
import { FinalCTA } from "@/components/sections/final-cta";
import { ProminentCTA } from "@/components/cta/prominent-cta";
// #region agent log
if (typeof window === 'undefined') { fetch('http://127.0.0.1:7243/ingest/e6485d11-3b9f-4fe8-abde-87df7488e504',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'page.tsx:17',message:'All page imports complete',data:{importCount:13},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{}); }
// #endregion

export default function Home() {
  // #region agent log
  if (typeof window === 'undefined') { fetch('http://127.0.0.1:7243/ingest/e6485d11-3b9f-4fe8-abde-87df7488e504',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'page.tsx:20',message:'Home component render start',data:{component:'Home'},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'B'})}).catch(()=>{}); }
  // #endregion
  return (
    <div className="min-h-screen bg-slate-950 w-full">
      <TrustSignals />
      <main className="w-full">
        {/* Hero: "We Install Digital Employees" */}
        <section className="py-16 md:py-24 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <h2>We Install Digital Employees</h2>
          </div>
        </section>
        
        <BentoGrid />
        
        {/* What are Digital Employees? */}
        <WhatAreDigitalEmployees />
        
        {/* How We Help */}
        <HowWeHelp />
        
        {/* Website service as a starting point */}
        <WebsiteAsEntry />
        
        {/* Social Proof & Testimonials */}
        <Testimonials />
        <SocialProof />
        
        {/* Problem/Solution Flow */}
        <TheProblem />
        <TheSolution />
        
        {/* Proof & ROI */}
        <Proof />
        
        {/* FAQ & Final CTAs */}
        <FAQ />
        <FinalCTA />
        <ProminentCTA />
      </main>
    </div>
  );
}
