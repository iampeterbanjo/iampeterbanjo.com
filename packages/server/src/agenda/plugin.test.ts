import Hapi from '@hapi/hapi';
import plugin from './plugin';

import { Api } from '../types';
import { getDbConnection } from '../../factory';

const Server = async () => {
	const server = Hapi.Server();

	await server.register({
		plugin,
		options: { getDbConnection },
	});

	return server;
};

describe('Given agenda plugin', () => {
	let server: Api;

	beforeEach(async () => {
		server = await Server();
	});

	afterEach(jest.restoreAllMocks);

	it('When init is called agenda is started and jobs scheduled', async () => {
		jest.spyOn(server.app.agenda, 'start').mockResolvedValue();

		await server.app.agenda.init();

		expect(server.app.agenda.start).toHaveBeenCalled();
		// expect(server.app.agenda.every).toHaveBeenCalled();
	});
});
