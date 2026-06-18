import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  href?: string;
  type?: "button" | "submit";
  variant?: "primary" | "ghost";
  size?: "sm" | "md";
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
};

const base =
  "inline-flex items-center justify-center gap-3 whitespace-normal border text-center font-mono text-label-xs uppercase transition-colors active:scale-[0.98]";

const sizes = {
  sm: "min-h-11 px-3 py-2 tracking-[0.14em]",
  md: "min-h-11 px-6 py-3 tracking-[0.16em]",
};

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
  size = "md",
  className = "",
  disabled = false,
  onClick,
}: Props) {
  const classes = cn(
    base,
    sizes[size],
    variant === "primary"
      ? "border-warning-red bg-warning-red text-primary-container hover:bg-transparent hover:text-warning-red"
      : "border-industrial-silver/60 bg-transparent text-industrial-silver hover:border-warning-red hover:text-warning-red",
    disabled && "cursor-not-allowed opacity-60 hover:bg-warning-red hover:text-primary-container",
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
    <button type={type} className={classes} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}
