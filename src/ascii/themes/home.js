import ghost from "../../assets/ghost.txt";

/* Résumé — indigo, leaning a touch violet, warming under the pointer.
   Two ghosts: a big one cropped down the right edge, a small mirrored one
   grazing the top-left corner. */
export default {
  stamps: [
    { source: ghost, height: 0.8, side: 1, vSide: 1, bleedX: 0.34, bleedY: -0.05, flip: false },
    { source: ghost, height: 0.5, side: -1, vSide: -1, bleedX: 0.15, bleedY: -0.2, flip: true },
  ],
  colors: {
    ambient: [
      [96, 86, 198],
      [148, 134, 248],
    ],
    heat: [138, 124, 255],
    ink: [
      [128, 112, 255],
      [168, 152, 255],
    ],
  },
};
