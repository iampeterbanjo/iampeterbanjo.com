/* eslint-disable no-param-reassign */
const Lab = require('@hapi/lab');
const { expect } = require('@hapi/code');
const Hapi = require('@hapi/hapi');
const DatabaseCleaner = require('database-cleaner');

const databaseCleaner = new DatabaseCleaner('mongodb');

const plugin = require('../../models/plugin');
const fakeProfile = require('../fixtures/profile');
const fakeTopTrack = require('../fixtures/topTrack');

const lab = Lab.script();
exports.lab = lab;

const { test, suite, after, before } = lab;

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

		after(async () => {
			databaseCleaner.clean(server.app.db.korin.link);
		});

		test('server.app.db.korin has link', () => {
			expect(server.app.db.korin.link).to.exist();
		});

		test('server.app.db.korin has TopTrack model', () => {
			expect(server.app.db.korin.TopTrack.modelName).to.equal('TopTrack');
		});

		suite('And TopTrack model', () => {
			before(({ context }) => {
				context.topTrack = new server.app.db.korin.TopTrack(fakeTopTrack);
			});

			test('it can be saved', async ({ context }) => {
				const result = await context.topTrack.save();

				expect(result._id).to.exist();
			});

			test('it can be found', async () => {
				const track = await server.app.db.korin.TopTrack.findOne({
					title: fakeTopTrack.title,
				});

				expect(track.artist).to.equal(fakeTopTrack.artist);
				expect(track._id).to.exist();
			});
		});

		suite('And Profile model', () => {
			before(({ context }) => {
				context.profile = new server.app.db.korin.Profile(fakeProfile);
			});

			test('it can be saved', async ({ context }) => {
				const result = await context.profile.save();

				expect(result._id).to.exist();
			});

			test('it can be found', async () => {
				const track = await server.app.db.korin.Profile.findOne({
					title: fakeProfile.title,
				});

				expect(track.artist).to.equal(fakeProfile.artist);
				expect(track._id).to.exist();
			});
		});
	});
});
