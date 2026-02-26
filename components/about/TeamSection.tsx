import { TEAM_MEMBERS } from "@/lib/constants";
import AnimatedSection from "@/components/shared/AnimatedSection";
import Badge from "@/components/shared/Badge";

const AVATAR_COLORS = [
  "from-brand-600 to-accent-500",
  "from-purple-600 to-brand-500",
  "from-cyan-600 to-teal-500",
  "from-brand-700 to-indigo-500",
];

export default function TeamSection() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <Badge className="mb-4">The Team</Badge>
          <h2 className="text-3xl font-bold text-slate-900">
            The People Behind{" "}
            <span className="gradient-text">Your Results</span>
          </h2>
          <p className="mt-4 text-slate-600 max-w-xl mx-auto">
            Former sales leaders, trainers, and operators who&apos;ve built and
            run outbound teams at scale.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM_MEMBERS.map((member, i) => (
            <AnimatedSection key={member.name} delay={i * 0.1}>
              <div className="glass-card rounded-2xl p-6 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1">
                <div
                  className={`mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br ${AVATAR_COLORS[i % AVATAR_COLORS.length]} text-2xl font-bold text-white shadow-lg`}
                >
                  {member.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <h3 className="text-base font-semibold text-slate-900">
                  {member.name}
                </h3>
                <p className="mt-1 text-sm text-brand-600">{member.title}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
