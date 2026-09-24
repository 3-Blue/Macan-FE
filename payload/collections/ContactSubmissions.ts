// payload/collections/ContactSubmissions.ts
import type { Access, CollectionConfig } from "payload";

// Submissions are written only by the server-side contact route via the Local
// API (which bypasses access control) and read only by authenticated admins.
const authenticated: Access = ({ req }) => Boolean(req.user);

export const ContactSubmissions: CollectionConfig = {
  slug: "contact-submissions",
  admin: {
    useAsTitle: "subject",
    defaultColumns: ["subject", "name", "email", "createdAt"],
    // Payload adds createdAt/updatedAt timestamps automatically.
  },
  access: {
    read: authenticated,
    // Never creatable through the public REST/GraphQL API — the contact route
    // writes via the Local API, which overrides access control.
    create: () => false,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "email", type: "email", required: true },
    { name: "subject", type: "text", required: true },
    { name: "message", type: "textarea", required: true },
    { name: "ip", type: "text" },
  ],
};
