/* One <dialog> for the whole site. Any .shot-open inside a [data-lightbox]
   list opens it on that list, so arrows walk the collage the piece came from.
   The description is folded away by default — the piece gets the full screen,
   and "info" (or the i key) slides the text in; that choice sticks while
   browsing. */

let dialog;
let group = [];
let index = 0;

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
          <button type="button" class="lb-btn lb-info" aria-expanded="false">info +</button>
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

  dialog.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") show(index - 1);
    else if (e.key === "ArrowRight") show(index + 1);
    else if (e.key === "i") toggleInfo();
  });

  dialog.addEventListener("close", () => group[index]?.focus());
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
  media.replaceChildren(btn.firstElementChild.cloneNode(true));
  media.style.setProperty("--ar", btn.dataset.ratio);
  media.querySelector("img")?.removeAttribute("loading");

  dialog.querySelector(".lb-title").textContent = btn.dataset.title;
  dialog.querySelector(".lb-text").textContent = btn.dataset.caption;
  dialog.querySelector(".lb-count").textContent =
    `${String(index + 1).padStart(2, "0")} / ${String(group.length).padStart(2, "0")}`;
  const single = group.length < 2;
  dialog.querySelectorAll(".lb-nav").forEach((b) => (b.hidden = single));
}

export function initLightbox() {
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".shot-open");
    if (!btn) return;
    const list = btn.closest("[data-lightbox]");
    if (!dialog) build();
    group = [...list.querySelectorAll(".shot-open")];
    dialog.querySelector(".lb-group").textContent = list.dataset.lightbox;
    show(group.indexOf(btn));
    dialog.showModal();
  });
}
