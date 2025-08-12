import type { ReactNode } from "react";

type BadgeTone = "default" | "success" | "warning" | "danger" | "info" | "violet";

type BadgeProps = {
  children: ReactNode;
  tone?: BadgeTone;
};

const Badge = ({ children, tone = "default" }: BadgeProps) => {
  const tones: Record<BadgeTone, string> = {
    default: "bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300",
    success: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
    warning: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
    danger: "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300",
    info: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
    violet: "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300",
  };
  return <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${tones[tone]}`}>{children}</span>;
};

export default Badge;