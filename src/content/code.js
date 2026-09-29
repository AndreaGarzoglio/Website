/* Everything the Code pages show lives here, not in the HTML. This file is
   plain data on purpose: webpack.config.js reads it too, to build one page per
   project, so it must not import images. Pictures are named by key and looked
   up in media.js (covers, marks) and images.js (the Drive screens, `shots`). */

export const intro = {
  index: "01",
  title: "Code",
  lead: "I write the logic myself, from an empty file, and I let AI handle the work I already know how to do.",
  body: [
    "Every project on this page is plain JavaScript, HTML and CSS. No framework, no UI library, no package doing the thinking for me. The game engine behind Battleship, the storage layer of the to-do list, the linked list, the hash map, the tree that rebalances itself: I wrote all of that logic by hand, line by line, from scratch. It is slower, and that is the point. I want to understand what every piece does before I let a tool do it for me, so that when I do reach for React I will know exactly what it is saving me from.",
    "I do use large language models, and I think learning to direct them well is part of the job now, especially on a team where speed matters. But you can only direct what you understand, so I keep one rule: the reasoning stays mine. I hand the AI the repetitive work I have already done by hand many times (boilerplate, renaming across files, formatting data, a first draft of tests I have already designed) and I read everything that comes back. The structure, the algorithms and the decisions about where the logic lives are things I work out myself. It makes me faster without making me dependent.",
  ],
};

export const GH = "https://github.com/AndreaGarzoglio/";
const PAGES = "https://andreagarzoglio.github.io/";

/* In the order they are shown. `practice` marks the algorithm and
   data-structure exercises, which get their own, quieter shelf. */
export const projects = [
  {
    id: "game-vault",
    // The four apps are shown as résumé-style cards, each in its own colour.
    hue: "#a855f7",
    when: "Feb - Sep 2026",
    origin: "Began as the Library project",
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
    hue: "#6366f1",
    when: "Jul - Sep 2026",
    origin: "Final JavaScript project",
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
    hue: "#c0503c",
    when: "Mar - Sep 2026",
    origin: "Began as the Todo List project",
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
    hue: "#38bdf8",
    when: "Apr - Sep 2026",
    origin: "Began as the Weather App project",
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

/* The path so far, one stage per section of the curriculum. Every stage
   draws its own small timeline: a bar per part of the course and a dot per
   project, on an axis that runs from the stage's first day to its last.
   Dates are "YYYY-MM" (the 1st) or "YYYY-MM-DD", and only approximate;
   "today" follows the calendar. A project with a page here links to it,
   the rest link to their repository. */
const TOP = "https://www.theodinproject.com/paths/";

export const path = [
  {
    title: "Start of the journey",
    from: "2025-05",
    to: "2025-07",
    text: [
      "I started the way a lot of people do: a few Udemy courses, a folder full of JavaScript exercises, and the constant feeling that everybody else had understood something I had missed. I learned the theory and did the exercises, scared and confused by nearly all of it, until I found The Odin Project.",
    ],
    tracks: [
      { name: "Udemy courses", from: "2025-05", to: "2025-07" },
      {
        name: "JavaScript exercises",
        from: "2025-05-20",
        to: "2025-07",
        points: [{ at: "2025-07", label: "Found The Odin Project", href: TOP }],
      },
    ],
  },
  {
    title: "Foundations",
    from: "2025-07",
    to: "2025-11",
    link: `${TOP}foundations/courses/foundations`,
    text: [
      "The Odin Project gave me what the courses had not: an order. One thing, then the next, at a pace that made sense, with a project at the end of every section to prove I had actually learned it rather than just read it. For the first time the confusion had a shape, and a shape is something you can work through.",
    ],
    tracks: [
      {
        name: "HTML Foundations",
        from: "2025-07",
        to: "2025-08",
        points: [{ at: "2025-08", label: "Recipes", repo: "odin-recipes" }],
      },
      {
        name: "CSS Foundations · Flexbox",
        from: "2025-08",
        to: "2025-09",
        points: [{ at: "2025-09", label: "Landing Page", repo: "landing-page" }],
      },
      {
        name: "JavaScript Basics",
        from: "2025-09",
        to: "2025-11",
        points: [
          { at: "2025-09-22", label: "Rock Paper Scissors", repo: "rock-paper-scissors" },
          { at: "2025-10-14", label: "Etch-a-Sketch", repo: "etch-a-sketch" },
          { at: "2025-10-30", label: "Calculator", repo: "calculator" },
        ],
      },
    ],
  },
  {
    title: "Intermediate HTML and CSS",
    from: "2025-11",
    to: "2026-01-15",
    link: `${TOP}full-stack-javascript/courses/intermediate-html-and-css`,
    text: [
      "More complex, and much more rewarding. Units, positioning, custom properties, forms, grid: this is where CSS stopped being a list of properties to remember and became a way of thinking about layout. The admin dashboard at the end was the first thing I built that looked like a real product.",
    ],
    tracks: [
      { name: "Intermediate HTML", from: "2025-11", to: "2025-11-10" },
      { name: "Intermediate CSS", from: "2025-11-10", to: "2025-12-05" },
      {
        name: "Forms",
        from: "2025-12-05",
        to: "2025-12-22",
        points: [{ at: "2025-12-22", label: "Sign-up Form", repo: "sign-up-form" }],
      },
      {
        name: "Grid",
        from: "2025-12-22",
        to: "2026-01-15",
        points: [{ at: "2026-01-15", label: "Admin Dashboard", repo: "admin-dashboard" }],
      },
    ],
  },
  {
    title: "JavaScript",
    from: "2026-01-15",
    to: "2026-08-15",
    link: `${TOP}full-stack-javascript/courses/javascript`,
    text: [
      "Then the difficulty spiked, hard. Objects and classes, modules and webpack, asynchronous code, testing, recursion, data structures, one after the other. For seven months most weeks felt like hell, and more than once I was stuck on a single problem for days. I kept going, one project at a time, and it is the part of this path I am proudest of.",
    ],
    tracks: [
      {
        name: "Organizing your code",
        from: "2026-01-15",
        to: "2026-03-15",
        points: [
          { at: "2026-02-01", label: "Library", project: "game-vault" },
          { at: "2026-02-18", label: "Tic Tac Toe", repo: "Tic-Tac-Toe" },
          { at: "2026-03-02", label: "Restaurant Page", repo: "restaurant-page" },
          { at: "2026-03-15", label: "Todo List", project: "todo-list" },
        ],
      },
      { name: "JavaScript in the real world", from: "2026-03-15", to: "2026-04-05" },
      {
        name: "Asynchronous JS and APIs",
        from: "2026-04-05",
        to: "2026-05",
        points: [{ at: "2026-05", label: "Weather App", project: "weather-report" }],
      },
      {
        name: "Testing",
        from: "2026-05",
        to: "2026-06",
        points: [{ at: "2026-05-18", label: "Testing Practice", repo: "testingPractice" }],
      },
      {
        name: "Computer science",
        from: "2026-06",
        to: "2026-07-05",
        points: [
          { at: "2026-06-06", label: "Recursion", repo: "Recursion" },
          { at: "2026-06-13", label: "Linked List", project: "linked-list" },
          { at: "2026-06-20", label: "HashMap", project: "hashmap-hashset" },
          { at: "2026-06-27", label: "Binary Search Trees", project: "binary-search-trees" },
          { at: "2026-07-05", label: "Knights Travails", project: "knight-travails" },
        ],
      },
      { name: "Intermediate Git", from: "2026-07-05", to: "2026-07-20" },
      {
        name: "Finishing up",
        from: "2026-07-20",
        to: "2026-08-15",
        points: [{ at: "2026-08-15", label: "Battleship", project: "battleship" }],
      },
    ],
  },
  {
    title: "Making them mine",
    from: "2026-08-15",
    to: "2026-09-15",
    text: [
      "Before moving on I went back to the projects and rebuilt them into apps I would actually want to use: a real interface, a theme and a small story for each one, and the fixes I had kept putting off. This is where my years as an artist and media designer finally got to do their job. The library became Game Vault, the to-do list became a bureau of classified files, the weather app got a sky of its own.",
    ],
    tracks: [
      {
        name: "Redesign and polish",
        from: "2026-08-15",
        to: "2026-09-15",
        points: [
          { at: "2026-08-22", label: "Game Vault", project: "game-vault" },
          { at: "2026-08-29", label: "B.D.A.", project: "todo-list" },
          { at: "2026-09-05", label: "Weather Report", project: "weather-report" },
          { at: "2026-09-12", label: "BATTLESHIP.EXE", project: "battleship" },
        ],
      },
    ],
  },
  {
    title: "Advanced HTML and CSS",
    from: "2026-09-15",
    to: "today",
    link: `${TOP}full-stack-javascript/courses/advanced-html-and-css`,
    ticks: ["2026-09-15", "2026-09-22"],
    text: [
      "Animation, accessibility and responsive design, the last pieces of CSS I was missing. The project that closes this course is a personal homepage, and you are looking at it: this site is that project, grown into a portfolio for everything I do.",
    ],
    tracks: [
      { name: "Animation", from: "2026-09-15", to: "2026-09-18" },
      { name: "Accessibility", from: "2026-09-18", to: "2026-09-23" },
      {
        name: "Responsive design",
        from: "2026-09-23",
        to: "today",
        points: [{ at: "today", label: "Homepage: this site", href: "index.html" }],
      },
    ],
  },
];

// What is left of the path, shown after it without dates.
export const nextUp = {
  text: "React is where I will finally find out what a framework does for me, now that I have done all of it by hand.",
  courses: ["React", "Databases", "NodeJS"],
};
