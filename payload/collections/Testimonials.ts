// payload/collections/Testimonials.ts
import type { CollectionConfig } from "payload";

export const Testimonials: CollectionConfig = {
  slug: "testimonials",
  admin: { useAsTitle: "name", defaultColumns: ["name", "role", "order"] },
  access: { read: () => true },
  versions: { drafts: true },
  fields: [
    { name: "quote", type: "textarea", required: true, localized: true },
    { name: "name", type: "text", required: true }, // proper names aren't localized
    { name: "role", type: "text", localized: true },
    { name: "initials", type: "text", required: true, maxLength: 3 },
    { name: "order", type: "number", defaultValue: 0 },
  ],
};
