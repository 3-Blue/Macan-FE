"use client";

import { ReactNode } from "react";
import { motion, useReducedMotion, Variants } from "framer-motion";
import { fadeUp, fadeIn, staggerContainer } from "@/lib/motion/tokens";

type RevealVariant = "fade-up" | "fade";

interface RevealProps {
  children: ReactNode;
  variant?: RevealVariant;
  /** Extra delay in seconds, useful for staggering siblings by hand. */
  delay?: number;
  /** Re-trigger every time it scrolls into view, instead of once. */
  repeat?: boolean;
  as?: keyof typeof motion;
  className?: string;
}

const VARIANTS: Record<RevealVariant, Variants> = { "fade-up": fadeUp, fade: fadeIn };

/**
 * Wraps content that should animate in on scroll. Use this instead of
 * writing `whileInView` by hand in every section — it centralizes the
 * easing/duration tokens and the reduced-motion fallback.
 *
 * <Reveal><h2>Heading</h2></Reveal>
 * <Reveal variant="fade" delay={0.1}><Card /></Reveal>
 */
export function Reveal({
  children,
  variant = "fade-up",
  delay = 0,
  repeat = false,
  as = "div",
  className,
}: RevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const Component = motion[as] as typeof motion.div;

  if (prefersReducedMotion) {
    // Reduced motion: render content immediately, no movement, no
    // scroll-triggered opacity change (avoids a jarring "pop" for
    // people who've asked the OS to minimize motion).
    return <div className={className}>{children}</div>;
  }

  const variants = VARIANTS[variant];

  return (
    <Component
      initial="hidden"
      whileInView="visible"
      viewport={{ once: !repeat, margin: "-10% 0px" }}
      variants={variants}
      transition={{ delay }}
      className={className}
    >
      {children}
    </Component>
  );
}

/**
 * Wraps a group of Reveal children so they animate in sequence
 * instead of simultaneously. Children should use <Reveal> internally
 * or be motion elements using the same variant keys.
 *
 * <RevealGroup>
 *   <Reveal>...</Reveal>
 *   <Reveal>...</Reveal>
 * </RevealGroup>
 */
export function RevealGroup({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px" }}
      variants={staggerContainer}
      className={className}
    >
      {children}
    </motion.div>
  );
}
