/// <reference types="@types/jest" />

import fastify from 'fastify';
import { database, migrations } from '.';
import { getDbConnection, testServerConfig } from '../fixtures';
import path from 'path';
import umzug, { UmzugOptions } from 'umzug';

const testMigrationPath = path.join(__dirname, '../fixtures');
const Server = async () => {
	const server = fastify(testServerConfig);
	const options: UmzugOptions = {
		storage: 'json',
		storageOptions: {
			path: testMigrationPath,
		},
	};
	await server.register(database, { getDbConnection });
	await server.register(migrations, options);
	await server.ready();

	return server;
};

describe(`Given migrations`, () => {
	test(`When "migrations" are decorated on the server`, async () => {
		const server = await Server();

		expect(server.hasDecorator('migrations')).toBeTruthy();
		expect(server.migrations).toBeInstanceOf(umzug);
	});

	test(`When migrations run there are no errors`, async () => {
		const server = await Server();

		await expect(server.migrations.up()).resolves.not.toThrow();
	});
});
