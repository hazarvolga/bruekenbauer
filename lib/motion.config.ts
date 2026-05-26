import type { Variants } from "framer-motion";

export const easing = [0.22, 1, 0.36, 1] as const;

export const graphiteWipe: Variants = {
  initial: { scaleY: 1, transformOrigin: "top" },
  animate: { scaleY: 0, transition: { duration: 0.9, ease: easing } },
  reduced: { opacity: 0, transition: { duration: 0.01 } },
};

export const curtainReveal: Variants = {
  hidden: { opacity: 0, clipPath: "inset(0 100% 0 0)", x: -12 },
  visible: {
    opacity: 1,
    clipPath: "inset(0 0% 0 0)",
    x: 0,
    transition: { duration: 0.8, ease: easing },
  },
};

export const maskedImageReveal: Variants = {
  hidden: { opacity: 0, clipPath: "inset(42% 42% 42% 42%)", scale: 1.05, filter: "grayscale(1)" },
  visible: {
    opacity: 1,
    clipPath: "inset(0% 0% 0% 0%)",
    scale: 1,
    filter: "grayscale(0)",
    transition: { duration: 1.2, ease: easing },
  },
};

export const staggerText: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.055,
      delayChildren: 0.08,
    },
  },
};

export const staggerTextItem: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: easing } },
};

export const pageTransition: Variants = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.55, ease: easing } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.25, ease: easing } },
};

export function reducedMotion<T>(prefersReducedMotion: boolean, normal: T, fallback: T): T {
  return prefersReducedMotion ? fallback : normal;
}
