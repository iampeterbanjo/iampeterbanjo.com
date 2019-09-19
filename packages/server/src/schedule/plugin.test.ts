import Hapi from '@hapi/hapi';
import plugin from './plugin';
import Agenda from 'agenda';

import { Api } from '../types';
import {
	getDbConnection,
	disconnectAndStopDb,
	mockModelPlugin,
	mockKorinPlugin,
} from '../../factory';

const mockStart = jest.fn();
const mockDefine = jest.fn();
const mockEvery = jest.fn();
jest.mock('agenda', () => {
	return jest.fn().mockImplementation(() => {
		return {
			start: mockStart,
			define: mockDefine,
			every: mockEvery,
		};
	});
});

const Server = async () => {
	const server = Hapi.Server();

	await server.register(mockModelPlugin);
	await server.register(mockKorinPlugin);

	await server.register({
		plugin,
		options: { getDbConnection, Agenda },
	});

	return server;
};

describe.only('Given scheduler plugin', () => {
	let server: Api;

	beforeAll(async () => {
		server = await Server();
	});

	afterAll(async () => {
		await disconnectAndStopDb();
		jest.restoreAllMocks();
	});

	it('When scheduler.init is called agenda is started and jobs scheduled', async () => {
		await server.app.scheduler.init();

		expect(mockStart).toHaveBeenCalled();
		expect(mockEvery).toHaveBeenCalled();
	});
});
