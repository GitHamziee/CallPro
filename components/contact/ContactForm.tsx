"use client";

import { useState, useRef } from "react";
import { Send, Phone, Mail, MapPin, Clock } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/shared/AnimatedSection";

const CONTACT_INFO = [
  {
    icon: Phone,
    label: "Phone",
    value: "+1 (512) 678-0096",
    href: "tel:+15126780096",
  },
  {
    icon: Mail,
    label: "General",
    value: "R4referral@gmail.com",
    href: "mailto:R4referral@gmail.com",
  },
  {
    icon: MapPin,
    label: "Office",
    value: "5900 Balcones Dr, Ste 100, Austin, TX 78731",
    href: "#",
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Mon–Fri, 9am–6pm EST",
    href: "#",
  },
];

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [messagingTerms, setMessagingTerms] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const formCardRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, marketingConsent, messagingTerms }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
      } else {
        setSubmitted(true);
        formCardRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative pt-12 pb-24 overflow-hidden">
      <div className="grid-pattern absolute inset-0" />
      <div className="absolute top-1/4 -left-32 h-[28rem] w-[28rem] rounded-full bg-brand-100/50 dark:bg-brand-900/30 blur-3xl" />
      <div className="absolute bottom-1/3 -right-32 h-[24rem] w-[24rem] rounded-full bg-accent-100/30 dark:bg-accent-900/20 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          {/* Left — dark contact info card */}
          <AnimatedSection className="lg:col-span-2">
            <div className="relative h-full">
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-b from-brand-500/20 via-accent-500/10 to-brand-600/20 blur-xl" />
              <div className="aurora-card relative rounded-2xl p-8 h-full ring-1 ring-white/10">
                <h2 className="text-xl font-bold text-white mb-2">
                  Get in Touch
                </h2>
                <p className="text-sm text-white/70 leading-relaxed mb-8">
                  Ready to start receiving verified real estate referrals?
                  Reach out — we&apos;ll get back within 1 business day.
                </p>

                <div className="space-y-5">
                  {CONTACT_INFO.map((item) => {
                    const Icon = item.icon;
                    return (
                      <a
                        key={item.label}
                        href={item.href}
                        className="flex items-center gap-4 group rounded-xl p-3 -mx-3 hover:bg-white/5 transition-colors"
                      >
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-brand-500/20 border border-brand-400/30">
                          <Icon className="h-4 w-4 text-brand-400" />
                        </div>
                        <div>
                          <p className="text-[11px] font-medium text-white/70 uppercase tracking-wider">
                            {item.label}
                          </p>
                          <p className="text-sm text-white group-hover:text-white transition-colors">
                            {item.value}
                          </p>
                        </div>
                      </a>
                    );
                  })}
                </div>

              </div>
            </div>
          </AnimatedSection>

          {/* Right — form */}
          <AnimatedSection delay={0.15} className="lg:col-span-3">
            <div ref={formCardRef} className="glass-card rounded-2xl p-8 h-full">
              {submitted ? (
                <div className="flex flex-col items-center justify-center text-center py-16">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700">
                    <Send className="h-7 w-7 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 max-w-xs">
                    Thanks for reaching out. We&apos;ll be in touch within 1
                    business day.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                      Send Us a Message
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                      Fill out the form and we&apos;ll get back to you shortly.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="John Smith"
                        className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="john@company.com"
                        className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        placeholder="+1 (555) 000-0000"
                        className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                        Company
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) =>
                          setFormData({ ...formData, company: e.target.value })
                        }
                        placeholder="Acme Inc."
                        className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                      Message
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder=""
                      className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition-colors resize-none"
                    />
                  </div>

                  {/* Marketing Consent */}
                  <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 p-5">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={marketingConsent}
                        onChange={(e) => setMarketingConsent(e.target.checked)}
                        className="mt-0.5 h-4 w-4 rounded border-slate-300 dark:border-slate-600 text-brand-600 focus:ring-brand-500/20 flex-shrink-0"
                      />
                      <div>
                        <span className="block text-sm font-semibold text-slate-900 dark:text-white mb-1">
                          Marketing Consent <span className="text-xs font-normal text-slate-400">(Optional)</span>
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                          By checking this box, you agree to receive recurring automated marketing and promotional text messages from R4Referral LLC at the phone number provided. Messages include special offers, service updates, and promotional announcements. Message frequency varies (2–4 messages per month). Message and data rates may apply. Reply STOP to opt out. Reply HELP for help. Consent is not a condition of purchase.
                        </span>
                      </div>
                    </label>
                  </div>

                  {/* Messaging Terms */}
                  <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 p-5">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={messagingTerms}
                        onChange={(e) => setMessagingTerms(e.target.checked)}
                        className="mt-0.5 h-4 w-4 rounded border-slate-300 dark:border-slate-600 text-brand-600 focus:ring-brand-500/20 flex-shrink-0"
                      />
                      <div>
                        <span className="block text-sm font-semibold text-slate-900 dark:text-white mb-1">
                          Messaging Terms <span className="text-xs font-normal text-slate-400">(Optional)</span>
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                          By checking this box, you agree to receive non-marketing text messages from R4Referral LLC related to account notifications, service updates, and appointment reminders. Message frequency varies (up to 2 messages per month). Message and data rates may apply. Reply STOP to opt out. Reply HELP for help.
                        </span>
                      </div>
                    </label>
                  </div>

                  {error && (
                    <p className="text-sm text-center text-red-500">{error}</p>
                  )}

                  <div className="flex justify-center">
                    <div className="btn-gradient-wrap rounded-md">
                      <Button
                        type="submit"
                        size="lg"
                        disabled={loading}
                        className="btn-gradient text-white border-0 px-12 disabled:opacity-70"
                      >
                        {loading ? "Sending..." : "Send Message"}
                        {!loading && <Send className="ml-2 h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <p className="text-xs text-center text-slate-500 dark:text-slate-400">
                    <Link href="/privacy-policy" className="underline hover:text-slate-700 dark:hover:text-slate-300 transition-colors">Privacy Policy</Link>
                    {" | "}
                    <Link href="/terms-of-service" className="underline hover:text-slate-700 dark:hover:text-slate-300 transition-colors">Terms of Service</Link>
                  </p>
                </form>
              )}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
