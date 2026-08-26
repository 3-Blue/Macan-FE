import type { Industry } from "@/lib/types/industry";

/**
 * Content layer — types.
 *
 * This is the single, CMS-agnostic contract the whole app reads content
 * through. Pages/components never import raw data modules; they call the
 * functions in `lib/content` which return locale-resolved, plain objects.
 *
 * Swapping the backend (local data → Payload → Sanity → …) means writing one
 * new adapter that implements `ContentSource`. No page or component changes.
 */

/** Supported locales. Keep in sync with i18n/routing.ts. */
export type Locale = "en" | "fa" | "az" | "tr";

/** The locale used as the authored source of truth and fallback. */
export const DEFAULT_LOCALE = "en" satisfies Locale;

/**
 * A value translated into some subset of locales. `en` is required and acts as
 * the fallback for any locale that hasn't been translated yet, so the site
 * never renders an empty string while translations are still being filled in.
 */
export type Localized<T> = { en: T } & Partial<Record<Locale, T>>;

/** Resolve a Localized value for the active locale, falling back to `en`. */
export function resolve<T>(value: Localized<T>, locale: Locale): T {
  return value[locale] ?? value[DEFAULT_LOCALE];
}

/* ------------------------------------------------------------------ */
/* Locale-resolved view models (what pages/components actually render) */
/* ------------------------------------------------------------------ */

export type ProjectStatus = "completed" | "ongoing";

export interface Service {
  slug: string;
  title: string;
  description: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  initials: string;
}

export interface FeaturedProject {
  id: string;
  title: string;
  client: string;
  sector: string;
  location: string;
  outcome: string;
  status: ProjectStatus;
  imageUrl?: string;
  /** Detail-page link; omit until project detail routes exist. */
  href?: string;
}

// Industry is already a plain, string-based model in lib/types; re-export it so
// callers have a single import site for content types.
export type { Industry };

/* ------------------------------------------------------------------ */
/* Adapter contract                                                    */
/* ------------------------------------------------------------------ */

export interface ContentSource {
  getServices(locale: Locale): Promise<Service[]>;
  getTestimonials(locale: Locale): Promise<Testimonial[]>;
  getFeaturedProjects(locale: Locale): Promise<FeaturedProject[]>;
  getIndustries(locale: Locale): Promise<Industry[]>;
  getIndustry(slug: string, locale: Locale): Promise<Industry | null>;
  /** Slugs of published industries, for generateStaticParams. */
  getPublishedIndustrySlugs(): Promise<string[]>;
}
