import { counter, onSwipe, show as showOnStage, wrap } from "./gallery.js";

/* One <dialog> for the whole site. The stage of any gallery opens it on that
   gallery's set, so arrows walk the pieces the stage came from, and closing it
   leaves the stage on the last piece seen.
   The description shows under the piece from the start; "info" (or the i
   key) folds it away for a clean view, and that choice sticks while
   browsing. */

let dialog;
let gallery;
let group = [];
let index = 0;

function setInfo(open) {
  dialog.classList.toggle("is-info", open);
  const btn = dialog.querySelector(".lb-info");
  btn.setAttribute("aria-expanded", open);
  btn.textContent = open ? "info −" : "info +";
}

function build() {
  dialog = document.createElement("dialog");
  dialog.className = "lightbox";
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
          <button type="button" class="lb-btn lb-info"></button>
        </div>
        <p class="lb-text"></p>
      </figcaption>
    </figure>
    <button type="button" class="lb-btn lb-nav lb-prev" aria-label="Previous">←</button>
    <button type="button" class="lb-btn lb-nav lb-next" aria-label="Next">→</button>`;
  document.body.append(dialog);
  setInfo(true);

  const toggleInfo = () => setInfo(!dialog.classList.contains("is-info"));
  dialog.querySelector(".lb-close").addEventListener("click", () => dialog.close());
  dialog.querySelector(".lb-prev").addEventListener("click", () => show(index - 1));
  dialog.querySelector(".lb-next").addEventListener("click", () => show(index + 1));
  dialog.querySelector(".lb-info").addEventListener("click", toggleInfo);

  // A click on the dimmed area around the piece closes it.
  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) dialog.close();
  });

  onSwipe(dialog, "dialog", (_, dir) => show(index + dir));

  dialog.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") show(index - 1);
    else if (e.key === "ArrowRight") show(index + 1);
    else if (e.key === "i") toggleInfo();
  });

  dialog.addEventListener("close", () => {
    if (index !== Number(gallery.dataset.index)) showOnStage(gallery, index);
    gallery.querySelector(".gallery-open").focus();
  });
}

function show(i) {
  index = wrap(i, group.length);
  const d = group[index].dataset;
  const img = new Image();
  img.src = d.full;
  img.alt = d.title;
  const media = dialog.querySelector(".lb-media");
  media.replaceChildren(img);
  media.style.setProperty("--ar", d.ratio);

  dialog.querySelector(".lb-title").textContent = d.title;
  dialog.querySelector(".lb-text").textContent = d.caption;
  // Nothing to unfold when a piece has no words yet.
  dialog.querySelector(".lb-info").hidden = !d.caption;
  dialog.querySelector(".lb-count").textContent = counter(index, group.length);
  dialog.querySelectorAll(".lb-nav").forEach((b) => (b.hidden = group.length < 2));

  // The full-size files either side start loading now, so the arrows are instant.
  for (const j of [index + 1, index - 1]) {
    const near = group[wrap(j, group.length)].dataset;
    if (!near.fullLoaded) new Image().src = near.full;
    near.fullLoaded = "true";
  }
}

export function initLightbox() {
  document.addEventListener("click", (e) => {
    const stage = e.target.closest(".gallery-open");
    if (!stage) return;
    gallery = stage.closest(".gallery");
    if (!dialog) build();
    group = [...gallery.querySelectorAll(".gallery-thumb")];
    dialog.querySelector(".lb-group").textContent = gallery.dataset.lightbox;
    show(Number(gallery.dataset.index));
    dialog.showModal();
  });
}
