import Rollbar from 'rollbar';
import * as helpers from './helpers';
import env from '@iampeterbanjo/env';

const { preResponse } = helpers;

export default {
	name: 'rollbar',
	version: '1.0.0',
	register: (server, options) => {
		const rollbar = new Rollbar(options);

		server.ext('onPreResponse', (request, h) =>
			preResponse({ request, h, rollbar }),
		);
		server.expose('rollbar', rollbar);
		rollbar.log(`Rollbar: ${env.ENVIRONMENT}`);

		return Promise.resolve();
	},
};
