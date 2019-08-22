const Hapi = require('@hapi/hapi');
const Lab = require('@hapi/lab');
const { expect } = require('@hapi/code');
const sinon = require('sinon');
const DatabaseCleaner = require('database-cleaner');
const R = require('ramda');

const factory = require('../factory');
const plugin = require('../../pipeline/plugin');
const routes = require('../../pipeline/routes');
const methods = require('../../pipeline/methods');
const korinPlugin = require('../../korin/plugin');
const modelsPlugin = require('../../models/plugin');
const topTracksData = require('../fixtures/lastfm-topTracks.json');

const lab = Lab.script();
const { test, suite, before, after } = lab;

exports.lab = lab;

const databaseCleaner = new DatabaseCleaner('mongodb');

const Server = async () => {
	const server = Hapi.Server();

	await server.register({
		plugin,
		options: { methods },
	});

	await server.register({
		plugin: modelsPlugin,
	});

	return server;
};

suite('Given pipeline plugin', () => {
	suite('And saveRawTopTracks, models, korin plugins', () => {
		suite('API response', () => {
			let server;

			before(async () => {
				server = await Server();
			});

			test('status code 200', async () => {
				const { method, url } = routes.v1.extract_top_tracks();
				const response = await server.inject({
					method,
					url,
				});

				expect(response.statusCode).to.equal(200);
			});
		});

		suite('And valid API response', () => {
			let server;

			before(async () => {
				server = await Server();

				await factory.mock.method({
					server,
					name: 'korin.getTopTracks',
					plugin: korinPlugin,
					fn: sinon.stub().resolves(topTracksData),
				});
			});

			after(async () => {
				await databaseCleaner.clean(server.app.db.pipeline.link);
			});

			test('raw top tracks are saved to db', async () => {
				await server.methods.pipeline.saveRawTopTracks(server);

				const result = await server.app.db.pipeline.TopTracksRaw.find({});
				expect(result.length).to.equal(50);
			});
		});

		suite('And BAD API response', () => {
			let server;

			before(async () => {
				server = await Server();

				await factory.mock.method({
					server,
					name: 'korin.getTopTracks',
					plugin: korinPlugin,
					fn: sinon.stub().resolves('BAD'),
				});
			});

			test('an Error is thrown', async () => {
				const { message } = await expect(
					server.methods.pipeline.saveRawTopTracks(server)
				).to.reject();

				expect(message).to.equal('No tracks found');
			});

			test('data is not saved', async () => {
				await expect(
					server.methods.pipeline.saveRawTopTracks(server)
				).to.reject();

				const result = await server.app.db.pipeline.TopTracksRaw.find({});

				expect(result.length).to.equal(0);
			});
		});

		suite('And different API response', () => {
			let server;

			before(async () => {
				server = await Server();

				const different = {
					tracks: {},
				};
				different.tracks.track = topTracksData.tracks.track.map(t => {
					return R.pick(['name', 'artist'], t);
				});

				await factory.mock.method({
					server,
					name: 'korin.getTopTracks',
					plugin: korinPlugin,
					fn: sinon.stub().resolves(different),
				});
			});

			test('a ValidationError is thrown', async () => {
				const error = await expect(
					server.methods.pipeline.saveRawTopTracks(server)
				).to.reject();

				expect(error.name).to.equal('ValidationError');
			});
		});
	});
});
