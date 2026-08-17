// lib/types/project.ts

/**
 * Project content model.
 * NOTE: This is a CMS-agnostic type definition, created ahead of the
 * Headless CMS setup (see issue #17, still in Draft as PR #63).
 * Once #17 merges, this shape should be mirrored as an actual
 * Payload/Sanity collection schema.
 *
 * Field names (title, client, sector, location, status) intentionally
 * match ProjectItem in lib/projects-data.ts (#30, PR #66) so listing-card
 * data can map cleanly into this richer detail-page shape once #66 merges.
 *
 * Related: #30 (projects listing), #31 (project detail page),
 * #32 (featured/case-study treatment), #33 (map view)
 */

export type ProjectStatus = "completed" | "ongoing";

export interface ProjectOutcome {
  /** e.g. "Reduced downtime" */
  label: string;
  /** e.g. "32%" or "$1.2M saved" */
  value: string;
}

export interface Project {
  /** Unique identifier, e.g. from CMS */
  id: string;

  /** URL-friendly identifier, e.g. "offshore-platform-refit" */
  slug: string;

  /** Display name, e.g. "Offshore Platform Refit" */
  title: string;

  /** Client name (may be anonymized, e.g. "Confidential Operator") */
  client: string;

  /** Industry sector, e.g. "Oil & Gas" — must match Industry.name/sector */
  sector: string;

  /** Related service name/slug, e.g. "Engineering" */
  service: string;

  /** Project location, e.g. "Gulf of Mexico" */
  location: string;

  /** Year the project was completed or started */
  year: number;

  /** Short outcome summary, used on listing cards */
  outcome: string;

  /** Scope of work — long-form description for the detail page */
  scope: string;

  /** Structured, measurable outcomes/metrics for the detail page */
  outcomes: ProjectOutcome[];

  /** Optional hero/banner image for the project detail page */
  heroImage?: {
    url: string;
    alt: string;
  };

  /** Image gallery for the detail page lightbox */
  gallery: {
    url: string;
    alt: string;
  }[];

  /** Related service slugs (cross-linked, see #24) */
  relatedServiceSlugs: string[];

  /** Related industry slugs (cross-linked, see #24) */
  relatedIndustrySlugs: string[];

  /** Project status */
  status: ProjectStatus;

  /** Whether this project should be featured (see #32) */
  featured: boolean;

  /** Controls display order on listing/carousel */
  order: number;

  /** Whether this project should be visible on the site */
  published: boolean;
}
