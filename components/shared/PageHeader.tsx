import Badge from "./Badge";

interface PageHeaderProps {
  badge?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export default function PageHeader({
  badge,
  title,
  subtitle,
  centered = true,
}: PageHeaderProps) {
  return (
    <div
      className={`relative overflow-hidden bg-white py-24 ${centered ? "text-center" : ""}`}
    >
      <div className="grid-pattern absolute inset-0" />
      <div className="absolute left-1/2 top-0 -translate-x-1/2 h-72 w-72 rounded-full bg-brand-100/60 blur-3xl" />

      <div className="relative mx-auto max-w-4xl px-4">
        {badge && (
          <div className={`mb-4 ${centered ? "flex justify-center" : ""}`}>
            <Badge>{badge}</Badge>
          </div>
        )}
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
