const plugin = require('hapi-sentry');
const { vars } = require('../utils');

module.exports = {
	plugin,
	options: {
		baseUri: vars.BASE_URL,
		client: {
			dsn: vars.SENTRY_DSN,
			release: `server@${vars.PACKAGE_VERSION}`,
		},
	},
};
