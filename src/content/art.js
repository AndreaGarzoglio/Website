/* Everything the Art pages show lives here, not in the HTML. A collection page
   is the same markup filled with a different entry, so adding a project is
   adding an object, never a file. This file is plain data on purpose:
   webpack.config.js reads it too, to build one page per collection. Pictures
   are named by their Drive folder key and looked up in images.js (see pics.js).

   The texts are drafts written from the pieces themselves: names, years and
   story details are there to be corrected. */

export const intro = {
  index: "02",
  title: "Art",
  lead: "It started with a manga summer school in 2017, and it has not stopped since.",
  body: [
    "What I love most is telling stories. Every character I design comes with a story of its own, worked out before the first sketch: who they are, where they come from, what they want. None of them are made just to fill a page. The costume, the colours and the shapes all grow out of that story, so a design already says something about the person wearing it before anyone reads a word.",
    "Almost everything here went through the same loop: a moodboard and a pile of references, a page of silhouettes, a few sketches that survive, palette explorations, and only then the final render. Event Horizon taught me to trust that process, and working in teams taught me that it is also how other people understand what I am doing. That is why I keep the in-between steps and show them.",
    "The work is split into four collections. MSR is my own universe, and Nemixar holds what I drew during my internship at Undo Studios. Personal Drawings brings together commissions, school projects and the characters I make for myself, and YMDIR is the game I am building with Mad Burger Studio.",
  ],
  stats: [
    ["2017", "first put a pen down, seriously"],
    ["27/30", "Concept Artist, Event Horizon School"],
    ["05+", "years freelancing for clients"],
  ],
};

export const series = {
  msr: {
    index: "02.1",
    title: "MSR",
    tagline:
      "My Subjective Reality: my own universe, introduced by three hackers.",
    cover: "art/msr/presentation",
    // The collection's card on the Art page, laid out like a Code project's.
    card: {
      hue: "#ff4d6a",
      when: "2022 - 2023",
      place: "Event Horizon School",
      flag: "specialization project",
      lead: "My specialization project at Event Horizon, built on a story and characters I have carried with me for years. Three character designs, each with its creative process and a page of details.",
      notes: [
        "Three characters, from sketch to render",
        "A details page for each one",
        "A pitch presentation of the world",
      ],
      tags: ["Character design", "Storytelling", "Worldbuilding", "Pitch"],
    },
    lead: "MSR is the world I keep coming back to. The Hat Hackers are its way in: three characters, three ways of breaking a system.",
    body: [
      "My Subjective Reality started as the comic I have been writing for years. This is the first time I pitched it the way a studio would: a board for the world, then every character through design sheet, turnaround and final render.",
      "The story needed its three leads to read as a set before anyone learned their names, so each one owns a hat, a colour and a symbol. WhiteHat is cold blue light, GreyHat is red and feathers, BlackHat is shadow and gold. The rest of each design grew out of that one decision.",
    ],
    brief: [
      ["Years", "2022 - 2023"],
      ["Role", "Worldbuilding, character design, writing"],
      ["Context", "Personal IP, pitched as a presentation"],
    ],
    projects: [
      {
        id: "presentation",
        title: "Presentation",
        images: "art/msr/presentation",
        note: "The whole pitch, board by board.",
        concept: [
          "Read in order, the deck is the fastest way into MSR: the world of Trinity and its three factions first, then each hacker from character design to turnaround to the final render. I laid it out like a studio document, one idea per board, so it could be read in a meeting as easily as on a screen.",
        ],
        brief: [
          ["Year", "2023"],
          ["Format", "12 presentation boards"],
        ],
      },
      {
        id: "blackhat",
        title: "BlackHat",
        images: "art/msr/blackhat",
        note: "Morgan Blake, and what is left of him.",
        concept: [
          "BlackHat was the hardest of the three to pin down, because he is mostly a threat. I started from the silhouette of a gentleman, suit and hat, and let the armoured form eat into it, so the elegant version and the monstrous one still read as the same person.",
        ],
        brief: [
          ["Year", "2022"],
          ["Medium", "Digital painting"],
        ],
      },
      {
        id: "greyhat",
        title: "GreyHat",
        images: "art/msr/greyhat",
        note: "Brendan Reid: a grin with feathers.",
        concept: [
          "GreyHat is the unpredictable one, so he gets the loudest palette in the set: reds and magentas, broken wings, blades made of the same material as his feathers. The face sheet came first. Everything else had to live up to that grin.",
        ],
        brief: [
          ["Year", "2022"],
          ["Medium", "Digital painting"],
        ],
      },
      {
        id: "whitehat",
        title: "WhiteHat",
        images: "art/msr/whitehat",
        note: "Hiro Akasaki, the one who keeps the lights on.",
        concept: [
          "WhiteHat had to look calm and not quite human at the same time. The helmet is built around a single symbol that repeats on the tome and the halo, and the light is the only warm thing in the design.",
        ],
        brief: [
          ["Year", "2022"],
          ["Medium", "Digital painting"],
        ],
      },
    ],
  },

  nemixar: {
    index: "02.2",
    title: "Nemixar",
    tagline: "Social campaigns for Undo Studios, 2024.",
    cover: "art/nemixar/characters",
    coverPos: "50% 60%",
    card: {
      hue: "#ffd23f",
      when: "Jun - Dec 2024",
      place: "Undo Studios SA, Milan",
      flag: "paid internship",
      lead: "A full-time, paid internship on the game Nemixar. For six months I made the social campaigns, the artwork of the characters and the presentations of new projects, all of it to build engagement around the game.",
      notes: [
        "Social media campaigns",
        "Artwork for the game's characters",
        "Project presentations and a game guide",
      ],
      tags: ["Illustration", "Social media", "Game marketing", "Layout"],
    },
    lead: "Six months of campaigns for Undo Studios SA, the first time my drawing had to answer to a metric instead of a mood.",
    body: [
      "For half of 2024 I was the person turning the game's world into content: one splash illustration per character, the season pass artwork, and a guide for the Land Invasion mode.",
      "The process was different from anything I do for myself. There was a brief, a calendar, and a date on which every piece had to go live, and feedback came back as numbers. I learned to pitch a scene in one thumbnail, to plan the logo and the crop before painting a single stroke, and to let go of a piece once it did its job.",
    ],
    brief: [
      ["Role", "Artist & Media Designer"],
      ["Client", "Undo Studios SA, Milan"],
      ["Period", "June to December 2024"],
      ["Contract", "Paid internship, full time"],
      ["Brief", "Build engagement for the game through social channels"],
    ],
    projects: [
      {
        id: "characters",
        title: "Characters",
        images: "art/nemixar/characters",
        note: "One scene per character, made to stop a scroll.",
        concept: [
          "Each character got a single illustration that had to say who they are before anyone read the name: Cassie caught on a security camera, Captain Bonechuckle on a pirate beach, Flashey in the middle of a heist. I pitched each scene as a thumbnail, sketched it straight to the social format, then rendered with the space for the logo already planned.",
        ],
        brief: [
          ["Year", "2024"],
          ["Medium", "Digital illustration, social formats"],
        ],
      },
      {
        id: "land-invasion",
        title: "Land Invasion",
        images: "art/nemixar/land-invasion",
        note: "A game guide people actually read.",
        concept: [
          "Eight pages covering lore, factions, a quick start and the controls for PC and mobile. Most of the work was editorial: deciding what belongs in a screenshot and what in a sentence, and keeping the layout in the same visual language as the game.",
        ],
        brief: [
          ["Year", "2024"],
          ["Medium", "Layout, illustration, UI"],
        ],
      },
    ],
  },

  personal: {
    index: "02.3",
    title: "Personal Drawings",
    tagline: "Drawing when nobody is asking me to draw anything.",
    cover: "art/personal-drawings/arcaster",
    coverPos: "50% 35%",
    card: {
      hue: "#aa60ff",
      // Framed like its card on the home page.
      frame: "--tint-mix: 9%; --pos: 50% 35%; --zoom: 1.3; --origin: 0% 35%",
      when: "2017 - today",
      place: "Clients, school and my own",
      flag: "ongoing",
      lead: "Commissions for clients, projects from Event Horizon School and drawings I make just for myself. The characters go from inspiration board to final render, and the studies show where the skills came from.",
      notes: [
        "Characters taken from moodboard to render",
        "Commissions and school projects",
        "Shading, material and rendering studies",
      ],
      tags: ["Character design", "Digital painting", "Commissions", "Studies"],
    },
    lead: "The characters I design for myself, and the studies that keep my hands honest.",
    body: [
      "This is where the process shows the most, because nobody asked for any of it. Every character goes through the same stages: an inspiration board and a page of shapes, sketches and lineart, palette explorations, and the final render. I keep all of them here, because the unglamorous steps are the part I am proudest of.",
      "The studies are older and plainer: light on cubes and spheres, the same sphere in eight materials, a portrait pushed until it stops looking flat. They are the reason the characters work.",
    ],
    projects: [
      {
        id: "nora",
        title: "Nora",
        images: "art/personal-drawings/nora",
        note: "A painter who surfs on her own paint.",
        concept: [
          "Nora started from one question: what if a paintbrush were also a vehicle? The silhouettes were all about the oversized trousers and the brush; the palettes were about finding colours that glow against a night sky without turning into a rainbow.",
        ],
        brief: [
          ["Stages", "Inspiration, sketch, palettes, render"],
          ["Medium", "Digital painting"],
        ],
      },
      {
        id: "genista",
        title: "Genista",
        images: "art/personal-drawings/genista",
        note: "Cyberpunk, with something growing through it.",
        concept: [
          "Genista is a study in contrast: hard armour and a plant motif, a cold palette broken by magenta light. I tried a toxic green and a neon cyan version before the red scene settled it.",
        ],
        brief: [
          ["Stages", "Sketch, palettes, render"],
          ["Medium", "Digital painting"],
        ],
      },
      {
        id: "kurowo",
        title: "Kurowo",
        images: "art/personal-drawings/kurowo",
        note: "Adventurer of the Afterworld, and the house he lives in.",
        concept: [
          "Kurowo is a small crow knight with a snail shell for a helmet, designed from shapes first: I wanted him readable as a silhouette before he had a single detail. Then I built his home the same way, from moodboard to thumbnails to a finished environment, to see whether the character's world held up as well as he did.",
        ],
        brief: [
          ["Stages", "Moodboard, shapes, sketch, palettes, render"],
          ["Medium", "Character and environment design"],
        ],
      },
      {
        id: "arcaster",
        title: "Arcaster",
        images: "art/personal-drawings/arcaster",
        note: "A duelist with a sword too big to be polite.",
        concept: [
          "Arcaster came from wanting to paint something darker and more ornate: gothic tailoring, gold trim, and a violet blade that drips light. The inspiration sheet mixes fashion references with armour; the details page is where the costume actually got solved.",
        ],
        brief: [
          ["Stages", "Inspiration, details, render"],
          ["Medium", "Digital painting"],
        ],
      },
      {
        id: "non",
        title: "Non",
        images: "art/personal-drawings/non",
        note: "Modern fantasy: a witch with a very normal bedroom.",
        concept: [
          "Non is my favourite exercise in context. On her own she is a witch with a cursed hand; her room, a cosy mess of fairy lights, books and a summoning circle on the rug, says more about her than any costume could. Both went through moodboard, sketch, palette and final render.",
        ],
        brief: [
          ["Stages", "Moodboard, sketch, palettes, render, room"],
          ["Medium", "Character and interior design"],
        ],
      },
    ],
    studies: [
      {
        id: "shading-study",
        title: "Shading Study",
        note: "Where it started: light on simple shapes, one source at a time.",
        images: "art/personal-drawings/shading-study",
      },
      {
        id: "material-study",
        title: "Material Study",
        note: "Metal, glass, wood, liquid: the same sphere, again and again, until each one reads at a glance.",
        images: "art/personal-drawings/material-study",
      },
      {
        id: "rendering-study",
        title: "Rendering Study",
        note: "Taking a flat colour sketch all the way to a finished portrait.",
        images: "art/personal-drawings/rendering-study",
      },
      {
        id: "creature-study",
        title: "Creature Study",
        note: "Animals that do not exist, built out of animals that do.",
        images: "art/personal-drawings/creature-study",
      },
    ],
  },

  ymdir: {
    index: "02.4",
    title: "YMDIR",
    status: "in development",
    tagline: "The dice roguelike I am making with Mad Burger Studio.",
    cover: "art/ymdir/designs",
    coverAt: 1,
    coverPos: "50% 35%",
    card: {
      hue: "#2fd9ec",
      // Framed like its card on the home page.
      frame: "--pos: 50% 22%; --zoom: 1.28; --origin: -30% 18%",
      when: "2021 - today",
      place: "Mad Burger Studio",
      flag: "in development",
      lead: "A game made with a small team, in constant back and forth with the people who animate, program and balance what I design.",
      notes: [
        "Story and worldbuilding",
        "Enemy and creature design",
        "HUD, map and interface",
        "The dice and their faces",
      ],
      tags: ["Concept art", "Worldbuilding", "UI/UX", "Unreal Engine"],
    },
    lead: "Designing a game from the inside: creatures, dice, map, interface, and the effects that make a hit feel like a hit.",
    body: [
      "YMDIR is where everything I know gets used at once. I design the creatures and the bosses, the dice and their faces, the map and the interface, and I write the world they belong to, in constant back and forth with the people who have to animate, program and balance all of it.",
      "The pages below are organised as before and now, because the most honest way to show a game in development is to show how much it has changed. The first designs were busy and drawn to impress; the current ones are cleaner, readable at a glance on a small screen, and built to be animated in Unreal.",
    ],
    brief: [
      ["Team", "Mad Burger Studio"],
      ["Role", "Concept art, UI/UX, writing"],
      ["Engine", "Unreal Engine"],
      ["Status", "In development"],
    ],
    // Each pair is one thread of the game read from where it started to where
    // it is now. The Drive folders already come in these pairs.
    pairs: [
      {
        id: "designs",
        title: "Designs",
        note: "The bestiary, before and after we knew what the game was. The early creatures were drawn to impress; the new ones are drawn to be read: one strong silhouette, one colour story, and an attack you can guess from the shape.",
        before: "art/ymdir/old-designs",
        after: "art/ymdir/designs",
      },
      {
        id: "map-and-ui",
        title: "Map & UI",
        note: "The first interface was a set of icons; the new one is a map you travel across and a screen that lets the dice do the talking. Most of the iterations here were about taking things away.",
        before: "art/ymdir/old-ui",
        after: "art/ymdir/map-and-ui",
      },
      {
        id: "dice",
        title: "Dice",
        note: "Every skill lives on a die face, so each icon has to work at thumbnail size and still hint at what it does. The old dice were whole objects; the new ones are flat faces in a shared frame, so a player learns the system once.",
        before: "art/ymdir/old-dice",
        after: "art/ymdir/dice",
      },
    ],
    extra: {
      id: "vfx",
      title: "VFX",
      note: "Effect sheets for the enemies: how a hit, a buff or a death looks, step by step, handed to the team as reference for Unreal.",
      images: "art/ymdir/vfx",
    },
  },
};

export const order = ["msr", "nemixar", "personal", "ymdir"];
