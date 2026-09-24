/* Everything the Art pages show lives here, not in the HTML. A series page and
   a project page are the same markup filled with different entries, so adding
   a project is adding an object, never a file. Images come from the Drive
   folder named by each key — see pics.js. */

import { pics } from "./pics.js";

const LOREM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
const LOREM_SHORT = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";

const project = (id, title, key) => {
  const imgs = pics(key);
  return {
    id,
    title,
    note: LOREM_SHORT,
    concept: [LOREM, LOREM],
    brief: [
      ["Year", "20XX"],
      ["Medium", "Lorem ipsum"],
      ["Pieces", String(imgs.length).padStart(2, "0")],
    ],
    images: imgs,
  };
};

export const series = {
  msr: {
    index: "02.1",
    title: "MSR",
    template: "case",
    tagline: "Lorem ipsum dolor sit amet.",
    lead: LOREM_SHORT,
    body: [LOREM],
    brief: [
      ["Year", "20XX"],
      ["Role", "Lorem ipsum"],
      ["Context", "Lorem ipsum dolor"],
    ],
    projectsTitle: "The project",
    projects: [
      project("presentation", "Presentation", "art/msr/presentation"),
      project("blackhat", "BlackHat", "art/msr/blackhat"),
      project("greyhat", "GreyHat", "art/msr/greyhat"),
      project("whitehat", "WhiteHat", "art/msr/whitehat"),
    ],
  },

  nemixar: {
    index: "02.2",
    title: "Nemixar",
    template: "case",
    tagline: "Social campaigns for Undo Studios, 2024.",
    lead: "Social campaigns made for Undo Studios SA — the first time my drawing had to answer to a metric instead of a mood.",
    body: [LOREM],
    brief: [
      ["Role", "Artist & Media Designer"],
      ["Client", "Undo Studios SA, Milan"],
      ["Period", "June — December 2024"],
      ["Brief", "Build engagement for the game through social channels"],
    ],
    projectsTitle: "The campaigns",
    projects: [
      project("characters", "Characters", "art/nemixar/characters"),
      project("land-invasion", "Land Invasion", "art/nemixar/land-invasion"),
    ],
  },

  personal: {
    index: "02.3",
    title: "Personal Drawings",
    template: "studies",
    tagline: "Drawing when nobody is asking me to draw anything.",
    lead: LOREM_SHORT,
    body: [LOREM],
    projectsTitle: "Characters",
    projects: [
      project("nora", "Nora", "art/personal-drawings/nora"),
      project("genista", "Genista", "art/personal-drawings/genista"),
      project("kurowo", "Kurowo", "art/personal-drawings/kurowo"),
      project("arcaster", "Arcaster", "art/personal-drawings/arcaster"),
      project("non", "Non", "art/personal-drawings/non"),
    ],
    studiesTitle: "Studies",
    studies: [
      { title: "Shading Study", note: LOREM_SHORT, images: pics("art/personal-drawings/shading-study") },
      { title: "Material Study", note: LOREM_SHORT, images: pics("art/personal-drawings/material-study") },
      { title: "Rendering Study", note: LOREM_SHORT, images: pics("art/personal-drawings/rendering-study") },
      { title: "Creature Study", note: LOREM_SHORT, images: pics("art/personal-drawings/creature-study") },
    ],
  },

  ymdir: {
    index: "02.4",
    title: "YMDIR",
    template: "process",
    status: "in development",
    tagline: "The indie game I am making with a team.",
    lead: LOREM_SHORT,
    body: [LOREM],
    brief: [
      ["Team", "Lorem ipsum"],
      ["Role", "Concept art, UI"],
      ["Status", "In development"],
    ],
    // Each pair is one thread of the game read from where it started to where
    // it is now. The Drive folders already come in these pairs.
    pairsTitle: "From first pass to now",
    pairs: [
      {
        title: "Designs",
        note: LOREM,
        before: pics("art/ymdir/old-designs"),
        after: pics("art/ymdir/designs"),
      },
      {
        title: "Map & UI",
        note: LOREM,
        before: pics("art/ymdir/old-ui"),
        after: pics("art/ymdir/map-and-ui"),
      },
      {
        title: "Dice",
        note: LOREM,
        before: pics("art/ymdir/old-dice"),
        after: pics("art/ymdir/dice"),
      },
    ],
    extraTitle: "VFX",
    extra: { note: LOREM_SHORT, images: pics("art/ymdir/vfx") },
  },
};

export const order = ["msr", "nemixar", "personal", "ymdir"];

/* Placeholder dates: every box is positioned on a 10-column year axis with
   --from / --to (grid lines, so a single year is n → n+1). */
export const artTimeline = {
  years: ["2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025", "2026"],
  lanes: [
    {
      name: "MSR",
      items: [
        { from: 5, to: 6, when: "2021", what: "Presentation", where: "Lorem ipsum", href: "art/project.html?s=msr&p=presentation" },
        { from: 6, to: 7, when: "2022", what: "BlackHat", where: "Lorem ipsum", href: "art/project.html?s=msr&p=blackhat" },
        { from: 7, to: 8, when: "2023", what: "GreyHat · WhiteHat", where: "Lorem ipsum", href: "art/msr.html" },
      ],
    },
    {
      name: "Nemixar",
      items: [
        { from: 8, to: 9, when: "2024", what: "Characters · Land Invasion", where: "Undo Studios SA", href: "art/nemixar.html" },
      ],
    },
    {
      name: "Personal",
      items: [
        { from: 1, to: 5, when: "2017 — 2020", what: "Material · Shading studies", where: "Lorem ipsum", href: "art/personal.html#studies" },
        { from: 4, to: 8, when: "2020 — 2023", what: "Nora · Genista · Kurowo", where: "Lorem ipsum", href: "art/personal.html" },
        { from: 8, to: -1, when: "2024 — today", what: "Arcaster · Non", where: "Lorem ipsum", href: "art/personal.html", live: true },
      ],
    },
    {
      name: "YMDIR",
      items: [
        { from: 8, to: 9, when: "2024", what: "Old designs · Old UI", where: "First pass", href: "art/ymdir.html" },
        { from: 9, to: -1, when: "2025 — today", what: "Designs · Map & UI · Dice", where: "In development", href: "art/ymdir.html", live: true },
      ],
    },
  ],
};
