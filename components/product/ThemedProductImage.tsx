"use client"; // useTheme() requires client boundary

import Image from "next/image";
import { useTheme } from "next-themes";

type ThemedProductImageProps = {
  src: string;
  darkSrc?: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

/**
 * ThemedProductImage — v02
 *
 * v01 bug fixed: previously always rendered darkSrc regardless of active theme.
 * Now uses resolvedTheme from next-themes to switch images reactively.
 *
 * Fallback chain:
 *   light mode       → src              (light-optimised asset)
 *   dark mode        → darkSrc ?? src   (dark asset, or light if no dark variant)
 *   SSR / hydrating  → darkSrc ?? src   (brand default is dark)
 */
export function ThemedProductImage({
  src,
  darkSrc,
  alt,
  className = "",
  sizes = "(min-width: 768px) 50vw, 100vw",
  priority = false,
}: ThemedProductImageProps) {
  const { resolvedTheme } = useTheme();

  // resolvedTheme is undefined during SSR — default to dark (matches brand identity)
  // Fallback: If we have a high-quality premium image in darkSrc (under products-premium) 
  // and no dedicated light premium image exists, we display the premium darkSrc in both themes 
  // to prevent the old, low-quality AI images from showing up in light mode.
  const isPremiumDark = darkSrc?.includes("products-premium");
  const activeSrc = resolvedTheme === "light"
    ? ((isPremiumDark && darkSrc) ? darkSrc : src)
    : (darkSrc ?? src);
  
  // Brutally honest fix: In light mode, any opacity less than 100% causes the bright light-theme 
  // container background to bleed through the dark matte industrial images, creating a washed-out 
  // "sis perdesi" (fog curtain) effect. We dynamically override opacity classes to 100% in light mode.
  let baseClass = className || "object-cover";
  if (resolvedTheme === "light") {
    baseClass = baseClass
      .replace(/\bopacity-\d+\b/g, "opacity-100")
      .replace(/\bgroup-hover:opacity-\d+\b/g, "group-hover:opacity-100");
  }

  return (
    <Image
      src={activeSrc}
      alt={alt}
      fill
      priority={priority}
      sizes={sizes}
      className={baseClass}
    />
  );
}
