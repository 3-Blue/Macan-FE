// payload/collections/Projects.ts
import type { CollectionConfig } from "payload";

export const Projects: CollectionConfig = {
  slug: "projects",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "sector", "stage", "featured", "order"],
  },
  access: { read: () => true },
  versions: { drafts: true },
  fields: [
    // `slug` powers detail routes, the sitemap and cross-collection links.
    { name: "slug", type: "text", required: true, unique: true, index: true },
    { name: "title", type: "text", required: true, localized: true },
    { name: "client", type: "text", localized: true },
    { name: "sector", type: "text", localized: true },
    { name: "service", type: "text", localized: true },
    { name: "location", type: "text", localized: true },
    // Short one-line outcome for listing/carousel cards.
    { name: "outcome", type: "text", localized: true },
    // Long-form scope for the detail page.
    { name: "scope", type: "textarea", localized: true },
    { name: "year", type: "number" },
    {
      name: "coordinates",
      type: "group",
      admin: { description: "Optional map position; omit to leave off the map." },
      fields: [
        { name: "lat", type: "number" },
        { name: "lng", type: "number" },
      ],
    },
    // Structured, measurable outcomes shown on the detail page.
    {
      name: "outcomes",
      type: "array",
      localized: true,
      fields: [
        { name: "label", type: "text", required: true },
        { name: "value", type: "text", required: true },
      ],
    },
    { name: "heroImage", type: "upload", relationTo: "media" },
    { name: "gallery", type: "upload", relationTo: "media", hasMany: true },
    {
      name: "relatedServices",
      type: "relationship",
      relationTo: "services",
      hasMany: true,
    },
    {
      name: "relatedIndustries",
      type: "relationship",
      relationTo: "industries",
      hasMany: true,
    },
    {
      name: "stage",
      type: "select",
      required: true,
      defaultValue: "completed",
      options: [
        { label: "Completed", value: "completed" },
        { label: "Ongoing", value: "ongoing" },
      ],
    },
    { name: "featured", type: "checkbox", defaultValue: false },
    { name: "order", type: "number", defaultValue: 0 },
  ],
};
