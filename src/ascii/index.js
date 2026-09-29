import { createAsciiField } from "./engine.js";
import home from "./themes/home.js";
import code from "./themes/code.js";
import art from "./themes/art.js";

const THEMES = { home, code, art };

/* Which background a page gets is read off `data-page` on <body>, the same
   attribute the stylesheet uses to swap the accent colours, so the canvas and
   the interface can never drift apart. */
export function initAsciiField(canvas) {
  createAsciiField(canvas, THEMES[document.body.dataset.page] ?? THEMES.home);
}
