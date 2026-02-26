import { TrendingUp } from "lucide-react";
import { SERVICES, STATS } from "@/lib/constants";
import AnimatedSection from "@/components/shared/AnimatedSection";

const ALL_INCLUDE = [
  "Dedicated agent team",
  "Full call recordings",
  "Live reporting dashboard",
  "Quality monitoring",
  "CRM integration",
  "Priority support",
];

function WavyConnector() {
  return (
    <div className="hidden lg:flex items-start justify-center flex-shrink-0 w-24 pt-24 pointer-events-none select-none overflow-visible">
      {/* negative margins let the SVG visually overlap card edges */}
      <svg
        width="140"
        height="64"
        viewBox="0 0 140 64"
        fill="none"
        style={{ marginLeft: "-20px", marginRight: "-20px" }}
      >
        {/* start dot */}
        <circle cx="8" cy="32" r="5" fill="var(--color-brand-400)" opacity="0.7" />
        {/* wavy path */}
        <path
          d="M 12 32 C 28 6, 46 58, 70 32 C 94 6, 112 58, 128 32"
          stroke="var(--color-brand-500)"
          strokeWidth="2.5"
          strokeDasharray="7 5"
          strokeLinecap="round"
          opacity="0.8"
        />
        {/* end dot */}
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
        {/* endpoint dot */}
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

export default function ServiceCards() {
  // Group SERVICES into pairs [[0,1],[2,3],[4,5]]
  const pairs: (typeof SERVICES)[] = [];
  for (let i = 0; i < SERVICES.length; i += 2) {
    pairs.push(SERVICES.slice(i, i + 2) as typeof SERVICES);
  }

  return (
    <div>
      {/* Outcome stats strip */}
      <section className="bg-brand-600">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-white sm:text-4xl">
                  {stat.value}
                </div>
                <div className="mt-1.5 text-sm text-brand-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Connected staggered service cards */}
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div>
            {pairs.map(([left, right], rowIdx) => {
              const LeftIcon = left.icon;
              const RightIcon = right?.icon;
              const flipConnector = rowIdx % 2 === 1;

              return (
                <div key={left.title}>
                  <AnimatedSection delay={rowIdx * 0.12}>
                    <div className="flex flex-col lg:flex-row items-stretch lg:items-start gap-6 lg:gap-0">

                      {/* Left card */}
                      <div className="flex-1">
                        <div className="glass-card rounded-2xl p-8 h-full flex flex-col group hover:-translate-y-1 transition-all duration-300">
                          <div className="flex items-start justify-between mb-6">
                            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand-600 group-hover:scale-105 transition-transform duration-300 shadow-lg shadow-brand-600/25">
                              <LeftIcon className="h-7 w-7 text-white" />
                            </div>
                            <span className="text-4xl font-bold text-slate-100 select-none tabular-nums">
                              {String(rowIdx * 2 + 1).padStart(2, "0")}
                            </span>
                          </div>
                          <h3 className="text-xl font-bold text-slate-900 mb-3">{left.title}</h3>
                          <p className="text-slate-600 leading-relaxed mb-6">{left.description}</p>
                          <ul className="space-y-3 flex-1 mb-7">
                            {left.bullets.map((b) => (
                              <li key={b} className="flex items-start gap-3">
                                <div className="mt-1 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-brand-100">
                                  <div className="h-1.5 w-1.5 rounded-full bg-brand-600" />
                                </div>
                                <span className="text-sm text-slate-600 leading-relaxed">{b}</span>
                              </li>
                            ))}
                          </ul>
                          <div className="flex items-center gap-2.5 rounded-xl bg-brand-50 border border-brand-100 px-4 py-2.5">
                            <TrendingUp className="h-4 w-4 text-brand-600 flex-shrink-0" />
                            <span className="text-xs font-semibold text-brand-700">{left.metric}</span>
                          </div>
                        </div>
                      </div>

                      {/* Wavy dotted connector */}
                      {right && <WavyConnector />}

                      {/* Right card — offset down */}
                      {right && (
                        <div className="flex-1 lg:mt-14">
                          <div className="glass-card rounded-2xl p-8 h-full flex flex-col group hover:-translate-y-1 transition-all duration-300">
                            <div className="flex items-start justify-between mb-6">
                              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand-600 group-hover:scale-105 transition-transform duration-300 shadow-lg shadow-brand-600/25">
                                <RightIcon className="h-7 w-7 text-white" />
                              </div>
                              <span className="text-4xl font-bold text-slate-100 select-none tabular-nums">
                                {String(rowIdx * 2 + 2).padStart(2, "0")}
                              </span>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">{right.title}</h3>
                            <p className="text-slate-600 leading-relaxed mb-6">{right.description}</p>
                            <ul className="space-y-3 flex-1 mb-7">
                              {right.bullets.map((b) => (
                                <li key={b} className="flex items-start gap-3">
                                  <div className="mt-1 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-brand-100">
                                    <div className="h-1.5 w-1.5 rounded-full bg-brand-600" />
                                  </div>
                                  <span className="text-sm text-slate-600 leading-relaxed">{b}</span>
                                </li>
                              ))}
                            </ul>
                            <div className="flex items-center gap-2.5 rounded-xl bg-brand-50 border border-brand-100 px-4 py-2.5">
                              <TrendingUp className="h-4 w-4 text-brand-600 flex-shrink-0" />
                              <span className="text-xs font-semibold text-brand-700">{right.metric}</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
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
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
