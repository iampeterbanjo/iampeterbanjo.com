const Lab = require('@hapi/lab');
const { expect } = require('@hapi/code');
const Hapi = require('@hapi/hapi');

const plugin = require('../../models/plugin');

const lab = Lab.script();
exports.lab = lab;

const { test, suite, beforeEach } = lab;

const Server = async () => {
	const server = Hapi.Server();

	await server.register({
		plugin,
	});

	return server;
};

suite('Given models plugin', () => {
	suite('And registered plugin', () => {
		let server;

		beforeEach(async () => {
			server = await Server();
		});

		test('server.app.db has link', () => {
			expect(server.app.db.link).to.exist();
		});
	});
});
