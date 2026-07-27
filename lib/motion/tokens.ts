/**
 * Shared motion tokens for scroll-triggered animations & transitions
 * Issue: https://github.com/3-Blue/Macan-FE/issues/11
 *
 * Single source of truth for timing/easing so every section feels
 * like it belongs to the same system instead of each component
 * inventing its own durations.
 */

export const EASE = {
  // matches the "settle into place" feel used on the stats/carousel sections
  out: [0.16, 1, 0.3, 1] as const,
  inOut: [0.65, 0, 0.35, 1] as const,
};

export const DURATION = {
  fast: 0.25,
  base: 0.5,
  slow: 0.8,
};

export const STAGGER_STEP = 0.08;

/** Fade + rise, the default reveal for most content blocks. */
export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.base, ease: EASE.out },
  },
};

/** Plain fade, for cases where vertical movement fights the layout (e.g. wide carousels). */
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: DURATION.base, ease: EASE.out },
  },
};

/** Wraps a group of children so they reveal in sequence rather than all at once. */
export const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: STAGGER_STEP },
  },
};

/** Page-level transition, for route changes (see PageTransition component). */
export const pageTransition = {
  initial: { opacity: 0, y: 8 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.base, ease: EASE.out },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: DURATION.fast, ease: EASE.inOut },
  },
};
