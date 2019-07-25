const Rollbar = require('rollbar');

module.exports = {
	name: 'rollbar',
	version: '1.0.0',
	register: (server, options) => {
		const rollbar = new Rollbar(options);

		const preResponse = (request, h) => {
			const { response } = request;

			if (!response.isBoom) {
				return h.continue;
			}

			const cb = rollbarErr => {
				if (rollbarErr) {
					rollbar.log(`Error reporting to rollbar, ignoring: ${rollbarErr}`);
				}
			};

			const error = response;

			if (error instanceof Error) {
				rollbar.error(error, request, cb);
			} else {
				rollbar.error(`Error: ${error}`, request, cb);
			}

			return h.continue;
		};

		server.ext('onPreResponse', preResponse);
		server.expose('rollbar', rollbar);
		rollbar.log('Rollbar: next');

		return Promise.resolve();
	},
};
