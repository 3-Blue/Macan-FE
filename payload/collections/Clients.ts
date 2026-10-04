// payload/collections/Clients.ts
import type { CollectionConfig } from "payload";
import { publishedOrAuthenticated } from "@/payload/access/published";

export const Clients: CollectionConfig = {
  slug: "clients",
  admin: { useAsTitle: "name", defaultColumns: ["name", "category", "order"] },
  access: { read: publishedOrAuthenticated },
  versions: { drafts: true },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "logoUrl", type: "text", required: true },
    { name: "link", type: "text", required: true },
    { name: "category", type: "text", required: true, localized: true },
    { name: "order", type: "number", defaultValue: 0 },
  ],
};
