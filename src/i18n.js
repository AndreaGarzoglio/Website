/* English is written into the pages. Italian is a dictionary from the English
   text to the Italian one (src/content/it.js), loaded only when it is wanted
   and applied to the finished page: every element whose text is a key gets
   the Italian in its place, and so does every attribute a reader sees or
   hears. One mechanism covers the hand-written home, the generated chrome and
   everything render.js writes. A sentence put together in code (a count, a
   date) goes through t() instead. Switching language reloads the page. */

// Chosen by the inline script in <head>, before anything paints.
export const lang = document.documentElement.dataset.lang === "it" ? "it" : "en";

let dict = {};
export const t = (text) => dict[text] ?? text;

const ATTRS = ["alt", "title", "aria-label", "data-title", "data-caption", "data-lightbox"];
const SKIP = new Set(["SCRIPT", "STYLE", "TITLE", "svg", "CANVAS"]);
const norm = (s) => s.replace(/\s+/g, " ").trim();

function visit(el, missed) {
  for (const name of ATTRS) {
    const value = el.getAttribute(name);
    const it = value && dict[norm(value)];
    if (it) el.setAttribute(name, it);
  }
  for (const node of el.childNodes) {
    if (node.nodeType !== Node.TEXT_NODE || !node.data.trim()) continue;
    const key = norm(el.innerHTML);
    if (dict[key] !== undefined) return void (el.innerHTML = dict[key]);
    if (missed && /[a-z]{3,}.* .* .*/i.test(el.textContent)) missed.push(key);
    break;
  }
  for (const child of el.children) if (!SKIP.has(child.tagName)) visit(child, missed);
}

// For markup built later, like the lightbox.
export const localize = (el) => lang === "it" && visit(el, null);

export async function loadLanguage() {
  if (lang !== "it") return;
  dict = (await import(/* webpackChunkName: "it" */ "./content/it.js")).default;
  document.documentElement.lang = "it";
}

// Run once the page is complete, before anything reads its text.
export function translate() {
  if (lang === "it") {
    document.title = document.title.split(" · ").map(t).join(" · ");
    // While working on the site, list whatever is still in English.
    const missed = location.hostname === "localhost" ? [] : null;
    visit(document.documentElement, missed);
    if (missed?.length) console.warn("Not translated yet:", missed);
  }
  document.documentElement.classList.remove("translating");

  for (const btn of document.querySelectorAll("button[data-lang]")) {
    btn.setAttribute("aria-pressed", btn.dataset.lang === lang);
    btn.addEventListener("click", () => {
      if (btn.dataset.lang === lang) return;
      const url = new URL(location.href);
      url.searchParams.set("lang", btn.dataset.lang);
      location.assign(url);
    });
  }
}
