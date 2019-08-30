import Hapi from '@hapi/hapi';
import DatabaseCleaner from 'database-cleaner';

import plugin from '../../src/models/plugin';
import utils from '../../src/utils';
import factory, { makeBdd } from '../../factory';

const { Given, And, When } = makeBdd({ describe, it });
const databaseCleaner = new DatabaseCleaner('mongodb');
const { slugger } = utils;
const [fakeProfile] = factory.profile(1);
const [fakeTopTrack] = factory.topTrack(1);

const Server = async () => {
	const server = Hapi.Server();
	await server.register({ plugin });

	return server;
};

Given('Given models plugin', () => {
	And('registered plugin', () => {
		let server;

		beforeAll(async () => {
			server = await Server();
		});

		afterAll(async () => {
			await databaseCleaner.clean(server.app.db.korin.link);
		});

		And('korin app', () => {
			When('server.app.db.korin has link it is defined', () => {
				expect(server.app.db.korin.link).toBeDefined();
			});

			['TopTrack', 'Profile'].forEach(model => {
				When(`server.app.db.korin has ${model} equal to modelName`, () => {
					expect(server.app.db.korin[model].modelName).toEqual(model);
				});
			});

			And('TopTrack model', () => {
				let topTrack;

				beforeEach(() => {
					topTrack = new server.app.db.korin.TopTrack(fakeTopTrack);
				});

				When(
					'its saved the _id is defined and profileUrl is correct',
					async () => {
						expect(topTrack.profileUrl).not.toBeDefined();

						const result = await topTrack.save();
						const expected = slugger.slugify(
							`${topTrack.artist} ${topTrack.title}`,
						);

						expect(result._id).toBeDefined();
						expect(result.profileUrl).toEqual(expected);
					},
				);

				When('its found the artist is correct and _id is set', async () => {
					const track = await server.app.db.korin.TopTrack.findOne({
						title: fakeTopTrack.title,
					});

					expect(track.artist).toEqual(fakeTopTrack.artist);
					expect(track._id).toBeDefined();
				});
			});

			And(' Profile model', () => {
				When('its saved the _id is set', async () => {
					const profile = new server.app.db.korin.Profile(fakeProfile);
					const result = await profile.save();

					expect(result._id).toBeDefined();
				});

				When('its found the artist is correct and the _id is set', async () => {
					const track = await server.app.db.korin.Profile.findOne({
						title: fakeProfile.title,
					});

					expect(track.artist).toEqual(fakeProfile.artist);
					expect(track._id).toBeDefined();
				});
			});
		});

		And('pipeline app', () => {
			When('server.app.db.pipeline has link defined', () => {
				expect(server.app.db.pipeline.link).toBeDefined();
			});

			['TopTracksRaw'].forEach(model => {
				When(`server.app.db.pipeline has ${model} equal to modelName`, () => {
					expect(server.app.db.pipeline[model].modelName).toEqual(model);
				});
			});
		});
	});
});
