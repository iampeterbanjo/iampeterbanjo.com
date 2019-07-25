const plugin = require('./plugin');

module.exports = {
	plugin,
	options: {
		accessToken: 'POST_SERVER_ITEM_ACCESS_TOKEN',
		captureUncaught: true,
		captureUnhandledRejections: true,
	},
};
