/* Pictures that are not in yet when the page starts are hidden until they
   load, then fade in (.img-wait / .img-in in styles.css). One that is already
   there, from the cache or above the fold, is left alone. */
export function initFade() {
  for (const img of document.querySelectorAll("img")) {
    if (img.complete) continue;
    img.classList.add("img-wait");
    const done = () => {
      img.classList.remove("img-wait");
      img.classList.add("img-in");
    };
    img.addEventListener("load", done, { once: true });
    img.addEventListener("error", done, { once: true });
  }
}
