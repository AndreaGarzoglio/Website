import ghost from "../../assets/ghost.txt";

/* Résumé. Two ghosts: a big one cropped down the right edge, a small mirrored one
   grazing the top-left corner. */
export default {
  stamps: [
    { source: ghost, height: 0.8, side: 1, vSide: 1, bleedX: 0.34, bleedY: -0.05 },
    { source: ghost, height: 0.5, side: -1, vSide: -1, bleedX: 0.15, bleedY: -0.2, flip: true },
  ],
};
