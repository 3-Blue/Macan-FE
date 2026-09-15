// payload/collections/Posts.ts
import type { CollectionConfig } from "payload";

export const Posts: CollectionConfig = {
  slug: "posts",
  admin: { useAsTitle: "title", defaultColumns: ["title", "slug", "category", "date"] },
  access: { read: () => true },
  versions: { drafts: true },
  fields: [
    { name: "slug", type: "text", required: true, unique: true, index: true },
    { name: "title", type: "text", required: true, localized: true },
    { name: "cover", type: "upload", relationTo: "media" },
    // Plain textarea for now (matches the existing Post.body: string contract).
    // Upgrading to a richText field is separate scope tied to issue #39
    // ("rich text rendering") and would need an HTML-serialization step in
    // the adapter — deliberately deferred rather than mixed into this PR.
    { name: "body", type: "textarea", required: true, localized: true },
    { name: "author", type: "text", required: true }, // not localized
    {
      name: "tags",
      type: "array",
      fields: [{ name: "tag", type: "text", required: true }],
    },
    { name: "category", type: "text", required: true, localized: true },
    { name: "date", type: "date", required: true },
  ],
};