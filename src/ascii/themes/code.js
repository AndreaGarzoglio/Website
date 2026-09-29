import handLeft from "../../assets/hand-left.txt";
import handRight from "../../assets/hand-right.txt";

/* Code: a magenta field with the hands drawn lighter but no less saturated
   over it, flaring hot pink under the pointer.

   The drawing's two hands are stamped as separate pieces, each anchored to its
   own bottom corner and pulled a little way back in from it, so the keyboard
   between them opens up and the upper half of the screen stays clear for the
   text. */
export default {
  stamps: [
    { source: handLeft, width: 0.26, side: -1, vSide: 1, bleedX: -0.22, bleedY: 0, flip: false },
    { source: handRight, width: 0.26, side: 1, vSide: 1, bleedX: -0.22, bleedY: 0, flip: false },
  ],
  colors: {
    ambient: [
      [150, 30, 100],
      [214, 62, 150],
    ],
    heat: [255, 46, 168],
    ink: [
      [246, 62, 160],
      [255, 112, 198],
    ],
  },
};
