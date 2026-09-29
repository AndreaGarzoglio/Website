import path from "node:path";
import HtmlWebpackPlugin from "html-webpack-plugin";

import { pages } from "./src/layout.js";

/* The home page is written by hand; every Art and Code page is generated from
   src/content/ through src/layout.js, so adding a project or a collection
   there adds its page here. Restart the dev server after editing layout.js or
   the page list — webpack only reads this file once. */
const generated = pages();
const FAVICON = "./src/assets/favicon.svg";

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
    watchFiles: ["./src/index.html"],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "./src/index.html", filename: "index.html", favicon: FAVICON }),
    ...generated.map(
      ({ filename, html }) =>
        new HtmlWebpackPlugin({ templateContent: html, filename, favicon: FAVICON }),
    ),
  ],
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
