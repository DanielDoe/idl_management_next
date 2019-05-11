const withImages = require('next-images');
const withCss = require('@zeit/next-css');
const withLess = require('@zeit/next-less');

module.exports = withLess(withImages(
	withCss({
		webpack: config =>
			Object.assign(config, {
				target: 'electron-renderer',
			}),
		exportPathMap: async function() {
			return {
				'/home': { page: '/home' },
				'/dashboard': { page: '/dashboard' },
			};
		},
	})
));
