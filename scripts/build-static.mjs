/**
 * Builds the standalone static version of the SHE site for GitHub Pages.
 *
 * Single source of truth:
 *   src/she/she.css          - all styles
 *   src/she/markup.html      - page markup
 *   src/she/loader-script.js - splash-screen script
 *   src/she/site-script.js   - site behaviour
 *   public/                  - images, PDF, 404.html, CNAME (optional)
 *
 * Output: dist-static/  (plain HTML+CSS+JS, no server required)
 */
import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = path.join(root, "dist-static");

const read = (p) => readFile(path.join(root, p), "utf8");

const [css, markup, loaderJs, siteJs] = await Promise.all([
  read("src/she/she.css"),
  read("src/she/markup.html"),
  read("src/she/loader-script.js"),
  read("src/she/site-script.js"),
]);

const TITLE = "SHE — Saudi House of Expertise | Supply &amp; Procurement Since 1971";
const DESC =
  "Saudi House of Expertise (SHE) — a Saudi-owned single-source supply &amp; procurement partner since 1971. Fourteen product lines, nationwide, from one point of contact.";

const html = `<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
<title>${TITLE}</title>
<meta name="description" content="${DESC}">
<meta name="theme-color" content="#0A4D28">
<link rel="icon" href="img/logo.png">
<meta property="og:type" content="website">
<meta property="og:title" content="${TITLE}">
<meta property="og:description" content="${DESC}">
<meta property="og:image" content="img/logo-og.png">
<meta property="og:site_name" content="Saudi House of Expertise">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="SHE — Saudi House of Expertise">
<meta name="twitter:description" content="Single-source supply &amp; procurement partner to the Kingdom since 1971.">
<meta name="twitter:image" content="img/logo-og.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&family=Newsreader:ital,opsz@1,7..72&display=swap" rel="stylesheet">
<style>
${css}
</style>
</head>
<body>
${markup}
<script>${loaderJs}</script>
<script>${siteJs}</script>
</body>
</html>
`;

await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });
await cp(path.join(root, "public"), out, { recursive: true });
await writeFile(path.join(out, "index.html"), html, "utf8");
// GitHub Pages must not run Jekyll on the output
await writeFile(path.join(out, ".nojekyll"), "", "utf8");

// Also keep a branch-deployment entry page at the repository root. Some
// GitHub Pages repositories are configured to publish the main branch rather
// than the Actions artifact. Assets stay in public/ in that deployment mode.
const branchHtml = html
  .replaceAll('"img/', '"public/img/')
  .replaceAll("'img/", "'public/img/")
  .replaceAll('href="she-profile.pdf"', 'href="public/she-profile.pdf"');
await writeFile(path.join(root, "index.html"), branchHtml, "utf8");
await writeFile(path.join(root, ".nojekyll"), "", "utf8");

if (!existsSync(path.join(out, "404.html"))) {
  await writeFile(path.join(out, "404.html"), html, "utf8");
}

console.log(`Static site written to ${out}`);
