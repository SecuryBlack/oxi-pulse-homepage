"use client";

import React, { useEffect, useState } from "react";
import { Sun, Moon, Laptop } from "lucide-react";

export type ThemePreference = "auto" | "light" | "dark";

export function ThemeToggle() {
  const [preference, setPreference] = useState<ThemePreference>("auto");
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = (localStorage.getItem("theme") as ThemePreference) || "auto";
    setPreference(stored);

    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const computeResolved = (pref: ThemePreference) => {
      if (pref === "dark") return "dark";
      if (pref === "light") return "light";
      return mql.matches ? "dark" : "light";
    };

    const isDark = computeResolved(stored) === "dark";
    setResolvedTheme(isDark ? "dark" : "light");
    document.documentElement.classList.toggle("dark", isDark);
    setMounted(true);

    const handleSystemChange = (e: MediaQueryListEvent) => {
      const curStored = (localStorage.getItem("theme") as ThemePreference) || "auto";
      if (curStored === "auto") {
        document.documentElement.classList.toggle("dark", e.matches);
        setResolvedTheme(e.matches ? "dark" : "light");
      }
    };

    mql.addEventListener("change", handleSystemChange);
    return () => mql.removeEventListener("change", handleSystemChange);
  }, []);

  const cycleTheme = () => {
    // Cycle: auto -> light -> dark -> auto
    const next: ThemePreference =
      preference === "auto" ? "light" : preference === "light" ? "dark" : "auto";

    setPreference(next);
    localStorage.setItem("theme", next);

    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const isDark = next === "dark" || (next === "auto" && mql.matches);
    setResolvedTheme(isDark ? "dark" : "light");
    document.documentElement.classList.toggle("dark", isDark);
  };

  if (!mounted) {
    return (
      <div className="size-8 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-100/50 dark:bg-zinc-900/50" />
    );
  }

  const titleText =
    preference === "auto"
      ? `Tema automático del sistema (${resolvedTheme === "dark" ? "Oscuro" : "Claro"}). Clic para cambiar.`
      : preference === "dark"
      ? "Tema Oscuro (Fijo). Clic para cambiar a Automático."
      : "Tema Claro (Fijo). Clic para cambiar a Oscuro.";

  return (
    <button
      onClick={cycleTheme}
      className="size-8 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:border-zinc-300 dark:hover:border-zinc-700 transition-all cursor-pointer shadow-sm"
      title={titleText}
      aria-label={titleText}
    >
      {preference === "auto" ? (
        <Laptop className="size-4 text-[var(--agent-primary-dark)] dark:text-[var(--agent-primary-light)]" />
      ) : preference === "dark" ? (
        <Moon className="size-4 text-cyan-400" />
      ) : (
        <Sun className="size-4 text-amber-500" />
      )}
    </button>
  );
}
