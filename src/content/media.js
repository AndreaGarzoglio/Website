/* The pictures behind the code projects, by project id, and the marks on the
   Art collections' cards. Kept apart from code.js and art.js so those files
   stay plain data webpack.config.js can read. A project with no cover here
   falls back to the first of its screens. */

import battleship from "../assets/battleship.png";
import gameVault from "../assets/game-vault.png";
import todoList from "../assets/todo-list.png";
import weatherReport from "../assets/weather-report.png";
import knightTravails from "../assets/knight-travails.png";
import binarySearchTrees from "../assets/binary-search-trees.png";

import markBattleship from "../assets/favicon-battleship.svg";
import markGameVault from "../assets/favicon-game-vault.svg";
import markTodoList from "../assets/favicon-todo-list.svg";
import markWeatherReport from "../assets/favicon-weather-report.svg";
import markKnightTravails from "../assets/favicon-knight-travails.svg";
import markBinarySearchTrees from "../assets/favicon-binary-search-trees.svg";

import logoEh from "../assets/cv/eh.png";
import logoNemixar from "../assets/cv/nemixar.png";
import logoGreyhat from "../assets/cv/greyhat-circle.png";
import logoMadburger from "../assets/cv/madburger.png";

export const covers = {
  battleship,
  "game-vault": gameVault,
  "todo-list": todoList,
  "weather-report": weatherReport,
  "knight-travails": knightTravails,
  "binary-search-trees": binarySearchTrees,
};

export const marks = {
  battleship: markBattleship,
  "game-vault": markGameVault,
  "todo-list": markTodoList,
  "weather-report": markWeatherReport,
  "knight-travails": markKnightTravails,
  "binary-search-trees": markBinarySearchTrees,
};

// The mark in the corner of each Art collection's card, and where it leads.
export const artLogos = {
  msr: { src: logoEh, alt: "Event Horizon School", href: "https://www.instagram.com/eventhorizonschool/?hl=en", label: "Event Horizon School on Instagram" },
  nemixar: { src: logoNemixar, alt: "Nemixar", href: "https://nemixar.com/", label: "Nemixar website" },
  personal: { src: logoGreyhat, alt: "GreyHat, from my personal work", href: "https://www.instagram.com/garuzo_msr/", label: "My illustration on Instagram", round: true },
  ymdir: { src: logoMadburger, alt: "Mad Burger Studio", href: "https://www.instagram.com/madburgerstudio/", label: "Mad Burger Studio on Instagram" },
};
