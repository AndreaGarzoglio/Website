import { series, order, artTimeline } from "./content/art.js";
import { codeTimeline } from "./content/code.js";
import { pics } from "./content/pics.js";

/* Fills the pages that are built from src/content/. The HTML files only carry
   the chrome (nav, subnav, footer) and a hook:
     <main data-series="msr">      a series page (art/msr.html …)
     <main data-project>           art/project.html?s=<series>&p=<project>
     <div data-timeline="art">     a timeline, on art.html / code.html
     <div data-shots="code/…">     a collage of one Drive folder (code pages)
   Everything here runs before motion.js, so reveals see the finished DOM. */

const RATIO = { wide: 16 / 9, tall: 3 / 4, square: 1, banner: 16 / 7 };
// How many pieces a gallery shows before "show all".
const PREVIEW = 8;

const paras = (list = []) => list.map((p) => `<p>${p}</p>`).join("");

const media = (img, alt = img.alt ?? img.label) =>
  img.src
    ? `<img src="${img.src}" alt="${alt}" loading="lazy" decoding="async" />`
    : `<div class="ph ph--${img.ratio}"><span>${img.label}</span></div>`;

const crumbs = (trail) => `
  <nav class="crumbs" aria-label="Breadcrumb">
    ${trail
      .map(([name, href]) =>
        href ? `<a href="${href}">${name}</a>` : `<span aria-current="page">${name}</span>`,
      )
      .join('<span class="crumb-sep" aria-hidden="true">/</span>')}
  </nav>`;

const pager = (prev, next) => `
  <nav class="pager" aria-label="Pagination">
    ${
      prev
        ? `<a class="pager-link pager-prev" href="${prev.href}">
             <span class="pager-dir">← Previous</span>
             <span class="pager-name">${prev.name}</span></a>`
        : "<span></span>"
    }
    ${
      next
        ? `<a class="pager-link pager-next" href="${next.href}">
             <span class="pager-dir">Next →</span>
             <span class="pager-name">${next.name}</span></a>`
        : ""
    }
  </nav>`;

const brief = (rows = []) =>
  rows.length
    ? `<dl class="brief">${rows
        .map(([k, v]) => `<div class="brief-row"><dt>${k}</dt><dd>${v}</dd></div>`)
        .join("")}</dl>`
    : "";

const head = (title, meta = "") => `
  <div class="block-head"><h2>${title}</h2><span class="block-meta">${meta}</span></div>`;

const count = (n, word) => `${String(n).padStart(2, "0")} ${word}`;

/* A collage of pieces. Every piece is a button that opens the lightbox on the
   whole group; its caption only exists there, so the grid stays quiet. */
function shots(images, { label, limit = PREVIEW } = {}) {
  // Folding away just one or two pieces costs a click for nothing.
  if (images.length <= limit + 2) limit = images.length;
  const items = images
    .map(
      (img, i) => `
      <li class="shot${img.size ? ` shot--${img.size}` : ""}${img.fit ? " shot--fit" : ""}"${i >= limit ? " hidden" : ""}>
        <button type="button" class="shot-open" data-caption="${img.caption ?? ""}"
          data-title="${img.label}" data-ratio="${img.ar ?? RATIO[img.ratio] ?? RATIO.wide}"
          ${img.full ? `data-full="${img.full}"` : ""}
          aria-label="Open ${img.label} full screen">${media(img, "")}</button>
      </li>`,
    )
    .join("");
  const more =
    images.length > limit
      ? `<button type="button" class="button button--ghost shots-more">Show all ${images.length}</button>`
      : "";
  return `<ul class="shots" data-lightbox="${label ?? ""}">${items}</ul>${more}`;
}

const projectHref = (sid, pid) => `project.html?s=${sid}&p=${pid}`;

function projectCards(sid, projects) {
  return `<div class="series-grid">${projects
    .map(
      (p) => `
      <article class="card frame">
        <div class="card-media">${media({ ...p.images[0], label: p.title })}</div>
        <div class="card-body">
          <div class="card-head"><h3><a class="card-link" href="${projectHref(sid, p.id)}">${p.title}</a></h3></div>
          <p>${p.note}</p>
          <div class="card-links"><span>${count(p.images.length, "pieces")}</span></div>
        </div>
      </article>`,
    )
    .join("")}</div>`;
}

function seriesHead(s) {
  return `
    <div class="zone-head">
      ${s.status ? `<span class="case-status">${s.status}</span>` : ""}
      <span class="zone-index" aria-hidden="true">${s.index}</span>
      <h1 class="zone-title">${s.title}</h1>
      <p class="zone-lead">${s.lead}</p>
    </div>
    <div class="intro-grid">
      <div class="intro-body">${paras(s.body)}</div>
      ${s.brief ? `<aside class="intro-side frame">${brief(s.brief)}</aside>` : ""}
    </div>`;
}

function seriesSections(sid, s) {
  const out = [];

  if (s.projects) {
    out.push(`
      <section class="series-block">
        ${head(s.projectsTitle, count(s.projects.length, "projects"))}
        ${projectCards(sid, s.projects)}
      </section>`);
  }

  if (s.studies) {
    out.push(`
      <section class="series-block" id="studies">
        ${head(s.studiesTitle, count(s.studies.length, "studies"))}
        ${s.studies
          .map(
            (st) => `
            <div class="study">
              <div class="study-head"><h3>${st.title}</h3><p>${st.note}</p></div>
              ${shots(st.images, { label: st.title })}
            </div>`,
          )
          .join("")}
      </section>`);
  }

  if (s.pairs) {
    out.push(`
      <section class="series-block">
        ${head(s.pairsTitle, "before → after")}
        ${s.pairs
          .map(
            (pair) => `
            <div class="pair">
              <div class="study-head"><h3>${pair.title}</h3><p>${pair.note}</p></div>
              <div class="pair-grid">
                <div class="pair-side">
                  <span class="pair-tag">Before</span>
                  ${shots(pair.before, { label: `${pair.title} · before`, limit: 4 })}
                </div>
                <div class="pair-arrow" aria-hidden="true">→</div>
                <div class="pair-side">
                  <span class="pair-tag pair-tag--now">Now</span>
                  ${shots(pair.after, { label: `${pair.title} · now`, limit: 4 })}
                </div>
              </div>
            </div>`,
          )
          .join("")}
      </section>`);
  }

  if (s.extra) {
    out.push(`
      <section class="series-block">
        ${head(s.extraTitle, count(s.extra.images.length, "pieces"))}
        <p class="section-intro">${s.extra.note}</p>
        ${shots(s.extra.images, { label: s.extraTitle })}
      </section>`);
  }

  return out.join("");
}

function renderSeries(main, sid) {
  const s = series[sid];
  if (!s) return;
  const i = order.indexOf(sid);
  const prevId = order[i - 1];
  const nextId = order[i + 1];

  main.innerHTML = `
    <section class="zone zone--page" data-zone="art">
      <div class="shell">
        ${crumbs([["Résumé", "../index.html"], ["Art", "../art.html"], [s.title]])}
        ${seriesHead(s)}
        ${seriesSections(sid, s)}
        ${pager(
          prevId
            ? { href: `${prevId}.html`, name: series[prevId].title }
            : { href: "../art.html", name: "Art overview" },
          nextId ? { href: `${nextId}.html`, name: series[nextId].title } : null,
        )}
      </div>
    </section>`;
}

function renderProject(main) {
  const params = new URLSearchParams(location.search);
  const sid = params.get("s");
  const s = series[sid];
  const list = s?.projects ?? [];
  const i = list.findIndex((p) => p.id === params.get("p"));
  const p = list[i];

  if (!p) {
    main.innerHTML = `
      <section class="zone zone--page"><div class="shell">
        <div class="zone-head"><h1 class="zone-title">Not found</h1>
        <p class="zone-lead"><a class="text-link" href="../art.html">Back to Art</a></p></div>
      </div></section>`;
    return;
  }

  document.title = `${p.title} · ${s.title} — Andrea Garzoglio`;
  document
    .querySelector(`.subnav-links a[href="${sid}.html"]`)
    ?.setAttribute("aria-current", "page");

  const prev = list[i - 1];
  const next = list[i + 1];

  main.innerHTML = `
    <section class="zone zone--page" data-zone="art">
      <div class="shell">
        ${crumbs([["Art", "../art.html"], [s.title, `${sid}.html`], [p.title]])}
        <div class="zone-head">
          <span class="zone-index" aria-hidden="true">${s.index}.${i + 1}</span>
          <h1 class="zone-title">${p.title}</h1>
          <p class="zone-lead">${p.note}</p>
        </div>

        <section class="series-block">
          ${head("Concept")}
          <div class="intro-grid">
            <div class="intro-body">${paras(p.concept)}</div>
            <aside class="intro-side frame">${brief(p.brief)}</aside>
          </div>
        </section>

        <section class="series-block">
          ${head("The pieces", `${count(p.images.length, "pieces")} · click to enlarge`)}
          ${shots(p.images, { label: p.title })}
        </section>

        ${pager(
          prev
            ? { href: projectHref(sid, prev.id), name: prev.title }
            : { href: `${sid}.html`, name: s.title },
          next ? { href: projectHref(sid, next.id), name: next.title } : { href: `${sid}.html`, name: `Back to ${s.title}` },
        )}
      </div>
    </section>`;
}

const TIMELINES = { art: artTimeline, code: codeTimeline };

function renderTimeline(el) {
  const t = TIMELINES[el.dataset.timeline];
  if (!t) return;
  el.style.setProperty("--cols", t.years.length);
  // The whole box is the link when there is somewhere to go.
  const item = (it) => `
      <li class="tl-item${it.live ? " tl-item--live" : ""}${it.href ? " tl-item--link" : ""}"
          style="--from: ${it.from}; --to: ${it.to}">
        <span class="tl-when">${it.when}</span>
        ${it.href ? `<a class="tl-what" href="${it.href}">${it.what}</a>` : `<span class="tl-what">${it.what}</span>`}
        <span class="tl-where">${it.where}</span>
      </li>`;
  el.innerHTML = `
    <div class="tl-years" aria-hidden="true">${t.years.map((y) => `<span>${y}</span>`).join("")}</div>
    ${t.lanes
      .map(
        (lane) => `
        <div class="tl-lane">
          <h3 class="tl-lane-name">${lane.name}</h3>
          <ul class="tl-track">${lane.items.map(item).join("")}</ul>
        </div>`,
      )
      .join("")}`;
}

export function renderPage() {
  const main = document.querySelector("main");
  if (main?.dataset.series) renderSeries(main, main.dataset.series);
  else if (main?.hasAttribute("data-project")) renderProject(main);
  document.querySelectorAll("[data-timeline]").forEach(renderTimeline);
  document.querySelectorAll("[data-shots]").forEach((el) => {
    el.innerHTML = shots(pics(el.dataset.shots), { label: el.dataset.label });
  });

  // "Show all" just unhides the rest of its own collage.
  document.addEventListener("click", (e) => {
    const more = e.target.closest(".shots-more");
    if (!more) return;
    more.previousElementSibling
      .querySelectorAll(".shot[hidden]")
      .forEach((li) => li.removeAttribute("hidden"));
    more.remove();
  });
}
