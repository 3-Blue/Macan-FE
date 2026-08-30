// lib/projects-mock-data.ts

/**
 * Temporary mock data for the project detail page (#31).
 *
 * TODO: Replace with real CMS data once PR #63 (Payload CMS) merges,
 * or reconcile with Nila's `ProjectItem` shape in lib/projects-data.ts
 * (feat/projects-listing-filters) once that branch merges and is
 * extended with gallery/outcomes/scope fields.
 *
 * ids/titles/slugs intentionally match ProjectItem in
 * feat/projects-listing-filters so the future listing page's
 * hrefs (e.g. "/projects/offshore-platform-refit") resolve here
 * without changes on either side.
 */

import type { Project } from "@/lib/types/project";

export const PROJECTS_MOCK: Project[] = [
  {
    id: "p1",
    slug: "offshore-platform-refit",
    title: "Offshore Platform Refit",
    client: "Confidential Operator",
    sector: "Oil & Gas",
    service: "Engineering",
    location: "Caspian Sea",
    year: 2023,
    outcome: "42% faster commissioning",
    scope:
      "Full structural and mechanical refit of an offshore production platform, including topside upgrades, corrosion mitigation, and integration of new process safety systems while the facility remained partially operational.",
    outcomes: [
      { label: "Commissioning time", value: "42% faster" },
      { label: "Safety incidents", value: "Zero lost-time" },
      { label: "Project duration", value: "14 months" },
    ],
    heroImage: {
      url: "/images/projects/offshore-platform-refit/hero.jpg",
      alt: "Offshore platform refit under construction at sunset",
    },
    gallery: [
      {
        url: "/images/projects/offshore-platform-refit/gallery-1.jpg",
        alt: "Topside structural upgrade in progress",
      },
      {
        url: "/images/projects/offshore-platform-refit/gallery-2.jpg",
        alt: "Engineers inspecting new process safety systems",
      },
      {
        url: "/images/projects/offshore-platform-refit/gallery-3.jpg",
        alt: "Completed platform refit, aerial view",
      },
    ],
    relatedServiceSlugs: ["engineering"],
    relatedIndustrySlugs: ["oil-and-gas"],
    status: "completed",
    featured: true,
    order: 1,
    published: true,
  },
  {
    id: "p2",
    slug: "combined-cycle-expansion",
    title: "Combined-Cycle Plant Expansion",
    client: "Regional Utility",
    sector: "Power",
    service: "Construction",
    location: "Aran Plain",
    year: 2024,
    outcome: "+180MW capacity added",
    scope:
      "Construction of a new combined-cycle generating unit adjacent to an existing plant, adding significant capacity to the regional grid while maintaining uninterrupted operation of existing units.",
    outcomes: [
      { label: "Capacity added", value: "+180 MW" },
      { label: "Grid downtime", value: "None" },
      { label: "Status", value: "Ongoing" },
    ],
    heroImage: {
      url: "/images/projects/combined-cycle-expansion/hero.jpg",
      alt: "Combined-cycle power plant construction site",
    },
    gallery: [
      {
        url: "/images/projects/combined-cycle-expansion/gallery-1.jpg",
        alt: "Turbine hall construction",
      },
      {
        url: "/images/projects/combined-cycle-expansion/gallery-2.jpg",
        alt: "Cooling tower installation",
      },
    ],
    relatedServiceSlugs: ["construction"],
    relatedIndustrySlugs: ["power"],
    status: "ongoing",
    featured: false,
    order: 2,
    published: true,
  },
  {
    id: "p3",
    slug: "highway-interchange-upgrade",
    title: "Highway Interchange Upgrade",
    client: "Ministry of Roads",
    sector: "Infrastructure",
    service: "Construction",
    location: "Tabriz Corridor",
    year: 2022,
    outcome: "Zero lost-time incidents",
    scope:
      "Redesign and reconstruction of a major highway interchange to reduce congestion and improve safety, delivered in staged phases to keep traffic flowing throughout construction.",
    outcomes: [
      { label: "Safety incidents", value: "Zero lost-time" },
      { label: "Traffic disruption", value: "Minimized via staged phasing" },
      { label: "Completion", value: "On schedule" },
    ],
    heroImage: {
      url: "/images/projects/highway-interchange-upgrade/hero.jpg",
      alt: "Highway interchange under construction",
    },
    gallery: [
      {
        url: "/images/projects/highway-interchange-upgrade/gallery-1.jpg",
        alt: "New interchange ramp construction",
      },
      {
        url: "/images/projects/highway-interchange-upgrade/gallery-2.jpg",
        alt: "Completed interchange, aerial view",
      },
    ],
    relatedServiceSlugs: ["construction"],
    relatedIndustrySlugs: ["infrastructure"],
    status: "completed",
    featured: false,
    order: 3,
    published: true,
  },
  {
    id: "p4",
    slug: "modular-skid-supply",
    title: "Modular Processing Skid Supply",
    client: "Petrochemical JV",
    sector: "Supply",
    service: "Supply & Fabrication",
    location: "Bandar Complex",
    year: 2023,
    outcome: "6 skids, 11-month cycle",
    scope:
      "Design, fabrication, and delivery of six modular processing skids for a petrochemical joint venture, manufactured off-site and shipped ready for rapid installation.",
    outcomes: [
      { label: "Units delivered", value: "6 skids" },
      { label: "Delivery cycle", value: "11 months" },
      { label: "Installation time", value: "Reduced via modular design" },
    ],
    heroImage: {
      url: "/images/projects/modular-skid-supply/hero.jpg",
      alt: "Modular processing skid ready for shipment",
    },
    gallery: [
      {
        url: "/images/projects/modular-skid-supply/gallery-1.jpg",
        alt: "Fabrication yard with processing skids",
      },
      {
        url: "/images/projects/modular-skid-supply/gallery-2.jpg",
        alt: "Skid loaded for transport",
      },
    ],
    relatedServiceSlugs: ["supply-and-fabrication"],
    relatedIndustrySlugs: ["oil-and-gas"],
    status: "completed",
    featured: false,
    order: 4,
    published: true,
  },
  {
    id: "p5",
    slug: "district-cooling-network",
    title: "District Cooling Network",
    client: "Municipal Authority",
    sector: "Infrastructure",
    service: "Project Management",
    location: "Coastal District",
    year: 2024,
    outcome: "30% energy reduction",
    scope:
      "Project management and delivery oversight for a district cooling network serving a coastal municipal development, replacing individual building units with a shared, more efficient system.",
    outcomes: [
      { label: "Energy use", value: "30% reduction" },
      { label: "Buildings served", value: "Municipal district-wide" },
      { label: "Status", value: "Ongoing" },
    ],
    heroImage: {
      url: "/images/projects/district-cooling-network/hero.jpg",
      alt: "District cooling plant exterior",
    },
    gallery: [
      {
        url: "/images/projects/district-cooling-network/gallery-1.jpg",
        alt: "District cooling network piping installation",
      },
      {
        url: "/images/projects/district-cooling-network/gallery-2.jpg",
        alt: "Central cooling plant control room",
      },
    ],
    relatedServiceSlugs: ["project-management"],
    relatedIndustrySlugs: ["infrastructure"],
    status: "ongoing",
    featured: false,
    order: 5,
    published: true,
  },
];

/**
 * Helper to look up a single project by slug.
 * Mirrors how the real CMS query will eventually work.
 */
export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS_MOCK.find((project) => project.slug === slug);
}