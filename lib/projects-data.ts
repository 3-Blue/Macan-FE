export type ProjectStatus = "completed" | "ongoing";

export interface ProjectItem {
  id: string;
  title: string;
  client: string;
  sector: string;
  service: string;
  year: number;
  location: string;
  outcome: string;
  status: ProjectStatus;
  imageUrl?: string;
  href: string;
}

export const PROJECTS: ProjectItem[] = [
  {
    id: "p1",
    title: "Offshore Platform Refit",
    client: "Confidential Operator",
    sector: "Oil & Gas",
    service: "Engineering",
    year: 2023,
    location: "Caspian Sea",
    outcome: "42% faster commissioning",
    status: "completed",
    href: "/projects/offshore-platform-refit",
  },
  {
    id: "p2",
    title: "Combined-Cycle Plant Expansion",
    client: "Regional Utility",
    sector: "Power",
    service: "Construction",
    year: 2024,
    location: "Aran Plain",
    outcome: "+180MW capacity added",
    status: "ongoing",
    href: "/projects/combined-cycle-expansion",
  },
  {
    id: "p3",
    title: "Highway Interchange Upgrade",
    client: "Ministry of Roads",
    sector: "Infrastructure",
    service: "Construction",
    year: 2022,
    location: "Tabriz Corridor",
    outcome: "Zero lost-time incidents",
    status: "completed",
    href: "/projects/highway-interchange-upgrade",
  },
  {
    id: "p4",
    title: "Modular Processing Skid Supply",
    client: "Petrochemical JV",
    sector: "Supply",
    service: "Supply & Fabrication",
    year: 2023,
    location: "Bandar Complex",
    outcome: "6 skids, 11-month cycle",
    status: "completed",
    href: "/projects/modular-skid-supply",
  },
  {
    id: "p5",
    title: "District Cooling Network",
    client: "Municipal Authority",
    sector: "Infrastructure",
    service: "Project Management",
    year: 2024,
    location: "Coastal District",
    outcome: "30% energy reduction",
    status: "ongoing",
    href: "/projects/district-cooling-network",
  },
];