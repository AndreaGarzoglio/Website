# Andrea Garzoglio · Portfolio

Programmer, illustrator, media designer. This is my personal site: the art I have drawn, the code I have written and my résumé, in English and Italian.

It started as the final project of [The Odin Project](https://www.theodinproject.com/)'s Advanced HTML and CSS course, a personal homepage. It was meant to be a single simple page. It grew into a portfolio for everything I do, built by hand in plain JavaScript, HTML and CSS, with no framework.

## What is on it

- **Home** (`index.html`): who I am, what I can do for a team, a selection of work, an interactive timeline and the full résumé, which also prints cleanly as a PDF.
- **Art** (`art.html` and one page per collection): MSR, my own universe, Nemixar, from my internship at Undo Studios, Personal Drawings, and YMDIR, the indie game I work on with Mad Burger Studio. Every piece opens in a lightbox.
- **Code** (`code.html` and one page per project): eight projects from The Odin Project, from Game Vault and Battleship to the data-structure exercises, plus the timeline of the course.

## Things worth a look

- **An ASCII background that reacts to you.** Every page sits on a field of characters drawn on a canvas. It drifts like a lava lamp, glows and scrambles around the pointer, sends a ripple out on a click, and has a drawing pinned into it: two ghosts on the home, two hands at a keyboard on Code, the hands of the Creation of Adam on Art.
- **One colour per page.** A single `--hue` on each page drives its accents, its glows and the colours of the ASCII field, so a collection or a project always wears its own colour.
- **Two languages, one copy of the page.** The English is written in the pages, the Italian is a dictionary applied to the finished page. A flag in the nav switches between them, and the choice is remembered.
- **Pages built from data.** Every Art and Code page is generated from plain content files, so a new project is an object in a list, not a new file.
- **Light on purpose.** No framework and no UI library. The background repaints only the cells that change, pictures load lazily as WebP, and every animation stands still for anyone who asked their system for reduced motion.

## Getting started

You need [Node.js](https://nodejs.org/) 22 or later.

```bash
npm install
npm run dev
```

The site is then at <http://localhost:8080>. Add `?lang=it` to the address to open it in Italian.

| Command         | What it does                                                                               |
| --------------- | ------------------------------------------------------------------------------------------ |
| `npm run dev`   | Starts the development server with live reload                                             |
| `npm run build` | Writes a production build to `docs/`: minified JavaScript, CSS and HTML, and hashed assets |
| `npm run lint`  | Checks the code with ESLint                                                                |
| `npm test`      | Runs the Jest tests                                                                        |

`webpack.config.js` and `src/layout.js` are only read when the server starts, so restart `npm run dev` after editing either of them, or after adding a page.

## How it is put together

```
src/
├── index.html        the home, written by hand
├── index.js          entry point: starts everything below, in order
├── layout.js         head, nav, subnav and footer of every generated page
├── render.js         fills a generated page from the content files
├── content/
│   ├── art.js        the Art pages: intro, collections, projects, texts
│   ├── code.js       the Code pages: intro, projects, notes, the course timeline
│   ├── media.js      covers, logos and marks used by the cards
│   ├── images.js     every artwork and screenshot (generated, see below)
│   ├── pics.js       looks pieces up in images.js, with names and captions
│   └── it.js         the Italian dictionary
├── i18n.js           applies the Italian to the finished page
├── ascii/
│   ├── engine.js     the ASCII field: noise, pointer glow, ripples, stamps
│   ├── index.js      picks the page's drawing and derives colours from --hue
│   └── themes/       which drawing each section stamps, and where
├── gallery.js        the stage and strip of a project's pieces
├── lightbox.js       the full-screen viewer every gallery opens
├── motion.js         titles typed in through the glyph ramp, scroll reveals
├── folds.js          the résumé's folding sections, links into them, printing
├── path.js           lays out the labels of the Code page's timeline
├── glitch.js         the name that never holds still (WhiteHat, on MSR)
├── fade.js           fades pictures in once they have loaded
├── copy.js           the "copy" button next to the email address
├── html.js           small markup helpers shared by Node and the browser
└── styles.css        the whole stylesheet
scripts/
└── build-images.py   turns the Drive export into web images
```

### Pages

The home is plain HTML in `src/index.html`. Every other page is generated: `webpack.config.js` calls `pages()` in `src/layout.js`, which writes one HTML file per collection and per project with the shared head, nav and footer and an empty `<main data-view>`. In the browser, `src/render.js` reads that view and fills the page from `src/content/`. The home gets the same `<head>` through html-loader, so the script that has to run before the first paint is written once.

### Adding work

- **A code project:** add an object to `projects` in `src/content/code.js` (id, title, tagline, notes, links, `hue`) and its cover to `src/content/media.js`. Its page, its subnav entry and its card appear on their own.
- **An art collection:** add an entry to `series` and its id to `order` in `src/content/art.js`, with a `hue`.
- **Pictures:** artworks come from a Google Drive export. Put it in `raw/`, which stays out of git and mirrors the Drive folders (`Art/<Series>/<Project>/...`, `Code/<Project>/...`), then run:

  ```bash
  python3 scripts/build-images.py
  ```

  It needs Python 3 with [Pillow](https://pypi.org/project/pillow/). For every image it writes a thumbnail and a full-size WebP under `src/assets/work/`, then regenerates `src/content/images.js`. Running it again only encodes what changed and removes what is gone. It is a local tool and the site never runs it.

### Translation

English is the source. `src/content/it.js` maps each English text, exactly as it ends up in the page (an element's inner HTML, markup included, or an attribute), to its Italian. After a page is rendered, `src/i18n.js` swaps in every text it finds a key for. Strings put together in code, like counts and dates, go through `t()` instead.

The language comes from `?lang=` in the address, then the reader's last choice, then the browser's language. Until the Italian is applied the page stays hidden, three seconds at most, so nobody sees the English flash by.

**Editing a text means editing its key in `it.js` too.** On localhost the console lists every text that still has no Italian.

### Colours

Each page has one `--hue`: a default per section in `styles.css`, or the collection's or project's own `hue` from the content files, which `layout.js` sets on `<body>`. Accents, glows and highlighted words are mixed from it, and the ASCII field reads the same value, so the interface and the background always match.

### The ASCII field

`src/ascii/engine.js` draws a grid of characters on a fixed canvas at 30 frames a second. The field comes from warped value noise, and a frame only repaints the cells whose character or colour changed. To stay cheap, the noise is recomputed for a quarter of the rows each frame, rows nothing can have touched are skipped, and the pointer's heat is only computed where it is visible. A click sends out a ring that thickens and scrambles the glyphs without resizing them, so only the cells it crosses are redrawn. The drawings stamped into the grid are plain text files in `src/assets/`, placed by the files in `src/ascii/themes/`.

## Deploying

`npm run build` writes the finished site to `docs/`, ready for any static host. To publish it with GitHub Pages, commit `docs/` and set the repository's Pages source to the `docs` folder of the `main` branch.

## Built with

JavaScript (ES modules), HTML and CSS, bundled with Webpack 5. Jest for tests and ESLint for linting. Prettier formats every commit through Husky and lint-staged. Fonts: Outfit, JetBrains Mono and Doto, from Google Fonts.

## License

The code is released under the ISC license. The artwork, illustrations and screenshots are © Andrea Garzoglio, all rights reserved.
