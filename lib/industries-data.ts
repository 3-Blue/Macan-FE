// Placeholder industries data (issue #27). Sectors match the values already
// used in lib/projects-data.ts (#30) so each card's link to /projects?sector=...
// returns real, matching results instead of an empty filtered list.
// TODO: replace with real industry copy once available.

export interface Industry {
  slug: string;
  sector: string; // must match a `sector` value in lib/projects-data.ts
  title: string;
  description: string;
}

export const industriesData: Industry[] = [
  {
    slug: "oil-and-gas",
    sector: "Oil & Gas",
    title: "Oil & Gas",
    description: "Engineering and construction support across upstream and offshore operations.",
  },
  {
    slug: "power",
    sector: "Power",
    title: "Power",
    description: "Generation and grid infrastructure projects, from expansion to commissioning.",
  },
  {
    slug: "infrastructure",
    sector: "Infrastructure",
    title: "Infrastructure",
    description: "Roads, utilities, and public works delivered for municipal and government clients.",
  },
  {
    slug: "supply",
    sector: "Supply",
    title: "Supply",
    description: "Fabrication and supply chain solutions for industrial and process equipment.",
  },
];