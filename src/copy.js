/* A [data-copy] button puts its value on the clipboard and says so for a
   moment. Handy for an email address, which a mailto link cannot help with
   when there is no mail app set up. */
export function initCopy() {
  document.addEventListener("click", async (e) => {
    const btn = e.target.closest("[data-copy]");
    if (!btn) return;
    const label = btn.textContent;
    try {
      await navigator.clipboard.writeText(btn.dataset.copy);
      btn.textContent = "copied";
    } catch {
      btn.textContent = "copy failed";
    }
    setTimeout(() => (btn.textContent = label), 1600);
  });
}
