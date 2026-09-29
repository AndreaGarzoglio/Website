/* The chrome every section page shares (head, nav, subnav, footer), written
   once. webpack.config.js calls pages() at build time and turns each entry
   into an HTML file; the page body is then filled in the browser by
   src/render.js from the same content files. Plain Node on purpose: nothing
   here may import an image. The home page (src/index.html) is still written
   by hand and carries its own copy of the nav and footer. */

import { projects } from "./content/code.js";
import { series, order } from "./content/art.js";

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

export const footer = (root) => `
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
        <a href="https://github.com/AndreaGarzoglio" target="_blank" rel="noopener">GitHub ↗</a>
      </nav>
      <span class="footer-year">Genoa, 2026</span>
    </div>
  </footer>`;

const page = ({ root, title, description, theme, current, sub, main }) => `<!doctype html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="${description.replace(/"/g, "&quot;")}" />
  <title>${title}</title>
  <meta property="og:type" content="website" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${description.replace(/"/g, "&quot;")}" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="${FONTS}" rel="stylesheet" />
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

const artSub = (root, currentId) =>
  subnav("Art", [
    ["Overview", `${root}art.html`, !currentId],
    ...order.map((id) => [series[id].title, `${root}art/${id}.html`, id === currentId]),
  ]);

const codeSub = (root, currentId) =>
  subnav("Code", [
    ["Overview", `${root}code.html`, !currentId],
    ...projects.map((p) => [p.title, `${root}code/${p.id}.html`, p.id === currentId]),
  ]);

/* Every generated page: { filename, html }. */
export function pages() {
  const out = [];

  out.push({
    filename: "art.html",
    html: page({
      root: "",
      title: "Art · Andrea Garzoglio",
      description:
        "Ten years of illustration and concept art: MSR, the Nemixar campaigns for Undo Studios, personal drawings, and the indie game YMDIR.",
      theme: "art",
      current: "art",
      sub: artSub(""),
      main: '<main data-view="art"></main>',
    }),
  });

  for (const id of order) {
    const s = series[id];
    out.push({
      filename: `art/${id}.html`,
      html: page({
        root: "../",
        title: `${s.title} · Andrea Garzoglio`,
        description: `${s.title}: ${s.tagline}`,
        theme: "art",
        current: "art",
        sub: artSub("../", id),
        main: `<main data-view="series" data-id="${id}"></main>`,
      }),
    });
  }

  out.push({
    filename: "code.html",
    html: page({
      root: "",
      title: "Code · Andrea Garzoglio",
      description:
        "Projects built from scratch while working through The Odin Project: games, algorithms and interfaces.",
      theme: "code",
      current: "code",
      sub: codeSub(""),
      main: '<main data-view="code"></main>',
    }),
  });

  for (const p of projects) {
    out.push({
      filename: `code/${p.id}.html`,
      html: page({
        root: "../",
        title: `${p.title} · Andrea Garzoglio`,
        description: p.tagline,
        theme: "code",
        current: "code",
        sub: codeSub("../", p.id),
        main: `<main data-view="code-project" data-id="${p.id}"></main>`,
      }),
    });
  }

  return out;
}
