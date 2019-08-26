const Hapi = require('@hapi/hapi');
const { expect } = require('@hapi/code');
const Lab = require('@hapi/lab');

const plugin = require('../plugin');

export const lab = Lab.script();
const { test, suite } = lab;



const Server = async () => {
	const server = Hapi.Server();

	await server.register({
		plugin,
	});

	return server;
};

suite('rollbar plugin', () => {
	suite('Given plugin', () => {
		test('server exposes rollbar', async () => {
			const server = await Server();

			expect(server.plugins.rollbar).to.exist();
		});
	});
});
