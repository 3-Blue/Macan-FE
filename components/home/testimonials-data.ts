// TODO: replace with real client testimonials once available (tracked against issue #36).
// Placeholder quotes only -- not attributed to real clients. Swap in actual
// testimonial copy, names, and roles when the team sources them.

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  initials: string;
}

export const testimonialsData: Testimonial[] = [
  {
    id: "testimonial-1",
    quote:
      "The team delivered on time and on budget, with clear communication at every stage of the project.",
    name: "Amira Hassan",
    role: "Project Director, Northline Group",
    initials: "AH",
  },
  {
    id: "testimonial-2",
    quote:
      "Their engineering team caught issues early that would have cost us months of delay down the line.",
    name: "Daniel Osei",
    role: "Operations Lead, Vantage Build",
    initials: "DO",
  },
  {
    id: "testimonial-3",
    quote:
      "A genuinely reliable partner. We've brought them onto every major project since our first one together.",
    name: "Leyla Karimova",
    role: "Managing Director, Silkroute Holdings",
    initials: "LK",
  },
];