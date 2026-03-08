/** Shared formatting utilities used across pages. */

export function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.floor(months / 12)}y ago`;
}

export function getInitials(name: string | null, email: string) {
  if (name) {
    return name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  }
  return email[0].toUpperCase();
}

const AVATAR_COLORS = [
  "bg-brand-100 dark:bg-brand-900/40 text-brand-700 dark:text-brand-400",
  "bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-400",
  "bg-sky-100 dark:bg-sky-900/40 text-sky-700 dark:text-sky-400",
  "bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400",
  "bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-400",
  "bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-400",
];

export function getAvatarColor(id: string) {
  let hash = 0;
  for (let i = 0; i < id.length; i++)
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

export const LEAD_STATUS_BADGES: Record<string, string> = {
  NEW: "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300",
  PENDING: "bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400",
  ACCEPTED: "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400",
  INVOICED: "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400",
  PAID: "bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400",
};
