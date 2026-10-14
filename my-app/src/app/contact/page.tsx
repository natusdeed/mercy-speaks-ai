"use client";

import { useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/ui/page-shell";
import { LeadForm, type LeadFormData } from "@/components/forms/lead-form";
import { Send } from "lucide-react";
import { body, h1, inner, MAILING_ADDRESS, section, textLink } from "@/components/home-v3/v3-ui";
import { SeoHead } from "@/components/seo/seo-head";
import { JsonLd } from "@/components/seo/json-ld";
import { BRAND_TAGLINE, BUSINESS, telHref } from "@/lib/site-config";
import { breadcrumbSchema, contactPageSchema, webPageSchema } from "@/lib/schema";
import { cn } from "@/lib/utils";

const API_CONTACT = "/api/contact";
const CONTACT_FALLBACK_EMAIL = "don@mercyspeaksdigital.com";
const RETRY_MESSAGE =
  "We couldn't send your message. Please try again in a moment, or email us directly.";
/** CEO-locked success text — do not edit. */
const SUCCESS_TEXT =
  "Thanks — your request has been received. We'll review the details and follow up using the contact information you provided.";

/** Service-interest choice. Values are sent to /api/contact and appear in the lead email. */
export const INTERESTS = {
  website: {
    label: "Website quote",
    heading: "Get a Website Quote",
    intro: "Tell us about your business and we'll send a written quote, valid for 30 calendar days.",
    formHeading: "Tell us about your website project",
    submit: "Get a Website Quote",
    messageLabel: "Project details",
    placeholder: "What does your business do, and what should the website help visitors do?",
  },
  care: {
    label: "Website Care",
    heading: "Ask About Website Care",
    intro:
      "Tell us about your website and what you need help with. We'll recommend Care ($79/month) or Care Plus ($149/month).",
    formHeading: "Tell us about your website",
    submit: "Ask About a Care Plan",
    messageLabel: "Your website and what you need",
    placeholder: "Your current website address and the updates or maintenance you need.",
  },
  "ai-pilot": {
    label: "AI Pilot information",
    heading: "Request AI Pilot Information",
    intro:
      "Tell us about your business and how calls reach you today. We'll explain how the AI Receptionist pilot would work for you. The pilot is limited and offered by invitation.",
    formHeading: "Tell us about your calls",
    submit: "Request Pilot Information",
    messageLabel: "How calls reach you today",
    placeholder: "Your type of business, the hours you'd want covered, and what callers usually need.",
  },
} as const;

export type Interest = keyof typeof INTERESTS;

function parseInterest(v: string | null): Interest {
  return v === "care" || v === "ai-pilot" ? v : "website";
}

export default function ContactPage() {
  const [params, setParams] = useSearchParams();
  const interest = parseInterest(params.get("interest"));
  const copy = INTERESTS[interest];
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);

  const chooseInterest = (next: Interest) => {
    const p = new URLSearchParams(params);
    if (next === "website") p.delete("interest");
    else p.set("interest", next);
    setParams(p, { replace: true, preventScrollReset: true });
  };

  const handleSubmit = async (data: LeadFormData) => {
    setSubmitError(null);
    try {
      const res = await fetch(API_CONTACT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, interest, website: honeypotRef.current?.value ?? "" }),
      });
      const json = (await res.json().catch(() => null)) as { success?: boolean; message?: string } | null;
      // Only show success when the server explicitly confirms acceptance.
      if (res.ok && json?.success === true) {
        setIsSubmitted(true);
        return;
      }
      setSubmitError(res.status === 400 && json?.message ? json.message : RETRY_MESSAGE);
    } catch {
      setSubmitError(RETRY_MESSAGE);
    }
  };

  return (
    <PageShell className="min-h-screen bg-slate-950">
      <SeoHead
        path="/contact"
        title="Contact | Get a Website Quote | Mercy Speaks Digital"
        description="Request a website quote, ask about Website Care, or request AI Receptionist pilot information."
      />
      <JsonLd
        data={[
          webPageSchema({ name: "Contact Mercy Speaks Digital", description: BRAND_TAGLINE, path: "/contact" }),
          contactPageSchema(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
        ]}
      />
      <main className="w-full">
        <section className={`${section} pt-12 md:pt-20`} aria-labelledby="page-heading">
          <div className={`${inner} grid grid-cols-[minmax(0,1fr)] gap-14 lg:grid-cols-[3fr_2fr] lg:gap-20`}>
            <div className="min-w-0">
              <p className="mb-3 text-sm font-medium tracking-wide text-violet-300">Contact · {copy.label}</p>
              <h1 id="page-heading" className={h1}>
                {copy.heading}
              </h1>
              <p className={`${body} mt-6 max-w-xl mx-0`}>{copy.intro}</p>
              <div className="mt-10 rounded-xl border border-slate-800 p-5 sm:p-8">
                {isSubmitted ? (
                  <div className="py-8 text-center">
                    <p
                      role="status"
                      tabIndex={-1}
                      ref={(el) => el?.focus()}
                      className="mx-auto mb-6 max-w-xl text-lg font-medium leading-relaxed text-white outline-none sm:text-xl"
                    >
                      {SUCCESS_TEXT}
                    </p>
                    <Button variant="outline" size="lg" onClick={() => setIsSubmitted(false)}>
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <>
                    <h2 className="mb-6 text-xl font-semibold text-white">{copy.formHeading}</h2>
                    {submitError && (
                      <p className="mb-4 rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-sm text-amber-200" role="alert">
                        {submitError}
                        {submitError === RETRY_MESSAGE && (
                          <>
                            {" "}
                            <a href={`mailto:${CONTACT_FALLBACK_EMAIL}`} className="underline font-medium">
                              {CONTACT_FALLBACK_EMAIL}
                            </a>{" "}
                            or call{" "}
                            <a href={telHref()} className="underline font-medium">
                              {BUSINESS.phoneDisplay}
                            </a>
                            .
                          </>
                        )}
                      </p>
                    )}
                    <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", width: 1, height: 1, overflow: "hidden" }}>
                      <label htmlFor="contact-website">Leave this field empty</label>
                      <input ref={honeypotRef} id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
                    </div>
                    <LeadForm
                      submitLabel={copy.submit}
                      submittingLabel="Sending..."
                      submitIcon={<Send className="w-5 h-5" />}
                      onSubmit={handleSubmit}
                      messageLabel={copy.messageLabel}
                      placeholders={{ message: copy.placeholder }}
                    >
                      <fieldset>
                        <legend className="mb-2 block text-sm font-medium text-slate-300">I'm interested in</legend>
                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                          {(Object.keys(INTERESTS) as Interest[]).map((k) => (
                            <label
                              key={k}
                              className={cn(
                                "flex min-h-12 cursor-pointer items-center gap-3 rounded-lg border px-4 text-base text-slate-200 transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-violet-300",
                                interest === k ? "border-violet-300 bg-slate-900 text-white" : "border-slate-700 hover:border-slate-500"
                              )}
                            >
                              <input
                                type="radio"
                                name="interest"
                                value={k}
                                checked={interest === k}
                                onChange={() => chooseInterest(k)}
                                className="h-4 w-4 accent-violet-300"
                              />
                              {INTERESTS[k].label}
                            </label>
                          ))}
                        </div>
                      </fieldset>
                    </LeadForm>
                  </>
                )}
              </div>
            </div>

            <aside aria-labelledby="reach-heading" className="lg:pt-2">
              <h2 id="reach-heading" className="text-lg font-semibold text-white">
                Other ways to reach us
              </h2>
              <dl className="mt-6 divide-y divide-slate-800 border-y border-slate-800">
                <div className="py-4">
                  <dt className="text-sm text-slate-400">Phone</dt>
                  <dd className="mt-1">
                    <a href={telHref()} className={textLink}>
                      {BUSINESS.phoneDisplay}
                    </a>
                  </dd>
                </div>
                <div className="py-4">
                  <dt className="text-sm text-slate-400">Email</dt>
                  <dd className="mt-1">
                    <a href={`mailto:${BUSINESS.email}`} className={`${textLink} break-all`}>
                      {BUSINESS.email}
                    </a>
                  </dd>
                </div>
                <div className="py-4">
                  <dt className="text-sm text-slate-400">Mailing address</dt>
                  <dd className="mt-1 text-base leading-relaxed text-slate-200">{MAILING_ADDRESS}</dd>
                </div>
              </dl>
            </aside>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
