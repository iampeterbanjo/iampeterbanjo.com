/* eslint-disable no-param-reassign */
const Lab = require('@hapi/lab');
const { expect } = require('@hapi/code');

const lab = Lab.script();
const { test, suite, before } = lab;

const factory = require('.');

exports.lab = lab;

suite('Given factory', () => {
	suite('And topTracks', () => {
		before(({ context }) => {
			context.count = Math.ceil((1 - Math.random()) * 10);
			context.topTracks = factory.topTrack(context.count);
		});

		test('length are correct', ({ context }) => {
			const { count, topTracks } = context;

			expect(topTracks.length).to.equal(count);
		});

		test('items are correct', ({ context }) => {
			context.topTracks.forEach(topTrack => {
				const { artist, title, image, lastFmUrl, profileUrl } = topTrack;
				const description = `when ${artist} - ${title}`;

				expect(artist, description).to.be.a.string();
				expect(title, description).to.be.a.string();
				expect(image, description).to.be.a.string();
				expect(lastFmUrl, description).to.be.a.string();
				expect(profileUrl, description).not.to.exist();
			});
		});
	});

	suite('And profile', () => {
		before(({ context }) => {
			context.count = Math.ceil((1 - Math.random()) * 10);
			context.profiles = factory.profile(context.count);
		});

		test('length are correct', ({ context }) => {
			const { count, profiles } = context;

			expect(profiles.length).to.equal(count);
		});

		test('items are correct', ({ context }) => {
			context.profiles.forEach(profile => {
				const {
					artist,
					title,
					image,
					lastFmUrl,
					profileUrl,
					summary,
				} = profile;
				const description = `when ${artist} - ${title}`;

				expect(artist, description).to.be.a.string();
				expect(title, description).to.be.a.string();
				expect(summary, description).to.be.a.string();
				expect(image, description).to.be.a.string();
				expect(lastFmUrl, description).to.be.a.string();
				expect(profileUrl, description).to.be.a.string();
			});
		});
	});
});
