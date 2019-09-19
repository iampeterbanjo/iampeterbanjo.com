import Hapi from '@hapi/hapi';

import plugin from './plugin';
import Helpers from './helpers';

import { Api } from '../types';
import { getDbConnection, disconnectAndStopDb } from '../../factory';
import topTracksJson from '../../fixtures/lastfm-topTracks.json';
import { mockModelPlugin, mockKorinPlugin } from '../../factory';
import Agenda from 'agenda';

jest.mock('agenda');

const Server = async () => {
	const server = Hapi.Server({ debug: { request: ['error'] } });

	await server.register(mockModelPlugin);
	await server.register(mockKorinPlugin);

	await server.register({
		plugin,
		options: { getDbConnection, Agenda },
	});

	return server;
};

describe('Given importChartTracks', () => {
	let server: Api;

	beforeAll(async () => {
		server = await Server();

		jest
			.spyOn(server.methods.korin, 'getChartTopTracks')
			.mockResolvedValue(topTracksJson);
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
