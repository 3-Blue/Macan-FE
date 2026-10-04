# Macan FE

Multilingual (en / fa / az / tr) corporate website for MACAN, built with the
Next.js App Router. Farsi (`fa`) renders right-to-left; the other locales are
left-to-right.

## Stack

- **Next.js 16** (App Router, SSG) + **React 19**
- **next-intl** for routing and translations (`messages/*.json`)
- **MUI 9** + **emotion** (RTL via `stylis-plugin-rtl`)
- **framer-motion** for transitions
- **Payload 3** (Postgres) as an optional CMS, behind a swappable content adapter
- **Resend** for contact-form email
- **Plausible** (cookieless) analytics

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000 (redirects to the default locale).

### Scripts

- `npm run dev` — development server
- `npm run build` / `npm run start` — production build / serve
- `npm run lint` — ESLint
- `npm run typecheck` — `tsc --noEmit`
- `npm run format` — Prettier

## Environment variables

| Variable | Required | Notes |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | prod | Public origin, no trailing slash. Drives canonical / hreflang / sitemap / RSS / OG URLs. **Build throws if unset in production.** |
| `CONTENT_SOURCE` | no | `payload` to read content from the CMS; anything else uses the in-repo local adapter (default). |
| `PAYLOAD_SECRET` | prod | Signs auth tokens / encrypts fields. **App throws at startup if unset in production.** |
| `DATABASE_URI` | with Payload | Postgres connection string. |
| `RESEND_API_KEY`, `CONTACT_EMAIL_TO`, `CONTACT_EMAIL_FROM` | contact email | If unset, submissions are still stored; the email notification is skipped. |
| `NEXT_PUBLIC_PLAUSIBLE_SCRIPT_SRC` | no | Analytics script URL. Leave unset in local dev. |

## Content

All pages read content through `lib/content` (a locale-aware adapter). The
default `local` adapter serves the data in `lib/content/data`; setting
`CONTENT_SOURCE=payload` switches to the Payload backend without touching
components. See `docs/CMS-PAYLOAD.md` and `docs/CMS-EDITOR-GUIDE.md`.

## Deployment

Node hosting (e.g. Vercel) — the app has API routes and is **not** a static
export. On first Payload deploy, create the initial admin user immediately via
`/admin/create-first-user`, before the route is publicly reachable.
