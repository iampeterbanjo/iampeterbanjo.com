import Hapi from '@hapi/hapi';

import plugin from './plugin';
import Helpers from './helpers';

import { getDbConnection, disconnectAndStopDb } from '../../factory';
import modelsPlugin from '../models/plugin';
import rawTopTracks from '../../fixtures/rawTopTracks.json';

const Server = async () => {
	const server = Hapi.Server({ debug: { request: ['error'] } });
	const connection = await getDbConnection();

	await server.register({
		plugin,
	});

	await server.register({
		plugin: modelsPlugin,
		options: { connection },
	});

	return server;
};

describe('Given importChartTracks', () => {
	let server;

	beforeAll(async () => {
		server = await Server();

		server.methods.korin = {
			getChartTopTracks: jest.fn().mockResolvedValue(rawTopTracks),
		};
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
