// payload/collections/Industries.ts
import type { CollectionConfig } from "payload";

export const Industries: CollectionConfig = {
  slug: "industries",
  admin: { useAsTitle: "name", defaultColumns: ["name", "slug", "order"] },
  access: { read: () => true },
  versions: { drafts: true },
  fields: [
    { name: "slug", type: "text", required: true, unique: true, index: true },
    { name: "name", type: "text", required: true, localized: true },
    { name: "summary", type: "textarea", required: true, localized: true },
    { name: "icon", type: "text" },
    { name: "description", type: "textarea", required: true, localized: true },
    {
      name: "challenges",
      type: "array",
      localized: true,
      fields: [{ name: "item", type: "text", required: true }],
    },
    {
      name: "solutions",
      type: "array",
      localized: true,
      fields: [{ name: "item", type: "text", required: true }],
    },
    { name: "heroImage", type: "upload", relationTo: "media" },
    {
      name: "relatedProjects",
      type: "relationship",
      relationTo: "projects",
      hasMany: true,
    },
    { name: "order", type: "number", defaultValue: 0 },
  ],
};
