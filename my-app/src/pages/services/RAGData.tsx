import { Database } from "lucide-react";
import { ServiceMarketingPage } from "@/components/templates/service-marketing-page";
import { NAV_PATHS } from "@/lib/site-config";

export default function ServiceRAGData() {
  return (
    <ServiceMarketingPage
      path={NAV_PATHS.ragData}
      seoTitle="Knowledge bases & RAG for AI assistants"
      seoDescription="Ground your website chat or phone AI in real documents and FAQs—accurate answers, fewer hallucinations. Mercy Speaks Digital."
      icon={Database}
      h1="Knowledge & RAG data"
      intro="Give your assistants the same facts your best employee would use—organized, versioned, and easy to update."
      atAGlance="Retrieval-augmented generation (RAG) means the model pulls from your curated content—policies, service pages, PDFs, internal playbooks—before answering. We structure that content, wire embeddings or search, and test responses so customer-facing answers stay aligned with what you actually offer."
      serviceType="Knowledge management"
      sections={[
        {
          title: "What it is",
          body: "A knowledge layer behind chat or voice: documents are chunked, indexed, and retrieved when a user asks a question. The assistant cites from your material instead of inventing from thin air—especially important for pricing ranges, guarantees, and compliance-sensitive wording.",
        },
        {
          title: "Who it helps",
          body: "Teams with rich documentation that visitors ask about repeatedly: software, technical services, healthcare-adjacent intake, membership businesses, and franchises that must stay canonically consistent.",
        },
        {
          title: "Deliverables",
          body: "Source inventory, content hygiene pass, indexing pipeline, evaluation sets for tricky questions, and an update process when offers change. We do not promise perfection; we build review loops so drift is caught early.",
        },
        {
          title: "Pairs with",
          body: "Website chat, AI receptionist FAQs, and internal operator consoles—wherever spoken or written AI touches customers.",
        },
      ]}
      related={[
        { to: NAV_PATHS.websiteChatbot, label: "Website chat" },
        { to: NAV_PATHS.voiceAgents, label: "Voice agents" },
      ]}
    />
  );
}
