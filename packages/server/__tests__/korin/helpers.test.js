const lab = require('lab').script();
const { expect } = require('code');
const nock = require('nock');

const { getTopTracks, getSongData } = require('../../korin/helpers');
const topTracksData = require('../fixtures/lastfm-topTracks.json');
const songData = require('../fixtures/genius-search.json');
const { vars } = require('../../utils');

const { suite, test, afterEach, beforeEach } = lab;
const {
	GENIUS_API_ACCESS_TOKEN,
	GENIUS_API_URL,
	LASTFM_API_URL,
	LASTFM_API_KEY,
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

	test('lastfm API request', async () => {
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

	test('genius API request', async () => {
		const result = await getSongData(q);

		expect(result).to.equal(songData);
	});
});
