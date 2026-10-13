"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/ui/page-shell";
import { LeadForm, type LeadFormData } from "@/components/forms/lead-form";
import { Send } from "lucide-react";
import { body, h1, inner, section, textLink } from "@/components/home-v3/v3-ui";
import { SeoHead } from "@/components/seo/seo-head";
import { JsonLd } from "@/components/seo/json-ld";
import { BRAND_TAGLINE, telHref } from "@/lib/site-config";
import { breadcrumbSchema, contactPageSchema, webPageSchema } from "@/lib/schema";

const API_CONTACT = "/api/contact";
const CONTACT_FALLBACK_EMAIL = "don@mercyspeaksdigital.com";
const RETRY_MESSAGE =
  "We couldn't send your message. Please try again in a moment, or email us directly.";

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const honeypotRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (data: LeadFormData) => {
    setSubmitError(null);
    try {
      const res = await fetch(API_CONTACT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, website: honeypotRef.current?.value ?? "" }),
      });
      const json = (await res.json().catch(() => null)) as { success?: boolean; message?: string } | null;
      // Only show success when the server explicitly confirms acceptance.
      if (res.ok && json?.success === true) {
        setIsSubmitted(true);
        return;
      }
      // Show validation messages (400) from our own API; generic retry for everything else.
      setSubmitError(res.status === 400 && json?.message ? json.message : RETRY_MESSAGE);
    } catch {
      setSubmitError(RETRY_MESSAGE);
    }
  };

  return (
    <PageShell className="min-h-screen bg-slate-950">
      <SeoHead
        path="/contact"
        title="Get a Website Quote | Mercy Speaks Digital"
        description="Tell us about your business and we'll send a written quote, valid for 30 calendar days."
      />
      <JsonLd
        data={[
          webPageSchema({
            name: "Contact Mercy Speaks Digital",
            description: BRAND_TAGLINE,
            path: "/contact",
          }),
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
            <div>
              <h1 id="page-heading" className={h1}>
                Get a Website Quote
              </h1>
              <p className={`${body} mt-6 max-w-xl mx-0`}>
                Tell us about your business and we&apos;ll send a written quote, valid for 30 calendar days.
              </p>
              <div className="mt-10 rounded-xl border border-slate-800 p-5 sm:p-8">
                {isSubmitted ? (
                  <div className="py-8 text-center">
                    <p role="status" tabIndex={-1} ref={(el) => el?.focus()} className="mx-auto mb-6 max-w-xl text-lg font-medium leading-relaxed text-white outline-none sm:text-xl">
                      {"Thanks — your request has been received. We'll review the details and follow up using the contact information you provided."}
                    </p>
                    <Button variant="outline" size="lg" onClick={() => setIsSubmitted(false)}>
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <>
                    <h2 className="mb-6 text-xl font-semibold text-white">Send Us a Message</h2>
                    {submitError && (
                      <p className="mb-4 rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-sm text-amber-200" role="alert">
                        {submitError}
                        {submitError === RETRY_MESSAGE && (<>{" "}
                        <a href={`mailto:${CONTACT_FALLBACK_EMAIL}`} className="underline font-medium">
                          {CONTACT_FALLBACK_EMAIL}
                        </a>{" "}
                        or call{" "}
                        <a href={telHref()} className="underline font-medium">
                          (832) 981-3123
                        </a>
                        .</>)}
                      </p>
                    )}
                    <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", width: 1, height: 1, overflow: "hidden" }}>
                      <label htmlFor="contact-website">Leave this field empty</label>
                      <input ref={honeypotRef} id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
                    </div>
                    <LeadForm
                      submitLabel="Get a Website Quote"
                      submittingLabel="Sending..."
                      submitIcon={<Send className="w-5 h-5" />}
                      onSubmit={handleSubmit}
                      placeholders={{ message: "Tell us about your business and how we can help..." }}
                    />
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
                      (832) 981-3123
                    </a>
                  </dd>
                </div>
                <div className="py-4">
                  <dt className="text-sm text-slate-400">Email</dt>
                  <dd className="mt-1">
                    <a href="mailto:don@mercyspeaksdigital.com" className={`${textLink} break-all`}>
                      don@mercyspeaksdigital.com
                    </a>
                  </dd>
                </div>
                <div className="py-4">
                  <dt className="text-sm text-slate-400">Mailing address</dt>
                  <dd className="mt-1 text-base leading-relaxed text-slate-200">
                    Mercy Speaks Digital, 5554 S Peek Road, PMB #2144, Katy, TX 77450
                  </dd>
                </div>
              </dl>
            </aside>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
