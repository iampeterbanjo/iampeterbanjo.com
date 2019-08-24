const plugin = require('hapi-dev-errors');

module.exports = {
	plugin,
	options: {
		showErrors: process.env.NODE_ENV !== 'production',
	},
};
