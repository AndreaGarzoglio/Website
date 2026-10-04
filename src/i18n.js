/* English is written into the pages. Italian is a dictionary from the English
   text to the Italian one (src/content/it.js), loaded only when it is wanted
   and applied to the finished page: every element whose text is a key gets
   the Italian in its place, and so does every attribute a reader sees or
   hears. One mechanism covers the hand-written home, the generated chrome and
   everything render.js writes. A sentence put together in code (a count, a
   date) goes through t() instead. Switching language reloads the page. */

const store = (value) => {
  try {
    return value ? localStorage.setItem("lang", value) : localStorage.getItem("lang");
  } catch {
    return null;
  }
};

/* A ?lang= in the address wins (so an Italian link can be shared), then the
   reader's last choice, then the browser's language. The inline script in
   <head> makes the same choice before anything paints. */
const asked = new URLSearchParams(location.search).get("lang");
export const lang = (asked ?? store() ?? navigator.language ?? "").startsWith("it") ? "it" : "en";
if (asked) store(lang);

let dict = {};
export const t = (text) => dict[text] ?? text;

const ATTRS = ["alt", "title", "aria-label", "data-title", "data-caption", "data-lightbox"];
const SKIP = new Set(["SCRIPT", "STYLE", "TITLE", "svg", "CANVAS"]);
const norm = (s) => s.replace(/\s+/g, " ").trim();

function visit(el, missed) {
  for (const name of ATTRS) {
    const value = el.getAttribute(name);
    if (value && dict[norm(value)]) el.setAttribute(name, dict[norm(value)]);
  }
  if ([...el.childNodes].some((n) => n.nodeType === Node.TEXT_NODE && n.data.trim())) {
    const key = norm(el.innerHTML);
    if (dict[key] !== undefined) return void (el.innerHTML = dict[key]);
    if (/[a-z]{3,}.* .* .*/i.test(el.textContent)) missed.push(key);
  }
  for (const child of el.children) if (!SKIP.has(child.tagName)) visit(child, missed);
}

// For markup built later, like the lightbox.
export const localize = (el) => lang === "it" && visit(el, []);

export async function loadLanguage() {
  if (lang !== "it") return;
  dict = (await import("./content/it.js")).default;
  document.documentElement.lang = "it";
}

// Run once the page is complete, before anything reads its text.
export function translate() {
  if (lang === "it") {
    document.title = document.title.split(" · ").map(t).join(" · ");
    const missed = [];
    visit(document.documentElement, missed);
    if (location.hostname === "localhost" && missed.length)
      console.warn("Not translated yet:", missed);
  }
  document.documentElement.classList.remove("translating");

  for (const btn of document.querySelectorAll("[data-lang]")) {
    btn.setAttribute("aria-pressed", btn.dataset.lang === lang);
    btn.addEventListener("click", () => {
      if (btn.dataset.lang === lang) return;
      const url = new URL(location.href);
      url.searchParams.set("lang", btn.dataset.lang);
      location.assign(url);
    });
  }
}
