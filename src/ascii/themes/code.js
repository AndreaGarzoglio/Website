import handLeft from "../../assets/hand-left.txt";
import handRight from "../../assets/hand-right.txt";

/* Code. The drawing's two hands are stamped as separate pieces, each anchored to its
   own bottom corner and pulled a little way back in from it, so the keyboard
   between them opens up and the upper half of the screen stays clear for the
   text. The left hand is drawn in lighter strokes (+ and = where the right
   has % and @) and jumps from them straight to @, so it is lifted a little
   and softened to pick up the glyphs in between. */
export default {
  stamps: [
    { source: handLeft, width: 0.26, side: -1, vSide: 1, bleedX: -0.22, bleedY: 0, flip: false, inkGain: 1.2, soften: true },
    { source: handRight, width: 0.26, side: 1, vSide: 1, bleedX: -0.22, bleedY: 0, flip: false },
  ],
};
