import "./styles.css";
import { initAsciiField } from "./ascii/index.js";
import { initMotion } from "./motion.js";

const field = document.querySelector(".ascii-field");
if (field) initAsciiField(field);
initMotion();
