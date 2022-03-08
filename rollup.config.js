/*
 * @Author: weicong
 * @LastEditors: weicong
 * @Description:
 * @Date: 2022-03-02 21:44:09
 * @LastEditTime: 2022-03-05 21:30:57
 */
import babel from "rollup-plugin-babel";
import { terser } from "rollup-plugin-terser";
import html from "rollup-plugin-generate-html-template";
import { version } from "./package.json";
export default {
  input: "./main.js",
  output: {
    file: "./dist/bundle.js",
    format: "esm", // amd、cjs、esm、iife、umd、system
    // name: "Reative", // iife 和 umd 最好需要指定下
    sourcemap: true,
    banner: `/*! Reactive Version ${version} */`,
    footer: "/* follow me on github! @szmxx */",
  },
  plugins: [
    babel({
      exclude: "**/node_modules/**",
    }),
    html({
      template: "index.html",
      target: "dist/index.html",
    }),
    terser(),
  ],
};
