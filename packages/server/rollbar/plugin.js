const Rollbar = require('rollbar');
const { preResponse } = require('./helpers');
const { vars } = require('../utils');

module.exports = {
	name: 'rollbar',
	version: '1.0.0',
	register: (server, options) => {
		const rollbar = new Rollbar(options);

		server.ext('onPreResponse', (request, h) =>
			preResponse({ request, h, rollbar })
		);
		server.expose('rollbar', rollbar);
		rollbar.log(`Rollbar: ${vars.ENVIRONMENT}`);

		return Promise.resolve();
	},
};
