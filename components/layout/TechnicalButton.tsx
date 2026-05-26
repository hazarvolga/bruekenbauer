import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  href?: string;
  type?: "button" | "submit";
  variant?: "primary" | "ghost";
  className?: string;
  onClick?: () => void;
};

const base =
  "inline-flex items-center justify-center gap-3 border px-6 py-3 font-mono text-label-xs uppercase tracking-[0.16em] transition-colors active:scale-[0.98]";

/**
 * TechnicalButton — v02
 * Uses cn() for class composition — twMerge resolves className overrides cleanly
 * instead of string concat (no more duplicate/conflicting Tailwind utilities).
 */
export function TechnicalButton({
  children,
  href,
  type = "button",
  variant = "primary",
  className = "",
  onClick,
}: Props) {
  const classes = cn(
    base,
    variant === "primary"
      ? "border-warning-red bg-warning-red text-primary-container hover:bg-transparent hover:text-warning-red"
      : "border-industrial-silver/60 bg-transparent text-industrial-silver hover:border-warning-red hover:text-warning-red",
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick}>
      {children}
    </button>
  );
}
