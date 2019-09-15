import Hapi from '@hapi/hapi';

import plugin from './plugin';
import Helpers from './helpers';

import { getDbConnection, disconnectAndStopDb } from '../../factory';
import rawTopTracks from '../../fixtures/rawTopTracks.json';
import { mockModelPlugin, mockKorinPlugin } from '../../factory';

const Server = async () => {
	const server = Hapi.Server({ debug: { request: ['error'] } });

	await server.register({
		plugin,
		options: { getDbConnection },
	});

	await server.register(mockModelPlugin);
	await server.register(mockKorinPlugin);

	return server;
};

describe('Given importChartTracks', () => {
	let server: Api;

	beforeAll(async () => {
		server = await Server();

		jest
			.spyOn(server.methods.korin, 'getChartTopTracks')
			.mockResolvedValue(rawTopTracks as any);
	});

	afterAll(async () => {
		await disconnectAndStopDb();
	});

	it('When called it should use korin.getChartTopTracks', async () => {
		const helpers = new Helpers(server);

		await helpers.importChartTracks();

		expect(server.methods.korin.getChartTopTracks).toHaveBeenCalled();
	});
});
