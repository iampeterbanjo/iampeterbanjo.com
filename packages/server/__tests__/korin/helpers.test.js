const lab = require('lab').script();
const { expect } = require('code');
const nock = require('nock');
const { readFile } = require('fs-extra');
const Path = require('path');

const { vars, message } = require('../../utils');

const {
	getTopTracks,
	getSongData,
	getPersonalityProfile,
} = require('../../korin/helpers');

const topTracksData = require('../fixtures/lastfm-topTracks.json');
const songData = require('../fixtures/genius-search.json');
const profileData = require('../fixtures/personality-profile.json');

const { suite, test, afterEach, beforeEach } = lab;
const {
	GENIUS_API_ACCESS_TOKEN,
	GENIUS_API_URL,
	LASTFM_API_URL,
	LASTFM_API_KEY,
	WATSON_PI_API_URL,
} = vars;

exports.lab = lab;

suite('getTopTracks', () => {
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
		const result = await getTopTracks();

		expect(result).to.equal(topTracksData);
	});
});

suite('getSongData', () => {
	const q = 'Kendrick Lamar HUMBLE';

	beforeEach(async () => {
		await nock(GENIUS_API_URL, {
			headers: {
				authorization: `Bearer ${GENIUS_API_ACCESS_TOKEN}`,
			},
		})
			.get('/search')
			.query({ q })
			.reply(200, songData);
	});

	afterEach(() => {
		nock.cleanAll();
	});

	test('genius API request for song data', async () => {
		const result = await getSongData(q);

		expect(result).to.equal(songData);
	});
});

suite('getPersonalityProfile', async () => {
	const path = Path.join(__dirname, '../fixtures/lyrics.txt');
	const lyrics = await readFile(path);

	beforeEach(async () => {
		await nock(WATSON_PI_API_URL)
			.post('/v3/profile')
			.query({
				version: '2017-10-13',
				consumption_preferences: true,
			})
			.reply(200, profileData);
	});

	afterEach(() => {
		nock.cleanAll();
	});

	test('watson API request for personality profile', async () => {
		const result = await getPersonalityProfile(lyrics);

		expect(result).to.equal(profileData);
	});

	test('when called with no lyrics', async () => {
		const result = await getPersonalityProfile();

		expect(result).to.equal(message.ERROR_LYRICS_REQUIRED_FOR_PROFILE);
	});
});
