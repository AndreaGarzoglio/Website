/* Tiny markup helpers shared by the page generator (layout.js, plain Node)
   and the browser code, so nothing here may import anything. */

export const pad = (n) => String(n).padStart(2, "0");

export const esc = (t = "") => t.replace(/"/g, "&quot;");

// A link that leaves the site, in its own tab.
export const ext = (href, label, cls = "text-link") =>
  `<a ${cls ? `class="${cls}" ` : ""}href="${href}" target="_blank" rel="noopener">${label}</a>`;
