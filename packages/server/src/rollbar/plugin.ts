import Rollbar from 'rollbar';
import * as helpers from './helpers';
import utils from '../utils';

const { vars } = utils;
const { preResponse } = helpers;

export const name = 'rollbar';
export const version = '1.0.0';
export const register = (server, options) => {
	const rollbar = new Rollbar(options);

	server.ext('onPreResponse', (request, h) =>
		preResponse({ request, h, rollbar }),
	);
	server.expose('rollbar', rollbar);
	rollbar.log(`Rollbar: ${vars.ENVIRONMENT}`);

	return Promise.resolve();
};
