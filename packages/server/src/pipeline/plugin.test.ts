// import Hapi from '@hapi/hapi';
// import Lab from '@hapi/lab';
// import { expect } from '@hapi/code';
// import sinon from 'sinon';
// import DatabaseCleaner from 'database-cleaner';
// import R from 'ramda';

// import factory from '../factory';
// import plugin from '../../pipeline/plugin';
// import routes from '../../pipeline/routes';
// import methods from '../../pipeline/methods';
// import korinPlugin from '../../korin/plugin';
// import modelsPlugin from '../../models/plugin';

// export const lab = Lab.script();

// const topTracksData = require('../fixtures/lastfm-topTracks.json');
// const { test, suite, before, after } = lab;
// const databaseCleaner = new DatabaseCleaner('mongodb');

// const Server = async () => {
// 	const server = Hapi.Server();

// 	await server.register({
// 		plugin,
// 		options: { methods },
// 	});

// 	await server.register({
// 		plugin: modelsPlugin,
// 	});

// 	return server;
// };

// Given('Given pipeline plugin', () => {
// 	And(' saved TopTracksRaw, transformTopTracks', () => {
// 		let server;

// 		before(async () => {
// 			server = await Server();

// 			await factory.mock.method({
// 				server,
// 				name: 'korin.getChartTopTracks',
// 				plugin: korinPlugin,
// 				fn: sinon.stub().resolves(topTracksData),
// 			});

// 			await server.methods.pipeline.saveRawTopTracks(server);
// 		});

// 		after(async () => {
// 			await databaseCleaner.clean(server.app.db.pipeline.link);
// 		});

// 		test.skip('When TopTracksRaw are transformed to TrackProfile its valid', () => {
// 			// TODO
// 		});
// 	});

// 	And(' saveRawTopTracks, models, korin plugins', () => {
// 		And(' valid API response', () => {
// 			let server;

// 			before(async () => {
// 				server = await Server();

// 				await factory.mock.method({
// 					server,
// 					name: 'korin.getChartTopTracks',
// 					plugin: korinPlugin,
// 					fn: sinon.stub().resolves(topTracksData),
// 				});
// 			});

// 			after(async () => {
// 				await databaseCleaner.clean(server.app.db.pipeline.link);
// 			});

// 			When('When raw top tracks are saved to db length is 50', async () => {
// 				await server.methods.pipeline.saveRawTopTracks(server);

// 				const result = await server.app.db.pipeline.TopTracksRaw.find({});
// 				expect(result.length).toEqual(50);
// 			});

// 			When('When requesting API status code 200', async () => {
// 				const { method, url } = routes.v1.extract_top_tracks();
// 				const response = await server.inject({
// 					method,
// 					url,
// 				});

// 				expect(response.statusCode).toEqual(200);
// 			});
// 		});

// 		And(' BAD API response', () => {
// 			let server;

// 			before(async () => {
// 				server = await Server();

// 				await factory.mock.method({
// 					server,
// 					name: 'korin.getChartTopTracks',
// 					plugin: korinPlugin,
// 					fn: sinon.stub().resolves('BAD'),
// 				});
// 			});

// 			When('When there is no data an Error is thrown', async () => {
// 				const { message } = await expect(
// 					server.methods.pipeline.saveRawTopTracks(server),
// 				).to.reject();

// 				expect(message).toEqual('No tracks found');
// 			});

// 			When('When there is an error no data is not saved', async () => {
// 				await expect(
// 					server.methods.pipeline.saveRawTopTracks(server),
// 				).to.reject();

// 				const result = await server.app.db.pipeline.TopTracksRaw.find({});

// 				expect(result.length).toEqual(0);
// 			});
// 		});

// 		And(' different API response', () => {
// 			let server;

// 			before(async () => {
// 				server = await Server();

// 				const different = {
// 					tracks: {
// 						track: [],
// 					},
// 				};
// 				different.tracks.track = topTracksData.tracks.track.map(t => {
// 					return R.pick(['name', 'artist'], t);
// 				});

// 				await factory.mock.method({
// 					server,
// 					name: 'korin.getChartTopTracks',
// 					plugin: korinPlugin,
// 					fn: sinon.stub().resolves(different),
// 				});
// 			});

// 			When('When the data is not valid a ValidationError is thrown', async () => {
// 				const error = await expect(
// 					server.methods.pipeline.saveRawTopTracks(server),
// 				).to.reject();

// 				expect(error.name).toEqual('ValidationError');
// 			});
// 		});
// 	});
// });
