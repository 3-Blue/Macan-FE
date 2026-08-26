// payload/collections/Media.ts
import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  access: { read: () => true },
  upload: true,
  fields: [
    // `alt` is localized so images can carry per-language alt text.
    { name: "alt", type: "text", localized: true },
  ],
};
