/* The pictures behind the code projects, by project id. Kept apart from
   code.js so that file stays plain data webpack.config.js can read. A project
   with no cover here falls back to the first of its screens. */

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
