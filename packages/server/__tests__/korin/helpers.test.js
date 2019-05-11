/* eslint-disable no-param-reassign */
const lab = require('lab').script();
const { expect } = require('code');
const nock = require('nock');

const { vars, message } = require('../../utils');
const {
	getChartTopTracks,
	getSongData,
	getPersonalityProfile,
	getSongId,
} = require('../../korin/helpers');

const topTracksData = require('../fixtures/lastfm-topTracks.json');
const songData = require('../fixtures/genius-search.json');

const { suite, test, before, after, beforeEach, afterEach } = lab;
const {
	GENIUS_API_ACCESS_TOKEN,
	GENIUS_API_URL,
	LASTFM_API_URL,
	LASTFM_API_KEY,
} = vars;

exports.lab = lab;

suite('getChartTopTracks', () => {
	beforeEach(async () => {
		await nock(LASTFM_API_URL)
			.get('/')
			.query({
				method: 'chart.getTopTracks',
				format: 'json',
				api_key: LASTFM_API_KEY,
			})
			.reply(200, topTracksData);
	});

	afterEach(() => {
		nock.cleanAll();
	});

	test('lastfm API request for top tracks', async () => {
		const result = await getChartTopTracks();

		expect(result).to.equal(topTracksData);
	});
});

suite('getSongData', () => {
	const q = 'Kendrick Lamar HUMBLE';

	before(async () => {
		await nock(GENIUS_API_URL, {
			headers: {
				authorization: `Bearer ${GENIUS_API_ACCESS_TOKEN}`,
			},
		})
			.get('/search')
			.query({ q })
			.reply(200, songData);
	});

	after(() => {
		nock.cleanAll();
	});

	test('genius API request for song data', async () => {
		const result = await getSongData(q);

		expect(result).to.equal(songData);
	});
});

suite('getSongId', async () => {
	test('get expected songId', async () => {
		const result = await getSongId(songData);

		expect(result).to.equal(3039923);
	});

	test('get undefined songId', async () => {
		const result = await getSongId({});

		expect(result).to.equal(undefined);
	});
});

suite('getPersonalityProfile', () => {
	test('when called with no lyrics', async () => {
		const { profile } = await getPersonalityProfile('');

		expect(profile).to.equal(message.ERROR_LYRICS_REQUIRED_FOR_PROFILE);
	});
});
