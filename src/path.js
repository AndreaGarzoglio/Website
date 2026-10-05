/* Lays out the project labels under the bars of the Code page's path (built
   in render.js). A label starts at its dot and runs right, or ends at it when
   there is no room left on the axis; labels that would touch drop to a new
   row, so a month with five projects stays readable. Widths depend on the
   font and the screen, so this runs again when either changes. */

const GAP = 12;

function layoutGantts(gantts) {
  // Every measurement of every gantt first, then every write, so the page
  // lays out once.
  const tracks = gantts.flatMap((g) => [...g.querySelectorAll(".gantt-track")]).map((track) => ({
    track,
    width: track.clientWidth,
    points: [...track.querySelectorAll(".gantt-point")]
      .map((pt) => ({ pt, x: Number(pt.dataset.x), w: pt.firstElementChild.offsetWidth }))
      .sort((a, b) => a.x - b.x),
  }));

  for (const { track, width, points } of tracks) {
    const ends = [];
    for (const { pt, x, w } of points) {
      const at = x * width;
      const flip = at + w > width;
      const left = flip ? at - w : at;
      let row = ends.findIndex((end) => end + GAP <= left);
      if (row === -1) row = ends.push(0) - 1;
      ends[row] = left + w;
      pt.classList.toggle("gantt-point--end", flip);
      pt.style.setProperty("--row", row);
    }
    track.style.setProperty("--rows", ends.length);
  }
}

export function initPath() {
  const gantts = document.querySelectorAll(".gantt");
  if (!gantts.length) return;
  // The axis only changes size with the page, never because of the labels.
  const observer = new ResizeObserver((entries) => layoutGantts(entries.map(({ target }) => target.closest(".gantt"))));
  gantts.forEach((g) => observer.observe(g.querySelector(".gantt-axis")));
  document.fonts?.ready.then(() => layoutGantts([...gantts]));
}
