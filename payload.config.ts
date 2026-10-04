// payload.config.ts
//
// Requires (see docs/CMS-PAYLOAD.md):
//   payload  @payloadcms/next  @payloadcms/db-postgres
//   @payloadcms/richtext-lexical  sharp  graphql
//
// Payload 3.73+ is required for Next.js 16.2.x compatibility.

import path from "path";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import sharp from "sharp";

import { Users } from "./payload/collections/Users";
import { Media } from "./payload/collections/Media";
import { Services } from "./payload/collections/Services";
import { Testimonials } from "./payload/collections/Testimonials";
import { Projects } from "./payload/collections/Projects";
import { Industries } from "./payload/collections/Industries";
import { Leadership } from "./payload/collections/Leadership";
import { Posts } from "./payload/collections/Posts";
import { Clients } from "./payload/collections/Clients";
import { ContactSubmissions } from "./payload/collections/ContactSubmissions";

const dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Payload signs auth tokens and encrypts fields with this secret. An empty or
 * predictable value in production is a security hole (forgeable tokens), so we
 * fail fast at startup instead of silently falling back to "".
 *
 * In development/test we fall back to a clearly-labelled insecure value so
 * local work isn't blocked; it is never reachable in production because the
 * branch above throws first.
 */
function resolvePayloadSecret(): string {
  const secret = process.env.PAYLOAD_SECRET;
  if (secret && secret.length > 0) return secret;

  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "PAYLOAD_SECRET is not set. Set a strong, stable secret in the environment " +
        "before building or starting the server in production.",
    );
  }

  console.warn(
    "[payload] PAYLOAD_SECRET is not set — using an insecure development-only " +
      "fallback. Do NOT use this in production.",
  );
  return "dev-insecure-payload-secret-change-me";
}

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
  },
  editor: lexicalEditor(),
  collections: [
    Users,
    Media,
    Services,
    Testimonials,
    Projects,
    Industries,
    Leadership,
    Posts,
    Clients,
    ContactSubmissions,
  ],
  localization: {
    locales: ["en", "fa", "az", "tr"],
    defaultLocale: "en",
    fallback: true,
  },
  secret: resolvePayloadSecret(),
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URI || "" },
  }),
  sharp,
});