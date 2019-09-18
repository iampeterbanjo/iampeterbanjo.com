import Hapi from '@hapi/hapi';
import plugin from './plugin';
import { Api } from '../types';
import {
	getDbConnection,
	disconnectAndStopDb,
	mockModelPlugin,
	mockKorinPlugin,
} from '../../factory';

const Server = async () => {
	const server = Hapi.Server();

	await server.register(mockModelPlugin);
	await server.register(mockKorinPlugin);

	await server.register({
		plugin,
		options: { getDbConnection },
	});

	return server;
};

describe('Given agenda plugin', () => {
	let server: Api;

	beforeAll(async () => {
		server = await Server();
	});

	afterAll(async () => {
		await disconnectAndStopDb();
	});

	afterEach(jest.restoreAllMocks);

	it('When init is called agenda is started and jobs scheduled', async () => {
		jest
			.spyOn(server.app.agenda, 'database')
			.mockImplementation(() => undefined as any);
		jest.spyOn(server.app.agenda, 'start').mockImplementation();
		jest.spyOn(server.app.agenda, 'every').mockImplementation();

		await server.app.agenda.init();

		expect(server.app.agenda.start).toHaveBeenCalled();
		expect(server.app.agenda.every).toHaveBeenCalled();
	});
});
