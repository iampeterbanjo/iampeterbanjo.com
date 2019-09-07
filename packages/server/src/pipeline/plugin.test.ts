import Hapi from '@hapi/hapi';
import DatabaseCleaner from 'database-cleaner';
import R from 'ramda';
import { promisify } from 'util';

import plugin from './plugin';
import routes from './routes';
import methods from './methods';

import korinPlugin from '../korin/plugin';
import modelsPlugin from '../models/plugin';
import topTracksData from '../../fixtures/lastfm-topTracks.json';
import rawTopTracks from '../../fixtures/rawTopTracks.json';
import factory from '../../factory';

const databaseCleaner = new DatabaseCleaner('mongodb');
const asyncDbClean = promisify(databaseCleaner.clean);

const Server = async () => {
	const server = Hapi.Server({ debug: { request: ['error'] } });

	await server.register({
		plugin,
		options: { methods },
	});

	await server.register({
		plugin: modelsPlugin,
	});

	return server;
};

let server;
describe('Given pipeline plugin', () => {
	describe('And RawTopTracks are converted to TopTracks', () => {
		beforeAll(async () => {
			server = await Server();

			jest
				.spyOn(server.app.db.pipeline.RawTopTrack, 'find')
				.mockResolvedValue(rawTopTracks);
		});

		afterAll(jest.restoreAllMocks);

		it('When RawTopTracks exist they are converted to TopTracks', async () => {
			const converted = await server.methods.pipeline.convertRawTopTracks(
				server,
			);
			const tracks = await server.app.db.korin.TopTrack.find({});

			expect(tracks.length).toEqual(converted.length);
		});
	});

	describe('And saveRawTopTracks, models, korin plugins', () => {
		beforeAll(async () => {
			server = await Server();

			await factory.mock.method({
				server,
				name: 'korin.getChartTopTracks',
				plugin: korinPlugin,
				fn: jest.fn().mockResolvedValue(topTracksData),
			});
		});

		beforeEach(async () => {
			await asyncDbClean(server.app.db.pipeline.link);
		});

		afterAll(jest.restoreAllMocks);

		it('When 50 RawTopTracks are saved to db they have exported date', async () => {
			await server.methods.pipeline.saveRawTopTracks(server);

			const result = await server.app.db.pipeline.RawTopTrack.find({});
			expect(result.length).toEqual(50);
			expect(result[0].importedDate).toBeDefined();
		});

		it('When requesting API status code 200', async () => {
			const { method, url } = routes.v1.extract_top_tracks();
			const response = await server.inject({
				method,
				url,
			});

			expect(response.statusCode).toEqual(200);
		});

		it('When requesting API response is expected', async () => {
			const { method, url } = routes.v1.extract_top_tracks();
			const response = await server.inject({
				method,
				url,
			});

			expect(response.payload).toEqual(
				expect.stringContaining(`Extracted 50 and converted 50 tracks`),
			);
		});

		describe('And BAD API response from lastFm', () => {
			let server;

			beforeAll(async () => {
				server = await Server();

				await factory.mock.method({
					server,
					name: 'korin.getChartTopTracks',
					plugin: korinPlugin,
					fn: jest.fn().mockResolvedValue('BAD'),
				});
				await asyncDbClean(server.app.db.pipeline.link);
			});

			afterAll(jest.restoreAllMocks);

			it('When there is no data an Error is thrown', () => {
				expect(
					server.methods.pipeline.saveRawTopTracks(server),
				).rejects.toThrow('No tracks found');
			});

			it('When there is an error no data is not saved', async () => {
				expect(
					server.methods.pipeline.saveRawTopTracks(server),
				).rejects.toThrow();

				const result = await server.app.db.pipeline.RawTopTrack.find({});

				expect(result.length).toEqual(0);
			});
		});

		describe('And different API response from lastFm', () => {
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

			afterAll(jest.resetAllMocks);

			it('When the data is not valid a ValidationError is thrown', async () => {
				expect(
					server.methods.pipeline.saveRawTopTracks(server),
				).rejects.toThrow(expect.objectContaining({ name: 'ValidationError' }));
			});
		});
	});
});
