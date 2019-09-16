import Hapi from '@hapi/hapi';
import R from 'ramda';
import casual from 'casual';

import plugin from './plugin';
import routes from './routes';
import methods from './methods';

import { ProfileModel, TopTrack } from '../types';
import { getDbConnection, disconnectAndStopDb } from '../../factory';
import modelsPlugin from '../models/plugin';
import topTracksData from '../../fixtures/lastfm-topTracks.json';
import rawTopTracks from '../../fixtures/rawTopTracks.json';
import topTracksWithImages from '../../fixtures/topTracks-with-images.json';
import profile from '../../fixtures/personality-profile.json';
import { summary } from '../../fixtures/personality-summary.json';

const Server = async () => {
	const server = Hapi.Server({ debug: { request: ['error'] } });
	const connection = await getDbConnection();

	await server.register({
		plugin,
		options: { methods },
	});

	await server.register({
		plugin: modelsPlugin,
		options: { connection },
	});

	return server;
};

describe('Given pipeline plugin', () => {
	let server;

	afterAll(async () => {
		disconnectAndStopDb();
	});

	describe('And RawTopTracks are converted to TopTracks', () => {
		beforeAll(async () => {
			server = await Server();

			jest
				.spyOn(server.app.db.RawTopTrack, 'find')
				.mockResolvedValue(rawTopTracks);
		});

		afterAll(async () => {
			await disconnectAndStopDb();
			jest.restoreAllMocks();
		});

		it('When RawTopTracks exist they are converted to TopTracks', async () => {
			const converted = await server.methods.pipeline.convertRawTopTracks(
				server,
			);
			const tracks = await server.app.db.TopTrack.find({});

			expect(tracks.length).toEqual(converted.length);
		});

		it('When RawTopTracks are converted to TopTracks they are not duplicated', async () => {
			await server.methods.pipeline.convertRawTopTracks(server);
			await server.methods.pipeline.convertRawTopTracks(server);

			const tracks = await server.app.db.TopTrack.find({});

			expect(tracks.length).toEqual(50);
		});
	});

	describe('And addTrackProfile', () => {
		let server;

		beforeAll(async () => {
			server = await Server();

			server.methods.korin = {
				getProfileByArtistAndTrack: jest
					.fn()
					.mockResolvedValue({ profile, summary, lyrics: casual.sentences(4) }),
			};

			await server.app.db.TopTrack.insertMany(topTracksWithImages);
		});

		afterAll(async () => {
			await disconnectAndStopDb();
			jest.restoreAllMocks();
		});

		it('When addTrackProfile runs, it calls getProfileByArtistAndTrack with artist and track', async () => {
			await server.methods.pipeline.addTrackProfile(server);

			const [
				params,
			] = server.methods.korin.getProfileByArtistAndTrack.mock.calls[0];
			const { artist, track } = params;

			expect(artist).toBeDefined();
			expect(track).toBeDefined();
		});

		it('When addTrackProfile runs tracks have lyrics, profile, summary', async () => {
			await server.methods.pipeline.addTrackProfile(server);

			const track: ProfileModel = await server.app.db.TopTrack.findOne({});

			expect(track.lyrics).toBeDefined();
			expect(track.profile).toBeDefined();
			expect(track.summary).toBeDefined();
		});
	});

	describe('And addArtistImages', () => {
		let server;

		beforeAll(async () => {
			server = await Server();

			server.methods.korin = {
				getSpotifyAccessToken: jest.fn().mockResolvedValue('NgCXRK...MzYjw'),
				getArtistImage: jest
					.fn()
					.mockResolvedValue(
						'https://i.scdn.co/image/b1dfbe843b0b9f54ab2e588f33e7637d2dab065a',
					),
			};

			jest
				.spyOn(server.app.db.RawTopTrack, 'find')
				.mockResolvedValue(rawTopTracks);

			await server.methods.pipeline.convertRawTopTracks(server);
		});

		afterAll(async () => {
			await disconnectAndStopDb();
			jest.restoreAllMocks();
		});

		it('When addArtistImages runs tracks have image urls', async () => {
			await server.methods.pipeline.addArtistImages(server);

			const track: TopTrack = await server.app.db.TopTrack.findOne({});

			expect(track.image).toEqual(
				expect.stringContaining('https://i.scdn.co/image'),
			);
		});
	});

	describe('And saveRawTopTracks, models, korin plugins', () => {
		let server;

		beforeAll(async () => {
			server = await Server();

			server.methods.korin = {
				getChartTopTracks: jest.fn().mockResolvedValue(topTracksData),
				getSpotifyAccessToken: jest.fn().mockResolvedValue('NgCXRK...MzYjw'),
				getArtistImage: jest
					.fn()
					.mockResolvedValue(
						'https://i.scdn.co/image/b1dfbe843b0b9f54ab2e588f33e7637d2dab065a',
					),
				getProfileByArtistAndTrack: jest.fn().mockResolvedValue({}),
			};
		});

		beforeEach(async () => {});

		afterAll(async () => {
			await disconnectAndStopDb();
			jest.restoreAllMocks();
		});

		it('When 50 RawTopTracks are saved to db they have exported date', async () => {
			await server.methods.pipeline.saveRawTopTracks(server);

			const result = await server.app.db.RawTopTrack.find({});
			expect(result.length).toEqual(50);
			expect(result[0].importedDate).toBeDefined();
		});

		it('When 50 RawTopTracks are saved to db they are not duplicated', async () => {
			await server.methods.pipeline.saveRawTopTracks(server);
			await server.methods.pipeline.saveRawTopTracks(server);

			const result = await server.app.db.RawTopTrack.find({});
			expect(result.length).toEqual(50);
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

		[
			'addArtistImages',
			'saveRawTopTracks',
			'convertRawTopTracks',
			'addTrackProfile',
		].forEach(expected => {
			it(`When requesting API pipeline, ${expected} is called`, async () => {
				jest.spyOn(server.methods.pipeline, expected);

				const { method, url } = routes.v1.extract_top_tracks();
				await server.inject({
					method,
					url,
				});

				expect(server.methods.pipeline[expected]).toHaveBeenCalled();
			});
		});

		describe('And BAD API response from lastFm', () => {
			let server;

			beforeAll(async () => {
				server = await Server();

				server.methods.korin = {
					getChartTopTracks: jest.fn().mockResolvedValue('BAD'),
					getSpotifyAccessToken: jest.fn().mockResolvedValue('NgCXRK...MzYjw'),
					getArtistImage: jest
						.fn()
						.mockResolvedValue(
							'https://i.scdn.co/image/b1dfbe843b0b9f54ab2e588f33e7637d2dab065a',
						),
				};
			});

			afterAll(async () => {
				await disconnectAndStopDb();
				jest.restoreAllMocks();
			});

			it('When there is no data an Error is thrown', () => {
				expect(
					server.methods.pipeline.saveRawTopTracks(server),
				).rejects.toThrow('No tracks found');
			});

			it('When there is an error no data is not saved', async () => {
				expect(
					server.methods.pipeline.saveRawTopTracks(server),
				).rejects.toThrow();

				const result = await server.app.db.RawTopTrack.find({});

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

				server.methods.korin = {
					getChartTopTracks: jest.fn().mockResolvedValue(different),
					getSpotifyAccessToken: jest.fn().mockResolvedValue('NgCXRK...MzYjw'),
					getArtistImage: jest
						.fn()
						.mockResolvedValue(
							'https://i.scdn.co/image/b1dfbe843b0b9f54ab2e588f33e7637d2dab065a',
						),
				};
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
