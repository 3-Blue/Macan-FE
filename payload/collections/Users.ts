// payload/collections/Users.ts
import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  auth: true, // enables the admin login for content editors
  admin: { useAsTitle: "email" },
  fields: [
    // email + password are added automatically by `auth: true`.
    { name: "name", type: "text" },
  ],
};
