/* A project's pieces as a stage and a strip: one piece large, at its own
   proportions, and every other one a thumbnail away. Choosing a thumbnail
   swaps the stage; the stage opens the lightbox on the whole set. The markup
   is written by src/render.js (gallery()); this is the behaviour. */

const RATIO = { wide: 16 / 9, tall: 3 / 4, square: 1, banner: 16 / 7 };

export const ratioOf = (img) => img.ar ?? RATIO[img.ratio] ?? RATIO.wide;

const pad = (n) => String(n).padStart(2, "0");

// Real pieces get a srcset, so a wide stage on a sharp screen pulls the full
// file and a phone makes do with the thumbnail.
export const stageImg = ({ src, full, w, alt = "" }) =>
  `<img src="${src}" ${
    full && w ? `srcset="${src} ${Math.min(720, w)}w, ${full} ${w}w" sizes="(min-width: 960px) 62vw, 100vw"` : ""
  } alt="${alt}" decoding="async" />`;

export function selectThumb(thumb) {
  const gallery = thumb.closest(".gallery");
  const thumbs = [...gallery.querySelectorAll(".gallery-thumb")];
  const i = thumbs.indexOf(thumb);
  const stage = gallery.querySelector(".gallery-open");
  const d = thumb.dataset;

  stage.innerHTML = d.src
    ? stageImg({ src: d.src, full: d.full, w: Number(d.w), alt: d.title })
    : thumb.firstElementChild.outerHTML;
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

export function initGalleries() {
  document.addEventListener("click", (e) => {
    const thumb = e.target.closest(".gallery-thumb");
    if (thumb) selectThumb(thumb);
  });

  // Left and right walk the set while the stage has focus.
  document.addEventListener("keydown", (e) => {
    const stage = e.target.closest?.(".gallery-open");
    if (!stage || (e.key !== "ArrowLeft" && e.key !== "ArrowRight")) return;
    const gallery = stage.closest(".gallery");
    const thumbs = gallery.querySelectorAll(".gallery-thumb");
    const step = e.key === "ArrowRight" ? 1 : -1;
    const next = (Number(gallery.dataset.index ?? 0) + step + thumbs.length) % thumbs.length;
    selectThumb(thumbs[next]);
    e.preventDefault();
  });
}
