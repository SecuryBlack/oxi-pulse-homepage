import React from "react";
import clsx from "clsx";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "plain";
  size?: "sm" | "base" | "lg";
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "base", icon, className, children, ...props }, ref) => {
    const baseStyles =
      "relative isolate inline-flex items-center justify-center gap-x-2 font-medium tracking-tight rounded-xl transition-all duration-150 active:scale-[0.98] cursor-pointer disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed select-none";

    const sizeStyles = {
      sm: "px-3 py-1.5 text-xs",
      base: "px-4 py-2 text-sm",
      lg: "px-5 py-2.5 text-base font-semibold",
    };

    const variantStyles = {
      primary:
        "bg-[var(--agent-primary)] text-zinc-950 hover:brightness-110 shadow-[inset_0_1px_0_rgba(255,255,255,0.25)] font-semibold",
      secondary:
        "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-700/80 border border-zinc-200 dark:border-zinc-700/60 shadow-sm",
      outline:
        "bg-white dark:bg-zinc-900/50 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-850 hover:text-zinc-950 dark:hover:text-white border border-zinc-300 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-700 backdrop-blur-sm shadow-xs",
      plain: "text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900/60",
    };

    return (
      <button
        ref={ref}
        className={clsx(baseStyles, sizeStyles[size], variantStyles[variant], className)}
        {...props}
      >
        {icon && <span className="size-4 shrink-0 flex items-center justify-center">{icon}</span>}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
