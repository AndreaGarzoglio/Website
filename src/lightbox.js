import { selectThumb } from "./gallery.js";

/* One <dialog> for the whole site. The stage of any gallery opens it on that
   gallery's set, so arrows walk the pieces the stage came from, and closing it
   leaves the stage on the last piece seen.
   The description shows under the piece from the start; "info" (or the i
   key) folds it away for a clean view, and that choice sticks while
   browsing. */

let dialog;
let group = [];
let index = 0;

function build() {
  dialog = document.createElement("dialog");
  dialog.className = "lightbox is-info";
  dialog.setAttribute("aria-label", "Image viewer");
  dialog.innerHTML = `
    <div class="lb-bar">
      <span class="lb-count"></span>
      <span class="lb-group"></span>
      <button type="button" class="lb-btn lb-close" aria-label="Close">close ✕</button>
    </div>
    <figure class="lb-figure">
      <div class="lb-media"></div>
      <figcaption class="lb-caption">
        <div class="lb-caption-head">
          <strong class="lb-title"></strong>
          <button type="button" class="lb-btn lb-info" aria-expanded="true">info −</button>
        </div>
        <p class="lb-text"></p>
      </figcaption>
    </figure>
    <button type="button" class="lb-btn lb-nav lb-prev" aria-label="Previous">←</button>
    <button type="button" class="lb-btn lb-nav lb-next" aria-label="Next">→</button>`;
  document.body.append(dialog);

  dialog.querySelector(".lb-close").addEventListener("click", () => dialog.close());
  dialog.querySelector(".lb-prev").addEventListener("click", () => show(index - 1));
  dialog.querySelector(".lb-next").addEventListener("click", () => show(index + 1));
  dialog.querySelector(".lb-info").addEventListener("click", toggleInfo);

  // A click on the dimmed area around the piece closes it.
  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) dialog.close();
  });

  // On a phone a sideways swipe walks the set.
  let startX = null;
  dialog.addEventListener("touchstart", (e) => (startX = e.touches[0].clientX), { passive: true });
  dialog.addEventListener("touchend", (e) => {
    if (startX === null) return;
    const dx = e.changedTouches[0].clientX - startX;
    startX = null;
    if (Math.abs(dx) > 50 && group.length > 1) show(index + (dx < 0 ? 1 : -1));
  });

  dialog.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") show(index - 1);
    else if (e.key === "ArrowRight") show(index + 1);
    else if (e.key === "i") toggleInfo();
  });

  dialog.addEventListener("close", () => {
    const thumb = group[index];
    if (!thumb) return;
    selectThumb(thumb);
    thumb.closest(".gallery").querySelector(".gallery-open").focus();
  });
}

function toggleInfo() {
  const open = dialog.classList.toggle("is-info");
  const btn = dialog.querySelector(".lb-info");
  btn.setAttribute("aria-expanded", open);
  btn.textContent = open ? "info −" : "info +";
}

function show(i) {
  index = (i + group.length) % group.length;
  const btn = group[index];
  const media = dialog.querySelector(".lb-media");
  // Real pieces load their full-size file; placeholders are just copied over.
  if (btn.dataset.full) {
    const img = new Image();
    img.src = btn.dataset.full;
    img.alt = btn.dataset.title;
    media.replaceChildren(img);
  } else {
    media.replaceChildren(btn.firstElementChild.cloneNode(true));
  }
  media.style.setProperty("--ar", btn.dataset.ratio);

  dialog.querySelector(".lb-title").textContent = btn.dataset.title;
  dialog.querySelector(".lb-text").textContent = btn.dataset.caption;
  // Nothing to unfold when a piece has no words yet.
  dialog.querySelector(".lb-info").hidden = !btn.dataset.caption;
  dialog.querySelector(".lb-count").textContent =
    `${String(index + 1).padStart(2, "0")} / ${String(group.length).padStart(2, "0")}`;
  const single = group.length < 2;
  dialog.querySelectorAll(".lb-nav").forEach((b) => (b.hidden = single));
}

export function initLightbox() {
  document.addEventListener("click", (e) => {
    const stage = e.target.closest(".gallery-open");
    if (!stage) return;
    const gallery = stage.closest(".gallery");
    if (!dialog) build();
    group = [...gallery.querySelectorAll(".gallery-thumb")];
    dialog.querySelector(".lb-group").textContent = gallery.dataset.lightbox;
    show(Number(gallery.dataset.index ?? 0));
    dialog.showModal();
  });
}
