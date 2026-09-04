import type { Locale } from "@/lib/content/types";
import { getContentSource } from "@/lib/content/provider";

/**
 * Public content API.
 *
 * Pages and components import from here only — never from data modules or a
 * specific adapter. This keeps the backend swappable (local → Payload → …)
 * behind a stable, locale-aware surface.
 */
export type {
  Locale,
  Localized,
  Service,
  ServiceDetail,
  Testimonial,
  FeaturedProject,
  Industry,
  ProjectStatus,
  LeadershipMember,
  Post,
} from "@/lib/content/types";

export function getServices(locale: Locale) {
  return getContentSource().getServices(locale);
}

export function getTestimonials(locale: Locale) {
  return getContentSource().getTestimonials(locale);
}

export function getFeaturedProjects(locale: Locale) {
  return getContentSource().getFeaturedProjects(locale);
}

export function getIndustries(locale: Locale) {
  return getContentSource().getIndustries(locale);
}

export function getIndustry(slug: string, locale: Locale) {
  return getContentSource().getIndustry(slug, locale);
}

export function getPublishedIndustrySlugs() {
  return getContentSource().getPublishedIndustrySlugs();
}

export function getService(slug: string, locale: Locale) {
  return getContentSource().getService(slug, locale);
}

export function getPublishedServiceSlugs() {
  return getContentSource().getPublishedServiceSlugs();
}

export function getLeadership(locale: Locale) {
  return getContentSource().getLeadership(locale);
}
export function getPosts(locale: Locale) {
  return getContentSource().getPosts(locale);
}

export function getPost(slug: string, locale: Locale) {
  return getContentSource().getPost(slug, locale);
}

export function getPublishedPostSlugs() {
  return getContentSource().getPublishedPostSlugs();
}