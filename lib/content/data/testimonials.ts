import type { Localized } from "@/lib/content/types";

/**
 * Client testimonials — PLACEHOLDER demo data (fictional names/quotes).
 * Replace with real, attributed testimonials before launch. Quotes are modelled
 * as Localized so they can be translated later; only `en` is authored for now.
 */
export interface TestimonialRecord {
  id: string;
  quote: Localized<string>;
  name: string; // proper names are not translated
  role: Localized<string>;
  initials: string;
}

export const testimonials: TestimonialRecord[] = [
  {
    id: "testimonial-1",
    quote: {
      en: "The team delivered on time and on budget, with clear communication at every stage of the project.",
    },
    name: "Amira Hassan",
    role: { en: "Project Director, Northline Group" },
    initials: "AH",
  },
  {
    id: "testimonial-2",
    quote: {
      en: "Their engineering team caught issues early that would have cost us months of delay down the line.",
    },
    name: "Daniel Osei",
    role: { en: "Operations Lead, Vantage Build" },
    initials: "DO",
  },
  {
    id: "testimonial-3",
    quote: {
      en: "A genuinely reliable partner. We've brought them onto every major project since our first one together.",
    },
    name: "Leyla Karimova",
    role: { en: "Managing Director, Silkroute Holdings" },
    initials: "LK",
  },
];
