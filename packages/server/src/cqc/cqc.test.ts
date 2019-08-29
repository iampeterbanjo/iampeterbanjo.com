import Hapi from '@hapi/hapi';
import Wreck from '@hapi/wreck';
import plugin from '../cqc';

import { makeBdd } from '../../factory';

const { Given, When } = makeBdd({ describe, it });
const server = Hapi.Server();

Given('cqc', () => {
	afterAll(jest.restoreAllMocks);

	When('a request returns, it has response body', async () => {
		const client = Wreck.defaults({ baseUrl: '/' });
		const response = { body: 'Done' };
		jest.spyOn(client, 'get').mockResolvedValue(response);

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
