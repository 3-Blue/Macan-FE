// types/cms/homepage.ts

/** Base fields shared by every content block */
interface BaseBlock {
  id: string;
  type: string;
  order: number;
}

export interface LocalizedText {
  en: string;
  fa: string; // adjust/add locales to match your next-intl config
}

export interface CmsImage {
  src: string;
  alt: LocalizedText;
  width: number;
  height: number;
}

export interface HeroBlock extends BaseBlock {
  type: "hero";
  headline: LocalizedText;
  subheadline: LocalizedText;
  image?: CmsImage;
  primaryCta?: {
    label: LocalizedText;
    href: string;
  };
}

export interface HighlightItem {
  id: string;
  icon?: string;
  title: LocalizedText;
  description: LocalizedText;
}

export interface HighlightsBlock extends BaseBlock {
  type: "highlights";
  heading?: LocalizedText;
  items: HighlightItem[];
}

export interface StatItem {
  id: string;
  label: LocalizedText;
  value: number;
  suffix?: string; // e.g. "%", "+"
}

export interface StatsBlock extends BaseBlock {
  type: "stats";
  heading?: LocalizedText;
  items: StatItem[];
}

export interface CtaBlock extends BaseBlock {
  type: "cta";
  heading: LocalizedText;
  body?: LocalizedText;
  button: {
    label: LocalizedText;
    href: string;
  };
}

/** Discriminated union — add new block types here as needed */
export type HomepageBlock = HeroBlock | HighlightsBlock | StatsBlock | CtaBlock;

export interface HomepageContent {
  slug: "home";
  updatedAt: string; // ISO date
  blocks: HomepageBlock[];
}
