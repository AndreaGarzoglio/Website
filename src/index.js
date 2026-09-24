import "./styles.css";
import { initAsciiField } from "./ascii/index.js";

const field = document.querySelector(".ascii-field");
if (field) initAsciiField(field);
