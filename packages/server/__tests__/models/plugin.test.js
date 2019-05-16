const Lab = require('@hapi/lab');
const { expect } = require('@hapi/code');
const Hapi = require('@hapi/hapi');

const plugin = require('../../models/plugin');

const lab = Lab.script();
exports.lab = lab;

const { test, suite, before } = lab;

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

		before(async () => {
			server = await Server();
		});

		test('server.app.db.korin has link', () => {
			expect(server.app.db.korin.link).to.exist();
		});

		test('server.app.db.korin has TopTrack model', () => {
			expect(server.app.db.korin.TopTrack.modelName).to.equal('TopTrack');
		});
	});
});
