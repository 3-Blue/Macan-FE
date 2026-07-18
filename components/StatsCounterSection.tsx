import { Reveal } from "@/components/motion/Reveal";
"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Animated stats / achievements counter section
 * Issue: https://github.com/3-Blue/Macan-FE/issues/8
 *
 * Design direction: "as-built survey stamp" — each figure sits on a
 * measuring-tape tick rule that fills in as the number counts up, then
 * locks with a small rotating diamond seal, echoing the QC/as-built
 * stamps used on engineering drawings. Ticks and seal live in
 * safety-amber against a graphite/blueprint-navy field.
 *
 * Tokens (from design plan):
 *   --stat-bg:        #14181C  (graphite)
 *   --stat-bg-panel:  #1C2B3A  (blueprint navy)
 *   --stat-accent:    #F2A93B  (safety amber)
 *   --stat-rule:      #3B4A57  (rivet gray, unfilled ticks/dividers)
 *   --stat-fg:        #EDEFF1  (off-white)
 *   --stat-fg-muted:  #93A1AC
 *
 * Fonts: display numerals in a condensed industrial face (Oswald),
 * labels/captions in Inter. Load both via next/font in the real app;
 * here they're referenced by family name with system fallbacks.
 */

export interface StatItem {
  id: string;
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  decimals?: number;
}

interface StatsCounterSectionProps {
  eyebrow?: string;
  heading?: string;
  stats?: StatItem[];
}

const DEFAULT_STATS: StatItem[] = [
  { id: "projects", value: 128, suffix: "+", label: "Projects delivered" },
  { id: "years", value: 18, label: "Years in operation" },
  {
    id: "industries",
    value: 4,
    label: "Industries served",
  },
  {
    id: "manhours",
    value: 2.4,
    decimals: 1,
    suffix: "M",
    label: "Safe man-hours logged",
  },
];

function easeOutExpo(t: number) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

function useCountUp(target: number, active: boolean, decimals = 0, duration = 1800, delay = 0) {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number>();

  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    const timeout = setTimeout(() => {
      const step = (timestamp: number) => {
        if (start === null) start = timestamp;
        const elapsed = timestamp - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeOutExpo(progress);
        setValue(Number((target * eased).toFixed(decimals)));
        if (progress < 1) {
          rafRef.current = requestAnimationFrame(step);
        }
      };
      rafRef.current = requestAnimationFrame(step);
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, target, decimals, duration, delay]);

  return value;
}

function StatBlock({
  stat,
  index,
  active,
}: {
  stat: StatItem;
  index: number;
  active: boolean;
}) {
  const prefersReducedMotion = useReducedMotion();
  const delay = prefersReducedMotion ? 0 : index * 140;
  const duration = prefersReducedMotion ? 0 : 1800;
  const count = useCountUp(stat.value, active, stat.decimals ?? 0, duration, delay);
  const progress = stat.value === 0 ? 1 : Math.min(count / stat.value, 1);
  const done = progress >= 0.999;

  const ticks = Array.from({ length: 12 });

  return (
    <div className="relative flex flex-1 flex-col items-center px-6 py-8 text-center sm:py-10">
      <span
        className="tabular-nums leading-none"
        style={{
          fontFamily: "'Oswald', 'Arial Narrow', sans-serif",
          fontWeight: 600,
          fontSize: "clamp(2.5rem, 6vw, 4rem)",
          color: "#EDEFF1",
          letterSpacing: "0.01em",
        }}
      >
        {stat.prefix}
        {stat.decimals ? count.toFixed(stat.decimals) : Math.round(count)}
        <span style={{ color: "#F2A93B" }}>{stat.suffix}</span>
      </span>

      <span
        className="mt-2 text-xs uppercase sm:text-sm"
        style={{
          fontFamily: "'Inter', sans-serif",
          letterSpacing: "0.12em",
          color: "#93A1AC",
        }}
      >
        {stat.label}
      </span>

      {/* signature: measuring-tape tick rule that fills as the count rises */}
      <div className="relative mt-5 flex h-4 w-28 items-end justify-between sm:w-32">
        {ticks.map((_, i) => {
          const tickThreshold = (i + 1) / ticks.length;
          const filled = progress >= tickThreshold;
          const isMajor = i % 3 === 2;
          return (
            <span
              key={i}
              className="w-px transition-colors duration-150"
              style={{
                height: isMajor ? "100%" : "55%",
                backgroundColor: filled ? "#F2A93B" : "#3B4A57",
              }}
            />
          );
        })}
      </div>

      {/* as-built stamp seal, locks in once the count finishes */}
      <motion.div
        initial={{ opacity: 0, scale: 0.4, rotate: -25 }}
        animate={
          done
            ? { opacity: 1, scale: 1, rotate: -12 }
            : { opacity: 0, scale: 0.4, rotate: -25 }
        }
        transition={{ type: "spring", stiffness: 260, damping: 14 }}
        className="mt-3 flex h-6 w-6 items-center justify-center border"
        style={{ borderColor: "#F2A93B" }}
        aria-hidden="true"
      >
        <span style={{ color: "#F2A93B", fontSize: "10px", fontWeight: 700 }}>
          ✓
        </span>
      </motion.div>

      {index < 3 && (
        <span
          className="absolute right-0 top-1/2 hidden h-16 w-px -translate-y-1/2 sm:block"
          style={{ backgroundColor: "#3B4A57" }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}

export default function StatsCounterSection({
  eyebrow = "Track record",
  heading = "Delivered, measured, verified",
  stats = DEFAULT_STATS,
}: StatsCounterSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-15% 0px" });

  return (
    <section
      ref={sectionRef}
      className="w-full py-16 sm:py-24"
      style={{ backgroundColor: "#14181C" }}
      aria-label="Company achievements"
    >
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-10 text-center sm:mb-14">
          <p
            className="mb-3 text-xs uppercase sm:text-sm"
            style={{
              fontFamily: "'Inter', sans-serif",
              letterSpacing: "0.2em",
              color: "#F2A93B",
            }}
          >
            {eyebrow}
          </p>
          <Reveal>
            <h2
              style={{
                fontFamily: "'Oswald', 'Arial Narrow', sans-serif",
                fontWeight: 500,
                fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)",
                color: "#EDEFF1",
              }}
            >
              {heading}
            </h2>
          </Reveal>
        </div>

        <div
          className="flex flex-col divide-y sm:flex-row sm:divide-y-0"
          style={{ borderColor: "#3B4A57" }}
        >
          {stats.map((stat, index) => (
            <StatBlock key={stat.id} stat={stat} index={index} active={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}