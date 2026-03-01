"use client";

import { useState } from "react";
import { Send, Phone, Mail, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/shared/AnimatedSection";

const CONTACT_INFO = [
  {
    icon: Phone,
    label: "Phone",
    value: "+1 (800) 555-1234",
    href: "tel:+18005551234",
  },
  {
    icon: Mail,
    label: "Email",
    value: "hello@r4referral.com",
    href: "mailto:hello@r4referral.com",
  },
  {
    icon: MapPin,
    label: "Office",
    value: "123 Business Ave, New York, NY 10001",
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
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          {/* Contact info */}
          <AnimatedSection>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">
              Let&apos;s Talk
            </h2>
            <p className="text-slate-600 leading-relaxed mb-10">
              Ready to build a pipeline that doesn&apos;t depend on luck? Book
              a free 30-minute strategy call. No sales pressure — just an honest
              look at whether we&apos;re the right fit.
            </p>

            <div className="space-y-6">
              {CONTACT_INFO.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex items-start gap-4 group"
                  >
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-brand-50 border border-brand-100 group-hover:bg-brand-100 transition-colors">
                      <Icon className="h-5 w-5 text-brand-600" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                        {item.label}
                      </p>
                      <p className="mt-0.5 text-sm text-slate-700 group-hover:text-slate-900 transition-colors">
                        {item.value}
                      </p>
                    </div>
                  </a>
                );
              })}
            </div>
          </AnimatedSection>

          {/* Form */}
          <AnimatedSection delay={0.15}>
            <div className="glass-card rounded-2xl p-8">
              {submitted ? (
                <div className="flex flex-col items-center justify-center text-center py-12">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-50 border border-green-200">
                    <Send className="h-7 w-7 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-slate-500 max-w-xs">
                    Thanks for reaching out. We&apos;ll be in touch within 1
                    business day.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="text-lg font-semibold text-slate-900 mb-6">
                    Send Us a Message
                  </h3>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="John Smith"
                        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="john@company.com"
                        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        placeholder="+1 (555) 000-0000"
                        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">
                        Company
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) =>
                          setFormData({ ...formData, company: e.target.value })
                        }
                        placeholder="Acme Inc."
                        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="Tell us about your sales goals and current challenges..."
                      className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition-colors resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-brand-600 hover:bg-brand-700 text-white btn-glow"
                  >
                    Send Message
                    <Send className="ml-2 h-4 w-4" />
                  </Button>

                  <p className="text-xs text-center text-slate-400">
                    We typically respond within 1 business day.
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
