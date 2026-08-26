import type { Localized, ProjectStatus } from "@/lib/content/types";

/**
 * Featured projects — PLACEHOLDER demo data, moved out of the carousel
 * component so the component is purely presentational. `href` is intentionally
 * omitted because project detail routes don't exist yet (cards render as
 * non-links). Only `en` is authored; other locales fall back to `en`.
 */
export interface FeaturedProjectRecord {
  id: string;
  title: Localized<string>;
  client: Localized<string>;
  sector: Localized<string>;
  location: Localized<string>;
  outcome: Localized<string>;
  status: ProjectStatus;
  imageUrl?: string;
  href?: string;
}

export const featuredProjects: FeaturedProjectRecord[] = [
  {
    id: "p1",
    title: { en: "Offshore Platform Refit" },
    client: { en: "Confidential Operator" },
    sector: { en: "Oil & Gas" },
    location: { en: "Caspian Sea" },
    outcome: { en: "42% faster commissioning" },
    status: "completed",
  },
  {
    id: "p2",
    title: { en: "Combined-Cycle Plant Expansion" },
    client: { en: "Regional Utility" },
    sector: { en: "Power" },
    location: { en: "Aran Plain" },
    outcome: { en: "+180MW capacity added" },
    status: "ongoing",
  },
  {
    id: "p3",
    title: { en: "Highway Interchange Upgrade" },
    client: { en: "Ministry of Roads" },
    sector: { en: "Infrastructure" },
    location: { en: "Tabriz Corridor" },
    outcome: { en: "Zero lost-time incidents" },
    status: "completed",
  },
  {
    id: "p4",
    title: { en: "Modular Processing Skid Supply" },
    client: { en: "Petrochemical JV" },
    sector: { en: "Supply" },
    location: { en: "Bandar Complex" },
    outcome: { en: "6 skids, 11-month cycle" },
    status: "completed",
  },
  {
    id: "p5",
    title: { en: "District Cooling Network" },
    client: { en: "Municipal Authority" },
    sector: { en: "Infrastructure" },
    location: { en: "Coastal District" },
    outcome: { en: "30% energy reduction" },
    status: "ongoing",
  },
];
