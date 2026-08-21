// lib/types/company.ts

/**
 * Company info content model — mission, vision, history, leadership, values.
 * NOTE: This is a CMS-agnostic type definition, created ahead of the
 * Headless CMS setup (see issue #17, still in Draft as PR #63).
 * Once #17 merges, this shape should be mirrored as an actual
 * Payload/Sanity collection schema.
 *
 * Field names for mission/vision (title, body, imageAlt) and history
 * (year, title, description) intentionally match the shape currently
 * sourced from next-intl translations in AboutMissionVision.tsx (#13)
 * and TimelineSection.tsx (#14), so those components can migrate from
 * translation-driven content to CMS-driven content without a rewrite.
 *
 * Leadership fields are new (see #15, still in Backlog — no existing
 * component to match against yet).
 *
 * Related: #13 (about page), #14 (timeline), #15 (leadership grid)
 */

export interface MissionVisionBlock {
  /** Section heading, e.g. "Our Mission" */
  title: string;

  /** Long-form body copy */
  body: string;

  /** Image shown alongside the block */
  image: {
    url: string;
    alt: string;
  };
}

export interface TimelineMilestone {
  /** Unique identifier, e.g. from CMS */
  id: string;

  /** Display year, e.g. "2015" */
  year: string;

  /** Milestone title, e.g. "Company Founded" */
  title: string;

  /** Short description of the milestone */
  description: string;

  /** Controls chronological display order */
  order: number;
}

export interface LeadershipMember {
  /** Unique identifier, e.g. from CMS */
  id: string;

  /** Full name */
  name: string;

  /** Job title / role, e.g. "Chief Executive Officer" */
  role: string;

  /** Short bio shown in grid or detail modal (see #15) */
  bio: string;

  /** Headshot photo */
  photo: {
    url: string;
    alt: string;
  };

  /** Controls display order on the leadership grid */
  order: number;

  /** Whether this member should be visible on the site */
  published: boolean;
}

export interface CompanyValue {
  /** Unique identifier, e.g. from CMS */
  id: string;

  /** Value name, e.g. "Integrity" */
  title: string;

  /** Short description of what this value means in practice */
  description: string;

  /** Icon identifier or path (e.g. lucide icon name or asset path) */
  icon: string;

  /** Controls display order */
  order: number;
}

export interface CompanyInfo {
  /** Unique identifier, e.g. from CMS (likely a singleton document) */
  id: string;

  mission: MissionVisionBlock;

  vision: MissionVisionBlock;

  /** Company history / milestones, rendered by TimelineSection (#14) */
  history: TimelineMilestone[];

  /** Leadership team, rendered by the leadership grid (#15) */
  leadership: LeadershipMember[];

  /** Core company values */
  values: CompanyValue[];
}