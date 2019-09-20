import Hapi from '@hapi/hapi';
import Wreck from '@hapi/wreck';
import plugin from './plugin';

describe('cqc', () => {
	afterAll(jest.restoreAllMocks);

	test('When a request returns, it has response body', async () => {
		const client = Wreck.defaults({ baseUrl: '/' });
		const response = { body: 'Done' };
		jest.spyOn(client, 'get').mockResolvedValue(response);

		const server = Hapi.Server();
		server.register({
			plugin,
			options: { client },
		});

		const { result } = await server.inject({
			method: 'GET',
			url: '/cqc/providers',
		});

		expect(result).toEqual(response.body);
	});
});
