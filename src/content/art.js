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
    "What I love most is <strong>telling stories</strong>. Every character starts with one, worked out before the first sketch: who they are, where they come from, what they want. Costume, colours and shapes grow out of it, so the design speaks before anyone reads a word.",
    "Almost everything here went through the same <strong>process</strong>: moodboard and references, silhouettes, sketches, palettes, and only then the render. Event Horizon taught me to trust it, and teamwork taught me it's how others understand my ideas, so I show the in-between steps too.",
    "Four collections: <strong>MSR</strong>, my own universe, <strong>Nemixar</strong>, from my internship at Undo Studios, <strong>Personal Drawings</strong>, with commissions, school projects and my own characters, and <strong>YMDIR</strong>, the game I'm making with Mad Burger Studio.",
  ],
  stats: [
    ["2017", "first put pen to paper, seriously"],
    ["27/30", "Concept Artist, Event Horizon School"],
    ["05+", "years freelancing for clients"],
  ],
};

// Each collection's `hue` is its page's colour, and its card's on the Art
// overview and the home.
export const series = {
  msr: {
    index: "02.1",
    title: "MSR: The Hat Hackers",
    tagline:
      "In My Subjective Reality, reality is code and everyone wants to rewrite it.",
    cover: "art/msr/presentation",
    // The pieces speak for themselves here, so the galleries carry no captions.
    captions: false,
    hue: "#d4d7de",
    // Each hacker's name, painted in their own colour wherever it appears.
    names: { WhiteHat: "#4d8dff", BlackHat: "#ffd23f", GreyHat: "#ff4d6a" },
    // The collection's card on the Art page, laid out like a Code project's.
    card: {
      when: "May - Jun 2023",
      place: "Event Horizon School",
      flag: "specialization project",
      lead: "My specialization project at Event Horizon, built on a story I've carried for years: three <strong>character designs</strong>, each with its process and a page of details.",
      notes: [
        "Three characters, from sketch to render",
        "A details page for each one",
        "A pitch presentation of the world",
      ],
      tags: ["Character design", "Storytelling", "Worldbuilding", "Pitch"],
    },
    lead: "Reality is code. Everyone wants to be the one who rewrites it.",
    body: [
      "<strong>The Hat Hackers</strong> was my specialization project at Event Horizon: three characters from <strong>My Subjective Reality</strong>, the story I've been writing for years. It's set in Trinity, a galaxy upended by a failed revolution against the Corporate Empire. Since then, those who wanted change badly enough can <strong>rewrite reality</strong>, as if the universe were a program and they held the source code.",
      "Their names come from how hackers are sorted: a <strong>white hat</strong> breaks in to protect, a <strong>black hat</strong> to do damage, a <strong>grey hat</strong> bends the law to do the right thing. That was my starting point, and then I turned it upside down.",
      "Trinity is a dystopia where the rules are part of the problem: whoever keeps them helps hold the cage shut, so obeying is no better than destroying for profit. Of the three, <strong>GreyHat</strong> is the only one worth rooting for, and even he is far from clean.",
      "Almost ironic: I drew all this in 2023, <strong>two years before my first line of code</strong>, and I was already building a world of hackers and a reality that runs like a program. Some interests show up long before they have a name.",
    ],
    brief: [
      ["Year", "2023, May to June"],
      ["Role", "Concept artist"],
      ["Context", "Specialization project, Event Horizon School"],
      ["Sketch & lineart", "Procreate"],
      ["Rendering & layout", "Photoshop"],
    ],
    projects: [
      {
        id: "presentation",
        title: "Presentation",
        images: "art/msr/presentation",
        note: "Twelve boards, built to read like the opening of a story.",
        concept: [
          "The deck opens on the world: Trinity, the failed revolution, three forces pulling reality apart. Then it focuses on <strong>one hacker at a time</strong>: the render first, then a board of details, and finally the <strong>turnaround</strong>, where I explain the thinking behind each choice.",
        ],
      },
      {
        id: "whitehat",
        title: "WhiteHat",
        images: "art/msr/whitehat",
        note: "A revolutionary who lost, and went to work for the winners.",
        concept: [
          "Twenty years ago <span class=\"glitch\" data-glitch=\"Hiro Akasaki\" role=\"img\" aria-label=\"a name you cannot quite read\">H▒r░ ▓k▒s░k█</span> believed the world could change. The revolution failed, and something in him broke with it. Now he serves the corporations he fought, a phantom agent who <strong>rewrites memories</strong> to keep the truth buried. He prays constantly, not out of faith: prayer is the only place where he doesn't have to face what he has become.",
          "His design had to show a man who has <strong>stopped feeling</strong>: austere, still, standing like a machine awaiting orders. So he is perfectly <strong>symmetrical</strong>, helmet to hem, with nothing human to break the pattern. The armour was the hardest part, plate after plate, engineered yet readable at a glance.",
          "The idea I'm proudest of is the <strong>mask</strong>. Since he can make people forget, it never looks the same twice: look away, look back, and you'd swear it changed. The details board shows several versions, all of them his.",
        ],
      },
      {
        id: "greyhat",
        title: "GreyHat",
        images: "art/msr/greyhat",
        note: "The mentor who never quite grew up.",
        concept: [
          "<strong>Brendan Reid</strong> is one of the heroes, which doesn't mean he has his life together. A leader of the failed revolution, he's been waiting ever since for the right moment to start another.",
          "I wanted to flip the <strong>classic mentor</strong>. He has the experience and guides the protagonists, but he has as much to learn from them as they do from him. Nearing middle age, he's still a young rebel at heart, loyal to a time that has moved on.",
          "My favourite part is the <strong>wings</strong>: each metal feather can fold like origami into a weapon, a blade, a gun or, if luck turns, a spoon. Not even he knows which. For someone who lives on <strong>risk</strong>, it's the only way to fight that makes sense.",
        ],
      },
      {
        id: "blackhat",
        title: "BlackHat",
        images: "art/msr/blackhat",
        note: "He wants everyone to become one, and that one is him.",
        concept: [
          "If the other two are shades of grey, <strong>Morgan Blake</strong> is the dark at the bottom of the story. A manipulator preaching ascension and union, his power <strong>hacks into minds</strong>, erases who people were and absorbs what's left. His victims go home wearing their own faces, until they no longer need them.",
          "For his look I drew on the <strong>uncanny valley</strong>, the almost-right faces horror uses so well. He reads as human at first, but the longer you look, the more feels off: a smile held too long, skin that could crack.",
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
    hue: "#ffd23f",
    card: {
      when: "Jun - Dec 2024",
      place: "Undo Studios SA, Milan",
      flag: "paid internship",
      lead: "Six months, paid and full-time, on the game Nemixar: <strong>social campaigns</strong>, character artwork and presentations of new projects.",
      notes: [
        "Social media campaigns",
        "Artwork for the game's characters",
        "Project presentations and a game guide",
      ],
      tags: ["Illustration", "Social media", "Game marketing", "Layout"],
    },
    lead: "Six months of campaigns for Undo Studios SA, the first time my drawing answered to a metric instead of a mood.",
    body: [
      "For half of 2024 I turned the game's world into content: a <strong>splash illustration</strong> per character, the Season Pass artwork and a guide to the Land Invasion mode.",
      "A different process from my own work: a brief, a calendar, a go-live date, and feedback in numbers. I learned to pitch a scene in <strong>one thumbnail</strong>, plan logo and crop before the first stroke, and <strong>let go</strong> of a piece once it did its job.",
      "Not everything from those months is here. Many posts were made to get people talking, useful for the pages but not much as drawings. I kept the <strong>illustration work</strong>, where the drawing was the point.",
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
        // Each piece's name and caption on the stage, by file id.
        pieces: {
          "tnbp-ninjasfin": ["Season Pass", "The Season Pass artwork. These characters came without a story, so giving them a personality was up to me, here through a pose and a sky full of coins."],
          "tnsp-cassie": ["Cassie", "Cassie, caught on a security camera halfway through a piece of graffiti. She knows the camera is there and does not care."],
          "tnsp-cpt-bonechuckle": ["Captain Bonechuckle", "Captain Bonechuckle on a beach at sunset, sword drawn and treasure at his feet, with his parrot keeping watch over both."],
          "tnsp-cunny-molly": ["Cunny Molly", "Cunny Molly in the desert, a gunslinger who throws her bullets like knives."],
          "tnsp-flashey": ["Flashey", "Flashey slipping out of a back alley with a handful of coins, all style and no alibi."],
          "tnsp-iappo": ["Iappo", "Iappo on top of a crate with a flag in his hand, leading a crowd that would follow him anywhere."],
          "tnsp-nyxia": ["Nyxia", "Nyxia deep in a dark forest, pulling spells out of the air."],
          "tnsp-ramon": ["Ramon", "Ramon dancing between the lasers on his way to the gem, with a rose between his teeth."],
        },
        concept: [
          "A challenge of its own: these characters arrived with <strong>no context</strong>, no story and no notes, so every pose, setting and expression had to build a personality from nothing.",
          "It was also the best part: with nothing to stay faithful to, I was <strong>free</strong> to decide who each one would be. Every scene started as a thumbnail, sketched straight in the social format, with room for the logo already planned.",
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
        note: "A game manual like the ones that used to come in the case.",
        concept: [
          "The idea was the <strong>booklet</strong> inside a PS1 or PS2 case, the one read on the way home before playing. I laid it out in spreads and drew the <strong>staples</strong> where the pages meet, so even on a screen it looks like something to hold.",
          "Eight pages of lore, factions, a quick start and controls for PC and mobile. Most of the work was <strong>editorial</strong>: choosing what goes in a screenshot and what in a sentence, in the game's own visual language.",
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
    hue: "#aa60ff",
    card: {
      // Framed like its card on the home page.
      frame: "--tint-mix: 9%; --pos: 50% 35%; --zoom: 1.3; --origin: 0% 35%",
      when: "2017 - today",
      place: "Clients, school and my own",
      flag: "ongoing",
      lead: "Commissions, Event Horizon projects and drawings just for me. Characters from <strong>moodboard to render</strong>, and the studies behind the skills.",
      notes: [
        "Characters taken from moodboard to render",
        "Commissions and school projects",
        "Shading, material and rendering studies",
      ],
      tags: ["Character design", "Digital painting", "Commissions", "Studies"],
    },
    lead: "Some were homework, some were paid for, some were just for me. Every one of them got a story.",
    body: [
      "Three kinds of work: drawings for myself, client commissions and Event Horizon projects. The briefs couldn't be more different, but I always start the same way: every character gets a <strong>story</strong> before it gets a shape.",
      "Each goes through the same stages: moodboard, sketches, palettes, final render. I keep them all, because the <strong>steps nobody sees</strong> are what I'm proudest of.",
      "Below the characters are the <strong>studies</strong>, the exercises that taught me volume, weight and light. They're why the characters work.",
    ],
    projects: [
      {
        id: "arcaster",
        title: "Arcaster",
        images: "art/personal-drawings/arcaster",
        note: "A perfect gentleman, with a demon's arm under the cloak.",
        concept: [
          "Arcaster began as a <strong>fantasy</strong> brief for Event Horizon, and at first it threw me: cyberpunk was my genre, fantasy felt like someone else's territory. I had to find my own way in, and I did.",
          "A charismatic, impeccably dressed <strong>gentleman</strong> with something to hide: a <strong>demonic arm</strong> under the cloak and a sword forged in hell. The whole character lives in that contrast.",
          "I liked him so much that he became my character in a <strong>Pathfinder 2</strong> campaign, a magus fighting with abyssal magic.",
        ],
        brief: [
          ["Brief", "Fantasy character, Event Horizon School"],
          ["Stages", "Inspiration, details, render"],
          ["Medium", "Digital painting"],
        ],
      },
      {
        id: "genista",
        title: "Genista",
        images: "art/personal-drawings/genista",
        note: "The protagonist of MSR, as she looked years ago.",
        concept: [
          "<strong>Genista</strong> is the protagonist of MSR. This is an old design, and she has changed a lot since: looking at it feels like finding an old photo of a friend.",
          "The Event Horizon brief asked for a <strong>cyberpunk</strong> character, my genre, and the hero of my story still needed a face, so I took the chance.",
        ],
        brief: [
          ["Brief", "Cyberpunk character, Event Horizon School"],
          ["Stages", "Sketches, palettes, details, render"],
          ["Medium", "Digital painting"],
        ],
      },
      {
        id: "non",
        title: "Non",
        images: "art/personal-drawings/non",
        note: "A potion student who bends the dress code just far enough.",
        concept: [
          "This brief asked for a student at a <strong>school of magic</strong>, and her dorm room. Non studies potions above all, and tests them on the one subject always at hand: herself.",
          "She's a <strong>rebel</strong>: forced into a uniform, she changed everything she could get away with, bending the dress code just enough to make it hers.",
          "Her clothes and her room are full of <strong>pop culture</strong> references, so the room says who she is before she does.",
        ],
        brief: [
          ["Brief", "Magic school student and her room, Event Horizon School"],
          ["Stages", "Inspiration, sketches, palettes, render, room"],
          ["Medium", "Character and interior design"],
        ],
      },
      {
        id: "kurowo",
        title: "Kurowo",
        images: "art/personal-drawings/kurowo",
        note: "Something adorable, at the end of the world.",
        concept: [
          "Another brief, a <strong>cartoon</strong> character and his home. I set the sweetness of a small animal against the worst place I could imagine: the end of the world, after a nuclear holocaust.",
          "I didn't stop at one drawing: I wrote a <strong>whole story</strong> around him, and his house became part of that world.",
          "My first try at cartoon: I was learning the style while using it.",
        ],
        brief: [
          ["Brief", "Cartoon character and his home, Event Horizon School"],
          ["Stages", "Inspiration, sketches, palettes, render, house"],
          ["Medium", "Character and environment design"],
        ],
      },
      {
        id: "nora",
        title: "Nora",
        images: "art/personal-drawings/nora",
        note: "A platformer hero, with a light bulb for an idea.",
        concept: [
          "Another cartoon character, this time in <strong>cel shading</strong>, and a nod to a character from my story, retold in a much brighter key.",
          "The hero of a <strong>platform game</strong>: an artist who rides her own brushstrokes, with a little light bulb companion standing for an idea.",
        ],
        brief: [
          ["Stages", "Inspiration, sketch, palettes, details, render"],
          ["Medium", "Digital painting, cel shading"],
        ],
      },
    ],
    studies: [
      {
        id: "shading-study",
        title: "Shading Study",
        note: "From light on a cube to a face that has volume.",
        concept: [
          "A <strong>digital shading</strong> study with Event Horizon: from light on cubes and spheres, one source at a time, to characters that feel three dimensional.",
        ],
        images: "art/personal-drawings/shading-study",
      },
      {
        id: "material-study",
        title: "Material Study",
        note: "Steel, liquid, wood, paper, glass: each one until it reads at a glance.",
        concept: [
          "Every <strong>material</strong> as realistic as I could make it. One of my most important exercises, put to work straight away on the potion.",
        ],
        images: "art/personal-drawings/material-study",
      },
      {
        id: "rendering-study",
        title: "Rendering Study",
        note: "Taking a flat drawing and making it feel solid.",
        concept: [
          "Exercises on my own, turning a <strong>2D drawing</strong> into something that looks solid. It opens with a portrait painted from a photo.",
        ],
        images: "art/personal-drawings/rendering-study",
        first: "portrait-from-photo",
      },
      {
        id: "creature-study",
        title: "Creature Study",
        note: "Animals that do not exist, built out of animals that do.",
        concept: [
          "Every creature is built on real <strong>animal anatomy</strong>, so even the strangest stands and moves as if alive: an arctic predator and its prey, and two <strong>chimeras</strong>, each made of two animals.",
          "The last is a horror creature: the <strong>paralysing fear of choosing</strong>. A deer frozen on a motorway in the headlights, its antlers branching like the paths it could take, every branch growing back to wound it. It opens the set because it matters most to me.",
        ],
        images: "art/personal-drawings/creature-study",
        first: "choice",
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
    hue: "#2fd9ec",
    card: {
      // Framed like its card on the home page.
      frame: "--pos: 50% 22%; --zoom: 1.28; --origin: -30% 18%",
      when: "2021 - today",
      place: "Mad Burger Studio",
      flag: "in development",
      lead: "A game made with a small team, in constant dialogue with the people who <strong>animate, program and balance</strong> what I design.",
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
      "In YMDIR I use <strong>everything I know</strong>: creatures and bosses, dice, map and interface, and the world they belong to, in constant dialogue with the people who animate, program and balance it.",
      "The page follows the game as it grew: early concepts first, many later cut, then the approved designs, the <strong>map</strong> and the <strong>dice</strong> the whole system turns on.",
    ],
    brief: [
      ["Team", "Mad Burger Studio"],
      ["Role", "Concept art, UI/UX, writing"],
      ["Engine", "Unreal Engine"],
      ["Status", "In development"],
    ],
    projects: [
      {
        id: "old-designs",
        title: "Old Designs",
        images: "art/ymdir/old-designs",
        // The first Kra'khom is shown beside the new one instead.
        skip: ["kah-krom"],
        collage: true,
        note: "Creatures that never made it into the game, and sketches that got others started.",
        concept: [
          "Much of what I drew never reached the final game, and that's part of the job: creatures that were <strong>cut</strong>, or changed so much nothing of the first design was left.",
          "Other times I made <strong>preliminary designs</strong>, a first idea to give direction to the artists who would finish it. Together they show how much the game changed before it found its look.",
        ],
      },
      {
        id: "krakhom",
        title: "Kra’khom",
        images: "art/ymdir/designs",
        only: ["kra-khom", "kra-khom-ta"],
        note: "The Shaman of Misery, drawn again for the game he ended up in.",
        concept: [
          "Kra’khom is one of the creatures I followed from the start. The first version was a <strong>crow riding a tangle of ghosts</strong>. The new one stands alone, with robe and staff, and the <strong>green</strong> of his magic still ties the two together.",
          "The design comes with its turnaround, so he can be modelled and animated from every side.",
        ],
        before: {
          images: "art/ymdir/old-designs",
          only: ["kah-krom"],
          note: "The first Kra’khom, from the early days of the game.",
        },
      },
      {
        id: "approved-designs",
        title: "Approved Designs",
        images: "art/ymdir/designs",
        only: ["wolf", "boar", "props"],
        note: "The wolf, the boar and the props, as they went into the game.",
        concept: [
          "Approved designs, now in production. Each creature reads in a second on a small screen: one strong <strong>silhouette</strong>, one palette, an attack you can guess from the shape. The props follow the same rules, so everything belongs to one world.",
        ],
      },
      {
        id: "map",
        title: "Map",
        images: "art/ymdir/map-and-ui",
        first: "ymdir-map",
        note: "The land of Ymdir, and the way a player moves across it.",
        concept: [
          "The map came straight from the <strong>worldbuilding</strong>: I had already written where the story happens and how each place connects, so drawing Ymdir was more translating than inventing. Mount Riamtal, the Swamp of Misery and the Tekalach Valley had a history before they had a shape.",
          "A game map is something you <strong>use</strong>, not just look at, so I designed how a region opens into a path of stops, with icons that tell the player what's waiting before they choose.",
        ],
      },
    ],
    // Read from where it started to where it is now, all of it at once.
    pairs: [
      {
        id: "dice",
        title: "Dice",
        note: "Every skill lives on a <strong>die face</strong>, so each icon must work small and hint at what it does. The old dice were separate designs. The new ones put every skill in a <strong>shared frame</strong>, so the system is learned once.",
        before: "art/ymdir/old-dice",
        after: "art/ymdir/dice",
      },
    ],
    extra: {
      id: "vfx",
      title: "VFX",
      note: "Enemy effect sheets: how a hit, a buff or a death looks, step by step, as reference for Unreal.",
      images: "art/ymdir/vfx",
    },
  },
};

export const order = ["msr", "nemixar", "personal", "ymdir"];
