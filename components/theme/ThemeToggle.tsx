"use client";

import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

/**
 * ThemeToggle — v02
 * Uses next-themes useTheme() instead of manual DOM manipulation.
 * Visual label swap (Light ↔ Dark) is still driven by CSS classes on <html>
 * which next-themes manages — zero visual change vs v01.
 */
export function ThemeToggle({
  className = "",
  ariaLabel = "Toggle color mode",
  lightLabel = "Light",
  darkLabel = "Dark",
}: {
  className?: string;
  ariaLabel?: string;
  lightLabel?: string;
  darkLabel?: string;
}) {
  const { resolvedTheme, setTheme } = useTheme();

  function toggleTheme() {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }

  return (
    <button
      type="button"
      className={cn(
        "theme-toggle inline-flex h-10 min-w-14 shrink-0 items-center justify-center border border-outline-variant px-2 font-mono text-[10px] uppercase tracking-[0.16em] text-on-surface-variant transition-colors hover:border-warning-red hover:text-warning-red",
        className,
      )}
      aria-label={ariaLabel}
      onClick={toggleTheme}
    >
      <span className="theme-toggle-action-light" aria-hidden="true">
        {lightLabel}
      </span>
      <span className="theme-toggle-action-dark" aria-hidden="true">
        {darkLabel}
      </span>
    </button>
  );
}
