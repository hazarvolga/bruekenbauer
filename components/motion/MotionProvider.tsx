"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { pageTransition, reducedMotion } from "@/lib/motion.config";

export function PageShell({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.main
      variants={reducedMotion(prefersReducedMotion ?? false, pageTransition, {
        initial: { opacity: 1 },
        animate: { opacity: 1 },
        exit: { opacity: 1 },
      })}
      initial="initial"
      animate="animate"
      exit="exit"
      className={className}
    >
      {children}
    </motion.main>
  );
}

export { motion, useReducedMotion };
