import React from "react";
import clsx from "clsx";

export interface BadgeProps {
  variant?: "agent" | "neutral" | "success" | "warning";
  dot?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function Badge({ variant = "neutral", dot = false, children, className }: BadgeProps) {
  const baseStyles =
    "inline-flex items-center gap-x-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium tracking-tight border";

  const variantStyles = {
    agent:
      "bg-[var(--agent-glow)] text-[var(--agent-primary-dark)] dark:text-[var(--agent-primary-light)] border-[var(--agent-primary)]/30 shadow-sm",
    neutral: "bg-zinc-100 dark:bg-zinc-900/80 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800",
    success: "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/50",
    warning: "bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800/50",
  };

  const dotColor = {
    agent: "bg-[var(--agent-primary)] animate-pulse",
    neutral: "bg-zinc-400 dark:bg-zinc-500",
    success: "bg-emerald-500 animate-pulse",
    warning: "bg-amber-500 animate-pulse",
  };

  return (
    <span className={clsx(baseStyles, variantStyles[variant], className)}>
      {dot && <span className={clsx("size-1.5 rounded-full shrink-0", dotColor[variant])} />}
      {children}
    </span>
  );
}
