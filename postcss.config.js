// postcss.config.js

const tailwindcss = require("tailwindcss");

const purgecss = require("@fullhuman/postcss-purgecss")({
  content: ["./public/index.html", "./src/**/*.svelte", "./src/**/*.html"],
  defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || [],
  safelist: [/^.[^\.]*\.[^\. "']*/g, /^origin-/]
});

module.exports = {
  plugins: [
    tailwindcss("./tailwind.config.js"),

    ...(process.env.NODE_ENV === "production" ? [purgecss] : [])
  ]
};