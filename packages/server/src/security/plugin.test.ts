import Hapi from '@hapi/hapi';
import plugin from './plugin';

describe('Given an auth session strategy', () => {
	test('When the route is requested it gives 401', async () => {
		const server = Hapi.Server();
		await server.register(plugin);

		server.route({
			method: 'get',
			path: '/',
			config: {
				auth: {
					strategy: 'session',
					mode: 'required',
				},
			},
			handler: (request, reply) => 'So secure',
		});

		const result = await server.inject({
			method: 'get',
			url: '/',
		});

		expect(result.statusCode).toEqual(401);
	});
});

describe('Given NO auth session strategy', () => {
	test('When the route is requested it gives 200', async () => {
		const server = Hapi.Server();
		await server.register(plugin);

		server.route({
			method: 'get',
			path: '/',
			handler: (request, reply) => 'So insecure',
		});

		const result = await server.inject({
			method: 'get',
			url: '/',
		});

		expect(result.statusCode).toEqual(200);
	});
});
