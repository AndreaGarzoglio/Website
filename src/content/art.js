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
    title: "MSR: The Hat Hackers",
    tagline:
      "In My Subjective Reality, reality is code and everyone wants to rewrite it.",
    cover: "art/msr/presentation",
    // The pieces speak for themselves here, so the galleries carry no captions.
    captions: false,
    // The collection's card on the Art page, laid out like a Code project's.
    card: {
      hue: "#ff4d6a",
      when: "May - Jun 2023",
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
    lead: "Reality is code. Everyone wants to be the one who rewrites it.",
    body: [
      "The Hat Hackers was my specialization project at Event Horizon School, a presentation that introduces three characters from My Subjective Reality, the story I have been writing for years. It is set in Trinity, a galaxy turned upside down after a revolution against the Corporate Empire failed. Since then, and nobody can explain why, the people who wanted to change things badly enough have found they can rewrite the laws of reality itself, as if the universe were a program and they had been handed the source code.",
      "I named the three after the way hackers are sorted in the real world. A white hat breaks into systems to protect them, a black hat breaks in to do damage, and a grey hat lives somewhere in between, bending the law whenever it gets in the way of doing the right thing. That map was my starting point, and then I turned it against itself.",
      "Trinity is a dystopia, and in a world run by corporations the rules are part of the problem. Whoever keeps them is helping to hold the cage shut, which makes the one who obeys no better than the one who breaks everything for profit. Of the three, GreyHat is the only one you can root for, and even he is far from clean.",
      "Looking back, it is almost ironic. I drew all of this in 2023, two years before I wrote my first line of code, and I was already building an entire world out of hackers, source code and a reality that runs like a program. Some interests show up long before you have a name for them.",
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
          "The deck starts wide, with the world: Trinity, the revolution that failed and the three forces now pulling reality in different directions. Then it narrows down to one hacker at a time. Each section opens on the render, the first impression, and then moves in closer with a board of details, the props, the face and the small things that make a character feel lived in. It closes on the turnaround, where the design is seen from every side and where I explain the thinking behind each choice.",
        ],
      },
      {
        id: "whitehat",
        title: "WhiteHat",
        images: "art/msr/whitehat",
        note: "A revolutionary who lost, and went to work for the winners.",
        concept: [
          'Twenty years ago <span class="glitch" data-glitch="Hiro Akasaki" role="img" aria-label="a name you cannot quite read">H▒r░ ▓k▒s░k█</span> believed the world could be changed. The revolution failed, and something in him broke along with it. Now he serves the same corporations he once fought, a phantom agent who keeps the truth buried by rewriting what people remember. He prays constantly, and it has little to do with faith: prayer is the one place where he does not have to look at what he has become.',
          "His design had to feel like a man who has stopped feeling anything. He is austere and still, and he stands almost like a machine waiting for orders. That is why he is perfectly symmetrical, from the helmet to the hem of the coat, with nothing out of place and nothing human left to break the pattern. The armour was the hardest part of the whole project, plate after plate that had to look engineered and still read clearly at a glance.",
          "The idea I am proudest of is the mask. Because he can make people forget, it never looks the same twice. Look away for a moment, look back, and you could swear it was different, as if your memory of it had already been taken. The details board shows it in several versions, and all of them are his.",
        ],
      },
      {
        id: "greyhat",
        title: "GreyHat",
        images: "art/msr/greyhat",
        note: "The mentor who never quite grew up.",
        concept: [
          "Brendan Reid is one of the heroes of the story, which does not mean he has his life together. He was one of the leaders of the revolution that failed, and he has been waiting for the right moment to start another one ever since.",
          "I wanted him to flip the classic mentor around. He has the experience, he knows the system and he is the one guiding the protagonists, but the lessons go both ways and he has as much to learn from them as they do from him. He is getting close to middle age and is still a young rebel at heart, loyal to a time that has already moved on without him.",
          "My favourite piece of his design is the wings. Each metal feather can come loose and fold like origami into a weapon, and there is no telling which one: a blade, a gun or, if luck turns, a spoon. Not even he knows what he is going to get. For someone who lives on risk and bets, it is the only way of fighting that makes sense.",
        ],
      },
      {
        id: "blackhat",
        title: "BlackHat",
        images: "art/msr/blackhat",
        note: "He wants everyone to become one, and that one is him.",
        concept: [
          "If the other two are shades of grey, Morgan Blake is the dark at the bottom of the story. He is a manipulator who talks of ascension and union, and his power does exactly what it promises: it hacks into people's minds, wipes away who they were and folds what is left into himself. His victims go back to their lives wearing their own faces, until the day they no longer need them.",
          "For his look I went to the uncanny valley, the faces horror uses so well because they are almost right. Everything about him reads as human at first, and the longer you look the more something feels off: the smile holds a little too long, the skin looks like it could crack. I wanted him to be someone you recognise as a person and still want to step away from.",
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
      "What you find here is not everything I made in those six months. A big part of the job was posts made to get people talking and interacting, useful for the pages but not much to look at as drawings. I left those out and kept the illustration work, the pieces where the drawing itself was the point.",
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
          "tnbp-ninjasfin": ["Season Pass", "The artwork for the Season Pass. These characters came to me without a story, so giving each of them a personality was my job, and here it had to come through in a pose and a sky full of coins."],
          "tnsp-cassie": ["Cassie", "Cassie, caught on a security camera halfway through a piece of graffiti. She knows the camera is there and does not care."],
          "tnsp-cpt-bonechuckle": ["Captain Bonechuckle", "Captain Bonechuckle on a beach at sunset, sword drawn and treasure at his feet, with his parrot keeping watch over both."],
          "tnsp-cunny-molly": ["Cunny Molly", "Cunny Molly in the desert, a gunslinger who throws her bullets like knives."],
          "tnsp-flashey": ["Flashey", "Flashey slipping out of a back alley with a handful of coins, all style and no alibi."],
          "tnsp-iappo": ["Iappo", "Iappo on top of a crate with a flag in his hand, leading a crowd that would follow him anywhere."],
          "tnsp-nyxia": ["Nyxia", "Nyxia deep in a dark forest, pulling spells out of the air."],
          "tnsp-ramon": ["Ramon", "Ramon dancing between the lasers on his way to the gem, with a rose between his teeth."],
        },
        concept: [
          "This set was a challenge of its own, because these characters came to me with no context at all. There was no story behind them and no notes on who they were, so I had to give them a personality myself, and every pose, setting and expression had to build one from nothing.",
          "That was also the best part of the job. With nothing to stay faithful to, I was free to choose how to approach each one and what kind of person they would be. I pitched every scene as a thumbnail, sketched it straight in the social format, and rendered it with the space for the logo already planned.",
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
          "The idea was to make it feel like the booklet you found inside a PS1 or PS2 game, the one you read on the way home before you could even play. I laid it out in spreads, and in the middle of each one, where the pages meet, I drew the staples holding the booklet together, so even on a screen it looks like something you could hold.",
          "Inside there are eight pages of lore, factions, a quick start and the controls for PC and mobile. Most of the work was editorial: deciding what belongs in a screenshot and what in a sentence, and keeping the layout in the same visual language as the game.",
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
    lead: "Some were homework, some were paid for, some were just for me. Every one of them got a story.",
    body: [
      "This collection mixes three kinds of work: drawings I made for myself, commissions for clients, and the projects I did at Event Horizon School. The briefs could not have been more different, but the way I start never changes. Every character gets a story before it gets a shape.",
      "Each one goes through the same stages: an inspiration board, sketches, palette explorations and the final render. I keep all of them here, because the steps nobody usually sees are the part I am proudest of.",
      "Under the characters are the studies, the exercises that taught me to give a flat drawing volume, weight and light. They are the reason the characters work.",
    ],
    projects: [
      {
        id: "arcaster",
        title: "Arcaster",
        images: "art/personal-drawings/arcaster",
        note: "A perfect gentleman, with a demon's arm under the cloak.",
        concept: [
          "Arcaster started as a fantasy character design for Event Horizon, and at first the brief threw me. Back then cyberpunk was my genre, the one I knew inside out, and fantasy felt like someone else's territory. I had to find my own way in, and in the end I did.",
          "I wanted someone charismatic and impeccably dressed, a gentleman in every detail, with something he would rather you did not see. Under his cloak he keeps a demonic arm hidden, and in his hand he carries a sword forged in hell. The whole character lives in that contrast between the polished outside and the dark side underneath.",
          "I liked this gentleman with a dark side so much that I did not want to leave him on the page. He became my character in a Pathfinder 2 campaign, a magus who fights with abyssal magic.",
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
          "Genista is the protagonist of MSR, my own story. This is an old design, drawn years ago, and she has changed a lot since then. Looking at it now feels a bit like finding an old photo of a friend.",
          "I made it for Event Horizon, where this time the brief asked for a cyberpunk character. That was my genre, and the hero of my story was still waiting for a face, so I took the chance.",
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
          "For this Event Horizon brief I had to design a student at a school of magic, and her dorm room along with her. Non studies potions above everything else, and she tests them on the one subject always at hand: herself.",
          "I wanted her to be a rebel. She has to wear the uniform, so she changed everything she could get away with, bending the dress code just enough to make it feel like hers without getting punished for it.",
          "Magic is not the only thing she loves. Her clothes and her room are full of pop culture references, all the things she cares about outside of class, so the room tells you who she is before she says a word.",
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
          "Another Event Horizon brief, this time a cartoon character and his home. I liked the idea of setting the sweetness of a small cartoon animal against the most terrible place I could think of: the end of the world, after a nuclear holocaust.",
          "I did not stop at one drawing. I wrote a whole story around him, with other characters he is tied to, and his house became a piece of that world.",
          "It was an unusual one for me, because I had never tried cartoon before. I was learning the style while I was already using it.",
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
          "Nora is another cartoon character, this time finished in cell shading. She is also a nod to a character from my story, retold as a cartoon and in a much brighter key.",
          "I imagined her as the protagonist of a platform game: an artist who rides her own brushstrokes, with a little light bulb companion that stands for an idea.",
        ],
        brief: [
          ["Stages", "Inspiration, sketch, palettes, details, render"],
          ["Medium", "Digital painting, cell shading"],
        ],
      },
    ],
    studies: [
      {
        id: "shading-study",
        title: "Shading Study",
        note: "From light on a cube to a face that has volume.",
        concept: [
          "A study of digital shading I did with Event Horizon. I started from zero, with light on cubes and spheres one source at a time, and step by step I got to characters that feel three dimensional.",
        ],
        images: "art/personal-drawings/shading-study",
      },
      {
        id: "material-study",
        title: "Material Study",
        note: "Steel, liquid, wood, paper, glass: each one until it reads at a glance.",
        concept: [
          "I tried to make every material as realistic as I could. It was one of the most important exercises I have done, and I put it to work straight away on the potion.",
        ],
        images: "art/personal-drawings/material-study",
      },
      {
        id: "rendering-study",
        title: "Rendering Study",
        note: "Taking a flat drawing and making it feel solid.",
        concept: [
          "Exercises I did on my own, to learn how to turn a 2D drawing into something that looks three dimensional. It opens with a portrait painted from a photo.",
        ],
        images: "art/personal-drawings/rendering-study",
        first: "portrait-from-photo",
      },
      {
        id: "creature-study",
        title: "Creature Study",
        note: "Animals that do not exist, built out of animals that do.",
        concept: [
          "Every creature here is built on animal anatomy I studied first, so even the strangest one stands and moves like something that could be alive. From there I pushed in different directions: an arctic predator and its prey, designed for the same frozen world, and two chimeras, each one made of two different animals.",
          "The last one is a horror creature, and it stands for the paralysing fear of having to make a choice. It is a deer frozen in the middle of a motorway, caught in the headlights. Its antlers branch out like the paths it could take, and every branch grows back into it and wounds it. It is the last one I made, but it opens the set, because it is the one that matters most to me.",
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
