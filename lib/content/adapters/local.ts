import type {
  ContentSource,
  FeaturedProject,
  Industry,
  LeadershipMember,
  Locale,
  Service,
  ServiceDetail,
  Testimonial,
  Post,
} from "@/lib/content/types";
import { resolve } from "@/lib/content/types";
import { services as serviceRecords } from "@/lib/content/data/services";
import { testimonials as testimonialRecords } from "@/lib/content/data/testimonials";
import { featuredProjects as projectRecords } from "@/lib/content/data/projects";
import { leadership as leadershipRecords } from "@/lib/content/data/leadership";
import { industriesData, type IndustryRecord } from "@/lib/industries-data";
import { servicesData } from "@/lib/services-data";
import { postsData, type PostRecord } from "@/lib/posts-data";

/**
 * Local content adapter — resolves the in-repo, localized data modules into
 * plain view models for the active locale. This is the default source; the
 * Payload adapter (added with the CMS) implements the same ContentSource
 * interface and is selected via env in lib/content/provider.ts.
 */
function resolveIndustry(record: IndustryRecord, locale: Locale): Industry {
  return {
    id: record.id,
    slug: record.slug,
    name: resolve(record.name, locale),
    summary: resolve(record.summary, locale),
    icon: record.icon,
    heroImage: record.heroImage,
    description: resolve(record.description, locale),
    challenges: resolve(record.challenges, locale),
    solutions: resolve(record.solutions, locale),
    relatedServiceSlugs: record.relatedServiceSlugs,
    relatedProjectSlugs: record.relatedProjectSlugs,
    order: record.order,
    published: record.published,
  };
}
function resolvePost(record: PostRecord, locale: Locale): Post {
  return {
    id: record.id,
    slug: record.slug,
    title: resolve(record.title, locale),
    cover: record.cover,
    body: resolve(record.body, locale),
    author: record.author,
    tags: record.tags,
    date: record.date,
  };
}
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

    async getIndustries(locale: Locale): Promise<Industry[]> {
    return industriesData
      .filter((industry) => industry.published)
      .sort((a, b) => a.order - b.order)
      .map((industry) => resolveIndustry(industry, locale));
  },

  async getIndustry(slug: string, locale: Locale): Promise<Industry | null> {
    const record = industriesData.find((i) => i.slug === slug && i.published);
    return record ? resolveIndustry(record, locale) : null;
  },

  async getPublishedIndustrySlugs(): Promise<string[]> {
    return industriesData
      .filter((industry) => industry.published)
      .map((industry) => industry.slug);
  },

    // Service detail content is not yet localized (single-language source
  // data), same as industries — drop-in swap once it moves into the CMS.
  async getService(slug: string): Promise<ServiceDetail | null> {
    return servicesData.find((s) => s.slug === slug && s.published) ?? null;
  },

  async getPublishedServiceSlugs(): Promise<string[]> {
    return servicesData
      .filter((service) => service.published)
      .map((service) => service.slug);
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
    async getPosts(locale: Locale): Promise<Post[]> {
    return postsData
      .filter((post) => post.published)
      .sort((a, b) => (a.date < b.date ? 1 : -1))
      .map((post) => resolvePost(post, locale));
  },

  async getPost(slug: string, locale: Locale): Promise<Post | null> {
    const record = postsData.find((p) => p.slug === slug && p.published);
    return record ? resolvePost(record, locale) : null;
  },

  async getPublishedPostSlugs(): Promise<string[]> {
    return postsData.filter((p) => p.published).map((p) => p.slug);
  },
};
