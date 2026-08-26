// payload.config.ts  (rename from .example after installing Payload)
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

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
  },
  editor: lexicalEditor(),
  collections: [Users, Media, Services, Testimonials, Projects, Industries],
  // Payload localization mirrors the site's next-intl locales. `find({ locale })`
  // then returns fields already resolved to the requested locale (with fallback),
  // which maps 1:1 onto the ContentSource return types.
  localization: {
    locales: ["en", "fa", "az", "tr"],
    defaultLocale: "en",
    fallback: true,
  },
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URI || "" },
  }),
  sharp,
});
