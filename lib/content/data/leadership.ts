import type { Localized } from "@/lib/content/types";

/**
 * Leadership / team members — PLACEHOLDER demo data (fictional names/bios).
 * Replace with real bios/photos before launch. Role and bio are modelled as
 * Localized so they can be translated later; only `en` is authored for now.
 */
export interface LeadershipRecord {
  id: string;
  name: string; // proper names are not translated
  role: Localized<string>;
  bio: Localized<string>;
  photo: {
    url: string;
    alt: string;
  };
  order: number;
  published: boolean;
}

export const leadership: LeadershipRecord[] = [
  {
    id: "leader-1",
    name: "Placeholder Name One",
    role: { en: "Chief Executive Officer" },
    bio: {
      en: "Placeholder bio copy for the CEO. Replace with real background before launch.",
    },
    photo: {
      url: "/about/leadership-placeholder.svg",
      alt: "Placeholder headshot",
    },
    order: 1,
    published: true,
  },
  {
    id: "leader-2",
    name: "Placeholder Name Two",
    role: { en: "Chief Operating Officer" },
    bio: {
      en: "Placeholder bio copy for the COO. Replace with real background before launch.",
    },
    photo: {
      url: "/about/leadership-placeholder.svg",
      alt: "Placeholder headshot",
    },
    order: 2,
    published: true,
  },
  {
    id: "leader-3",
    name: "Placeholder Name Three",
    role: { en: "Chief Engineering Officer" },
    bio: {
      en: "Placeholder bio copy for the CEO/engineering lead. Replace with real background before launch.",
    },
    photo: {
      url: "/about/leadership-placeholder.svg",
      alt: "Placeholder headshot",
    },
    order: 3,
    published: true,
  },
];