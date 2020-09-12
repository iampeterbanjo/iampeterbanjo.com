/// <reference types="@types/jest" />
/// <reference types="../order-service" />

import fastify, { FastifyInstance } from 'fastify';
import { getDbConnection, testServerConfig } from '../fixtures';
import database from './database';

const Server = async () => {
	const server = fastify(testServerConfig);
	await server.register(database, { getDbConnection });

	return server;
};

describe('Given database plugin', () => {
	let server: FastifyInstance;

	beforeEach(async () => {
		server = await Server();
		await server.ready();
	});

	test('When registered `mongodb` is decorated', async () => {
		expect(server.mongodb).toBeDefined();
	});

	test('When registered `Order` model is decorated', async () => {
		expect(server.models.Order).toBeDefined();
	});

	test('When registered `Migration` model is decorated', async () => {
		expect(server.models.Migration).toBeDefined();
	});

	test('When registered `Store` model is decorated', async () => {
		expect(server.models.Store).toBeDefined();
	});
});
