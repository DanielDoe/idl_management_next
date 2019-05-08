// fix: prevents error when .css files are required by node
if (typeof require !== 'undefined') {
	require.extensions['.css'] = file => {};
}

const withCss = require('@zeit/next-css');
const withLess = require('@zeit/next-less');
const withImages = require('next-images');
const withPlugins = require("next-compose-plugins")

module.exports = withPlugins(
  [
    withLess,
    withCss,
    withImages
  ],
  {
    webpack: config =>
      Object.assign(config, {
        target: 'electron-renderer',
      }),
    exportPathMap: async function() {
      return {
        '/home': { page: '/home' },
      };
    },
  },
);

