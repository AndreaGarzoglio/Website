import adam from "../../assets/adam.txt";

/* Art — a violet field with the drawing lighter but no less saturated over
   it, flaring bright violet under the pointer.

   One drawing this time: both hands already composed against each other at
   screen proportions, so it is sized to the viewport's full width and centred
   vertically rather than hung off a corner. */
export default {
  stamps: [{ source: adam, width: 1.02, side: 1, bleedX: 0, vSide: 0, flip: false }],
  colors: {
    ambient: [
      [104, 58, 178],
      [158, 106, 240],
    ],
    heat: [170, 96, 255],
    ink: [
      [168, 88, 255],
      [202, 142, 255],
    ],
  },
};
