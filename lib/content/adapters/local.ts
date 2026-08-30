import type {
  ContentSource,
  FeaturedProject,
  Industry,
  LeadershipMember,
  Locale,
  Service,
  Testimonial,
} from "@/lib/content/types";
import { resolve } from "@/lib/content/types";
import { services as serviceRecords } from "@/lib/content/data/services";
import { testimonials as testimonialRecords } from "@/lib/content/data/testimonials";
import { featuredProjects as projectRecords } from "@/lib/content/data/projects";
import { leadership as leadershipRecords } from "@/lib/content/data/leadership";
import { industriesData } from "@/lib/industries-data";

/**
 * Local content adapter — resolves the in-repo, localized data modules into
 * plain view models for the active locale. This is the default source; the
 * Payload adapter (added with the CMS) implements the same ContentSource
 * interface and is selected via env in lib/content/provider.ts.
 */
export const localContentSource: ContentSource = {
  async getServices(locale: Locale): Promise<Service[]> {
    return serviceRecords.map((s) => ({
      slug: s.slug,
      title: resolve(s.title, locale),
      description: resolve(s.description, locale),
    }));
  },

  async getTestimonials(locale: Locale): Promise<Testimonial[]> {
    return testimonialRecords.map((t) => ({
      id: t.id,
      quote: resolve(t.quote, locale),
      name: t.name,
      role: resolve(t.role, locale),
      initials: t.initials,
    }));
  },

  async getFeaturedProjects(locale: Locale): Promise<FeaturedProject[]> {
    return projectRecords.map((p) => ({
      id: p.id,
      title: resolve(p.title, locale),
      client: resolve(p.client, locale),
      sector: resolve(p.sector, locale),
      location: resolve(p.location, locale),
      outcome: resolve(p.outcome, locale),
      status: p.status,
      imageUrl: p.imageUrl,
      href: p.href,
    }));
  },

  // Industries are not yet localized (single-language source data). The
  // ContentSource interface still takes a locale, so this becomes a drop-in
  // swap once industry content moves into the CMS.
  async getIndustries(): Promise<Industry[]> {
    return industriesData
      .filter((industry) => industry.published)
      .sort((a, b) => a.order - b.order);
  },

  async getIndustry(slug: string): Promise<Industry | null> {
    return industriesData.find((i) => i.slug === slug && i.published) ?? null;
  },

  async getPublishedIndustrySlugs(): Promise<string[]> {
    return industriesData
      .filter((industry) => industry.published)
      .map((industry) => industry.slug);
  },

  async getLeadership(locale: Locale): Promise<LeadershipMember[]> {
    return leadershipRecords
      .filter((l) => l.published)
      .sort((a, b) => a.order - b.order)
      .map((l) => ({
        id: l.id,
        name: l.name,
        role: resolve(l.role, locale),
        bio: resolve(l.bio, locale),
        photo: l.photo,
      }));
  },
};
