const Hapi = require('@hapi/hapi');
const Lab = require('@hapi/lab');
const { expect } = require('@hapi/code');

const plugin = require('../../pipeline/plugin');
const methods = require('../../pipeline/methods');
const korinPlugin = require('../../korin/plugin');
const modelsPlugin = require('../../models/plugin');
const factory = require('../factory');

const lab = Lab.script();
const { test, suite } = lab;

exports.lab = lab;

const Server = async () => {
	const server = Hapi.Server();

	await server.register({
		plugin,
		options: { methods },
	});

	await server.register({
		plugin: modelsPlugin,
	});

	await factory.mock.method({
		server,
		name: 'korin.getTopTracks',
		plugin: korinPlugin,
	});

	return server;
};

suite('Given pipeline plugin', () => {
	suite('And extractRawTopTracks, models, korin plugins', () => {
		test('raw top tracks are saved to db', async () => {
			const server = await Server();

			await server.methods.pipeline.extractRawTopTracks(server);

			const result = await server.app.db.pipeline.TopTracksRaw.find({});
			expect(result.length).to.equal(50);
		});
	});
});
