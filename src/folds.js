/* The résumé sections fold away, but every link into them (the timeline bars,
   the jump links under the title) should land on something visible. So before
   the browser follows an in-page link, any closed <details> around the target
   is opened. */

const idOf = (hash) => decodeURIComponent(hash.slice(1));

function reveal(id) {
  let el = id && document.getElementById(id);
  while (el) {
    if (el.tagName === "DETAILS") el.open = true;
    el = el.parentElement?.closest("details");
  }
}

/* Printing, or saving as PDF, should give the whole résumé rather than four
   closed headings, so every fold opens for the print and closes again after. */
function initPrint() {
  let closed = [];
  window.addEventListener("beforeprint", () => {
    closed = [...document.querySelectorAll("details:not([open])")];
    closed.forEach((d) => (d.open = true));
  });
  window.addEventListener("afterprint", () => {
    closed.forEach((d) => (d.open = false));
  });
  document.addEventListener("click", (e) => {
    if (e.target.closest("[data-print]")) window.print();
  });
}

export function initFolds() {
  initPrint();
  document.addEventListener("click", (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (link) reveal(idOf(link.hash));
  });
  window.addEventListener("hashchange", () => reveal(idOf(location.hash)));

  if (!location.hash) return;
  const id = idOf(location.hash);
  const target = document.getElementById(id);
  if (!target?.closest("details:not([open])")) return;
  reveal(id);
  target.scrollIntoView();
}
