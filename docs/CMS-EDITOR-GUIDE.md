# Editing content on the Macan website (current workflow)

This project doesn't run a CMS yet. All website text — services, industries,
projects, news posts, testimonials, leadership bios, client logos — lives in
plain TypeScript files under `lib/`. Editing content means editing these
files and going through a normal pull request, the same as a code change.

A future upgrade will add a proper admin panel (Payload CMS) so non-developers
can edit content through a web form instead of files. That plan is documented
separately in `docs/CMS-PAYLOAD.md`. This guide is for right now, before that
lands.

---

## Where each type of content lives

| What you want to edit | File | Notes |
| --- | --- | --- |
| Services (Engineering, Construction, Supply, Project Management) | `lib/services-data.ts` | English only right now — not yet translatable (see "Known limitations" below) |
| Industries (Oil & Gas, Power, Infrastructure, Supply) | `lib/industries-data.ts` | Translatable (see "Translations" below) |
| Projects — full detail pages (gallery, outcomes, scope) | `lib/projects-mock-data.ts` | English only right now |
| Featured projects — home page carousel | `lib/content/data/projects.ts` | English only right now |
| News posts | `lib/posts-data.ts` | Translatable |
| Client / partner logos | `lib/content/data/clients.ts` | English only right now |
| Testimonials | `lib/content/data/testimonials.ts` | English only right now |
| Leadership / team bios | `lib/content/data/leadership.ts` | English only right now, currently placeholder data |

If you're not sure which file covers something you see on the site, ask
before guessing — the file names above are the only supported entry points.
Don't edit anything under `lib/content/adapters/` or `lib/content/types.ts`
without a developer's help; those files control *how* content is read, not
the content itself.

---

## The "Localized" pattern (translations)

Some files use a `Localized<T>` shape instead of a plain string, for example:

```ts
title: {
  en: "Oil & Gas",
  fa: "نفت و گاز",
}
```

This means the English and Farsi versions are both stored right on the
entry. If a locale (`az` or `tr`) is missing, the site automatically falls
back to showing the English (`en`) text for that field — it will never show
blank or broken text.

To add or fix a translation:
1. Open the file for that content type (see the table above).
2. Find the entry you want to change.
3. Add or edit the key for that locale (`fa`, `az`, or `tr`) inside the
   `Localized` field, matching the structure already there.
4. Leave `en` as-is unless you're intentionally changing the English copy —
   `en` is the fallback for every locale that isn't translated yet.

`fa` translations across the site are currently best-effort drafts and are
flagged for native-speaker review before launch. `az` and `tr` mostly fall
back to `en` for now — filling those in is ongoing, low-priority work, not a
blocker for anything.

---

## Known limitations (don't try to "fix" these yourself)

- **Services, project detail pages, client names, and testimonials are not
  yet translatable** — they use plain strings, not `Localized<T>`. This is a
  known gap, tracked separately, not a bug in your edit.
- **Leadership bios are placeholder/fictional data.** Replacing them with
  real names, roles, and photos is expected and safe to do through this same
  workflow — just don't add real people's translations, salaries, or
  anything sensitive to these files, since they're stored as plain text in
  git history, not a secured database.
- **`order` fields control display order** (lower numbers show first).
  **`published: false` hides an entry from the live site** without deleting
  it — use this instead of deleting when you want to temporarily pull
  something down.

---

## Step-by-step: making a content change

1. **Create a branch.** Use a name like `content/update-oil-gas-industry`.
   ```bash
   git checkout main
   git pull origin main
   git checkout -b content/short-description-of-change
   ```
2. **Open the right file** from the table above.
3. **Make your edit**, keeping the existing structure (commas, quotes, and
   nesting matter in TypeScript — copy the pattern of a neighboring entry if
   unsure).
4. **Check your work compiles:**
   ```bash
   npx tsc --noEmit
   ```
   If this reports no errors, your edit is syntactically valid.
5. **Check the site builds:**
   ```bash
   npm run build
   ```
6. **Commit, push, and open a pull request** the same way as any other
   change:
   ```bash
   git add <the file you edited>
   git commit -m "content: update Oil & Gas industry summary"
   git push origin content/short-description-of-change
   gh pr create --reviewer Kiarash-Sanei
   ```
7. Wait for review and merge — content changes go live the same way code
   changes do, through the normal deploy process.

---

## What changes once Payload CMS is adopted

Once the site migrates to Payload (see `docs/CMS-PAYLOAD.md` for that plan),
most of the file-editing steps above go away: editors will use a web-based
admin panel (`/admin`) instead. The underlying content *shape* won't change —
the same fields (title, summary, translations, order, published) carry over
directly — so nothing you learn from this guide is wasted once that
migration happens.
