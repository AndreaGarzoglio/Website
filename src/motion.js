import { RAMP } from "./ascii/engine.js";

/* Titles are not faded in, they are inked in: each letter arrives through the
   same glyph ramp the background is drawn with (. : - = + * # % @), so the
   type reads as something the ascii field is printing. Scrolling only ever
   reveals things once, and in the direction the text is read. */

const LOAD_TITLES = ".hero-name, .zone-title, .project-title";
const LOAD_LEADS = ".hero-lead, .zone-lead, .project-lead";
const SCROLL_TITLES = ".cv-title, .side-title, .contact-email";
const REVEALS =
  ".entry, .card, .offer-card, .skill-group, .stat, .tile, .fact, .hero-portrait, .contact-photo, .gallery, .pair-side, .work-tile, .piece-text";

// How long one letter spends cycling through the ramp before it settles.
const DECODE_MS = 190;
const INK = RAMP.slice(1);

/* Swaps an element's text for one span per character. The real text stays in
   a visually hidden copy so screen readers never hear it spelled out. Only
   plain-text elements are split; anything with markup inside is left alone. */
function split(el) {
  if (el.children.length || !el.textContent.trim()) return null;
  const text = el.textContent.replace(/\s+/g, " ").trim();

  const readable = document.createElement("span");
  readable.className = "visually-hidden";
  readable.textContent = text;

  const shown = document.createElement("span");
  shown.setAttribute("aria-hidden", "true");
  const chars = [];
  for (const c of text) {
    if (c === " ") {
      shown.append(" ");
      continue;
    }
    const ch = document.createElement("span");
    ch.className = "ch is-pending";
    ch.textContent = c;
    shown.append(ch);
    chars.push(ch);
  }

  el.replaceChildren(readable, shown);
  return chars;
}

/* Every title that is typing shares one throttled ticker. The background
   already redraws at 20fps, so the type only needs to keep pace with it, and
   the DOM is touched only when a letter actually changes. */
const TICK_MS = 33;
const runs = new Set();
let ticking = false;
let lastTick = 0;

function tick(now) {
  if (now - lastTick >= TICK_MS) {
    lastTick = now;
    for (const run of runs) if (run(now)) runs.delete(run);
  }
  if (runs.size) requestAnimationFrame(tick);
  else ticking = false;
}

function typeOut(chars, { step, delay = 0 }) {
  return new Promise((resolve) => {
    if (!chars?.length) return resolve();
    const glyphs = new Array(chars.length).fill(null);
    let settled = 0;
    let front = null;
    const t0 = performance.now() + delay;

    runs.add((now) => {
      let nextFront = null;
      for (let i = settled; i < chars.length; i++) {
        const local = now - t0 - i * step;
        const ch = chars[i];
        if (local < 0) {
          nextFront = ch;
          break;
        }
        if (local >= DECODE_MS) {
          ch.className = "ch";
          settled = i + 1;
          continue;
        }
        const glyph = INK[Math.floor((local / DECODE_MS) * INK.length)];
        if (glyph !== glyphs[i]) {
          if (glyphs[i] === null) ch.className = "ch is-decoding";
          glyphs[i] = glyph;
          ch.dataset.g = glyph;
        }
      }

      // The caret sits on the next letter to arrive.
      if (nextFront !== front) {
        front?.classList.remove("is-front");
        nextFront?.classList.add("is-front");
        front = nextFront;
      }

      if (settled < chars.length) return false;
      const last = chars[chars.length - 1];
      last.classList.add("is-caret");
      setTimeout(() => last.classList.remove("is-caret"), 1600);
      resolve();
      return true;
    });

    if (!ticking) {
      ticking = true;
      requestAnimationFrame(tick);
    }
  });
}

// Fast enough that a long heading never keeps anyone waiting.
const stepFor = (chars, total) =>
  Math.max(14, Math.min(55, total / (chars?.length || 1)));

function onceInView(targets, run, margin = "0px 0px -12% 0px") {
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        io.unobserve(e.target);
        run(e.target);
      }
    },
    { rootMargin: margin },
  );
  targets.forEach((t) => io.observe(t));
}

// Staggers siblings that reveal together, capped so the last one isn't late.
function indexSiblings(els) {
  const seen = new Map();
  for (const el of els) {
    const n = seen.get(el.parentElement) ?? 0;
    el.style.setProperty("--i", Math.min(n, 5));
    seen.set(el.parentElement, n + 1);
  }
}

export function initMotion() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (!("IntersectionObserver" in window)) return;
  document.documentElement.classList.add("motion");

  // Page title first, then the line under it.
  const title = document.querySelector(LOAD_TITLES);
  const titleChars = title && split(title);
  const lead = document.querySelector(LOAD_LEADS);
  lead?.classList.add("is-waiting");
  typeOut(titleChars, { step: stepFor(titleChars, 900), delay: 250 }).then(
    () => lead?.classList.remove("is-waiting"),
  );

  // Section heads: the rule draws itself while the heading types over it.
  const heads = [...document.querySelectorAll(".block-head")];
  const headParts = new Map(
    heads.map((head) => {
      const h = head.querySelector("h2");
      const meta = head.querySelector(".block-meta");
      return [head, { h: h && split(h), meta: meta && split(meta) }];
    }),
  );
  onceInView(heads, async (head) => {
    head.classList.add("is-in");
    const { h, meta } = headParts.get(head);
    await typeOut(h, { step: stepFor(h, 600) });
    typeOut(meta, { step: 18 });
  });

  const lone = [...document.querySelectorAll(SCROLL_TITLES)];
  const loneChars = new Map(lone.map((el) => [el, split(el)]));
  onceInView(lone, (el) => {
    const chars = loneChars.get(el);
    typeOut(chars, { step: stepFor(chars, 700) });
  });

  // Timeline bars grow across the years they cover, lane by lane.
  const lanes = [...document.querySelectorAll(".tl-lane")];
  indexSiblings(document.querySelectorAll(".tl-item"));
  onceInView(lanes, (lane) => lane.classList.add("is-in"));

  const reveals = [...document.querySelectorAll(REVEALS)];
  indexSiblings(reveals);
  reveals.forEach((el) => el.classList.add("reveal"));
  onceInView(reveals, (el) => el.classList.add("is-in"), "0px 0px -8% 0px");

  // Inside a skill group the chips follow on one after another.
  document.querySelectorAll(".chips").forEach((list) => indexSiblings(list.children));
}
