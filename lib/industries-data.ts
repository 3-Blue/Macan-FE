// Industry content data (issues #26, #27, #28).
// Sectors match the values used in lib/projects-data.ts (#30) so
// relatedProjectSlugs and sector-filtered links return real results.
// TODO: replace with real CMS-sourced copy once #17 (Headless CMS) merges.

import { Industry } from "@/lib/types/industry";

export const industriesData: Industry[] = [
  {
    id: "oil-and-gas",
    slug: "oil-and-gas",
    name: "Oil & Gas",
    summary: "Engineering and construction support across upstream and offshore operations.",
    icon: "droplet",
    description:
      "MACAN supports oil & gas operators across the full project lifecycle, from offshore platform engineering to refit and turnaround work, delivering under demanding safety and regulatory conditions.",
    challenges: [
      "Aging offshore infrastructure requiring careful, safety-critical refits",
      "Strict regulatory and environmental compliance requirements",
      "Remote, harsh operating environments with limited logistics windows",
    ],
    solutions: [
      "Structural and mechanical engineering for platform refits and life extension",
      "Turnaround planning that minimizes production downtime",
      "HSE-first execution frameworks tailored to offshore conditions",
    ],
    relatedServiceSlugs: ["engineering"],
    relatedProjectSlugs: ["p1"],
    order: 1,
    published: true,
  },
  {
    id: "power",
    slug: "power",
    name: "Power",
    summary: "Generation and grid infrastructure projects, from expansion to commissioning.",
    icon: "zap",
    description:
      "From combined-cycle plant expansions to grid infrastructure, MACAN delivers power projects that keep pace with growing demand while meeting strict commissioning timelines.",
    challenges: [
      "Growing demand requiring rapid capacity expansion",
      "Complex commissioning and integration with existing grid infrastructure",
      "Coordinating multiple engineering disciplines on tight schedules",
    ],
    solutions: [
      "End-to-end expansion engineering, from design through commissioning",
      "Grid integration planning that minimizes service disruption",
      "Multi-discipline project management to keep timelines on track",
    ],
    relatedServiceSlugs: ["engineering", "construction"],
    relatedProjectSlugs: ["p2"],
    order: 2,
    published: true,
  },
  {
    id: "infrastructure",
    slug: "infrastructure",
    name: "Infrastructure",
    summary: "Roads, utilities, and public works delivered for municipal and government clients.",
    icon: "building-2",
    description:
      "MACAN delivers public infrastructure projects — from highway interchanges to district utility networks — built for long-term reliability and municipal accountability.",
    challenges: [
      "Coordinating with municipal stakeholders and public timelines",
      "Minimizing disruption to existing traffic and utility networks",
      "Meeting public accountability and reporting requirements",
    ],
    solutions: [
      "Phased construction planning to keep infrastructure operational during works",
      "Transparent stakeholder communication and progress reporting",
      "Utility-network engineering built for decades of reliable service",
    ],
    relatedServiceSlugs: ["construction", "project-management"],
    relatedProjectSlugs: ["p3", "p5"],
    order: 3,
    published: true,
  },
  {
    id: "supply",
    slug: "supply",
    name: "Supply",
    summary: "Fabrication and supply chain solutions for industrial and process equipment.",
    icon: "package",
    description:
      "MACAN's supply arm delivers fabricated process equipment and modular skids, backed by a supply chain built for industrial-grade quality and delivery reliability.",
    challenges: [
      "Sourcing and quality-assuring components across a complex supply chain",
      "Meeting fabrication tolerances for process-critical equipment",
      "Coordinating delivery logistics for oversized modular units",
    ],
    solutions: [
      "In-house fabrication quality control at every production stage",
      "Modular skid design optimized for transport and on-site installation",
      "Supplier network vetted for industrial process equipment standards",
    ],
    relatedServiceSlugs: ["supply"],
    relatedProjectSlugs: ["p4"],
    order: 4,
    published: true,
  },
];
