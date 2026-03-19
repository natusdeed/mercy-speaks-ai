"use client";

import { useState } from "react";

const DEFAULT_DOMAIN = typeof window !== "undefined" ? window.location.origin : "https://YOUR_DOMAIN";
const SNIPPET = `<script src="${DEFAULT_DOMAIN}/widget.js" data-tenant="TENANT_ID" data-key="PUBLIC_KEY" async><\/script>`;

export default function WidgetInstallPage() {
  const [domain, setDomain] = useState(DEFAULT_DOMAIN);
  const [tenantId, setTenantId] = useState("TENANT_ID");
  const [publicKey, setPublicKey] = useState("PUBLIC_KEY");
  const snippet = `<script src="${domain}/widget.js" data-tenant="${tenantId}" data-key="${publicKey}" async><\/script>`;

  const copy = () => {
    navigator.clipboard.writeText(snippet);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-10 font-sans">
      <div className="max-w-2xl mx-auto space-y-8">
        <h1 className="text-2xl md:text-3xl font-bold text-white">
          Embed the chat widget
        </h1>
        <p className="text-slate-400">
          Add this snippet before the closing <code className="text-cyan-400">&lt;/body&gt;</code> on
          any page where the widget is allowed (your domain must be in the tenant’s allowed list).
        </p>

        <div className="space-y-4">
          <label className="block text-sm font-medium text-slate-300">Your widget URL (domain)</label>
          <input
            type="text"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            placeholder="https://your-domain.com"
            className="w-full rounded-lg border border-slate-600 bg-slate-800 px-4 py-2 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>
        <div className="space-y-4">
          <label className="block text-sm font-medium text-slate-300">Tenant ID</label>
          <input
            type="text"
            value={tenantId}
            onChange={(e) => setTenantId(e.target.value)}
            placeholder="TENANT_ID"
            className="w-full rounded-lg border border-slate-600 bg-slate-800 px-4 py-2 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>
        <div className="space-y-4">
          <label className="block text-sm font-medium text-slate-300">Public key (optional)</label>
          <input
            type="text"
            value={publicKey}
            onChange={(e) => setPublicKey(e.target.value)}
            placeholder="PUBLIC_KEY or leave default"
            className="w-full rounded-lg border border-slate-600 bg-slate-800 px-4 py-2 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-slate-300">Snippet</label>
            <button
              type="button"
              onClick={copy}
              className="rounded-lg bg-cyan-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-cyan-500 transition-colors"
            >
              Copy
            </button>
          </div>
          <pre className="rounded-lg border border-slate-700 bg-slate-900 p-4 text-sm text-slate-300 overflow-x-auto whitespace-pre-wrap break-all">
            {snippet}
          </pre>
        </div>

        <div className="rounded-lg border border-slate-700 bg-slate-900/50 p-4 text-slate-400 text-sm">
          <p className="font-medium text-slate-300 mb-2">Requirements</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Replace <code className="text-cyan-400">YOUR_DOMAIN</code> with your app domain (e.g. where this app is deployed).</li>
            <li>Replace <code className="text-cyan-400">TENANT_ID</code> with your tenant ID.</li>
            <li>If your tenant uses a public key, set <code className="text-cyan-400">data-key</code> to that value; otherwise you can omit it.</li>
            <li>The embedding site’s domain must be in the tenant’s allowed domains (enforced by the API).</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
