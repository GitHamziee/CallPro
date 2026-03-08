import { TrendingUp, Check } from "lucide-react";
import { SERVICES } from "@/lib/constants";
import AnimatedSection from "@/components/shared/AnimatedSection";

const ALL_INCLUDE = [
  "Dedicated team",
  "Weekly reports",
  "Live dashboard",
  "CRM integration",
  "Quality monitoring",
  "Priority support",
];

function WavyConnector() {
  return (
    <div className="hidden lg:flex items-start justify-center flex-shrink-0 w-24 pt-24 pointer-events-none select-none overflow-visible">
      <svg
        width="140"
        height="64"
        viewBox="0 0 140 64"
        fill="none"
        style={{ marginLeft: "-20px", marginRight: "-20px" }}
      >
        <circle cx="8" cy="32" r="5" fill="var(--color-brand-400)" opacity="0.7" />
        <path
          d="M 12 32 C 28 6, 46 58, 70 32 C 94 6, 112 58, 128 32"
          stroke="var(--color-brand-500)"
          strokeWidth="2.5"
          strokeDasharray="7 5"
          strokeLinecap="round"
          opacity="0.8"
        />
        <circle cx="132" cy="32" r="6" fill="var(--color-brand-600)" opacity="0.8" />
        <circle cx="132" cy="32" r="3" fill="white" opacity="0.9" />
      </svg>
    </div>
  );
}

function RowConnector({ flip }: { flip?: boolean }) {
  return (
    <div className={`hidden lg:flex ${flip ? "justify-end pr-16" : "justify-start pl-16"} -mt-2 mb-2 pointer-events-none select-none`}>
      <svg width="100" height="72" viewBox="0 0 100 72" fill="none">
        <path
          d={flip
            ? "M 88 4 C 72 18, 42 52, 12 68"
            : "M 12 4 C 28 18, 58 52, 88 68"}
          stroke="var(--color-brand-400)"
          strokeWidth="2.5"
          strokeDasharray="7 5"
          strokeLinecap="round"
          opacity="0.7"
        />
        <circle
          cx={flip ? 12 : 88}
          cy="68"
          r="5"
          fill="var(--color-brand-500)"
          opacity="0.7"
        />
      </svg>
    </div>
  );
}

/* ── Light card (glass style) ── */
function LightCard({
  service,
  index,
}: {
  service: (typeof SERVICES)[number];
  index: number;
}) {
  const Icon = service.icon;
  return (
    <div className="relative glass-card rounded-2xl p-8 h-full flex flex-col group hover:-translate-y-1 transition-all duration-300 hover:shadow-xl hover:shadow-brand-600/8 hover:border-brand-200">
      {/* Top gradient accent line */}
      <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-brand-400 to-transparent" />

      <div className="flex items-start justify-between mb-6">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand-600 group-hover:scale-105 transition-transform duration-300 shadow-lg shadow-brand-600/25">
          <Icon className="h-7 w-7 text-white" />
        </div>
        <span className="text-4xl font-bold text-slate-100 select-none tabular-nums">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
      <p className="text-slate-600 leading-relaxed mb-6">{service.description}</p>
      <ul className="space-y-3 flex-1 mb-7">
        {service.bullets.map((b) => (
          <li key={b} className="flex items-start gap-3">
            <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-brand-50 border border-brand-200">
              <Check className="h-3 w-3 text-brand-600" />
            </div>
            <span className="text-sm text-slate-600 leading-relaxed">{b}</span>
          </li>
        ))}
      </ul>
      <div className="flex items-center gap-2.5 rounded-xl bg-brand-50 border border-brand-100 px-4 py-2.5">
        <TrendingUp className="h-4 w-4 text-brand-600 flex-shrink-0" />
        <span className="text-xs font-semibold text-brand-700">{service.metric}</span>
      </div>
    </div>
  );
}

/* ── Dark card (aurora style) ── */
function DarkCard({
  service,
  index,
}: {
  service: (typeof SERVICES)[number];
  index: number;
}) {
  const Icon = service.icon;
  return (
    <div className="relative">
      {/* Glow behind card */}
      <div className="absolute -inset-1 rounded-3xl bg-gradient-to-b from-brand-500/20 via-accent-500/15 to-brand-600/20 blur-xl" />

      <div className="aurora-card relative rounded-2xl p-8 h-full flex flex-col group hover:-translate-y-1 transition-all duration-300 shadow-2xl shadow-brand-900/30 ring-1 ring-white/10">
        <div className="flex items-start justify-between mb-6">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand-500/20 border border-brand-400/30 group-hover:scale-105 transition-transform duration-300">
            <Icon className="h-7 w-7 text-brand-400" />
          </div>
          <span className="text-4xl font-bold text-white/10 select-none tabular-nums">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
        <p className="text-white/50 leading-relaxed mb-6">{service.description}</p>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/15 to-transparent mb-6" />

        <ul className="space-y-3 flex-1 mb-7">
          {service.bullets.map((b) => (
            <li key={b} className="flex items-start gap-3">
              <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-brand-500/25 border border-brand-400/30">
                <Check className="h-3 w-3 text-brand-400" />
              </div>
              <span className="text-sm text-white/60 leading-relaxed">{b}</span>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2.5 rounded-xl bg-white/10 border border-white/15 px-4 py-2.5">
          <TrendingUp className="h-4 w-4 text-brand-400 flex-shrink-0" />
          <span className="text-xs font-semibold text-white/70">{service.metric}</span>
        </div>
      </div>
    </div>
  );
}

function ServiceCard({
  service,
  index,
  dark,
}: {
  service: (typeof SERVICES)[number];
  index: number;
  dark: boolean;
}) {
  return dark ? (
    <DarkCard service={service} index={index} />
  ) : (
    <LightCard service={service} index={index} />
  );
}

export default function ServiceCards() {
  // Group SERVICES into pairs [[0,1],[2,3],[4]]
  const pairs: (typeof SERVICES)[] = [];
  for (let i = 0; i < SERVICES.length; i += 2) {
    pairs.push(SERVICES.slice(i, i + 2) as typeof SERVICES);
  }

  return (
    <div>
      {/* Connected staggered service cards */}
      <section className="relative py-24 overflow-hidden">
        <div className="grid-pattern absolute inset-0" />
        <div className="absolute top-1/4 -left-32 h-[28rem] w-[28rem] rounded-full bg-brand-100/50 blur-3xl" />
        <div className="absolute bottom-1/3 -right-32 h-[24rem] w-[24rem] rounded-full bg-accent-100/30 blur-3xl" />

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div>
            {pairs.map((pair, rowIdx) => {
              const left = pair[0];
              const right = pair[1];
              const flipConnector = rowIdx % 2 === 1;
              const isSoloLast = !right && rowIdx === pairs.length - 1;

              return (
                <div key={left.title}>
                  <AnimatedSection delay={rowIdx * 0.12}>
                    {isSoloLast ? (
                      /* Solo card — centered, dark style for emphasis */
                      <div className="flex justify-center">
                        <div className="w-full max-w-md">
                          <ServiceCard service={left} index={rowIdx * 2} dark />
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col lg:flex-row items-stretch lg:items-start gap-6 lg:gap-0">
                        {/* Left card — alternates light/dark per row */}
                        <div className="flex-1">
                          <ServiceCard
                            service={left}
                            index={rowIdx * 2}
                            dark={rowIdx % 2 === 1}
                          />
                        </div>

                        {/* Wavy dotted connector */}
                        {right && <WavyConnector />}

                        {/* Right card — opposite style */}
                        {right && (
                          <div className="flex-1 lg:mt-14">
                            <ServiceCard
                              service={right}
                              index={rowIdx * 2 + 1}
                              dark={rowIdx % 2 === 0}
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </AnimatedSection>

                  {/* Row-to-row diagonal connector */}
                  {rowIdx < pairs.length - 1 && (
                    <RowConnector flip={flipConnector} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* "Every service includes" strip */}
      <section className="pb-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="rounded-2xl bg-slate-50 border border-slate-200 px-8 py-8">
              <p className="text-center text-xs font-semibold text-slate-400 uppercase tracking-widest mb-6">
                Every service includes
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {ALL_INCLUDE.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 rounded-full bg-white border border-slate-200 px-4 py-2 shadow-sm"
                  >
                    <div className="h-2 w-2 rounded-full bg-brand-600" />
                    <span className="text-sm font-medium text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
