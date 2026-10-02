/* A .glitch name never holds still: most of its letters keep turning into
   noise, a different handful each time, so it can be glimpsed but never read.
   It belongs to WhiteHat, who makes people forget what he looks like. The
   markup already carries a scrambled version, for when this never runs. */
const NOISE = "▓▒░█#%&@$?!/<>";

const scramble = (name) =>
  [...name]
    .map((c) => (c === " " || Math.random() > 0.7 ? c : NOISE[(Math.random() * NOISE.length) | 0]))
    .join("");

export function initGlitch() {
  const names = document.querySelectorAll(".glitch[data-glitch]");
  if (!names.length) return;
  const tick = () => names.forEach((el) => (el.textContent = scramble(el.dataset.glitch)));
  tick();
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  setInterval(tick, 160);
}
