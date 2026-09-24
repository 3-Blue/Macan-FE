// lib/content/adapters/payload.ts
//
// Implements the same ContentSource interface as the local adapter, so
// switching backends is a one-line change in lib/content/provider.ts:
//
//   if (process.env.CONTENT_SOURCE === "payload") return payloadContentSource;
//
// Uses Payload's Local API (no HTTP hop). Because collections declare
// `localized: true` fields and the config enables localization with
// fallback, `find({ locale })` returns fields already resolved to plain
// strings — matching what the view models expect.

import { getPayload } from "payload";
import config from "@payload-config";
import type {
  ContentSource,
  FeaturedProject,
  Industry,
  Locale,
  Project,
  Service,
  ServiceDetail,
  Testimonial,
  LeadershipMember,
  Post,
  Client,
} from "@/lib/content/types";

async function client() {
  return getPayload({ config });
}

/** Shared shape for populated upload relations (heroImage, photo, cover, gallery items). */
type MediaLike = { url?: string; alt?: string } | string | null | undefined;

function mapImage(m: MediaLike): { url: string; alt: string } | undefined {
  if (!m || typeof m === "string") return undefined;
  if (!m.url) return undefined;
  return { url: m.url, alt: m.alt ?? "" };
}

/**
 * Resolves a relationship value (populated doc or bare id) to its slug when
 * the related collection exposes one, otherwise falls back to the doc id.
 *
 * NOTE: related-PROJECT links still need reconciling before the Payload path
 * goes live. The projects collection now has a slug, so a populated project
 * relation resolves to that slug — but the service/industry detail pages look
 * related projects up by `Project.id`. The local path is unaffected (its ids
 * match either way); standardise on a single key once Postgres is connected.
 * Tracked as a follow-up, not fixed here.
 */
function relSlugOrId(v: unknown): string {
  if (v && typeof v === "object") {
    const obj = v as { id?: unknown; slug?: unknown };
    if (typeof obj.slug === "string") return obj.slug;
    if (obj.id != null) return String(obj.id);
  }
  return String(v);
}

function relSlugOrIdArray(v: unknown): string[] {
  return Array.isArray(v) ? v.map(relSlugOrId) : [];
}

function toStringArray(v: unknown): string[] {
  return Array.isArray(v)
    ? v.map((row) => (row as { item?: string }).item ?? "").filter(Boolean)
    : [];
}

function toTagArray(v: unknown): string[] {
  return Array.isArray(v)
    ? v.map((row) => (row as { tag?: string }).tag ?? "").filter(Boolean)
    : [];
}

function toOutcomeArray(v: unknown): { label: string; value: string }[] {
  return Array.isArray(v)
    ? v
        .map((row) => {
          const r = row as { label?: string; value?: string };
          return { label: r.label ?? "", value: r.value ?? "" };
        })
        .filter((o) => o.label || o.value)
    : [];
}

function toCoordinates(
  v: unknown,
): { lat: number; lng: number } | undefined {
  if (v && typeof v === "object") {
    const c = v as { lat?: unknown; lng?: unknown };
    if (typeof c.lat === "number" && typeof c.lng === "number") {
      return { lat: c.lat, lng: c.lng };
    }
  }
  return undefined;
}

// Map a Payload project doc into the app's rich Project view model.
function mapProject(d: Record<string, unknown>): Project {
  return {
    id: String(d.id),
    slug: d.slug as string,
    title: d.title as string,
    client: (d.client as string) ?? "",
    sector: (d.sector as string) ?? "",
    service: (d.service as string) ?? "",
    location: (d.location as string) ?? "",
    coordinates: toCoordinates(d.coordinates),
    year: (d.year as number) ?? 0,
    outcome: (d.outcome as string) ?? "",
    scope: (d.scope as string) ?? "",
    outcomes: toOutcomeArray(d.outcomes),
    heroImage: mapImage(d.heroImage as MediaLike),
    gallery: Array.isArray(d.gallery)
      ? (d.gallery as MediaLike[])
          .map(mapImage)
          .filter((g): g is { url: string; alt: string } => Boolean(g))
      : [],
    relatedServiceSlugs: relSlugOrIdArray(d.relatedServices),
    relatedIndustrySlugs: relSlugOrIdArray(d.relatedIndustries),
    status: d.stage as Project["status"],
    featured: Boolean(d.featured),
    order: (d.order as number) ?? 0,
    published: true,
  };
}

// Map a Payload industry doc into the app's Industry view model.
function mapIndustry(d: Record<string, unknown>): Industry {
  return {
    id: String(d.id),
    slug: d.slug as string,
    name: d.name as string,
    summary: d.summary as string,
    icon: (d.icon as string) ?? "",
    description: d.description as string,
    challenges: toStringArray(d.challenges),
    solutions: toStringArray(d.solutions),
    relatedServiceSlugs: relSlugOrIdArray(d.relatedServices),
    relatedProjectSlugs: relSlugOrIdArray(d.relatedProjects),
    order: (d.order as number) ?? 0,
    published: true,
  };
}

function mapServiceDetail(d: Record<string, unknown>): ServiceDetail {
  return {
    id: String(d.id),
    slug: d.slug as string,
    title: d.title as string,
    summary: d.summary as string,
    body: d.body as string,
    icon: (d.icon as string) ?? "",
    heroImage: mapImage(d.heroImage as MediaLike),
    gallery: Array.isArray(d.gallery)
      ? (d.gallery as MediaLike[]).map(mapImage).filter((g): g is { url: string; alt: string } => Boolean(g))
      : [],
    relatedProjectSlugs: relSlugOrIdArray(d.relatedProjects),
    relatedIndustrySlugs: relSlugOrIdArray(d.relatedIndustries),
    order: (d.order as number) ?? 0,
    published: true,
  };
}

function mapPost(d: Record<string, unknown>): Post {
  return {
    id: String(d.id),
    slug: d.slug as string,
    title: d.title as string,
    cover: mapImage(d.cover as MediaLike) ?? { url: "", alt: "" },
    body: d.body as string,
    author: d.author as string,
    tags: toTagArray(d.tags),
    category: d.category as string,
    date: d.date as string,
  };
}

export const payloadContentSource: ContentSource = {
  async getServices(locale: Locale): Promise<Service[]> {
    const payload = await client();
    const { docs } = await payload.find({
      collection: "services",
      locale,
      fallbackLocale: "en",
      sort: "order",
      limit: 100,
      where: { _status: { equals: "published" } },
    });
    return docs.map((d) => ({
      slug: d.slug as string,
      title: d.title as string,
      description: d.summary as string,
    }));
  },

  async getService(slug: string, locale: Locale): Promise<ServiceDetail | null> {
    const payload = await client();
    const { docs } = await payload.find({
      collection: "services",
      locale,
      fallbackLocale: "en",
      limit: 1,
      where: {
        slug: { equals: slug },
        _status: { equals: "published" },
      },
    });
    return docs[0] ? mapServiceDetail(docs[0]) : null;
  },

  async getPublishedServiceSlugs(): Promise<string[]> {
    const payload = await client();
    const { docs } = await payload.find({
      collection: "services",
      limit: 500,
      where: { _status: { equals: "published" } },
      select: { slug: true },
    });
    return docs.map((d) => d.slug as string);
  },

  async getTestimonials(locale: Locale): Promise<Testimonial[]> {
    const payload = await client();
    const { docs } = await payload.find({
      collection: "testimonials",
      locale,
      fallbackLocale: "en",
      sort: "order",
      limit: 100,
      where: { _status: { equals: "published" } },
    });
    return docs.map((d) => ({
      id: String(d.id),
      quote: d.quote as string,
      name: d.name as string,
      role: (d.role as string) ?? "",
      initials: d.initials as string,
    }));
  },

  async getFeaturedProjects(locale: Locale): Promise<FeaturedProject[]> {
    const payload = await client();
    const { docs } = await payload.find({
      collection: "projects",
      locale,
      fallbackLocale: "en",
      sort: "order",
      limit: 100,
      where: {
        _status: { equals: "published" },
        featured: { equals: true },
      },
    });
    return docs.map((d) => ({
      id: String(d.id),
      title: d.title as string,
      client: (d.client as string) ?? "",
      sector: (d.sector as string) ?? "",
      location: (d.location as string) ?? "",
      outcome: (d.outcome as string) ?? "",
      status: d.stage as FeaturedProject["status"],
      imageUrl: mapImage(d.heroImage as MediaLike)?.url,
      href: `/projects/${d.slug as string}`,
    }));
  },

  async getProjects(locale: Locale): Promise<Project[]> {
    const payload = await client();
    const { docs } = await payload.find({
      collection: "projects",
      locale,
      fallbackLocale: "en",
      sort: "order",
      limit: 100,
      where: { _status: { equals: "published" } },
    });
    return docs.map(mapProject);
  },

  async getProject(slug: string, locale: Locale): Promise<Project | null> {
    const payload = await client();
    const { docs } = await payload.find({
      collection: "projects",
      locale,
      fallbackLocale: "en",
      limit: 1,
      where: {
        slug: { equals: slug },
        _status: { equals: "published" },
      },
    });
    return docs[0] ? mapProject(docs[0]) : null;
  },

  async getPublishedProjectSlugs(): Promise<string[]> {
    const payload = await client();
    const { docs } = await payload.find({
      collection: "projects",
      limit: 500,
      where: { _status: { equals: "published" } },
      select: { slug: true },
    });
    return docs.map((d) => d.slug as string);
  },

  async getIndustries(locale: Locale): Promise<Industry[]> {
    const payload = await client();
    const { docs } = await payload.find({
      collection: "industries",
      locale,
      fallbackLocale: "en",
      sort: "order",
      limit: 100,
      where: { _status: { equals: "published" } },
    });
    return docs.map(mapIndustry);
  },

  async getIndustry(slug: string, locale: Locale): Promise<Industry | null> {
    const payload = await client();
    const { docs } = await payload.find({
      collection: "industries",
      locale,
      fallbackLocale: "en",
      limit: 1,
      where: {
        slug: { equals: slug },
        _status: { equals: "published" },
      },
    });
    return docs[0] ? mapIndustry(docs[0]) : null;
  },

  async getPublishedIndustrySlugs(): Promise<string[]> {
    const payload = await client();
    const { docs } = await payload.find({
      collection: "industries",
      limit: 500,
      where: { _status: { equals: "published" } },
      select: { slug: true },
    });
    return docs.map((d) => d.slug as string);
  },

  async getLeadership(locale: Locale): Promise<LeadershipMember[]> {
    const payload = await client();
    const { docs } = await payload.find({
      collection: "leadership",
      locale,
      fallbackLocale: "en",
      sort: "order",
      limit: 100,
      where: { _status: { equals: "published" } },
    });
    return docs.map((d) => ({
      id: String(d.id),
      name: d.name as string,
      role: d.role as string,
      bio: d.bio as string,
      photo: mapImage(d.photo as MediaLike) ?? { url: "", alt: "" },
    }));
  },

  async getPosts(locale: Locale): Promise<Post[]> {
    const payload = await client();
    const { docs } = await payload.find({
      collection: "posts",
      locale,
      fallbackLocale: "en",
      sort: "-date",
      limit: 100,
      where: { _status: { equals: "published" } },
    });
    return docs.map(mapPost);
  },

  async getPost(slug: string, locale: Locale): Promise<Post | null> {
    const payload = await client();
    const { docs } = await payload.find({
      collection: "posts",
      locale,
      fallbackLocale: "en",
      limit: 1,
      where: {
        slug: { equals: slug },
        _status: { equals: "published" },
      },
    });
    return docs[0] ? mapPost(docs[0]) : null;
  },

  async getPublishedPostSlugs(): Promise<string[]> {
    const payload = await client();
    const { docs } = await payload.find({
      collection: "posts",
      limit: 500,
      where: { _status: { equals: "published" } },
      select: { slug: true },
    });
    return docs.map((d) => d.slug as string);
  },

  async getClients(locale: Locale): Promise<Client[]> {
    const payload = await client();
    const { docs } = await payload.find({
      collection: "clients",
      locale,
      fallbackLocale: "en",
      sort: "order",
      limit: 100,
      where: { _status: { equals: "published" } },
    });
    return docs.map((d) => ({
      id: String(d.id),
      name: d.name as string,
      logoUrl: d.logoUrl as string,
      link: d.link as string,
      category: d.category as string,
    }));
  },
};