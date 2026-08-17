// lib/types/service.ts

/**
 * Service content model.
 * NOTE: This is a CMS-agnostic type definition, created ahead of the
 * Headless CMS setup (see issue #17, still in Draft as of PR #63).
 * Once #17 merges, this shape should be mirrored as an actual
 * Payload/Sanity collection schema.
 * Related: #23 (service detail page), #22 (services listing page),
 * #24 (cross-linking services/industries/projects), #25 (service CTA block)
 */

export interface Service {
  /** Unique identifier, e.g. from CMS */
  id: string;

  /** URL-friendly identifier, e.g. "engineering" */
  slug: string;

  /** Display name, e.g. "Engineering Services" */
  title: string;

  /** Short 1-2 sentence summary, used on overview/listing cards */
  summary: string;

  /** Long-form body content for the detail page */
  body: string;

  /** Icon identifier or path (e.g. lucide icon name or asset path) */
  icon: string;

  /** Optional hero/banner image for the service detail page */
  heroImage?: {
    url: string;
    alt: string;
  };

  /** Image gallery for the service detail page */
  gallery: {
    url: string;
    alt: string;
  }[];

  /** Related project slugs (cross-linked, see #24) */
  relatedProjectSlugs: string[];

  /** Related industry slugs (cross-linked, see #24) */
  relatedIndustrySlugs: string[];

  /** Controls display order on the services overview page */
  order: number;

  /** Whether this service should be visible on the site */
  published: boolean;
}
