import Hapi from '@hapi/hapi';
import plugin from './plugin';

const Server = async () => {
	const server = Hapi.Server();
	await server.register({ plugin });

	return server;
};

describe('Givenrollbar plugin', () => {
	describe('GivenGiven plugin', () => {
		it('When server exposes rollbar', async () => {
			const server = await Server();

			expect(server.plugins.rollbar).toBeDefined();
		});
	});
});
