const plugin = require('hapi-raven');
const { vars } = require('../utils');

module.exports = {
	plugin,
	options: {
		dsn: vars.SENTRY_DSN,
		release: `server@${vars.PACKAGE_VERSION}`,
		environment: vars.ENVIRONMENT,
	},
};
