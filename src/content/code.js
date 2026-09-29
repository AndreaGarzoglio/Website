/* Everything the Code pages show lives here, not in the HTML. This file is
   plain data on purpose: webpack.config.js reads it too, to build one page per
   project, so it must not import images. Pictures are named by key and looked
   up in media.js (covers, marks) and images.js (the Drive screens, `shots`). */

export const intro = {
  index: "01",
  title: "Code",
  lead: "I started The Odin Project in June 2025 out of curiosity, and stayed for the feeling of building something out of nothing.",
  body: [
    "My creative process did not change when I opened a code editor, it just got a new material. Ten years of art turned out to be surprisingly portable. Designing a creature and designing an interface ask the same question (what does someone understand in the first second?) and the discipline of working to a brief is the same discipline as working to a spec. So I give every project a world of its own: a naval battle staged as a network intrusion, a to-do list run like a bureau of classified case files, a search tree you can watch redraw itself. Underneath the themes I care about the unglamorous parts: logic kept away from the DOM, tests where they earn their keep, and no framework until I understand what it would be doing for me.",
  ],
};

const GH = "https://github.com/AndreaGarzoglio/";
const PAGES = "https://andreagarzoglio.github.io/";

/* In the order they are shown. The first one leads the overview; `practice`
   marks the algorithm and data-structure exercises, which get their own,
   quieter shelf. */
export const projects = [
  {
    id: "game-vault",
    title: "Game Vault",
    tagline: "A tracker for the games I've played and the ones I mean to.",
    lead: "Rate them across several aspects, sort them into tier lists, pull titles straight from the IGDB catalogue. It runs on its own small Node server, so there is no live demo here.",
    repo: `${GH}game-vault`,
    liveNote: "No live demo: this one needs its own server.",
    shots: "code/game-vault",
    shows: ["Working with a REST API", "Keeping an API key server-side", "Data modelling", "Interface design"],
    stack: ["JavaScript ES6", "Node.js", "IGDB API", "REST"],
    notes: [
      ["Why there is a server", "The IGDB catalogue needs an API key, and a key in front-end code is a key you have given away. A small Node server holds it and passes the results on, which is also why this one cannot live on GitHub Pages."],
      ["Rating across aspects", "A single score out of ten never says what was actually good. Games are scored on several aspects and the tier list is built from those."],
    ],
  },
  {
    id: "battleship",
    title: "Battleship",
    tagline: "Classic naval rules staged as a network intrusion.",
    lead: "The game logic lives entirely apart from the DOM, so it could be built and tested before any interface existed, then wired up to three modes: against the computer, hotseat, or the computer playing itself.",
    repo: `${GH}Battleship`,
    live: `${PAGES}Battleship/`,
    shots: "code/battleship-exe",
    shows: ["Logic kept apart from the DOM", "Unit tests with Jest", "A simple computer opponent", "A themed interface"],
    stack: ["JavaScript ES6", "Webpack", "Jest", "GitHub Pages"],
    notes: [
      ["Why the logic comes first", "Ships, boards and turns are plain objects that know nothing about the page. That separation is what made the three game modes cheap to add: the computer playing itself is the same engine with a different caller."],
      ["Tested before it was visible", "Because none of the rules touch the DOM, the whole rulebook is covered by Jest: hits, misses, sunk ships and game over were all passing before the first square was drawn."],
    ],
  },
  {
    id: "todo-list",
    title: "Todo List",
    tagline: "A to-do list disguised as a classified archive.",
    lead: "Projects are drawers, tasks are case files you tag, photograph and stamp closed. Plain ES6 classes over localStorage, no framework.",
    repo: `${GH}to-do-list`,
    live: `${PAGES}to-do-list/`,
    shots: "code/b-d-a",
    shows: ["ES6 classes", "Persistence with localStorage", "Interface as fiction"],
    stack: ["JavaScript ES6", "Classes", "localStorage", "Webpack", "GitHub Pages"],
    notes: [
      ["The fiction is the interface", "Calling a project a drawer and a task a case file is not decoration: it tells you what you can do with it before you read a single label."],
      ["Storage without a backend", "Everything lives in localStorage, serialised from the same classes that run the app, so a reload puts the archive back exactly as you left it."],
    ],
  },
  {
    id: "weather-report",
    title: "Weather Report",
    tagline: "An hour-by-hour curve, an eight-day outlook, and a sky that matches.",
    lead: "Search a city for its temperature curve and forecast, over a live photo of the place pulled from Wikipedia and a sky that animates to match the weather, drawn in CSS rather than video.",
    repo: `${GH}Weather-Report`,
    live: `${PAGES}Weather-Report/`,
    shots: "code/weather-report",
    shows: ["Async data from two APIs", "Handling missing data", "CSS animation"],
    stack: ["JavaScript ES6", "REST APIs", "Wikipedia API", "CSS animation", "GitHub Pages"],
    notes: [
      ["A sky made of CSS", "Rain, cloud and clear sky are CSS, not a video file. It costs a fraction of the bandwidth, it scales to any viewport, and it can be driven straight from the forecast data."],
      ["Two sources, one screen", "The forecast comes from a weather API and the photograph from Wikipedia, which means every city has to survive the case where one of the two has nothing to give."],
    ],
  },
  {
    id: "knight-travails",
    practice: true,
    title: "Knight Travails",
    tagline: "Click two squares and watch the knight take the shortest route.",
    lead: "The path is found with a breadth-first search, and the solver ships with an annotated copy of itself you can read from the page.",
    repo: `${GH}Knight-Travails`,
    live: `${PAGES}Knight-Travails/`,
    shots: "code/knights-travails",
    shows: ["Breadth-first search", "Explaining code in the interface"],
    stack: ["JavaScript ES6", "Breadth-first search", "Graphs", "GitHub Pages"],
    notes: [
      ["Why breadth-first", "A knight's moves are all the same length, so the first time the search reaches a square it has reached it by the shortest route. No weighting, no heuristic, no second pass."],
      ["The code is part of the page", "You can read the annotated solver without leaving the app, which is the point: the algorithm is the thing on display, not the chessboard."],
    ],
  },
  {
    id: "binary-search-trees",
    practice: true,
    title: "Binary Search Trees",
    tagline: "A balanced tree written from scratch, redrawing as you change it.",
    lead: "Insert and delete and watch the diagram rebuild. Commands are split between the ones that change the tree and the ones that only read it.",
    repo: `${GH}Binary-Search-Trees`,
    live: `${PAGES}Binary-Search-Trees/`,
    shots: "code/binary-search-trees",
    shows: ["Recursion", "Self-balancing trees", "Live visualisation"],
    stack: ["JavaScript ES6", "Data structures", "Recursion", "GitHub Pages"],
    notes: [
      ["Seeing the rebalance", "A balanced tree is hard to believe in until you watch it happen. Every insert and delete redraws the diagram, so the rebalancing is the visible part rather than a claim in a comment."],
      ["Readers and writers, kept apart", "Traversals and lookups cannot modify the tree; insert, delete and rebalance can. Keeping the two sets separate is what makes the structure safe to reason about."],
    ],
  },
  {
    id: "hashmap-hashset",
    practice: true,
    title: "HashMap · HashSet",
    tagline: "Two hash tables written from scratch, with a page to poke at them.",
    lead: "A HashMap that stores key-value pairs and a HashSet that only cares whether a key is there, both written bucket by bucket. They grow when the load factor passes its threshold, and a small page lets you add, remove and look things up while the table reshapes itself.",
    repo: `${GH}HashMap-HashSet`,
    live: `${PAGES}HashMap-HashSet/`,
    shots: "code/hashmap-hashset",
    shows: ["Hashing and collisions", "Dynamic resizing", "Designing for data"],
    stack: ["JavaScript ES6", "Hashing", "Data structures", "GitHub Pages"],
    notes: [
      ["Growing on purpose", "When the table gets too full, every entry is rehashed into twice as many buckets. Seeing that happen on the page made the cost of the step concrete in a way reading about it never did."],
      ["Giving a data structure a face", "A hash table has no interface of its own, so I designed one: buckets drawn as rows, collisions stacking visibly, every operation leaving a trace you can read. The design question was the same as for any illustration: what should the eye land on first?"],
    ],
  },
  {
    id: "linked-list",
    practice: true,
    title: "Linked List",
    tagline: "A singly linked list you can insert into and rearrange.",
    lead: "A singly linked list written node by node: append, prepend, insert at an index, remove, find. The page draws every node and every pointer, so rearranging the list is something you watch rather than something you log.",
    repo: `${GH}Linked-List`,
    live: `${PAGES}Linked-List/`,
    shots: "code/linked-list",
    shows: ["Nodes and pointers", "Edge cases first"],
    stack: ["JavaScript ES6", "Data structures", "GitHub Pages"],
    notes: [
      ["Pointers you can see", "The whole point of a linked list is the arrows between the boxes, so the arrows are what the interface draws. Insert in the middle and you watch one pointer let go and two new ones take hold."],
      ["Where the bugs live", "Inserting at index zero, removing the last node, searching an empty list: almost all of the work was in the edges, and each edge case was handled before the interface existed."],
    ],
  },
];

export const toolbox = [
  ["Language", "JavaScript, ES6 modules and classes. HTML and CSS by hand, no UI framework."],
  ["Build", "Webpack and npm scripts, with Babel where the tests need it."],
  ["Testing", "Jest, on the logic that can be separated from the interface."],
  ["Quality", "ESLint and Prettier, run on commit through Husky hooks."],
  ["Data", "REST APIs, localStorage, and a small Node server when a key has to stay private."],
  ["Deploy", "GitHub Pages, published by a GitHub Actions workflow."],
];

/* The Odin Project, in the order the projects were built. Placeholder dates on
   an 8-column axis of two-month steps. */
export const codeTimeline = {
  years: ["06.25", "08.25", "10.25", "12.25", "02.26", "04.26", "06.26", "08.26"],
  lanes: [
    {
      name: "Data structures",
      items: [
        { from: 1, to: 2, when: "06.25", what: "Linked List", where: "First data structure", href: "code/linked-list.html" },
        { from: 2, to: 3, when: "08.25", what: "HashMap · HashSet", where: "Hashing and buckets", href: "code/hashmap-hashset.html" },
        { from: 3, to: 4, when: "10.25", what: "Binary Search Trees", where: "Balancing a tree", href: "code/binary-search-trees.html" },
        { from: 4, to: 5, when: "12.25", what: "Knights Travails", where: "Graph search", href: "code/knight-travails.html" },
      ],
    },
    {
      name: "Apps & games",
      items: [
        { from: 2, to: 4, when: "08.25 - 10.25", what: "B.D.A.", where: "Todo list", href: "code/todo-list.html" },
        { from: 4, to: 6, when: "12.25 - 02.26", what: "Weather Report", where: "Two APIs, one sky", href: "code/weather-report.html" },
        { from: 5, to: 7, when: "02.26 - 04.26", what: "BATTLESHIP.EXE", where: "Logic first, tested", href: "code/battleship.html" },
        { from: 7, to: -1, when: "06.26 - today", what: "Game Vault", where: "Node server, IGDB", href: "code/game-vault.html", live: true },
      ],
    },
  ],
};
