// scripts/seed-payload.ts
//
// One-time migration: reads the in-repo data modules and creates matching
// documents in Payload via the Local API. Run once, after Payload +
// Postgres are installed and payload.config.ts is active:
//
//   npx tsx scripts/seed-payload.ts
//
// Safe to re-run against an EMPTY database only — it does not check for
// existing documents, so running it twice will create duplicates.
//
// Seeds all 8 content collections (Testimonials, Projects, Industries,
// Services, Leadership, Posts, Clients) plus Media docs for any local
// /public image referenced by leadership photos and post covers.
//
// Relationship fields (Industries.relatedProjects/relatedServices,
// Services.relatedProjects/relatedIndustries) are wired in a second pass
// at the end, once every collection's docs exist and their IDs are known.

import fs from "fs";
import path from "path";
import { getPayload } from "payload";
import config from "../payload.config";

import { industriesData } from "@/lib/industries-data";
import { services as thinServices } from "@/lib/content/data/services";
import { servicesData } from "@/lib/services-data";
import { testimonials } from "@/lib/content/data/testimonials";
import { featuredProjects } from "@/lib/content/data/projects";
import { leadership } from "@/lib/content/data/leadership";
import { postsData } from "@/lib/posts-data";
import { clientRecords } from "@/lib/content/data/clients";
import type { Locale } from "@/lib/content/types";

type Payload = Awaited<ReturnType<typeof getPayload>>;

const ADDITIONAL_LOCALES: Locale[] = ["fa", "az", "tr"];

/**
 * Uploads a file from /public into the Media collection, caching by path so
 * the same placeholder image isn't uploaded multiple times. Skips (with a
 * warning) rather than throwing if the file doesn't exist on disk, so one
 * missing placeholder doesn't abort the whole seed.
 */
async function createMediaFromPublic(
  payload: Payload,
  relPath: string | undefined,
  alt: string,
  cache: Map<string, string>,
): Promise<string | undefined> {
  if (!relPath) return undefined;
  if (cache.has(relPath)) return cache.get(relPath);

  const absPath = path.join(process.cwd(), "public", relPath.replace(/^\//, ""));
  if (!fs.existsSync(absPath)) {
    console.warn(`  ⚠ media file not found, skipping: ${absPath}`);
    return undefined;
  }

  const created = await payload.create({
    collection: "media",
    data: { alt },
    filePath: absPath,
    draft: false,
  });
  cache.set(relPath, created.id as string);
  return created.id as string;
}

async function seedTestimonials(payload: Payload) {
  for (const t of testimonials) {
    const created = await payload.create({
      collection: "testimonials",
      locale: "en",
      draft: false,
      data: {
        quote: t.quote.en,
        name: t.name,
        role: t.role.en,
        initials: t.initials,
      },
    });

    for (const locale of ADDITIONAL_LOCALES) {
      if (!t.quote[locale] && !t.role[locale]) continue;
      await payload.update({
        collection: "testimonials",
        id: created.id,
        locale,
        draft: false,
        data: {
          quote: t.quote[locale] ?? t.quote.en,
          role: t.role[locale] ?? t.role.en,
        },
      });
    }
  }
  console.log(`Seeded ${testimonials.length} testimonials.`);
}

/** Returns a map of local record id ("p1", "p2"...) -> Payload doc id. */
async function seedProjects(payload: Payload): Promise<Record<string, string>> {
  const idMap: Record<string, string> = {};

  for (const project of featuredProjects) {
    const created = await payload.create({
      collection: "projects",
      locale: "en",
      draft: false,
      data: {
        title: project.title.en,
        client: project.client.en,
        sector: project.sector.en,
        location: project.location.en,
        outcome: project.outcome.en,
        stage: project.status, // field renamed status -> stage in Phase A
        featured: true,
        order: 0,
      },
    });
    idMap[project.id] = created.id as string;

    for (const locale of ADDITIONAL_LOCALES) {
      const hasTranslation =
        project.title[locale] || project.client[locale] || project.sector[locale];
      if (!hasTranslation) continue;
      await payload.update({
        collection: "projects",
        id: created.id,
        locale,
        draft: false,
        data: {
          title: project.title[locale] ?? project.title.en,
          client: project.client[locale] ?? project.client.en,
          sector: project.sector[locale] ?? project.sector.en,
          location: project.location[locale] ?? project.location.en,
          outcome: project.outcome[locale] ?? project.outcome.en,
        },
      });
    }
  }
  console.log(`Seeded ${featuredProjects.length} projects.`);
  return idMap;
}

/**
 * Creates industries WITHOUT relationship fields (targets may not exist
 * yet). Returns slug -> Payload id, plus the raw relation slugs to wire in
 * the final pass.
 */
async function seedIndustries(payload: Payload) {
  const slugMap: Record<string, string> = {};
  const relations: Record<string, { projects: string[]; services: string[] }> = {};

  for (const industry of industriesData) {
    const created = await payload.create({
      collection: "industries",
      locale: "en",
      draft: false,
      data: {
        slug: industry.slug,
        name: industry.name.en,
        summary: industry.summary.en,
        icon: industry.icon,
        description: industry.description.en,
        challenges: industry.challenges.en.map((item) => ({ item })),
        solutions: industry.solutions.en.map((item) => ({ item })),
        order: industry.order,
      },
    });
    slugMap[industry.slug] = created.id as string;
    relations[industry.slug] = {
      projects: industry.relatedProjectSlugs,
      services: industry.relatedServiceSlugs,
    };

    for (const locale of ADDITIONAL_LOCALES) {
      const hasTranslation =
        industry.name[locale] || industry.summary[locale] || industry.description[locale];
      if (!hasTranslation) continue;
      await payload.update({
        collection: "industries",
        id: created.id,
        locale,
        draft: false,
        data: {
          name: industry.name[locale] ?? industry.name.en,
          summary: industry.summary[locale] ?? industry.summary.en,
          description: industry.description[locale] ?? industry.description.en,
          challenges: (industry.challenges[locale] ?? industry.challenges.en).map((item) => ({
            item,
          })),
          solutions: (industry.solutions[locale] ?? industry.solutions.en).map((item) => ({
            item,
          })),
        },
      });
    }
  }
  console.log(`Seeded ${industriesData.length} industries.`);
  return { slugMap, relations };
}

/**
 * Merges the thin listing model (title/description, has fa translations)
 * with the rich detail model (body/icon/order/relations, en-only) by slug,
 * matching the unified Services schema from Phase B. Creates WITHOUT
 * relationship fields; returns slug -> Payload id plus raw relation slugs.
 */
async function seedServices(payload: Payload, mediaCache: Map<string, string>) {
  const slugMap: Record<string, string> = {};
  const relations: Record<string, { projects: string[]; industries: string[] }> = {};

  for (const thin of thinServices) {
    const detail = servicesData.find((s) => s.slug === thin.slug);

    const heroImageId = await createMediaFromPublic(
      payload,
      detail?.heroImage?.url,
      detail?.heroImage?.alt ?? "",
      mediaCache,
    );
    const galleryIds: string[] = [];
    for (const g of detail?.gallery ?? []) {
      const id = await createMediaFromPublic(payload, g.url, g.alt, mediaCache);
      if (id) galleryIds.push(id);
    }

    const created = await payload.create({
      collection: "services",
      locale: "en",
      draft: false,
      data: {
        slug: thin.slug,
        title: thin.title.en,
        summary: thin.description.en,
        body: detail?.body ?? "",
        icon: detail?.icon ?? "",
        heroImage: heroImageId,
        gallery: galleryIds,
        order: detail?.order ?? 0,
      },
    });
    slugMap[thin.slug] = created.id as string;
    relations[thin.slug] = {
      projects: detail?.relatedProjectSlugs ?? [],
      industries: detail?.relatedIndustrySlugs ?? [],
    };

    for (const locale of ADDITIONAL_LOCALES) {
      if (!thin.title[locale] && !thin.description[locale]) continue;
      await payload.update({
        collection: "services",
        id: created.id,
        locale,
        draft: false,
        data: {
          title: thin.title[locale] ?? thin.title.en,
          summary: thin.description[locale] ?? thin.description.en,
        },
      });
    }
  }
  console.log(`Seeded ${thinServices.length} services (listing + detail merged).`);
  return { slugMap, relations };
}

async function seedLeadership(payload: Payload, mediaCache: Map<string, string>) {
  for (const leader of leadership) {
    const photoId = await createMediaFromPublic(
      payload,
      leader.photo.url,
      leader.photo.alt,
      mediaCache,
    );

    const created = await payload.create({
      collection: "leadership",
      locale: "en",
      draft: false,
      data: {
        name: leader.name,
        role: leader.role.en,
        bio: leader.bio.en,
        photo: photoId,
        order: leader.order,
      },
    });

    for (const locale of ADDITIONAL_LOCALES) {
      if (!leader.role[locale] && !leader.bio[locale]) continue;
      await payload.update({
        collection: "leadership",
        id: created.id,
        locale,
        draft: false,
        data: {
          role: leader.role[locale] ?? leader.role.en,
          bio: leader.bio[locale] ?? leader.bio.en,
        },
      });
    }
  }
  console.log(`Seeded ${leadership.length} leadership members.`);
}

async function seedPosts(payload: Payload, mediaCache: Map<string, string>) {
  for (const post of postsData) {
    const coverId = await createMediaFromPublic(
      payload,
      post.cover.url,
      post.cover.alt,
      mediaCache,
    );

    const created = await payload.create({
      collection: "posts",
      locale: "en",
      draft: false,
      data: {
        slug: post.slug,
        title: post.title.en,
        cover: coverId,
        body: post.body.en,
        author: post.author,
        tags: post.tags.map((tag) => ({ tag })),
        category: post.category.en,
        date: post.date,
      },
    });

    for (const locale of ADDITIONAL_LOCALES) {
      const hasTranslation = post.title[locale] || post.body[locale] || post.category[locale];
      if (!hasTranslation) continue;
      await payload.update({
        collection: "posts",
        id: created.id,
        locale,
        draft: false,
        data: {
          title: post.title[locale] ?? post.title.en,
          body: post.body[locale] ?? post.body.en,
          category: post.category[locale] ?? post.category.en,
        },
      });
    }
  }
  console.log(`Seeded ${postsData.length} posts.`);
}

async function seedClients(payload: Payload) {
  for (const c of clientRecords) {
    const created = await payload.create({
      collection: "clients",
      locale: "en",
      draft: false,
      data: {
        name: c.name.en,
        logoUrl: c.logoUrl,
        link: c.link,
        category: c.category.en,
        order: c.order,
      },
    });

    for (const locale of ADDITIONAL_LOCALES) {
      if (!c.category[locale]) continue;
      await payload.update({
        collection: "clients",
        id: created.id,
        locale,
        draft: false,
        data: { category: c.category[locale] },
      });
    }
  }
  console.log(`Seeded ${clientRecords.length} clients.`);
}

/**
 * Second pass: wires the cross-collection relationship fields now that
 * every doc exists and its id is known. Relations to Projects resolve to
 * Payload doc IDs (not slugs) since the Projects collection has no slug
 * field — a pre-existing gap flagged in Phase B, not introduced here.
 */
async function wireRelationships(
  payload: Payload,
  industries: { slugMap: Record<string, string>; relations: Record<string, { projects: string[]; services: string[] }> },
  services: { slugMap: Record<string, string>; relations: Record<string, { projects: string[]; industries: string[] }> },
  projectIdMap: Record<string, string>,
) {
  for (const [slug, id] of Object.entries(industries.slugMap)) {
    const rel = industries.relations[slug];
    await payload.update({
      collection: "industries",
      id,
      locale: "en",
      draft: false,
      data: {
        relatedProjects: rel.projects.map((pid) => projectIdMap[pid]).filter(Boolean),
        relatedServices: rel.services.map((sslug) => services.slugMap[sslug]).filter(Boolean),
      },
    });
  }

  for (const [slug, id] of Object.entries(services.slugMap)) {
    const rel = services.relations[slug];
    await payload.update({
      collection: "services",
      id,
      locale: "en",
      draft: false,
      data: {
        relatedProjects: rel.projects.map((pid) => projectIdMap[pid]).filter(Boolean),
        relatedIndustries: rel.industries.map((islug) => industries.slugMap[islug]).filter(Boolean),
      },
    });
  }
  console.log("Wired industry <-> service <-> project relationships.");
}

async function main() {
  const payload = await getPayload({ config });
  const mediaCache = new Map<string, string>();

  await seedTestimonials(payload);
  const projectIdMap = await seedProjects(payload);
  const industries = await seedIndustries(payload);
  const services = await seedServices(payload, mediaCache);
  await seedLeadership(payload, mediaCache);
  await seedPosts(payload, mediaCache);
  await seedClients(payload);
  await wireRelationships(payload, industries, services, projectIdMap);

  console.log("Seed complete.");
  process.exit(0);
}

main().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});