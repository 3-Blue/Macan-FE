// lib/types/industry.ts

/**
 * Industry content model.
 * NOTE: This is a CMS-agnostic type definition, created ahead of the
 * Headless CMS setup (see issue #17). Once #17 is merged, this shape
 * should be mirrored as an actual Payload/Sanity collection schema.
 * Related: #28 (industry detail page), #24 (cross-linking services/industries/projects)
 */

export interface Industry {
  /** Unique identifier, e.g. from CMS */
  id: string;

  /** URL-friendly identifier, e.g. "oil-and-gas" */
  slug: string;

  /** Display name, e.g. "Oil & Gas" */
  name: string;

  /** Short 1-2 sentence summary, used on overview/listing cards */
  summary: string;

  /** Icon identifier or path (e.g. lucide icon name or asset path) */
  icon: string;

  /** Optional hero/banner image for the industry detail page */
  heroImage?: {
    url: string;
    alt: string;
  };

  /** Long-form body content for the detail page */
  description: string;

  /** List of industry-specific challenges (used on detail page) */
  challenges: string[];

  /** How MACAN addresses those challenges */
  solutions: string[];

  /** Related service slugs (cross-linked, see #24) */
  relatedServiceSlugs: string[];

  /** Related project slugs (cross-linked, see #24) */
  relatedProjectSlugs: string[];

  /** Controls display order on the industries overview page */
  order: number;

  /** Whether this industry should be visible on the site */
  published: boolean;
}