# CMS: Payload 3 integration guide

This project is prepared for [Payload CMS](https://payloadcms.com) but does not
yet run it. The content layer (`lib/content`) already sits behind a swappable
`ContentSource` interface, so adopting Payload is additive — no page or
component changes.

The scaffold ships as `*.example` files so the app keeps building until you
install Payload. Rename them (drop `.example`) at the step noted below.

---

## Why Payload, and where to host it

Payload is code-first (schema in TypeScript), generates a polished admin panel
for non-technical editors, supports first-class localization (en/fa/az/tr), and
runs inside this same Next.js app.

**Hosting:** Payload is designed to run as a **persistent Node server**. On
Vercel's serverless model it works for low traffic but is prone to Postgres
connection-pool exhaustion and function-timeout failures during admin bulk
operations. For anything meant to scale, prefer a persistent host:

- **Railway / Render / Fly.io** — managed containers, Postgres add-on, simplest.
- **Docker on a VPS** — `output: "standalone"`, Nginx in front, Postgres
  alongside; cheapest at scale.

If you still want Vercel: keep it for the frontend and host Payload+Postgres
separately, or accept the serverless caveats for a low-traffic marketing site.

---

## Prerequisites

- **Next.js 16.2.x** (this repo is on 16.2.9 ✓). Payload requires **≥ 3.73.0**
  for Next 16 support; Next 15.5–16.1 are **not** supported.
- A Postgres database (local Docker is fine for development).

```bash
docker run --name macan-pg -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=macan -p 5432:5432 -d postgres:16
```

---

## Step 1 — Install dependencies

```bash
npm install payload @payloadcms/next @payloadcms/db-postgres \
  @payloadcms/richtext-lexical sharp graphql
```

## Step 2 — Environment

Add to `.env` (see `.env.example`):

```
DATABASE_URI=postgres://postgres:postgres@localhost:5432/macan
PAYLOAD_SECRET=<a long random string>
CONTENT_SOURCE=payload
```

## Step 3 — Activate the scaffold

Rename the example files:

```bash
mv payload.config.ts.example payload.config.ts
for f in payload/collections/*.ts.example; do mv "$f" "${f%.example}"; done
mv lib/content/adapters/payload.ts.example lib/content/adapters/payload.ts
```

## Step 4 — Wire the Next config

Payload wraps the Next config. Update `next.config.ts`:

```ts
import { withPayload } from "@payloadcms/next/withPayload";
// ...existing imports and nextConfig...
export default withPayload(withNextIntl(nextConfig));
```

Add `@payload-config` to `tsconfig.json` `compilerOptions.paths`:

```json
"paths": {
  "@/*": ["./*"],
  "@payload-config": ["./payload.config.ts"]
}
```

## Step 5 — Add the Payload routes

Payload owns two route groups that must live **outside** `app/[locale]`. Copy
them from the Payload blank template (or `npx create-payload-app` in a scratch
dir) into:

```
app/(payload)/admin/[[...segments]]/page.tsx   + not-found.tsx
app/(payload)/api/[...slug]/route.ts
app/(payload)/api/graphql/route.ts
app/(payload)/layout.tsx
```

The `admin` path is already excluded from the next-intl proxy matcher in
`proxy.ts`, so the admin panel is not locale-prefixed.

## Step 6 — Switch the content adapter

In `lib/content/provider.ts`:

```ts
import { payloadContentSource } from "@/lib/content/adapters/payload";

export function getContentSource(): ContentSource {
  if (process.env.CONTENT_SOURCE === "payload") return payloadContentSource;
  return localContentSource;
}
```

## Step 7 — Run

```bash
npm run dev
```

Visit `/admin`, create the first admin user, and start entering content. Types
generate to `payload-types.ts` (regenerate with `npx payload generate:types`).

---

## Content model

The collections in `payload/collections/` mirror the existing typed models and
the current content layer:

| Collection     | Mirrors                                   | Localized fields                                   |
| -------------- | ----------------------------------------- | -------------------------------------------------- |
| `services`     | `lib/content/data/services.ts`            | title, description                                 |
| `testimonials` | `lib/content/data/testimonials.ts`        | quote, role                                        |
| `projects`     | `FeaturedProject`                         | title, client, sector, location, outcome           |
| `industries`   | `lib/types/industry.ts`                   | name, summary, description, challenges, solutions  |
| `media`        | uploads                                   | alt                                                |
| `users`        | admin auth                                | —                                                  |

Because localized fields + `localization.fallback: true` are configured,
`payload.find({ locale })` returns strings already resolved for the requested
locale — matching the `ContentSource` return types exactly.

---

## Migrating existing content

The in-repo data in `lib/content/data/*` and `lib/industries-data.ts` is the
seed. Options:

1. **By hand** in the admin panel (fastest for this small dataset).
2. **A seed script** using the Local API (`getPayload({ config })` →
   `payload.create({ collection, data, locale })`), iterating the existing data
   modules. Run once with `npx tsx scripts/seed.ts`.

Keep the local adapter and data files after migrating — they remain the
`CONTENT_SOURCE=local` fallback and a useful offline/dev source.

---

## Build-time note (SSG)

Pages read content in Server Components and are prerendered. With
`CONTENT_SOURCE=payload`, prerendering hits the database at build, so:

- Ensure `DATABASE_URI` is reachable during `next build` (CI + prod), **or**
- Add `export const revalidate = 300;` to content pages to use ISR, **or**
- Make specific pages dynamic if content must always be live.

---

## Turbopack warning

If you see “using Turbopack, with a webpack config and no turbopack config”,
add an empty `turbopack: {}` to `nextConfig`, or run build/dev with
`--turbopack` explicitly.
