/* A project's pieces as a stage and a strip: one piece large, at its own
   proportions, and every other one a thumbnail away. Choosing a thumbnail
   swaps the stage; the stage opens the lightbox on the whole set. The markup
   is written by src/render.js (gallery()); this is the behaviour. */

const RATIO = { wide: 16 / 9, tall: 3 / 4, square: 1, banner: 16 / 7 };

export const ratioOf = (img) => img.ar ?? RATIO[img.ratio] ?? RATIO.wide;

const pad = (n) => String(n).padStart(2, "0");

// Real pieces get a srcset, so a wide stage on a sharp screen pulls the full
// file and a phone makes do with the thumbnail. A stage is as wide as the
// page's column (1024px at most); a compact one shares it with another.
const SIZES = "(min-width: 1120px) 1024px, 100vw";
const SIZES_COMPACT = "(min-width: 880px) 500px, 100vw";

const srcsetOf = ({ src, full, w }) => `${src} ${Math.min(720, w)}w, ${full} ${w}w`;

export const stageImg = ({ src, full, w, alt = "", compact = false }) =>
  `<img src="${src}" ${
    full && w ? `srcset="${srcsetOf({ src, full, w })}" sizes="${compact ? SIZES_COMPACT : SIZES}"` : ""
  } alt="${alt}" decoding="async" />`;

/* Fetches the pieces either side of the stage, the same file the stage would
   pick, so the arrows and a swipe land on an image that is already there. */
function preloadAround(gallery, thumbs, i) {
  const compact = gallery.classList.contains("gallery--compact");
  for (const j of [i + 1, i - 1]) {
    const d = thumbs[(j + thumbs.length) % thumbs.length]?.dataset;
    if (!d?.src || d.preloaded) continue;
    d.preloaded = "true";
    const img = new Image();
    if (d.full && d.w) {
      img.sizes = compact ? SIZES_COMPACT : SIZES;
      img.srcset = srcsetOf({ src: d.src, full: d.full, w: Number(d.w) });
    }
    img.src = d.src;
  }
}

export function selectThumb(thumb) {
  const gallery = thumb.closest(".gallery");
  const thumbs = [...gallery.querySelectorAll(".gallery-thumb")];
  const i = thumbs.indexOf(thumb);
  const stage = gallery.querySelector(".gallery-open");
  const d = thumb.dataset;

  const compact = gallery.classList.contains("gallery--compact");
  stage.innerHTML = d.src
    ? stageImg({ src: d.src, full: d.full, w: Number(d.w), alt: d.title, compact })
    : thumb.firstElementChild.outerHTML;
  preloadAround(gallery, thumbs, i);
  stage.setAttribute("aria-label", `Open ${d.title} full screen`);
  gallery.querySelector(".gallery-count").textContent = `${pad(i + 1)} / ${pad(thumbs.length)}`;
  gallery.querySelector(".gallery-title").textContent = d.title;
  const text = gallery.querySelector(".gallery-text");
  text.textContent = d.caption;
  text.hidden = !d.caption;
  thumbs.forEach((t) => t.removeAttribute("aria-current"));
  thumb.setAttribute("aria-current", "true");
  gallery.dataset.index = i;
  // Keep the chosen one in view without scrolling the page itself.
  const strip = thumb.closest(".gallery-strip");
  const li = thumb.parentElement;
  if (li.offsetLeft < strip.scrollLeft || li.offsetLeft + li.offsetWidth > strip.scrollLeft + strip.clientWidth) {
    strip.scrollTo({ left: li.offsetLeft - strip.clientWidth / 2 + li.offsetWidth / 2, behavior: "smooth" });
  }
}

// Moves the stage one piece along the set, wrapping at either end.
function step(gallery, by) {
  const thumbs = gallery.querySelectorAll(".gallery-thumb");
  const next = (Number(gallery.dataset.index ?? 0) + by + thumbs.length) % thumbs.length;
  selectThumb(thumbs[next]);
}

export function initGalleries() {
  document.addEventListener("click", (e) => {
    const thumb = e.target.closest(".gallery-thumb");
    if (thumb) selectThumb(thumb);
    const nav = e.target.closest(".gallery-nav");
    if (nav) step(nav.closest(".gallery"), Number(nav.dataset.step));
  });

  // The first time a gallery is reached, its first neighbours start loading.
  const seen = new IntersectionObserver(
    (entries) =>
      entries.forEach(({ isIntersecting, target }) => {
        if (!isIntersecting) return;
        seen.unobserve(target);
        preloadAround(target, [...target.querySelectorAll(".gallery-thumb")], 0);
      }),
    { rootMargin: "200px" },
  );
  document.querySelectorAll(".gallery").forEach((g) => seen.observe(g));

  // On a touch screen a sideways swipe across the stage walks the set. The
  // click that follows the swipe is swallowed, so it does not open the lightbox.
  let touch = null;
  document.addEventListener(
    "touchstart",
    (e) => {
      const stage = e.target.closest(".gallery-open");
      touch = stage ? { stage, x: e.touches[0].clientX, y: e.touches[0].clientY } : null;
    },
    { passive: true },
  );
  document.addEventListener(
    "touchend",
    (e) => {
      if (!touch) return;
      const dx = e.changedTouches[0].clientX - touch.x;
      const dy = e.changedTouches[0].clientY - touch.y;
      const { stage } = touch;
      touch = null;
      if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
      step(stage.closest(".gallery"), dx < 0 ? 1 : -1);
      // Browsers rarely send that click, so the guard only lives a moment.
      const swallow = (c) => c.stopImmediatePropagation();
      stage.addEventListener("click", swallow, { capture: true, once: true });
      setTimeout(() => stage.removeEventListener("click", swallow, { capture: true }), 400);
    },
    { passive: true },
  );

  // Left and right walk the set while the stage, an arrow or a thumbnail has focus.
  document.addEventListener("keydown", (e) => {
    const stage = e.target.closest?.(".gallery-open, .gallery-nav, .gallery-thumb");
    if (!stage || (e.key !== "ArrowLeft" && e.key !== "ArrowRight")) return;
    step(stage.closest(".gallery"), e.key === "ArrowRight" ? 1 : -1);
    e.preventDefault();
  });
}
