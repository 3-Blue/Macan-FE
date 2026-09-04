import type { Locale } from "@/lib/content/types";

/**
 * Raw, localized client/partner record — the CMS-agnostic source shape.
 * Resolved into the plain `Client` view model by adapters (see local.ts).
 */
export interface ClientRecord {
  id: string;
  name: { en: string } & Partial<Record<Locale, string>>;
  logoUrl: string;
  link: string;
  category: { en: string } & Partial<Record<Locale, string>>;
  order: number;
  published: boolean;
}

export const clientRecords: ClientRecord[] = [
  {
    id: "client-1",
    name: { en: "Client One" },
    logoUrl: "/images/clients/client-1.png",
    link: "https://example.com",
    category: { en: "Industrial" },
    order: 1,
    published: true,
  },
  {
    id: "client-2",
    name: { en: "Client Two" },
    logoUrl: "/images/clients/client-2.png",
    link: "https://example.com",
    category: { en: "Construction" },
    order: 2,
    published: true,
  },
  {
    id: "client-3",
    name: { en: "Client Three" },
    logoUrl: "/images/clients/client-3.png",
    link: "https://example.com",
    category: { en: "Energy" },
    order: 3,
    published: true,
  },
  {
    id: "client-4",
    name: { en: "Client Four" },
    logoUrl: "/images/clients/client-4.png",
    link: "https://example.com",
    category: { en: "Oil & Gas" },
    order: 4,
    published: true,
  },
];