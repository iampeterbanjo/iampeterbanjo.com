import Hapi from '@hapi/hapi';
import plugin from './plugin';
import Agenda from 'agenda';
import securityPlugin from '../security';
import * as routes from './routes';

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

	await server.register(securityPlugin);
	await server.register(mockModelPlugin);
	await server.register(mockKorinPlugin);
	await server.register({
		plugin,
		options: { getDbConnection, Agenda },
	});

	return server;
};

describe('Given scheduler plugin', () => {
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

describe('Given scheduler plugin And no authentication', () => {
	let server: Api;

	beforeAll(async () => {
		server = await Server();
	});

	afterAll(async () => {
		await disconnectAndStopDb();
		jest.restoreAllMocks();
	});

	it('When GET /projects/agenda/jobs response is 401', async () => {
		const result = await server.inject(routes.get_jobs());

		expect(result.statusCode).toEqual(401);
	});
});
