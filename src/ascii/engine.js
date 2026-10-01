/* Shared ASCII field.
 *
 * Everything here is common to every page: the noise that drives the field,
 * the pointer heat and click ripples, the glyph ramp, and the machinery that
 * pins a piece of ASCII art into the grid. Nothing in this file knows which
 * page it is running on.
 *
 * What changes per page lives in ./themes/: the art to stamp, where to anchor
 * it, and the colours. See createAsciiField's `theme` argument.
 */

export const RAMP = " .:-=+*#%@";

// Heated cells swap through this set instead of sitting on the ramp's top
// glyph. Everything here carries similar visual weight, so the halo keeps its
// density while the characters keep turning over.
const GLITCH = "@#%&$8B0WMXKZ*+=?!<>{}[]()/\\|~^";
// How long a cell holds a glyph, scaled by heat: the edge of the halo ticks
// over slowly, the middle churns every frame.
const GLITCH_HOLD_SLOW = 1.2;
const GLITCH_HOLD_FAST = 0.42;

const CELL_W = 17;
const CELL_H = 22;
// Glyphs grow with heat, so the halo magnifies whatever it passes over.
const FONT_MIN = 15;
const FONT_MAX = 23;
// 30fps: smooth enough that the halo glides after the cursor, and cheap
// because a frame only repaints what changed. The rates below are tuned per
// 50ms and rescaled to the frame length, so the feel does not depend on it.
const FRAME_MS = 33;
const perFrame = (rate) => 1 - (1 - rate) ** (FRAME_MS / 50);

// The glow is an eased state rather than a timeline, so a click never snaps it
// back to full: it always moves on from wherever it currently is.
const GLOW_MUTE_MS = 1000;
const GLOW_FALL = perFrame(0.43);
const GLOW_RISE = perFrame(0.27);

// Only crests of the field draw a ramp glyph; below this the grid falls back to
// a resting dot so it never breaks up into holes.
const THRESHOLD = 0.5;

// Low frequency for the blob shapes, a lighter second octave to keep coverage
// from swinging too far as the field drifts, and a warp that bends both.
const FREQ_BASE = 0.05;
const FREQ_DETAIL = 0.12;
const DETAIL_WEIGHT = 0.5;
const WARP_X = 14;
const WARP_Y = 12;
const CONTRAST = 1.8;

// The art is drawn for a terminal cell about half as wide as it is tall; our
// grid is wider than that, so a stamp samples fewer columns than rows to keep
// the shape from coming out stretched.
const SRC_ASPECT = 0.65;
// Below this viewport width there is no room beside the content for a stamp.
const STAMP_MIN_VIEWPORT = 760;
// A downsampled cell this faint is treated as background rather than a thin
// stroke, which keeps the silhouette from fraying into loose dots.
const STAMP_INK = 0.35;
// Softening weighs a cell this many times against each neighbour, and leaves
// alone anything below this ramp index.
const SOFTEN_SELF = 3;
const SOFTEN_FROM = 3;

// How a stamped cell is encoded on the grid: 0 is untouched, STAMP_HOLE is an
// enclosed gap held open, and anything from STAMP_INK_BASE up carries a ramp
// index on top of it.
const STAMP_HOLE = 1;
const STAMP_INK_BASE = 2;

const DENSITY_STEPS = 12;
const HEAT_STEPS = 14;
// Bucket variants: 0 is the ambient field, 1 is stamp ink.
const VARIANTS = 2;
const BUCKET_STRIDE = HEAT_STEPS * DENSITY_STEPS;

const POINTER_RADIUS = 175;
const POINTER_R2 = POINTER_RADIUS * POINTER_RADIUS;
const POINTER_CUTOFF = POINTER_RADIUS * 2.6;
const POINTER_CUTOFF2 = POINTER_CUTOFF * POINTER_CUTOFF;
// Past this distance the heat is under one colour step, so a cell draws
// exactly as it would unheated and can be left to the per-cell repaint.
const HEAT_REACH = POINTER_RADIUS * 1.75;

// The halo itself sits on the cursor with no easing, so there is no lag while
// moving. Only the samples it drops behind linger, which is what fades out.
const TRAIL_MAX = 22;
const TRAIL_DECAY = 1 - perFrame(0.08);
const TRAIL_MIN_DIST2 = 18 * 18;

// A click turns the glow into a single travelling ring. At radius zero a
// gaussian ring of this sigma is exactly the glow's own falloff, so the wave is
// born as the glow itself and only becomes a ring as it moves out.
const RIPPLE_SPEED = 360;
const RIPPLE_LIFE = 2.2;
const RIPPLE_BIRTH = 0.15;
const RIPPLE_SIGMA = POINTER_RADIUS / Math.SQRT2;
const RIPPLE_SPREAD = 0.35;

// Field value that maps back to each ramp index once draw() re-derives the
// glyph, so a stamped cell renders the character the art actually asked for.
const STAMP_FIELD = [];
for (let i = 0; i < RAMP.length; i++) {
  const n = (i - 0.5) / (RAMP.length - 1);
  STAMP_FIELD.push(THRESHOLD + n * (1 - THRESHOLD));
}

// Glyph size and centring per heat step, shared by every theme.
const FONTS = [];
const OFFSET_X = [];
const OFFSET_Y = [];

for (let h = 0; h < HEAT_STEPS; h++) {
  const size = FONT_MIN + (FONT_MAX - FONT_MIN) * (h / (HEAT_STEPS - 1));

  FONTS.push(`${size.toFixed(1)}px "JetBrains Mono", ui-monospace, monospace`);
  // Keep the glyph centred in its cell as it grows.
  OFFSET_X.push(-(size - FONT_MIN) * 0.3);
  OFFSET_Y.push(-(size - FONT_MIN) * 0.5);
}

/* Ramp index per source character, cropped to the art's bounding box. Index 0
 * is empty, so an all-zero row or column simply never stamps anything.
 *
 * Empty cells reachable from outside the art are ordinary background and stay
 * animated. Whatever is left over is enclosed (the eyes of a ghost, the gap
 * between fingers) and gets held open, so the field can never drift in and
 * fill the shape. */
const ART_CACHE = new Map();

/* Parsed art, one entry per distinct source: a page can stamp the same drawing
   more than once, and it should only be measured and flood-filled once. */
function artFor(source) {
  let art = ART_CACHE.get(source);
  if (!art) {
    art = parseArt(source);
    ART_CACHE.set(source, art);
  }
  return art;
}

function parseArt(source) {
  const lines = source.split("\n").map((line) => line.replace(/\s+$/, ""));
  let top = 0;
  let bottom = lines.length - 1;
  while (top <= bottom && lines[top].trim() === "") top++;
  while (bottom >= top && lines[bottom].trim() === "") bottom--;
  if (top > bottom) return { w: 0, h: 0, rows: [], holes: [] };

  let left = Infinity;
  let right = -1;
  for (let r = top; r <= bottom; r++) {
    const line = lines[r];
    if (line.trim() === "") continue;
    left = Math.min(left, line.length - line.trimStart().length);
    right = Math.max(right, line.length - 1);
  }

  const w = right - left + 1;
  const rows = [];
  for (let r = top; r <= bottom; r++) {
    const line = lines[r];
    const row = new Uint8Array(w);
    for (let c = 0; c < w; c++) {
      const i = RAMP.indexOf(line[left + c] ?? " ");
      row[c] = i > 0 ? i : 0;
    }
    rows.push(row);
  }

  const h = rows.length;
  const holes = rows.map((row) => Uint8Array.from(row, (v) => (v === 0 ? 1 : 0)));
  const stack = [];

  for (let c = 0; c < w; c++) stack.push(0, c, h - 1, c);
  for (let r = 0; r < h; r++) stack.push(r, 0, r, w - 1);

  while (stack.length > 0) {
    const c = stack.pop();
    const r = stack.pop();
    if (r < 0 || r >= h || c < 0 || c >= w || holes[r][c] !== 1) continue;
    holes[r][c] = 0;
    stack.push(r - 1, c, r + 1, c, r, c - 1, r, c + 1);
  }

  return { w, h, rows, holes };
}

/* Ambient glyphs run from the theme's low colour to its high colour with
 * density; the pointer and clicks pull them toward the theme's heat colour.
 * Ink (the stamped art) runs on its own pair so it reads as something
 * standing behind the field rather than another swell in it.
 *
 * Colours are quantised into a palette so each frame still draws in a handful
 * of batches, with enough steps that the ramp reads as continuous. Buckets are
 * ordered variant-major then heat-major, so a frame sets the canvas font once
 * per heat step rather than once per bucket. */
function buildPalette(colors) {
  const palette = [];

  for (let v = 0; v < VARIANTS; v++) {
    const [low, high] = v === 1 ? colors.ink : colors.ambient;

    for (let h = 0; h < HEAT_STEPS; h++) {
      const heat = h / (HEAT_STEPS - 1);

      for (let d = 0; d < DENSITY_STEPS; d++) {
        const n = d / (DENSITY_STEPS - 1);
        const ease = n * n * (3 - 2 * n);
        const channels = [];

        for (let i = 0; i < 3; i++) {
          const ambient = low[i] + (high[i] - low[i]) * ease;
          channels.push(Math.round(ambient + (colors.heat[i] - ambient) * heat));
        }

        // Step 0 is the resting dot grid the troughs fall back to; the swells
        // occupy the steps above it. Ink sits brighter throughout so the
        // silhouette holds without the field having to go quiet around it.
        const alpha =
          v === 1
            ? Math.min(0.9, 0.42 + 0.3 * n + 0.25 * heat)
            : Math.min(0.6, 0.14 + 0.16 * n + 0.3 * heat);

        palette.push(`rgba(${channels[0]}, ${channels[1]}, ${channels[2]}, ${alpha.toFixed(3)})`);
      }
    }
  }

  return palette;
}

function hash3(x, y, z) {
  let h = Math.imul(x, 374761393) ^ Math.imul(y, 668265263) ^ Math.imul(z, 1442695041);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
}

// Value noise with smoothstep interpolation. Drifting through z makes the blobs
// merge and split like a lava lamp instead of marching like a wave train.
function noise3(x, y, z) {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const zi = Math.floor(z);

  let f = x - xi;
  const xf = f * f * (3 - 2 * f);
  f = y - yi;
  const yf = f * f * (3 - 2 * f);
  f = z - zi;
  const zf = f * f * (3 - 2 * f);

  const c000 = hash3(xi, yi, zi);
  const c100 = hash3(xi + 1, yi, zi);
  const c010 = hash3(xi, yi + 1, zi);
  const c110 = hash3(xi + 1, yi + 1, zi);
  const c001 = hash3(xi, yi, zi + 1);
  const c101 = hash3(xi + 1, yi, zi + 1);
  const c011 = hash3(xi, yi + 1, zi + 1);
  const c111 = hash3(xi + 1, yi + 1, zi + 1);

  const x00 = c000 + (c100 - c000) * xf;
  const x10 = c010 + (c110 - c010) * xf;
  const x01 = c001 + (c101 - c001) * xf;
  const x11 = c011 + (c111 - c011) * xf;

  const y0 = x00 + (x10 - x00) * yf;
  const y1 = x01 + (x11 - x01) * yf;

  return y0 + (y1 - y0) * zf;
}

/**
 * @param {HTMLCanvasElement} canvas
 * @param {{stamps: object[], colors: object}} theme
 *   `stamps`  one entry per drawing pinned into the grid. `source` is the raw
 *             ASCII art -- two stamps may share one, or bring their own.
 *             Size it with either `height` (a multiple of the viewport's rows)
 *             or `width` (a multiple of its columns); the other axis follows
 *             from the art's own proportions. A value above 1 overflows the
 *             screen on purpose. `side` and `vSide` pick which edges the stamp
 *             is anchored to -- 0 centres it on that axis -- and each `bleed`
 *             is the fraction of the stamp pushed past its own anchored edge:
 *             positive crops it against that edge, negative pulls it back
 *             inside. The result reads as a shape the viewport is cropping
 *             rather than a sprite parked in a corner. `flip` mirrors it,
 *             `inkGain` lifts what it samples along the ramp (1 leaves it as
 *             drawn), and `soften` blends each stroke into its neighbours.
 *   `colors`  {ambient: [low, high], heat, ink: [low, high]}, each an RGB triple.
 */
export function createAsciiField(canvas, theme) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const PALETTE = buildPalette(theme.colors);
  const BUCKETS = PALETTE.map(() => []);

  const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const pointer = { x: 0, y: 0, active: false };
  const trail = [];
  const ripples = [];
  const heatBox = { minX: 0, minY: 0, maxX: 0, maxY: 0, any: false };
  let cols = 0;
  let rows = 0;
  // Ramp index per grid cell, 0 where the art is absent. Rebuilt on resize
  // because the stamp is sized and placed against the current grid.
  let stampCells = null;
  let lastDraw = 0;
  let rafId = null;
  let glowGain = 1;
  let muteUntil = 0;
  // What each cell showed last frame (bucket * 128 + char code), so a frame
  // only repaints the cells that changed. The field drifts slowly, so most
  // of the grid holds still from one frame to the next.
  let shown = null;
  let repaintAll = true;
  let scale = 1;
  // The cells around the pointer, last frame: glyphs there grow past their
  // own cell, so that whole block is cleared and redrawn instead.
  let lastBlock = null;

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    scale = dpr;
    const w = window.innerWidth;
    const h = window.innerHeight;

    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.textBaseline = "top";

    cols = Math.ceil(w / CELL_W) + 1;
    rows = Math.ceil(h / CELL_H) + 1;

    buildStamps(w);
    shown = new Uint16Array(cols * rows);
    repaintAll = true;
    lastBlock = null;
  }

  function buildStamps(viewportW) {
    stampCells = null;
    if (viewportW < STAMP_MIN_VIEWPORT) return;

    const cells = new Uint8Array(cols * rows);
    let stamped = false;

    for (const spec of theme.stamps) {
      const art = artFor(spec.source);
      if (art.h === 0) continue;

      // A stamp is sized from whichever axis it names. `width` suits a
      // composition laid out for the screen; `height` suits a shape hung off
      // an edge, where the width it happens to need is not the point.
      const gridAspect = (art.w / art.h) * SRC_ASPECT;
      let destW, destH;
      if (spec.width !== undefined) {
        destW = Math.round(cols * spec.width);
        destH = Math.round(destW / gridAspect);
      } else {
        destH = Math.round(rows * spec.height);
        destW = Math.round(destH * gridAspect);
      }
      if (destW < 2 || destH < 2) continue;

      // Bleed is measured against the anchored edge in both axes. Whatever
      // lands outside the grid is simply clipped. A side of 0 centres the
      // stamp on that axis instead, and ignores the bleed.
      const originC =
        spec.side === 0
          ? Math.round((cols - destW) / 2)
          : spec.side > 0
            ? cols - destW + Math.round(destW * spec.bleedX)
            : -Math.round(destW * spec.bleedX);
      const originR =
        spec.vSide === 0
          ? Math.round((rows - destH) / 2)
          : spec.vSide > 0
            ? rows - destH + Math.round(destH * spec.bleedY)
            : -Math.round(destH * spec.bleedY);

      stamp(cells, art, destW, destH, originC, originR, spec);
      stamped = true;
    }

    if (stamped) stampCells = cells;
  }

  // Box-downsamples the art onto the grid: each destination cell averages the
  // source cells it covers, so the edges thin out instead of stepping. Cells
  // land as STAMP_HOLE, or as a ramp index offset by STAMP_INK_BASE.
  function stamp(cells, art, destW, destH, originC, originR, spec) {
    const stepX = art.w / destW;
    const stepY = art.h / destH;
    const top = RAMP.length - 1;
    // Art drawn in light strokes samples low on the ramp; a gain above 1 lifts
    // it toward the weight of the field around it.
    const inkGain = spec.inkGain ?? 1;
    // Ramp value per destination cell: -1 is background, -2 an enclosed hole.
    const level = new Float32Array(destW * destH);

    for (let j = 0; j < destH; j++) {
      const y0 = Math.floor(j * stepY);
      const y1 = Math.max(y0 + 1, Math.floor((j + 1) * stepY));

      for (let i = 0; i < destW; i++) {
        const x0 = Math.floor(i * stepX);
        const x1 = Math.max(x0 + 1, Math.floor((i + 1) * stepX));

        let sum = 0;
        let holes = 0;
        let n = 0;

        for (let y = y0; y < y1 && y < art.h; y++) {
          const row = art.rows[y];
          const holeRow = art.holes[y];
          for (let x = x0; x < x1 && x < art.w; x++) {
            sum += row[x];
            holes += holeRow[x];
            n++;
          }
        }

        const mean = n === 0 ? 0 : sum / n;
        // A curve rather than a multiplier: it lifts the middle of the ramp
        // but still meets the top at the top, so the densest strokes keep
        // their steps instead of all clipping to the last glyph.
        level[j * destW + i] =
          mean >= STAMP_INK
            ? top * Math.pow(Math.min(1, mean / top), 1 / inkGain)
            : n > 0 && holes * 2 >= n
              ? -2
              : -1;
      }
    }

    // Art that jumps straight from its lightest strokes to its densest reads
    // as two flat bands. Softening blends each ink cell with the ink around
    // it, so the jump picks up the glyphs in between.
    const soft = spec.soften ? new Float32Array(level) : level;
    if (spec.soften) {
      for (let j = 0; j < destH; j++) {
        for (let i = 0; i < destW; i++) {
          const self = level[j * destW + i];
          // The faint fringe stays as drawn, so the silhouette still thins out.
          if (self < SOFTEN_FROM) continue;
          let sum = self * SOFTEN_SELF;
          let weight = SOFTEN_SELF;
          for (let dj = -1; dj <= 1; dj++) {
            for (let di = -1; di <= 1; di++) {
              const y = j + dj;
              const x = i + di;
              if ((di || dj) && y >= 0 && y < destH && x >= 0 && x < destW && level[y * destW + x] >= 0) {
                sum += level[y * destW + x];
                weight++;
              }
            }
          }
          soft[j * destW + i] = sum / weight;
        }
      }
    }

    for (let j = 0; j < destH; j++) {
      const r = originR + j;
      if (r < 0 || r >= rows) continue;

      for (let i = 0; i < destW; i++) {
        const c = originC + (spec.flip ? destW - 1 - i : i);
        if (c < 0 || c >= cols) continue;

        const v = soft[j * destW + i];
        if (v >= 0) cells[r * cols + c] = STAMP_INK_BASE + Math.min(top, Math.max(1, Math.round(v)));
        else if (v === -2) cells[r * cols + c] = STAMP_HOLE;
      }
    }
  }

  function advanceTrail() {
    for (let i = trail.length - 1; i >= 0; i--) {
      trail[i].s *= TRAIL_DECAY;
      if (trail[i].s < 0.04) trail.splice(i, 1);
    }

    if (!pointer.active) return;

    const last = trail[trail.length - 1];
    if (last) {
      const dx = pointer.x - last.x;
      const dy = pointer.y - last.y;
      if (dx * dx + dy * dy < TRAIL_MIN_DIST2) return;
    }

    trail.push({ x: pointer.x, y: pointer.y, s: 1 });
    if (trail.length > TRAIL_MAX) trail.shift();
  }

  // Cells outside this box cannot be heated, so they skip the per-point maths.
  function updateHeatBox() {
    heatBox.any = false;

    if (ripples.length > 0) {
      heatBox.any = true;
      heatBox.minX = -Infinity;
      heatBox.minY = -Infinity;
      heatBox.maxX = Infinity;
      heatBox.maxY = Infinity;
      return;
    }

    if (glowGain <= 0) return;

    if (!pointer.active && trail.length === 0) return;

    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    const grow = (p) => {
      if (p.x < minX) minX = p.x;
      if (p.x > maxX) maxX = p.x;
      if (p.y < minY) minY = p.y;
      if (p.y > maxY) maxY = p.y;
    };

    if (pointer.active) grow(pointer);
    trail.forEach(grow);

    heatBox.any = true;
    heatBox.minX = minX - POINTER_CUTOFF;
    heatBox.minY = minY - POINTER_CUTOFF;
    heatBox.maxX = maxX + POINTER_CUTOFF;
    heatBox.maxY = maxY + POINTER_CUTOFF;
  }

  function heatAt(cellX, cellY) {
    let heat = 0;

    if (glowGain > 0) {
      if (pointer.active) {
        const dx = cellX - pointer.x;
        const dy = cellY - pointer.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < POINTER_CUTOFF2) heat = Math.exp(-d2 / POINTER_R2);
      }

      for (const p of trail) {
        const dx = cellX - p.x;
        const dy = cellY - p.y;
        const d2 = dx * dx + dy * dy;
        if (d2 > POINTER_CUTOFF2) continue;
        const g = Math.exp(-d2 / POINTER_R2) * p.s;
        if (g > heat) heat = g;
      }

      heat *= glowGain;
    }

    for (const ripple of ripples) {
      const dx = cellX - ripple.x;
      const dy = cellY - ripple.y;
      const phase = Math.sqrt(dx * dx + dy * dy) - ripple.radius;
      if (phase > ripple.cutoff || phase < -ripple.cutoff) continue;
      heat += Math.exp(-(phase * phase) / ripple.denom) * ripple.power;
    }

    return heat > 1 ? 1 : heat;
  }

  // The visibly heated area as a block of whole cells, one cell wider all
  // round. heatBox reaches as far as any heat at all; this only as far as
  // heat that changes how a cell looks.
  function blockOf(box) {
    const trim = POINTER_CUTOFF - HEAT_REACH;
    return {
      c0: Math.max(0, Math.floor((box.minX + trim) / CELL_W) - 1),
      c1: Math.min(cols - 1, Math.ceil((box.maxX - trim) / CELL_W) + 1),
      r0: Math.max(0, Math.floor((box.minY + trim) / CELL_H) - 1),
      r1: Math.min(rows - 1, Math.ceil((box.maxY - trim) / CELL_H) + 1),
    };
  }

  function mergeBlocks(a, b) {
    if (!a || !b) return a ?? b;
    return {
      c0: Math.min(a.c0, b.c0),
      c1: Math.max(a.c1, b.c1),
      r0: Math.min(a.r0, b.r0),
      r1: Math.max(a.r1, b.r1),
    };
  }

  // Clears in device pixels, snapped outward, so a fractional pixel ratio
  // never leaves a sliver of the old glyph on a cell's edge.
  function clear(full, paint, changed) {
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    const wipe = (x, y, w, h) => {
      const x0 = Math.floor(x * scale);
      const y0 = Math.floor(y * scale);
      ctx.clearRect(x0, y0, Math.ceil((x + w) * scale) - x0, Math.ceil((y + h) * scale) - y0);
    };
    if (full) ctx.clearRect(0, 0, canvas.width, canvas.height);
    else {
      if (paint) {
        wipe(
          paint.c0 * CELL_W,
          paint.r0 * CELL_H,
          (paint.c1 - paint.c0 + 1) * CELL_W,
          (paint.r1 - paint.r0 + 1) * CELL_H,
        );
      }
      for (let i = 0; i < changed.length; i += 2) wipe(changed[i], changed[i + 1], CELL_W, CELL_H);
    }
    ctx.restore();
  }

  function draw(time) {
    const t = time / 1000;
    const tz = t * 0.09;
    const twarp = t * 0.05;

    // Eased from its current value, so a click mid-recovery carries on from
    // where the glow actually is instead of snapping back to full.
    const target = time >= muteUntil ? 1 : 0;
    glowGain += (target - glowGain) * (target > glowGain ? GLOW_RISE : GLOW_FALL);
    if (glowGain < 0.01) glowGain = 0;

    for (const bucket of BUCKETS) bucket.length = 0;

    for (let i = ripples.length - 1; i >= 0; i--) {
      // rAF stamps the frame start, which can precede the pointerdown that
      // made the ripple; a negative age would drive heat below zero.
      const age = Math.max(0, (time - ripples[i].start) / 1000);
      if (age > RIPPLE_LIFE) ripples.splice(i, 1);
      else {
        const ripple = ripples[i];
        const life = age / RIPPLE_LIFE;
        const sigma = RIPPLE_SIGMA * (1 + RIPPLE_SPREAD * life);

        ripple.radius = age * RIPPLE_SPEED;
        ripple.denom = 2 * sigma * sigma;
        ripple.cutoff = sigma * 3;
        // Rises as the glow hands over, then thins out as it travels.
        ripple.power = Math.min(1, age / RIPPLE_BIRTH) * (1 - life) * (1 - life);
      }
    }

    updateHeatBox();

    // Everything is repainted while a ripple crosses the screen; otherwise
    // only the block the pointer heats, plus the cells that changed.
    const full = repaintAll || (heatBox.any && heatBox.minX === -Infinity);
    repaintAll = false;
    const block = full || !heatBox.any ? null : blockOf(heatBox);
    const paint = full ? null : mergeBlocks(block, lastBlock);
    lastBlock = block;
    const changed = [];

    for (let r = 0; r < rows; r++) {
      const cellY = r * CELL_H;
      const stampRow = stampCells ? r * cols : -1;
      const inRowBand = heatBox.any && cellY >= heatBox.minY && cellY <= heatBox.maxY;

      for (let c = 0; c < cols; c++) {
        const cellX = c * CELL_W;
        const cell = stampRow >= 0 ? stampCells[stampRow + c] : 0;
        const ink = cell >= STAMP_INK_BASE;
        let field;

        // Stamped cells drop the field entirely, so nothing the animation does
        // reaches them: ink holds its glyph, enclosed gaps hold their emptiness.
        // Heat is applied below exactly as it is everywhere else, which is what
        // still lets the pointer scramble and light the whole shape up.
        if (ink) {
          field = STAMP_FIELD[cell - STAMP_INK_BASE];
        } else if (cell === STAMP_HOLE) {
          field = 0;
        } else {
          // Warping the sample position before reading the noise is what keeps
          // the blobs irregular rather than rounded.
          const warp = noise3(c * 0.03, r * 0.03, twarp) - 0.5;
          const wx = c + warp * WARP_X;
          const wy = r - warp * WARP_Y;
          const raw =
            (noise3(wx * FREQ_BASE, wy * FREQ_BASE, tz) +
              noise3(wx * FREQ_DETAIL, wy * FREQ_DETAIL, tz * 1.4) * DETAIL_WEIGHT) /
            (1 + DETAIL_WEIGHT);
          field = 0.5 + (raw - 0.5) * CONTRAST;
        }

        const heat =
          inRowBand && cellX >= heatBox.minX && cellX <= heatBox.maxX
            ? heatAt(cellX, cellY)
            : 0;

        // Screen blend, so heat overrides the field instead of adding to it:
        // a heated cell reaches full density whatever the wave was doing.
        const v = field + (1 - field) * heat;

        let glyph = ".";
        let d = 0;

        // Troughs keep a faint dot so the grid never breaks up into holes.
        if (v >= THRESHOLD) {
          const n = Math.min(1, (v - THRESHOLD) / (1 - THRESHOLD));
          glyph = RAMP[Math.min(RAMP.length - 1, 1 + Math.floor(n * (RAMP.length - 1)))];
          d = 1 + Math.min(DENSITY_STEPS - 2, Math.floor(n * (DENSITY_STEPS - 1)));

          if (heat > 0.06) {
            // Stable per-cell noise: which cells scramble stays put as the halo
            // moves, and each one runs on its own offset clock.
            const hash = ((c * 73856093) ^ (r * 19349663)) >>> 0;
            if ((hash % 1000) / 1000 < heat) {
              const hold = GLITCH_HOLD_SLOW - (GLITCH_HOLD_SLOW - GLITCH_HOLD_FAST) * heat;
              const step = Math.floor(t / hold + ((hash >>> 7) % 97) / 32);
              // Re-hash per step rather than adding one: a linear stride can
              // land on a multiple of the set length and never move at all.
              const pick = (hash ^ Math.imul(step, 2654435761)) >>> 0;
              glyph = GLITCH[pick % GLITCH.length];
            }
          }
        }

        const h = Math.min(HEAT_STEPS - 1, Math.floor(heat * HEAT_STEPS));
        const b = (ink ? BUCKET_STRIDE : 0) + h * DENSITY_STEPS + d;
        const code = b * 128 + glyph.charCodeAt(0);
        const idx = r * cols + c;
        const inPaint = paint && r >= paint.r0 && r <= paint.r1 && c >= paint.c0 && c <= paint.c1;
        if (full || inPaint) BUCKETS[b].push(glyph, cellX, cellY);
        else if (code !== shown[idx]) {
          BUCKETS[b].push(glyph, cellX, cellY);
          changed.push(cellX, cellY);
        }
        shown[idx] = code;
      }
    }

    clear(full, paint, changed);

    for (let v = 0; v < VARIANTS; v++) {
      const base = v * BUCKET_STRIDE;

      for (let h = 0; h < HEAT_STEPS; h++) {
        const ox = OFFSET_X[h];
        const oy = OFFSET_Y[h];
        let fontSet = false;

        for (let d = 0; d < DENSITY_STEPS; d++) {
          const b = base + h * DENSITY_STEPS + d;
          const cells = BUCKETS[b];
          if (cells.length === 0) continue;

          if (!fontSet) {
            ctx.font = FONTS[h];
            fontSet = true;
          }

          ctx.fillStyle = PALETTE[b];
          for (let i = 0; i < cells.length; i += 3) {
            ctx.fillText(cells[i], cells[i + 1] + ox, cells[i + 2] + oy);
          }
        }
      }
    }
  }

  function loop(time) {
    rafId = window.requestAnimationFrame(loop);
    if (time - lastDraw < FRAME_MS) return;
    lastDraw = time;
    advanceTrail();
    draw(time);
  }

  function start() {
    if (motionQuery.matches) {
      if (rafId !== null) window.cancelAnimationFrame(rafId);
      rafId = null;
      ripples.length = 0;
      trail.length = 0;
      pointer.active = false;
      glowGain = 1;
      muteUntil = 0;
      draw(0);
      return;
    }
    if (rafId === null) rafId = window.requestAnimationFrame(loop);
  }

  let resizeTimer = null;
  window.addEventListener("resize", () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      resize();
      if (motionQuery.matches) draw(0);
    }, 150);
  });

  window.addEventListener(
    "pointermove",
    (event) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = true;
    },
    { passive: true },
  );

  document.addEventListener("pointerleave", () => {
    pointer.active = false;
  });

  window.addEventListener("blur", () => {
    pointer.active = false;
  });

  window.addEventListener(
    "pointerdown",
    (event) => {
      if (motionQuery.matches) return;

      // Fires on the spot; RIPPLE_BIRTH is what keeps it from popping in.
      ripples.push({
        x: event.clientX,
        y: event.clientY,
        start: performance.now(),
        radius: 0,
        power: 0,
        denom: 2 * RIPPLE_SIGMA * RIPPLE_SIGMA,
        cutoff: RIPPLE_SIGMA * 3,
      });
      if (ripples.length > 4) ripples.shift();
      muteUntil = performance.now() + GLOW_MUTE_MS;
    },
    { passive: true },
  );

  motionQuery.addEventListener("change", start);

  resize();
  start();
}
