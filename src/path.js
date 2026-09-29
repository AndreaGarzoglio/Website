/* Lays out the project labels under the bars of the Code page's path (built
   in render.js). A label starts at its dot and runs right, or ends at it when
   there is no room left on the axis; labels that would touch drop to a new
   row, so a month with five projects stays readable. Widths depend on the
   font and the screen, so this runs again when either changes. */

const GAP = 12;

function layoutTrack(track) {
  const width = track.clientWidth;
  const ends = [];
  const points = [...track.querySelectorAll(".gantt-point")].sort((a, b) => a.dataset.x - b.dataset.x);
  for (const pt of points) {
    const label = pt.firstElementChild;
    const x = pt.dataset.x * width;
    const w = label.offsetWidth;
    const flip = x + w > width;
    const left = flip ? x - w : x;
    let row = ends.findIndex((end) => end + GAP <= left);
    if (row === -1) row = ends.push(0) - 1;
    ends[row] = left + w;
    pt.classList.toggle("gantt-point--end", flip);
    pt.style.setProperty("--row", row);
  }
  track.style.setProperty("--rows", ends.length);
}

export function initPath() {
  const gantts = document.querySelectorAll(".gantt");
  if (!gantts.length) return;
  const layout = (gantt) => gantt.querySelectorAll(".gantt-track").forEach(layoutTrack);
  const all = () => gantts.forEach(layout);
  // Only a change of width moves the labels; the height changes because of them.
  const widths = new WeakMap();
  const observer = new ResizeObserver((entries) =>
    entries.forEach(({ target }) => {
      if (widths.get(target) === target.clientWidth) return;
      widths.set(target, target.clientWidth);
      layout(target);
    }),
  );
  gantts.forEach((g) => observer.observe(g));
  document.fonts?.ready.then(all);
}
