import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// #region agent log
if (typeof window === 'undefined') { fetch('http://127.0.0.1:7243/ingest/e6485d11-3b9f-4fe8-abde-87df7488e504',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'layout.tsx:3',message:'Layout module loading - imports start',data:{step:'imports'},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{}); }
// #endregion
import { Header } from "@/components/navigation/header";
// #region agent log
if (typeof window === 'undefined') { fetch('http://127.0.0.1:7243/ingest/e6485d11-3b9f-4fe8-abde-87df7488e504',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'layout.tsx:5',message:'Header import success',data:{hasHeader:typeof Header!=='undefined'},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{}); }
// #endregion
import { Footer } from "@/components/navigation/footer";
// #region agent log
if (typeof window === 'undefined') { fetch('http://127.0.0.1:7243/ingest/e6485d11-3b9f-4fe8-abde-87df7488e504',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'layout.tsx:7',message:'Footer import success',data:{hasFooter:typeof Footer!=='undefined'},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{}); }
// #endregion
import { ClaudeChatbotWrapper } from "@/components/ClaudeChatbotWrapper";
// #region agent log
if (typeof window === 'undefined') { fetch('http://127.0.0.1:7243/ingest/e6485d11-3b9f-4fe8-abde-87df7488e504',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'layout.tsx:9',message:'ClaudeChatbotWrapper import success',data:{hasWrapper:typeof ClaudeChatbotWrapper!=='undefined'},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'C'})}).catch(()=>{}); }
// #endregion
import { ClientErrorHandler } from "@/components/debug/ClientErrorHandler";

// #region agent log
if (typeof window === 'undefined') { fetch('http://127.0.0.1:7243/ingest/e6485d11-3b9f-4fe8-abde-87df7488e504',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'layout.tsx:11',message:'Font initialization start',data:{step:'fonts'},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{}); }
// #endregion
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
// #region agent log
if (typeof window === 'undefined') { fetch('http://127.0.0.1:7243/ingest/e6485d11-3b9f-4fe8-abde-87df7488e504',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'layout.tsx:15',message:'Geist font initialized',data:{hasVariable:!!geistSans.variable},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{}); }
// #endregion

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
// #region agent log
if (typeof window === 'undefined') { fetch('http://127.0.0.1:7243/ingest/e6485d11-3b9f-4fe8-abde-87df7488e504',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'layout.tsx:21',message:'GeistMono font initialized',data:{hasVariable:!!geistMono.variable},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{}); }
// #endregion

export const metadata: Metadata = {
  title: "Mercy Speaks Digital | AI Infrastructure & Digital Workers",
  description: "We install digital employees. Stop hiring overhead. Start installing intelligence. AI automation agency delivering voice agents, workflow automation, and RAG solutions.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "icon",
        type: "image/png",
        sizes: "192x192",
        url: "/favicon-192x192.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "512x512",
        url: "/favicon-512x512.png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // #region agent log
  if (typeof window === 'undefined') { fetch('http://127.0.0.1:7243/ingest/e6485d11-3b9f-4fe8-abde-87df7488e504',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'layout.tsx:27',message:'RootLayout render start',data:{hasChildren:!!children},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'B'})}).catch(()=>{}); }
  // #endregion
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ClientErrorHandler />
        <Header />
        <div className="pt-40 md:pt-48 min-h-screen flex flex-col">
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <ClaudeChatbotWrapper />
        </div>
      </body>
    </html>
  );
}
