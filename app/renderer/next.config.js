// next.config.js
const withCSS = require("@zeit/next-css");
const withTypescript = require("@zeit/next-typescript");

module.exports = withCSS(
  withTypescript({
    webpack: config =>
      Object.assign(config, {
        target: "electron-renderer",
      }),
  })
);
