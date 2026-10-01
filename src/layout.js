/* The chrome every section page shares (head, nav, subnav, footer), written
   once. webpack.config.js calls pages() at build time and turns each entry
   into an HTML file; the page body is then filled in the browser by
   src/render.js from the same content files. Plain Node on purpose: nothing
   here may import an image. The home page (src/index.html) is still written
   by hand and carries its own copy of the nav and footer. */

import { projects, GH } from "./content/code.js";
import { series, order } from "./content/art.js";
import { esc, ext } from "./html.js";

const FONTS =
  "https://fonts.googleapis.com/css2?family=Doto:wght@400..900&family=JetBrains+Mono:wght@300;400;500&family=Outfit:wght@400;500;600&display=swap";

const EMAIL = "andrea.garzoglio@gmail.com";

// Top-level destinations, in reading order.
const SECTIONS = [
  ["art", "art.html"],
  ["code", "code.html"],
  ["résumé", "index.html#resume"],
  ["contact", "index.html#contact"],
];

const nav = (root, current) => `
  <nav class="nav">
    <div class="shell nav-inner">
      <a class="nav-mark" href="${root}index.html">Andrea Garzoglio</a>
      <ul class="nav-links">
        ${SECTIONS.map(
          ([name, href]) =>
            `<li><a href="${root}${href}"${name === current ? ' aria-current="page"' : ""}>${name}</a></li>`,
        ).join("\n        ")}
      </ul>
    </div>
  </nav>`;

const subnav = (label, links) => `
  <div class="subnav">
    <div class="shell subnav-inner">
      <span class="subnav-label">${label}</span>
      <ul class="subnav-links">
        ${links
          .map(
            ([name, href, current]) =>
              `<li><a href="${href}"${current ? ' aria-current="page"' : ""}>${name}</a></li>`,
          )
          .join("\n        ")}
      </ul>
    </div>
  </div>`;

const footer = (root) => `
  <footer class="footer">
    <div class="shell footer-inner">
      <div class="footer-id">
        <span class="footer-name">Andrea Garzoglio</span>
        <span>Programmer · illustrator · media designer</span>
      </div>
      <a class="footer-mail" href="mailto:${EMAIL}">${EMAIL}</a>
      <nav class="footer-nav" aria-label="Footer">
        <a href="${root}art.html">Art</a>
        <a href="${root}code.html">Code</a>
        <a href="${root}index.html#resume">Résumé</a>
        ${ext(GH, "GitHub ↗", "")}
      </nav>
      <span class="footer-year">Genoa, 2026</span>
    </div>
  </footer>`;

const page = ({ root, title, description, theme, current, sub, main }) => `<!doctype html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="${esc(description)}" />
  <title>${title}</title>
  <meta property="og:type" content="website" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${esc(description)}" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="${FONTS}" rel="stylesheet" />
  <!-- The crossfade between pages (styles.css) is skipped when there is
       nothing to show, in a hidden tab or on a slow load. That is fine, so
       it is caught here, before the page first paints, rather than reported. -->
  <script>
    for (const type of ["pageswap", "pagereveal"]) {
      addEventListener(type, (e) => {
        e.viewTransition?.ready.catch(() => {});
        e.viewTransition?.updateCallbackDone.catch(() => {});
      });
    }
  </script>
</head>

<body id="top" data-page="${theme}">
  <a class="skip-link" href="#main">Skip to content</a>
  <canvas class="ascii-field" aria-hidden="true"></canvas>
${nav(root, current)}
${sub}

  <!-- Filled from src/content/ by src/render.js -->
  ${main.replace("<main ", '<main id="main" ')}
${footer(root)}
</body>

</html>
`;

// Each section's pages, in the order its subnav lists them: [id, title].
const SECTION_PAGES = {
  art: ["Art", order.map((id) => [id, series[id].title])],
  code: ["Code", projects.map((p) => [p.id, p.title])],
};

const sectionSub = (section, root, currentId) => {
  const [label, items] = SECTION_PAGES[section];
  return subnav(label, [
    ["Overview", `${root}${section}.html`, !currentId],
    ...items.map(([id, title]) => [title, `${root}${section}/${id}.html`, id === currentId]),
  ]);
};

/* Every generated page: { filename, html }. A page one folder down (art/…,
   code/…) reaches the rest of the site through "../". */
export function pages() {
  const out = [];
  const add = (filename, section, id, title, description, view) => {
    const root = filename.includes("/") ? "../" : "";
    out.push({
      filename,
      html: page({
        root,
        title: `${title} · Andrea Garzoglio`,
        description,
        theme: section,
        current: section,
        sub: sectionSub(section, root, id),
        main: `<main data-view="${view}"${id ? ` data-id="${id}"` : ""}></main>`,
      }),
    });
  };

  add(
    "art.html",
    "art",
    null,
    "Art",
    "Ten years of illustration and concept art: MSR, the Nemixar campaigns for Undo Studios, personal drawings, and the indie game YMDIR.",
    "art",
  );
  for (const id of order) {
    const s = series[id];
    add(`art/${id}.html`, "art", id, s.title, `${s.title}: ${s.tagline}`, "series");
  }

  add(
    "code.html",
    "code",
    null,
    "Code",
    "Projects built from scratch while working through The Odin Project: games, algorithms and interfaces.",
    "code",
  );
  for (const p of projects) add(`code/${p.id}.html`, "code", p.id, p.title, p.tagline, "code-project");

  return out;
}
