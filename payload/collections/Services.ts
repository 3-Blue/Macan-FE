// payload/collections/Services.ts
import type { CollectionConfig } from "payload";

export const Services: CollectionConfig = {
  slug: "services",
  admin: { useAsTitle: "title", defaultColumns: ["title", "slug", "order"] },
  access: { read: () => true },
  versions: { drafts: true },
  fields: [
    { name: "slug", type: "text", required: true, unique: true, index: true },
    { name: "title", type: "text", required: true, localized: true },
    // Merges the old thin "description" (listing card) and the detail page's
    // "summary" — they held identical copy in the local data files, so this
    // removes a duplication rather than losing anything.
    { name: "summary", type: "textarea", required: true, localized: true },
    { name: "body", type: "textarea", required: true, localized: true },
    { name: "icon", type: "text" },
    { name: "heroImage", type: "upload", relationTo: "media" },
    { name: "gallery", type: "upload", relationTo: "media", hasMany: true },
    {
      name: "relatedProjects",
      type: "relationship",
      relationTo: "projects",
      hasMany: true,
    },
    {
      name: "relatedIndustries",
      type: "relationship",
      relationTo: "industries",
      hasMany: true,
    },
    { name: "order", type: "number", defaultValue: 0 },
  ],
};