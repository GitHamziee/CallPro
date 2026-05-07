import AnimatedSection from "@/components/shared/AnimatedSection";
import Badge from "@/components/shared/Badge";
import { TESTIMONIALS } from "@/lib/constants";

export default function Testimonials() {
  return (
    <section className="py-24 bg-brand-600 relative overflow-hidden">
      <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-brand-500/40 blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-accent-500/20 blur-3xl translate-y-1/3 -translate-x-1/3" />
      <div className="grid-pattern absolute inset-0 opacity-10" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <Badge className="mb-4 border-white/30 bg-white/10 text-white">
            Client Reviews
          </Badge>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Reviews From{" "}
            <span className="text-accent-300">Our Customers</span>
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TESTIMONIALS.map((t, i) => (
            <AnimatedSection key={t.id} delay={i * 0.1}>
              <div className="mx-auto w-full max-w-[280px] aspect-[9/16] overflow-hidden rounded-2xl border border-white/20 bg-black/20 shadow-lg">
                <iframe
                  src={`${t.videoUrl}?rel=0&modestbranding=1`}
                  title={`Customer review ${i + 1}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full"
                />
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
