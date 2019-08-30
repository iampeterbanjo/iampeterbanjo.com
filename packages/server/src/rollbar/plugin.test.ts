import Hapi from '@hapi/hapi';
import plugin from './plugin';

import { makeBdd } from '../../factory';
const { Given, When } = makeBdd({ describe, it });

const Server = async () => {
	const server = Hapi.Server();
	await server.register({ plugin });

	return server;
};

Given('rollbar plugin', () => {
	Given('Given plugin', () => {
		When('server exposes rollbar', async () => {
			const server = await Server();

			expect(server.plugins.rollbar).toBeDefined();
		});
	});
});
