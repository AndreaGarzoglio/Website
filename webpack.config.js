import path from "node:path";
import HtmlWebpackPlugin from "html-webpack-plugin";

/* Every page in the site. Keep this list in sync with src/**.html — it drives
   both the build output and what the dev server watches. */
const pages = [
  "index.html",
  "code.html",
  "art.html",
  "code/battleship.html",
  "code/game-vault.html",
  "code/todo-list.html",
  "code/weather-report.html",
  "code/knight-travails.html",
  "code/binary-search-trees.html",
  "art/msr.html",
  "art/personal.html",
  "art/nemixar.html",
  "art/ymdir.html",
  "art/project.html",
];

export default {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(import.meta.dirname, "docs"),
    clean: true,
  },
  devtool: "eval-source-map",
  devServer: {
    watchFiles: ["./src/**/*.html"],
  },
  plugins: pages.map(
    (page) =>
      new HtmlWebpackPlugin({
        template: `./src/${page}`,
        filename: page,
      }),
  ),
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
        type: "asset/resource",
      },
      {
        test: /\.txt$/i,
        type: "asset/source",
      },
    ],
  },
};
