import type { Localized } from "@/lib/content/types";

/**
 * Posts data model (#37). Same shape as lib/industries-data.ts: a typed
 * record with Localized<T> on the translatable fields, resolved into a
 * plain view model by the local adapter. author/tags are not localized —
 * revisit if per-locale tags are needed later.
 */
export interface PostRecord {
  id: string;
  slug: string;
  title: Localized<string>;
  cover: {
    url: string;
    alt: string;
  };
  body: Localized<string>;
  author: string;
  tags: string[];
  /** ISO 8601 date string, e.g. "2026-08-15" */
  date: string;
  published: boolean;
}

export const postsData: PostRecord[] = [
  {
    id: "post-1",
    slug: "macan-wins-industrial-excellence-award",
    title: {
      en: "Macan Wins Industrial Excellence Award",
      fa: "ماکان برنده جایزه تعالی صنعتی شد",
    },
    cover: {
      url: "/images/posts/award-2026.jpg",
      alt: "Macan leadership team accepting the Industrial Excellence Award",
    },
    body: {
      en: "Macan has been recognized with the Industrial Excellence Award for its work on large-scale engineering projects across the region.",
      fa: "ماکان به دلیل فعالیت‌های خود در پروژه‌های بزرگ مهندسی در سطح منطقه، موفق به دریافت جایزه تعالی صنعتی شد.",
    },
    author: "Macan Communications Team",
    tags: ["award", "company-news"],
    date: "2026-08-15",
    published: true,
  },
  {
    id: "post-2",
    slug: "new-oil-and-gas-partnership-announced",
    title: {
      en: "New Oil & Gas Partnership Announced",
      fa: "همکاری جدید در حوزه نفت و گاز اعلام شد",
    },
    cover: {
      url: "/images/posts/oil-gas-partnership.jpg",
      alt: "Handshake between Macan representatives and partner company executives",
    },
    body: {
      en: "Macan has entered a strategic partnership to expand its footprint in the oil and gas sector, focused on infrastructure modernization.",
      fa: "ماکان یک همکاری استراتژیک جدید برای گسترش فعالیت خود در بخش نفت و گاز آغاز کرده است.",
    },
    author: "Macan Communications Team",
    tags: ["partnership", "oil-and-gas"],
    date: "2026-07-02",
    published: true,
  },
];