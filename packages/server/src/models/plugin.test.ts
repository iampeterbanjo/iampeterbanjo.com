import Hapi from '@hapi/hapi';

import { TopTrackModel } from '../types';
import plugin from '../../src/models/plugin';
import utils from '../../src/utils';
import factory, { getDbConnection, disconnectAndStopDb } from '../../factory';

const { slugger } = utils;
const [fakeProfile] = factory.profile(1);
const [fakeTopTrack] = factory.topTrack(1);

const Server = async () => {
	const server = Hapi.Server();
	await server.register({
		plugin,
		options: { getDbConnection },
	});

	return server;
};

describe('Given models plugin', () => {
	describe('And registered plugin', () => {
		let server;

		beforeAll(async () => {
			server = await Server();
		});

		afterAll(async () => {
			await disconnectAndStopDb();
		});

		describe('And korin app', () => {
			['TopTrack', 'Profile'].forEach(model => {
				it(`When server.app.db has ${model} equal to modelName`, () => {
					expect(server.app.db[model].modelName).toEqual(model);
				});
			});

			describe('And TopTrack model', () => {
				test('When its saved the _id is defined and profileUrl is correct', async () => {
					const topTrack: TopTrackModel = new server.app.db.TopTrack(
						fakeTopTrack,
					);

					const result: TopTrackModel = await topTrack.save();
					const expected = slugger.slugify(
						`${topTrack.artist} ${topTrack.title}`,
					);

					expect(result._id).toBeDefined();
					expect(result.profileUrl).toEqual(expected);
				});

				test('When its found the artist is correct and _id is set', async () => {
					const topTrack = new server.app.db.TopTrack(fakeTopTrack);

					await topTrack.save();
					const track = await server.app.db.TopTrack.findOne({
						title: fakeTopTrack.title,
					});

					expect(track.artist).toEqual(fakeTopTrack.artist);
					expect(track._id).toBeDefined();
				});
			});

			describe('And Profile model', () => {
				test('When its saved the _id is set', async () => {
					const profile = new server.app.db.Profile(fakeProfile);
					const result = await profile.save();

					expect(result._id).toBeDefined();
				});

				test('When its found the artist is correct and the _id is set', async () => {
					const track = await server.app.db.Profile.findOne({
						title: fakeProfile.title,
					});

					expect(track.artist).toEqual(fakeProfile.artist);
					expect(track._id).toBeDefined();
				});
			});
		});

		describe('And pipeline app', () => {
			['RawTopTrack'].forEach(model => {
				it(`When server.app.db has ${model} equal to modelName`, () => {
					expect(server.app.db[model].modelName).toEqual(model);
				});
			});
		});
	});
});
