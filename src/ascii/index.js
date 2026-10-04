import { createAsciiField } from "./engine.js";
import home from "./themes/home.js";
import code from "./themes/code.js";
import art from "./themes/art.js";

const THEMES = { home, code, art };

const rgb = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
const scale = (c, k) => c.map((v) => Math.min(255, Math.round(v * k)));
const mix = (c, to, k) => c.map((v, i) => Math.round(v + (to[i] - v) * k));

/* The drawing a page gets is read off `data-page` on <body>; its colours
   come from the page's --hue, the same one the stylesheet mixes its accents
   from, so the canvas and the interface can never drift apart. Bright hues
   (yellow, near white) are dimmed to sit as quietly as the darker ones. */
function colorsOf(hex) {
  const hue = rgb(hex);
  const lum = 0.2126 * hue[0] + 0.7152 * hue[1] + 0.0722 * hue[2];
  const k = Math.min(1, 130 / lum);
  return {
    ambient: [scale(hue, 0.62 * k), scale(hue, 0.9 * k)],
    heat: hue,
    ink: [scale(hue, Math.sqrt(k)), mix(scale(hue, Math.sqrt(k)), [255, 255, 255], 0.3)],
  };
}

export function initAsciiField(canvas) {
  const hue = getComputedStyle(document.body).getPropertyValue("--hue").trim();
  const theme = THEMES[document.body.dataset.page] ?? THEMES.home;
  createAsciiField(canvas, { ...theme, colors: colorsOf(hue) });
}
