import "./styles.css";
import { initAsciiField } from "./ascii/index.js";
import { initMotion } from "./motion.js";
import { renderPage } from "./render.js";
import { initLightbox } from "./lightbox.js";

const field = document.querySelector(".ascii-field");
if (field) initAsciiField(field);
renderPage();
initLightbox();
initMotion();
