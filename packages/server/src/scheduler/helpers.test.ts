import Hapi from '@hapi/hapi';

import plugin from './plugin';
import Helpers from './helpers';

import securityPlugin from '../security';
import { Api } from '../types';
import { getDbConnection, disconnectAndStopDb } from '../../factory';
import topTracksJson from '../../fixtures/lastfm-topTracks.json';
import {
	mockModelPlugin,
	mockKorinPlugin,
	mockPipelinePlugin,
} from '../../factory';
import Agenda from 'agenda';

jest.mock('agenda');

const Server = async () => {
	const server = Hapi.Server({ debug: { request: ['error'] } });

	await server.register(securityPlugin);
	await server.register(mockModelPlugin);
	await server.register(mockKorinPlugin);
	await server.register(mockPipelinePlugin);

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
		jest.spyOn(server.methods.pipeline, 'saveRawTopTracks');
	});

	afterAll(async () => {
		await disconnectAndStopDb();
	});

	test('When called it should use pipeline.saveRawTopTracks', async () => {
		const helpers = new Helpers(server);

		await helpers.importChartTracks();

		expect(server.methods.pipeline.saveRawTopTracks).toHaveBeenCalled();
	});
});
