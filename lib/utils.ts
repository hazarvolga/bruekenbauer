import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind classes safely — clsx handles conditionals,
 * twMerge resolves conflicts (e.g. bg-red-500 bg-blue-500 → bg-blue-500).
 *
 * Usage:
 *   cn("base-class", condition && "conditional-class", className)
 *   cn({ "text-warning-red": isError, "text-industrial-silver": !isError })
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
