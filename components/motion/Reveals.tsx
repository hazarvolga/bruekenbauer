"use client";

import type { ReactNode } from "react";
import {
  curtainReveal,
  maskedImageReveal,
  staggerText,
  staggerTextItem,
} from "@/lib/motion.config";
import { motion, useReducedMotion } from "./MotionProvider";
import { cn } from "@/lib/utils";

export function CurtainReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      variants={reduce ? undefined : curtainReveal}
      initial={reduce ? false : "hidden"}
      animate={reduce ? undefined : "visible"}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function MaskedImageFrame({
  image,
  label,
  className = "",
  imageClassName = "mix-blend-normal dark:mix-blend-luminosity",
  overlayClassName = "bg-gradient-to-t from-background via-background/35 to-transparent",
  children,
}: {
  image: string;
  label: string;
  className?: string;
  imageClassName?: string;
  overlayClassName?: string;
  children?: ReactNode;
}) {
  const reduce = useReducedMotion();
  return (
    <div className={cn("relative overflow-hidden bg-surface-container-lowest", className)}>
      <motion.div
        variants={reduce ? undefined : maskedImageReveal}
        initial={reduce ? false : "hidden"}
        animate={reduce ? undefined : "visible"}
        className={cn("absolute inset-0 bg-cover bg-center", imageClassName)}
        aria-label={label}
        role="img"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className={cn("absolute inset-0", overlayClassName)} />
      {children}
    </div>
  );
}

export function StaggerText({ text, className = "" }: { text: string; className?: string }) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  return (
    <motion.span
      variants={reduce ? undefined : staggerText}
      initial={reduce ? false : "hidden"}
      animate={reduce ? undefined : "visible"}
      className={className}
    >
      {words.map((word, wordIndex) => (
        <span key={`${word}-${wordIndex}`} className="mr-[0.28em] inline-block whitespace-nowrap">
          {word.split("").map((char, charIndex) => (
            <motion.span
              key={`${char}-${wordIndex}-${charIndex}`}
              variants={staggerTextItem}
              className="inline-block"
            >
              {char}
            </motion.span>
          ))}
          {wordIndex < words.length - 1 ? " " : null}
        </span>
      ))}
    </motion.span>
  );
}
