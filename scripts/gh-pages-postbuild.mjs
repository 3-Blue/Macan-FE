// Runs after `next build` (see the "build" script in package.json).
// Static export doesn't emit a root "/" page (the app only has /[locale]),
// and there's no middleware on GitHub Pages to redirect. So we:
//   1. write out/index.html that redirects "/" -> "/<basePath>/<defaultLocale>/"
//   2. add .nojekyll so GitHub Pages doesn't strip the _next/ folder.
import { writeFile } from "node:fs/promises";
import { join } from "node:path";

// This shim only makes sense for the static-export build that targets GitHub
// Pages (which sets GITHUB_PAGES_BUILD=true and produces an ./out directory).
// A normal `next build` produces .next/ (no ./out), so running this
// unconditionally as an npm `postbuild` step crashes with ENOENT. Bail out
// early unless we're actually in the Pages build.
if (process.env.GITHUB_PAGES_BUILD !== "true") {
  console.log("postbuild: not a GitHub Pages build — skipping static shim.");
  process.exit(0);
}

const OUT_DIR = "out";
const DEFAULT_LOCALE = "en"; // keep in sync with i18n/routing.ts
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const target = `${basePath}/${DEFAULT_LOCALE}/`;

const redirectHtml = `<!doctype html>
<html lang="${DEFAULT_LOCALE}">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="refresh" content="0; url=${target}" />
    <link rel="canonical" href="${target}" />
    <script>location.replace(${JSON.stringify(target)} + location.search + location.hash);</script>
    <title>MACAN</title>
  </head>
  <body>
    Redirecting to <a href="${target}">${target}</a>…
  </body>
</html>
`;

await writeFile(join(OUT_DIR, "index.html"), redirectHtml, "utf8");
await writeFile(join(OUT_DIR, ".nojekyll"), "", "utf8");

console.log(`postbuild: wrote out/index.html -> ${target} and out/.nojekyll`);
