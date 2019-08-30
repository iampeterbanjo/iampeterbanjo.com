import Hapi from '@hapi/hapi';
import DatabaseCleaner from 'database-cleaner';
import R from 'ramda';

import plugin from './plugin';
import routes from './routes';
import methods from './methods';

import korinPlugin from '../korin/plugin';
import modelsPlugin from '../models/plugin';
import topTracksData from '../../fixtures/lastfm-topTracks.json';
import factory, { makeBdd } from '../../factory';

const { Given, And, When } = makeBdd({ describe, it });
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

Given('Given pipeline plugin', () => {
	And(' saved TopTracksRaw, transformTopTracks', () => {
		let server;

		beforeAll(async () => {
			server = await Server();

			await factory.mock.method({
				server,
				name: 'korin.getChartTopTracks',
				plugin: korinPlugin,
				fn: jest.fn().mockResolvedValue(topTracksData),
			});

			await server.methods.pipeline.saveRawTopTracks(server);
		});

		afterAll(async () => {
			await databaseCleaner.clean(server.app.db.pipeline.link);
		});

		test.todo('When TopTracksRaw are transformed to TrackProfile its valid');
	});

	And('saveRawTopTracks, models, korin plugins', () => {
		And('valid API response', () => {
			let server;

			beforeAll(async () => {
				server = await Server();

				await factory.mock.method({
					server,
					name: 'korin.getChartTopTracks',
					plugin: korinPlugin,
					fn: jest.fn().mockResolvedValue(topTracksData),
				});
			});

			afterAll(async () => {
				await databaseCleaner.clean(server.app.db.pipeline.link);
			});

			When('raw top tracks are saved to db length is 50', async () => {
				await server.methods.pipeline.saveRawTopTracks(server);

				const result = await server.app.db.pipeline.TopTracksRaw.find({});
				expect(result.length).toEqual(50);
			});

			When('requesting API status code 200', async () => {
				const { method, url } = routes.v1.extract_top_tracks();
				const response = await server.inject({
					method,
					url,
				});

				expect(response.statusCode).toEqual(200);
			});
		});

		And('BAD API response', () => {
			let server;

			beforeAll(async () => {
				server = await Server();

				await factory.mock.method({
					server,
					name: 'korin.getChartTopTracks',
					plugin: korinPlugin,
					fn: jest.fn().mockResolvedValue('BAD'),
				});
			});

			When('there is no data an Error is thrown', async () => {
				expect(
					server.methods.pipeline.saveRawTopTracks(server),
				).rejects.toThrow('No tracks found');
			});

			When('there is an error no data is not saved', async () => {
				expect(
					server.methods.pipeline.saveRawTopTracks(server),
				).rejects.toThrow();

				const result = await server.app.db.pipeline.TopTracksRaw.find({});

				expect(result.length).toEqual(0);
			});
		});

		And('different API response', () => {
			let server;

			beforeAll(async () => {
				server = await Server();

				const different = {
					tracks: {
						track: [],
					},
				} as any;
				different.tracks.track = topTracksData.tracks.track.map(t => {
					return R.pick(['name', 'artist'], t);
				});

				await factory.mock.method({
					server,
					name: 'korin.getChartTopTracks',
					plugin: korinPlugin,
					fn: jest.fn().mockResolvedValue(different),
				});
			});

			When('the data is not valid a ValidationError is thrown', async () => {
				expect(
					server.methods.pipeline.saveRawTopTracks(server),
				).rejects.toThrow(expect.objectContaining({ name: 'ValidationError' }));
			});
		});
	});
});
