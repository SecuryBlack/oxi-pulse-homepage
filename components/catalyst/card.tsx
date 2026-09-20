import React from "react";
import clsx from "clsx";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverGlow?: boolean;
  children: React.ReactNode;
}

export function Card({ hoverGlow = true, className, children, ...props }: CardProps) {
  return (
    <div
      className={clsx(
        "relative rounded-2xl border border-zinc-200/90 dark:border-zinc-800/80 bg-white dark:bg-gradient-to-b dark:from-zinc-900/60 dark:to-zinc-950/80 p-6 shadow-sm dark:shadow-none backdrop-blur-sm transition-all duration-300",
        hoverGlow && "hover:border-zinc-300 dark:hover:border-zinc-700/80 hover:shadow-md dark:hover:shadow-[0_0_24px_var(--agent-glow)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
