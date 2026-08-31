// Service detail content data (issue #23).
// Mirrors the shape/conventions used in lib/industries-data.ts (#26/#28).
// relatedProjectSlugs/relatedIndustrySlugs reference the same ids used in
// lib/projects-data.ts and lib/industries-data.ts so cross-links resolve.
// TODO: replace with real CMS-sourced copy once #17 (Headless CMS) merges.
// TODO: gallery/heroImage left empty until real service imagery exists
// (see #47 placeholder-SVG precedent for projects).

import { Service } from "@/lib/types/service";

export const servicesData: Service[] = [
  {
    id: "engineering",
    slug: "engineering",
    title: "Engineering",
    summary:
      "Technical design and engineering services across every project phase.",
    body:
      "MACAN's engineering team provides technical design and analysis across the full project lifecycle — from early feasibility studies through detailed design and site support during execution. We work across structural, mechanical, and process disciplines to deliver designs that meet safety, regulatory, and operational requirements in demanding industrial environments.",
    icon: "drafting-compass",
    gallery: [],
    relatedProjectSlugs: ["p1", "p2"],
    relatedIndustrySlugs: ["oil-and-gas", "power"],
    order: 1,
    published: true,
  },
  {
    id: "construction",
    slug: "construction",
    title: "Construction",
    summary:
      "End-to-end construction execution, from groundwork to handover.",
    body:
      "From groundwork to final handover, MACAN manages construction execution with a focus on schedule reliability and site safety. Our teams coordinate multiple trades and disciplines on complex sites, keeping projects moving on tight municipal and industrial timelines while maintaining strict HSE standards throughout.",
    icon: "hard-hat",
    gallery: [],
    relatedProjectSlugs: ["p3", "p5"],
    relatedIndustrySlugs: ["power", "infrastructure"],
    order: 2,
    published: true,
  },
  {
    id: "supply",
    slug: "supply",
    title: "Supply",
    summary:
      "Reliable sourcing and supply chain management for materials and equipment.",
    body:
      "MACAN's supply arm sources and fabricates process equipment and modular skids, backed by a supplier network vetted for industrial-grade quality. We manage the full chain from procurement through fabrication quality control to delivery logistics, including oversized and modular unit transport.",
    icon: "package",
    gallery: [],
    relatedProjectSlugs: ["p4"],
    relatedIndustrySlugs: ["supply"],
    order: 3,
    published: true,
  },
  {
    id: "project-management",
    slug: "project-management",
    title: "Project Management",
    summary:
      "Coordinated planning and oversight to keep projects on time and on budget.",
    body:
      "Our project management team provides coordinated planning and oversight across engineering, construction, and supply workstreams, keeping multi-discipline projects on schedule and on budget. We handle stakeholder communication, progress reporting, and risk management from kickoff through commissioning.",
    icon: "clipboard-check",
    gallery: [],
    relatedProjectSlugs: ["p3"],
    relatedIndustrySlugs: ["infrastructure"],
    order: 4,
    published: true,
  },
];