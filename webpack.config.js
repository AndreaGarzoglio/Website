import path from "node:path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";

import { pages, head } from "./src/layout.js";

/* The home page is written by hand; every Art and Code page is generated from
   src/content/ through src/layout.js, so adding a project or a collection
   there adds its page here. Restart the dev server after editing layout.js or
   the page list: webpack only reads this file once. */
const generated = pages();
const FAVICON = "./src/assets/favicon.svg";

/* `npm run dev` serves a development build; `npm run build` writes a
   production one to docs/: minified, without the eval source maps that make a
   development bundle slow to start. The stylesheet is a real file linked from
   <head> in both, so a page never shows unstyled and the crossfade between
   pages (styles.css) is known before the page first paints. */
export default (env, argv) => {
  const dev = argv.mode === "development";
  return {
    mode: dev ? "development" : "production",
    entry: "./src/index.js",
    output: {
      filename: "main.js",
      // The Italian dictionary is its own file (it.js), which the inline
      // script in <head> preloads by name for an Italian reader.
      chunkFilename: "[name].js",
      path: path.resolve(import.meta.dirname, "docs"),
      clean: true,
    },
    devtool: dev ? "eval-source-map" : false,
    // "..." keeps webpack's own JS minifier; the stylesheet is minified too.
    optimization: { minimizer: ["...", new CssMinimizerPlugin()] },
    devServer: {
      watchFiles: ["./src/index.html"],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/index.html",
        filename: "index.html",
        favicon: FAVICON,
      }),
      ...generated.map(
        ({ filename, html }) =>
          new HtmlWebpackPlugin({
            templateContent: html,
            filename,
            favicon: FAVICON,
          }),
      ),
      new MiniCssExtractPlugin(),
    ],
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
        },
        {
          test: /\.html$/i,
          loader: "html-loader",
          options: {
            preprocessor: (html) => html.replace(/ *<!-- head:.*-->/, head("")),
          },
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
};
