const lab = require('lab').script();
const { expect } = require('code');
const nock = require('nock');

const { getTopTracks } = require('../../korin/helpers');
const topTracksData = require('../fixtures/lastfm-topTracks.json');
const { vars } = require('../../utils');

const { suite, test, afterEach, beforeEach } = lab;
const { LASTFM_API_URL, LASTFM_API_KEY } = vars;

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
