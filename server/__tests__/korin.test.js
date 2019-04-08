/* eslint-disable no-param-reassign */
const sinon = require('sinon');
const got = require('got');
const Lyricist = require('lyricist');
const jsonata = require('jsonata');
const nock = require('nock');
const { expect } = require('code');
const Lab = require('lab').script();

const { test, after, afterEach, before, beforeEach, suite } = Lab;
const { readFile } = require('fs-extra');
const Glue = require('glue');

const { manifest } = require('../config');
const { routes } = require('..');

const topTracksData = require('./fixtures/lastfm-topTracks.json');
const profileData = require('./fixtures/personality-profile.json');
const geniusSearchData = require('./fixtures/genius-search.json');

exports.lab = Lab;

const {
	getLyrics: getLyricsMethod,
	getTopTracks: getTopTracksMethod,
	lyricsIdPath,
} = require('../../server/korin/methods');
const korinApi = require('../../server/korin/api');

const setup = async options => {
	// eslint-disable-next-line no-unused-vars
	const { register, ...rest } = manifest;
	const server = await Glue.compose(rest);

	const lyrics = await readFile(`${__dirname}/fixtures/lyrics.txt`);
	const getLyrics = sinon.stub().resolves(lyrics);
	const getPersonalityProfile = sinon.stub().resolves(profileData);
	const personalityProfileApi = sinon.stub();
	const getTopTracks = sinon.stub().resolves(topTracksData);

	const defaults = {
		routes,
		getLyrics,
		getTopTracks,
		getPersonalityProfile,
		personalityProfileApi,
	};

	await server.register({
		plugin: korinApi,
		options: {
			...defaults,
			...options,
		},
	});

	return {
		server,
		lyrics,
		profile: profileData,
		topTracks: topTracksData,
		...defaults,
	};
};

suite('korin/profile/{artist}/{song}', () => {
	test('api returns profile', async () => {
		const { server, profile } = await setup();
		const { url, method } = routes['korin.get.profiles'](
			'Kendrik Lamar',
			'Humble'
		);
		const { result } = await server.inject({
			method,
			url,
		});

		expect(result).to.equal(profile);
	});
});

suite('korin/songs', () => {
	test('api request returns expected response', async () => {
		const { server, topTracks } = await setup();
		const { method, url } = routes['korin.get.tracks']();
		const { result } = await server.inject({ method, url });

		expect(result).to.equal(topTracks);
	});
});

suite('getLyrics', () => {
	const geniusApi = got.extend({ baseUrl: '/' });
	const lyricist = new Lyricist('FAKE-TOKEN');

	before(async ({ context }) => {
		context.data = geniusSearchData;
		context.lyrics = await readFile(`${__dirname}/fixtures/lyrics.txt`);

		sinon.stub(geniusApi, 'get').resolves({ body: context.data });
		sinon.stub(lyricist, 'song').resolves({ lyrics: context.lyrics });
	});

	after(() => {
		sinon.restore();
	});

	test('returns expected lyrics', async ({ context }) => {
		const result = await getLyricsMethod({ geniusApi, lyricist });

		expect(result).to.equal(context.lyrics);
	});

	[
		'Jump Kriss kross',
		'Humble Kendric Lamar',
		'Big House Audio Andrenaline',
	].forEach(term => {
		test(`geniusApi is called with search ${term}`, async () => {
			const query = new URLSearchParams([['q', term]]);

			await getLyricsMethod({ geniusApi, lyricist }, term);

			const [first, second] = geniusApi.get.args[0];

			expect(first).to.be.equal('/search');
			expect(second).to.be.equal({ query });
		});
	});

	test('lyricist is called with songId and fetchLyrics', async ({
		context,
	}) => {
		await getLyricsMethod({ geniusApi, lyricist }, '');

		const [first, second] = lyricist.song.args[0];
		const songId = jsonata(lyricsIdPath).evaluate(context.data);

		expect(first).to.be.equal(songId);
		expect(second).to.be.equal({ fetchLyrics: true });
	});
});

suite('getTopTracks', () => {
	const apiKey = 'FAKE_API_KEY';
	const baseUrl = process.env.LASTFM_API_URL;
	const lastfmApi = got.extend({ baseUrl, apiKey });

	beforeEach(async ({ context }) => {
		context.apiKey = apiKey;
		context.baseUrl = baseUrl;
		context.data = JSON.stringify(topTracksData);

		await nock(context.baseUrl)
			.get('/')
			.query({
				method: 'chart.getTopTracks',
				format: 'json',
				api_key: lastfmApi.defaults.options.apiKey,
			})
			.reply(200, context.data);
	});

	afterEach(() => {
		sinon.restore();
		nock.cleanAll();
	});

	test('returns expected artists', async ({ context }) => {
		const result = await getTopTracksMethod({ lastfmApi });

		expect(result).to.equal(context.data);
	});
});
