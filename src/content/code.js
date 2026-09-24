/* The Odin Project, in the order the projects were built. Placeholder dates on
   an 8-column axis of two-month steps. */
export const codeTimeline = {
  years: ["06.25", "08.25", "10.25", "12.25", "02.26", "04.26", "06.26", "08.26"],
  lanes: [
    {
      name: "Data structures",
      items: [
        { from: 1, to: 2, when: "06.25", what: "Linked List", where: "Lorem ipsum" },
        { from: 2, to: 3, when: "08.25", what: "HashMap · HashSet", where: "Lorem ipsum" },
        { from: 3, to: 4, when: "10.25", what: "Binary Search Trees", where: "Lorem ipsum", href: "code/binary-search-trees.html" },
        { from: 4, to: 5, when: "12.25", what: "Knights Travails", where: "Lorem ipsum", href: "code/knight-travails.html" },
      ],
    },
    {
      name: "Apps & games",
      items: [
        { from: 2, to: 4, when: "08.25 — 10.25", what: "B.D.A.", where: "Todo list", href: "code/todo-list.html" },
        { from: 4, to: 6, when: "12.25 — 02.26", what: "Weather Report", where: "Lorem ipsum", href: "code/weather-report.html" },
        { from: 5, to: 7, when: "02.26 — 04.26", what: "BATTLESHIP.EXE", where: "Lorem ipsum", href: "code/battleship.html" },
        { from: 7, to: -1, when: "06.26 — today", what: "Game Vault", where: "Lorem ipsum", href: "code/game-vault.html", live: true },
      ],
    },
  ],
};
