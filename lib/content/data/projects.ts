import type { Project } from "@/lib/types/project";

/**
 * Projects — the single source of truth for every project surface (home
 * carousel, listing, map, detail page, sitemap), all served through the
 * content layer (lib/content).
 *
 * PLACEHOLDER demo data: replace with real project copy/imagery before
 * launch, or migrate to Payload (CONTENT_SOURCE=payload) — the view models
 * and pages stay identical either way.
 *
 * Authored in English only for now. When per-locale copy is needed, either
 * translate in the CMS or wrap fields in `Localized<T>` here and resolve them
 * in the local adapter, mirroring the other content/data modules.
 */
export const projectRecords: Project[] = [
  {
    id: "p1",
    slug: "offshore-platform-refit",
    title: "Offshore Platform Refit",
    client: "Confidential Operator",
    sector: "Oil & Gas",
    service: "Engineering",
    location: "Caspian Sea",
    coordinates: { lat: 37.6, lng: 51.0 }, // PLACEHOLDER: approximate
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
      url: "/projects/offshore-platform-refit/hero.svg",
      alt: "Offshore platform refit under construction at sunset",
    },
    gallery: [
      {
        url: "/projects/offshore-platform-refit/gallery-1.svg",
        alt: "Topside structural upgrade in progress",
      },
      {
        url: "/projects/offshore-platform-refit/gallery-2.svg",
        alt: "Engineers inspecting new process safety systems",
      },
      {
        url: "/projects/offshore-platform-refit/gallery-3.svg",
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
    coordinates: { lat: 34.06, lng: 51.48 }, // PLACEHOLDER: approximate
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
      url: "/projects/combined-cycle-expansion/hero.svg",
      alt: "Combined-cycle power plant construction site",
    },
    gallery: [
      {
        url: "/projects/combined-cycle-expansion/gallery-1.svg",
        alt: "Turbine hall construction",
      },
      {
        url: "/projects/combined-cycle-expansion/gallery-2.svg",
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
    coordinates: { lat: 38.08, lng: 46.29 }, // PLACEHOLDER: approximate
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
      url: "/projects/highway-interchange-upgrade/hero.svg",
      alt: "Highway interchange under construction",
    },
    gallery: [
      {
        url: "/projects/highway-interchange-upgrade/gallery-1.svg",
        alt: "New interchange ramp construction",
      },
      {
        url: "/projects/highway-interchange-upgrade/gallery-2.svg",
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
    coordinates: { lat: 27.18, lng: 56.27 }, // PLACEHOLDER: approximate
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
      url: "/projects/modular-skid-supply/hero.svg",
      alt: "Modular processing skid ready for shipment",
    },
    gallery: [
      {
        url: "/projects/modular-skid-supply/gallery-1.svg",
        alt: "Fabrication yard with processing skids",
      },
      {
        url: "/projects/modular-skid-supply/gallery-2.svg",
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
    coordinates: { lat: 36.65, lng: 51.42 }, // PLACEHOLDER: approximate
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
      url: "/projects/district-cooling-network/hero.svg",
      alt: "District cooling plant exterior",
    },
    gallery: [
      {
        url: "/projects/district-cooling-network/gallery-1.svg",
        alt: "District cooling network piping installation",
      },
      {
        url: "/projects/district-cooling-network/gallery-2.svg",
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
