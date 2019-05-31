const Hapi = require('@hapi/hapi');
const Lab = require('@hapi/lab');
const { expect } = require('@hapi/code');

const plugin = require('../../pipeline/plugin');
const korinPlugin = require('../../korin/plugin');
const factory = require('../factory');

const lab = Lab.script();
const { test, suite } = lab;

exports.lab = lab;

const Server = async () => {
	const server = Hapi.Server();

	await server.register({
		plugin,
	});

	return server;
};

// suite('Given pipeline plugin', () => {
// 	suite('And registered plugin and methods', () => {
// 		test('top tracks are saved to db', async () => {
// 			const server = await Server();
// 			await factory.mock.method({
// 				server,
// 				name: 'korin.getTopTracks',
// 				plugin: korinPlugin,
// 			});

// 			const result = server.app.db.pipeline.TopTracks.find({});
// 			expect(result.length).to.equal(50);
// 		});
// 	});
// });
