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
import Image from "next/image";

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
  imageClassName = "",
  overlayClassName = "",
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
  children,
}: {
  image: string;
  label: string;
  className?: string;
  imageClassName?: string;
  overlayClassName?: string;
  priority?: boolean;
  sizes?: string;
  children?: ReactNode;
}) {
  const reduce = useReducedMotion();
  return (
    <div className={cn("relative overflow-hidden bg-surface-container-lowest", className)}>
      <motion.div
        variants={reduce ? undefined : maskedImageReveal}
        initial={reduce ? false : "hidden"}
        animate={reduce ? undefined : "visible"}
        className="absolute inset-0"
      >
        <Image
          src={image}
          alt={label}
          fill
          priority={priority}
          quality={95}
          sizes={sizes}
          className={cn("object-cover", imageClassName)}
        />
      </motion.div>
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
