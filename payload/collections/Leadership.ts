// payload/collections/Leadership.ts
import type { CollectionConfig } from "payload";

export const Leadership: CollectionConfig = {
  slug: "leadership",
  admin: { useAsTitle: "name", defaultColumns: ["name", "role", "order"] },
  access: { read: () => true },
  versions: { drafts: true },
  fields: [
    { name: "name", type: "text", required: true }, // proper names aren't localized
    { name: "role", type: "text", required: true, localized: true },
    { name: "bio", type: "textarea", required: true, localized: true },
    { name: "photo", type: "upload", relationTo: "media" },
    { name: "order", type: "number", defaultValue: 0 },
  ],
};