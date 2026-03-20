import Link from "next/link";
import { TrendingUp, Check, ArrowRight } from "lucide-react";
import { SERVICES } from "@/lib/constants";
import AnimatedSection from "@/components/shared/AnimatedSection";
import Badge from "@/components/shared/Badge";

/* ── Card accent colors per service ── */
const CARD_ACCENTS = [
  { gradient: "from-blue-500 to-cyan-400", bg: "bg-blue-600", shadow: "shadow-blue-600/25", tagBg: "bg-blue-50 dark:bg-blue-900/30", tagBorder: "border-blue-200 dark:border-blue-700", tagText: "text-blue-700 dark:text-blue-400", label: "Most Popular" },
  { gradient: "from-purple-500 to-pink-400", bg: "bg-purple-600", shadow: "shadow-purple-600/25", tagBg: "bg-purple-50 dark:bg-purple-900/30", tagBorder: "border-purple-200 dark:border-purple-700", tagText: "text-purple-700 dark:text-purple-400", label: null },
  { gradient: "from-emerald-500 to-teal-400", bg: "bg-emerald-600", shadow: "shadow-emerald-600/25", tagBg: "bg-emerald-50 dark:bg-emerald-900/30", tagBorder: "border-emerald-200 dark:border-emerald-700", tagText: "text-emerald-700 dark:text-emerald-400", label: null },
];

/* ── Inline SVG icons (colorful illustrations) ── */

function ExclusiveLeadsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="18" y="8" width="28" height="48" rx="4" fill="#3B82F6" />
      <rect x="21" y="14" width="22" height="34" rx="2" fill="#DBEAFE" />
      <circle cx="32" cy="54" r="2" fill="#93C5FD" />
      <path d="M28 26l4 4 8-8" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="32" cy="31" r="10" fill="#FDE68A" fillOpacity="0.3" />
      <path d="M26 38h12" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M28 42h8" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function VerifiedAppointmentsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="12" width="44" height="42" rx="4" fill="#DBEAFE" />
      <rect x="10" y="12" width="44" height="12" rx="4" fill="#3B82F6" />
      <rect x="20" y="8" width="4" height="8" rx="2" fill="#1E40AF" />
      <rect x="40" y="8" width="4" height="8" rx="2" fill="#1E40AF" />
      <rect x="16" y="30" width="8" height="7" rx="1.5" fill="#93C5FD" />
      <rect x="28" y="30" width="8" height="7" rx="1.5" fill="#93C5FD" />
      <rect x="40" y="30" width="8" height="7" rx="1.5" fill="#22C55E" />
      <rect x="16" y="41" width="8" height="7" rx="1.5" fill="#93C5FD" />
      <rect x="28" y="41" width="8" height="7" rx="1.5" fill="#FDE68A" />
      <rect x="40" y="41" width="8" height="7" rx="1.5" fill="#93C5FD" />
      <path d="M42 33l2 2 4-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ISAVerificationIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="24" r="10" fill="#FBBF24" />
      <path d="M22 46c0-5.523 4.477-10 10-10s10 4.477 10 10" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" />
      <ellipse cx="32" cy="50" rx="16" ry="6" fill="#DBEAFE" />
      <circle cx="48" cy="18" r="8" fill="#22C55E" />
      <path d="M44 18l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="26" cy="24" r="1.5" fill="#1E293B" />
      <circle cx="34" cy="24" r="1.5" fill="#1E293B" />
      <path d="M28 28c0 0 2 3 4 0" stroke="#1E293B" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function LowFeesIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="22" fill="#DCFCE7" />
      <circle cx="32" cy="32" r="16" fill="#22C55E" />
      <text x="32" y="38" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#fff">$</text>
      <path d="M14 44l-4 10h8z" fill="#FDE68A" />
      <path d="M50 44l4 10h-8z" fill="#FDE68A" />
      <path d="M10 18l6 2-2-6z" fill="#3B82F6" opacity="0.5" />
      <path d="M54 14l-6 2 2-6z" fill="#3B82F6" opacity="0.5" />
      <circle cx="12" cy="32" r="2" fill="#FBBF24" />
      <circle cx="52" cy="32" r="2" fill="#FBBF24" />
    </svg>
  );
}

function GeoMarketingIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="28" r="18" fill="#DBEAFE" />
      <path d="M32 10C24.268 10 18 16.268 18 24c0 10 14 22 14 22s14-12 14-22c0-7.732-6.268-14-14-14z" fill="#3B82F6" />
      <circle cx="32" cy="24" r="5" fill="#fff" />
      <circle cx="32" cy="24" r="2" fill="#EF4444" />
      <path d="M8 50h48" stroke="#93C5FD" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="4 3" />
      <path d="M12 54h40" stroke="#93C5FD" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="4 3" />
      <circle cx="14" cy="38" r="3" fill="#FDE68A" opacity="0.7" />
      <circle cx="50" cy="36" r="3" fill="#FDE68A" opacity="0.7" />
    </svg>
  );
}

function AccountManagerIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="20" r="10" fill="#FBBF24" />
      <circle cx="28" cy="19" r="1.5" fill="#1E293B" />
      <circle cx="36" cy="19" r="1.5" fill="#1E293B" />
      <path d="M29 23c0 0 1.5 2 3 2s3-2 3-2" stroke="#1E293B" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M18 48c0-7.732 6.268-14 14-14s14 6.268 14 14" fill="#3B82F6" />
      <path d="M18 48c0-7.732 6.268-14 14-14s14 6.268 14 14" stroke="#1E40AF" strokeWidth="1.5" />
      <rect x="26" y="38" width="12" height="4" rx="1" fill="#fff" opacity="0.3" />
      <circle cx="48" cy="42" r="7" fill="#22C55E" />
      <path d="M46 42h4M48 40v4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
      <rect x="24" y="10" width="16" height="3" rx="1.5" fill="#92400E" opacity="0.4" />
    </svg>
  );
}

const WHY_DIFFERENT = [
  { icon: ExclusiveLeadsIcon, title: "Exclusive", subtitle: "(High-Intent Referrals)", filled: true },
  { icon: VerifiedAppointmentsIcon, title: "Verified Appointments", subtitle: "That Convert", filled: false },
  { icon: ISAVerificationIcon, title: "ISAs", subtitle: "Live Verification by Our ISAs", filled: false },
  { icon: LowFeesIcon, title: "Low Referral Fees", subtitle: "High ROI", filled: false },
  { icon: GeoMarketingIcon, title: "Marketing", subtitle: "Precision Geo-Targeted Marketing", filled: false },
  { icon: AccountManagerIcon, title: "Account Managers", subtitle: "Dedicated Account Managers", filled: true },
];

export default function ServiceCards() {
  return (
    <div>
      {/* Service cards in a 3-column grid */}
      <section className="relative pt-12 pb-24 overflow-hidden">
        <div className="grid-pattern absolute inset-0" />
        <div className="absolute top-1/4 -left-32 h-[28rem] w-[28rem] rounded-full bg-brand-100/50 dark:bg-brand-900/30 blur-3xl" />
        <div className="absolute bottom-1/3 -right-32 h-[24rem] w-[24rem] rounded-full bg-accent-100/30 dark:bg-accent-900/20 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SERVICES.map((service, i) => {
              const Icon = service.icon;
              const accent = CARD_ACCENTS[i];
              return (
                <AnimatedSection key={service.title} delay={i * 0.12}>
                  <Link href={service.href} className="block h-full">
                    <div className="relative rounded-2xl h-full flex flex-col group hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl hover:shadow-brand-600/15 overflow-hidden bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600">
                      {/* Top gradient bar */}
                      <div className={`h-1.5 bg-gradient-to-r ${accent.gradient}`} />

                      <div className="p-7 sm:p-8 flex flex-col flex-1">
                        {/* Header row */}
                        <div className="flex items-start justify-between mb-5">
                          <div className={`flex h-14 w-14 items-center justify-center rounded-xl ${accent.bg} group-hover:scale-110 transition-transform duration-300 shadow-lg ${accent.shadow}`}>
                            <Icon className="h-7 w-7 text-white" />
                          </div>
                          <div className="flex items-center gap-2">
                            {accent.label && (
                              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-full px-2.5 py-0.5">
                                {accent.label}
                              </span>
                            )}
                            <span className="text-4xl font-bold text-slate-100 dark:text-slate-800 select-none tabular-nums">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                          </div>
                        </div>

                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                          {service.title}
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                          {service.description}
                        </p>

                        <ul className="space-y-2.5 flex-1 mb-6">
                          {service.bullets.map((b) => (
                            <li key={b} className="flex items-start gap-3">
                              <div className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full ${accent.tagBg} border ${accent.tagBorder}`}>
                                <Check className="h-3 w-3 text-brand-600" />
                              </div>
                              <span className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                                {b}
                              </span>
                            </li>
                          ))}
                        </ul>

                        <div className={`flex items-center gap-2.5 rounded-xl ${accent.tagBg} border ${accent.tagBorder} px-4 py-2.5 mb-5`}>
                          <TrendingUp className={`h-4 w-4 ${accent.tagText} flex-shrink-0`} />
                          <span className={`text-xs font-semibold ${accent.tagText}`}>
                            {service.metric}
                          </span>
                        </div>

                        {/* Learn more link */}
                        <span className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-600 dark:text-brand-400 group-hover:gap-2.5 transition-all">
                          Learn More <ArrowRight className="h-4 w-4" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why We're Different */}
      <section className="pb-16 sm:pb-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="rounded-3xl bg-gradient-to-br from-brand-600 via-brand-700 to-section-dark p-6 sm:p-10 lg:p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
              <div className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-accent-600/10 blur-3xl" />

              <div className="relative text-center mb-8 sm:mb-10">
                <Badge className="mb-4 border-white/30 bg-white/10 text-white">
                  Why We&apos;re Different
                </Badge>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-snug max-w-2xl mx-auto">
                  At R4Referral, we build partnerships that{" "}
                  <span className="text-accent-300">elevate your business</span>.
                </h2>
              </div>

              <div className="relative grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
                {WHY_DIFFERENT.map((item) => {
                  const ItemIcon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className={`rounded-2xl p-4 sm:p-5 text-center flex flex-col items-center transition-all duration-300 hover:-translate-y-1 ${
                        item.filled
                          ? "bg-white dark:bg-slate-800 shadow-lg shadow-black/10"
                          : "bg-white/10 border border-white/20 backdrop-blur-sm"
                      }`}
                    >
                      <div className="w-12 h-12 sm:w-14 sm:h-14 mb-3 sm:mb-4">
                        <ItemIcon className="w-full h-full" />
                      </div>
                      <h3 className={`text-sm sm:text-base font-bold mb-1 ${
                        item.filled
                          ? "text-slate-900 dark:text-white"
                          : "text-white"
                      }`}>
                        {item.title}
                      </h3>
                      <p className={`text-[11px] sm:text-xs leading-snug ${
                        item.filled
                          ? "text-slate-500 dark:text-slate-400"
                          : "text-white/60"
                      }`}>
                        {item.subtitle}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
