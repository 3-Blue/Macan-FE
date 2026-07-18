// TODO: replace with real service copy once available (tracked against issue #9).
// Titles/slugs are drawn from issue #23 (engineering, construction, supply, PM),
// which lists these as the site's core service categories. Descriptions below
// are placeholder one-liners only -- not final marketing copy.

export interface ServiceTeaser {
  slug: string;
  title: string;
  description: string;
}

export const servicesTeaserData: ServiceTeaser[] = [
  {
    slug: "engineering",
    title: "Engineering",
    description: "Technical design and engineering services across every project phase.",
  },
  {
    slug: "construction",
    title: "Construction",
    description: "End-to-end construction execution, from groundwork to handover.",
  },
  {
    slug: "supply",
    title: "Supply",
    description: "Reliable sourcing and supply chain management for materials and equipment.",
  },
  {
    slug: "project-management",
    title: "Project Management",
    description: "Coordinated planning and oversight to keep projects on time and on budget.",
  },
];
