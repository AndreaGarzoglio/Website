import { esc, pad } from "./html.js";

/* A project's pieces as a stage and a strip: one piece large, at its own
   proportions, and every other one a thumbnail away. The markup is written
   by src/render.js (gallery()); this is the behaviour, and show() is the one
   place a piece is put on the stage. The stage opens the lightbox. */

// The stage is as wide as the page's column (1024px at most); a compact one
// shares it with another.
const sizesOf = (gallery) =>
  gallery.classList.contains("gallery--compact")
    ? "(min-width: 880px) 500px, 100vw"
    : "(min-width: 1120px) 1024px, 100vw";

const srcset = (d) => `${d.src} ${d.tw}w, ${d.full} ${d.w}w`;

export const wrap = (i, n) => (i + n) % n;
export const counter = (i, n) => `${pad(i + 1)} / ${pad(n)}`;

// Starts loading the pieces either side of i, the same file the stage would
// pick, so the arrows and a swipe land on an image that is already there.
function preloadAround(gallery, thumbs, i) {
  for (const j of [i + 1, i - 1]) {
    const d = thumbs[wrap(j, thumbs.length)].dataset;
    if (d.preloaded) continue;
    d.preloaded = "true";
    const img = new Image();
    img.sizes = sizesOf(gallery);
    img.srcset = srcset(d);
  }
}

export function show(gallery, i, { preload = true } = {}) {
  const thumbs = [...gallery.querySelectorAll(".gallery-thumb")];
  const thumb = thumbs[i];
  const d = thumb.dataset;
  const stage = gallery.querySelector(".gallery-open");

  stage.innerHTML = `<img src="${d.src}" srcset="${srcset(d)}" sizes="${sizesOf(gallery)}"
    alt="${esc(d.title)}" loading="lazy" decoding="async" />`;
  stage.setAttribute("aria-label", `Open ${d.title} full screen`);
  gallery.querySelector(".gallery-count").textContent = counter(i, thumbs.length);
  gallery.querySelector(".gallery-title").textContent = d.title;
  const text = gallery.querySelector(".gallery-text");
  text.textContent = d.caption;
  text.hidden = !d.caption;
  thumbs.forEach((t) => t.removeAttribute("aria-current"));
  thumb.setAttribute("aria-current", "true");
  gallery.dataset.index = i;
  if (!preload) return;

  preloadAround(gallery, thumbs, i);
  // Keep the chosen one in view without scrolling the page itself.
  const strip = thumb.closest(".gallery-strip");
  const li = thumb.parentElement;
  if (li.offsetLeft < strip.scrollLeft || li.offsetLeft + li.offsetWidth > strip.scrollLeft + strip.clientWidth) {
    strip.scrollTo({ left: li.offsetLeft - strip.clientWidth / 2 + li.offsetWidth / 2, behavior: "smooth" });
  }
}

const step = (gallery, by) =>
  show(gallery, wrap(Number(gallery.dataset.index) + by, gallery.querySelectorAll(".gallery-thumb").length));

/* Calls go(el, +1 | -1) for a sideways swipe that starts on `selector`
   inside root. Mostly vertical drags are scrolling and are left alone. */
export function onSwipe(root, selector, go) {
  let start = null;
  root.addEventListener(
    "touchstart",
    (e) => {
      const el = e.target.closest(selector);
      start = el && { el, x: e.touches[0].clientX, y: e.touches[0].clientY };
    },
    { passive: true },
  );
  root.addEventListener(
    "touchend",
    (e) => {
      if (!start) return;
      const { el, x, y } = start;
      start = null;
      const dx = e.changedTouches[0].clientX - x;
      const dy = e.changedTouches[0].clientY - y;
      if (Math.abs(dx) >= 40 && Math.abs(dx) >= Math.abs(dy) * 1.5) go(el, dx < 0 ? 1 : -1);
    },
    { passive: true },
  );
}

export function initGalleries() {
  document.querySelectorAll(".gallery").forEach((g) => show(g, 0, { preload: false }));

  document.addEventListener("click", (e) => {
    const thumb = e.target.closest(".gallery-thumb");
    if (thumb) {
      const gallery = thumb.closest(".gallery");
      show(gallery, [...gallery.querySelectorAll(".gallery-thumb")].indexOf(thumb));
    }
    const nav = e.target.closest(".gallery-nav");
    if (nav) step(nav.closest(".gallery"), Number(nav.dataset.step));
  });

  // A swipe across the stage walks the set. The click that may follow it is
  // swallowed so it does not open the lightbox; browsers rarely send one, so
  // the guard only lives a moment.
  onSwipe(document, ".gallery-open", (stage, dir) => {
    step(stage.closest(".gallery"), dir);
    const swallow = (c) => c.stopImmediatePropagation();
    stage.addEventListener("click", swallow, { capture: true, once: true });
    setTimeout(() => stage.removeEventListener("click", swallow, { capture: true }), 400);
  });

  if (matchMedia("(hover: hover)").matches) {
    const follow = (e) => {
      const stage = e.target.closest?.(".gallery-open");
      if (zoomed && zoomed !== stage) unzoom(zoomed);
      if (stage) zoom(stage, e.clientY);
    };
    document.addEventListener("mouseover", follow);
    document.addEventListener("mousemove", follow);
    document.addEventListener("mouseout", (e) => {
      if (zoomed && !e.relatedTarget) unzoom(zoomed);
    });
  }

  // Left and right walk a set: the one that has focus, or else the one most
  // in view. The lightbox and form fields keep the keys to themselves.
  document.addEventListener("keydown", (e) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
    if (e.target.closest?.("dialog, input, textarea, select, [contenteditable]")) return;
    const gallery = e.target.closest?.(".gallery") ?? galleryInView();
    if (!gallery) return;
    step(gallery, e.key === "ArrowRight" ? 1 : -1);
    e.preventDefault();
  });
}

// The gallery whose stage shows the most of itself in the window, if any.
function galleryInView() {
  let best = null;
  let most = 0;
  for (const g of document.querySelectorAll(".gallery")) {
    const r = g.querySelector(".gallery-open").getBoundingClientRect();
    const seen = Math.min(r.bottom, innerHeight) - Math.max(r.top, 0);
    if (seen > most) [best, most] = [g, seen];
  }
  return best;
}

/* Under the pointer, a piece narrower than the stage grows until it fills
   the 16:9 box, and the cursor's height picks which part of it shows: the
   top of the stage shows the top of the piece, the bottom its bottom. */
let zoomed = null;

function zoom(stage, y) {
  const img = stage.querySelector("img");
  const scale = img ? stage.clientWidth / img.offsetWidth : 1;
  if (scale < 1.05) return unzoom(stage);
  const r = stage.getBoundingClientRect();
  const at = Math.min(1, Math.max(0, (y - r.top) / r.height));
  img.style.transformOrigin = `50% ${(at * 100).toFixed(1)}%`;
  img.style.transform = `scale(${scale})`;
  stage.classList.add("is-zoomed");
  zoomed = stage;
}

function unzoom(stage) {
  const img = stage.querySelector("img");
  if (img) img.style.transform = "";
  stage.classList.remove("is-zoomed");
  if (zoomed === stage) zoomed = null;
}
