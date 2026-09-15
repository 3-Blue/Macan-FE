// payload/collections/Services.ts
import type { CollectionConfig } from "payload";

export const Services: CollectionConfig = {
  slug: "services",
  admin: { useAsTitle: "title", defaultColumns: ["title", "slug", "order"] },
  access: { read: () => true },
  versions: { drafts: true }, // _status: 'draft' | 'published'
  fields: [
    { name: "slug", type: "text", required: true, unique: true, index: true },
    { name: "title", type: "text", required: true, localized: true },
    { name: "description", type: "textarea", required: true, localized: true },
    { name: "order", type: "number", defaultValue: 0 },
  ],
};
