"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Seconds to wait before this element animates in. */
  delay?: number;
  /** How far it travels, in px. */
  y?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article" | "header" | "footer";
};

/**
 * Fades + lifts its children the first time they scroll into view.
 * Respects prefers-reduced-motion by rendering the final state immediately.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 18,
  className,
  as = "div",
}: RevealProps) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as];

  if (reduced) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      // Server-rendered as opacity:0; the noscript style in the layout keys
      // off this attribute so the page isn't blank without JavaScript.
      data-reveal=""
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}
