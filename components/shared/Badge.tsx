interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export default function Badge({ children, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-brand-200 dark:border-brand-700 bg-brand-50 dark:bg-brand-900/30 px-3 py-1 text-xs font-medium text-brand-600 dark:text-brand-400 ${className}`}
    >
      {children}
    </span>
  );
}
