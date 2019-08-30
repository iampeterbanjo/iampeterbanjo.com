import nock from 'nock';

import utils from '../../src/utils';
import helpers from '../../src/korin/helpers';
import { makeBdd } from '../../factory';

const topTracksData = require('../../fixtures/lastfm-topTracks.json');
const songData = require('../../fixtures/genius-search.json');

const { Given, When } = makeBdd({ describe, it });
const { vars, message } = utils;
const {
	getChartTopTracks,
	getSongData,
	getPersonalityProfile,
	getSongId,
	getSongInfo,
} = helpers;

const { GENIUS_API_URL, LASTFM_API_URL, LASTFM_API_KEY } = vars;

Given('getChartTopTracks', () => {
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

	When(
		'lastfm API request for top tracks the response should be correct',
		async () => {
			const result = await getChartTopTracks();

			expect(result).toEqual(topTracksData);
		},
	);
});

Given('getSongData', () => {
	const q = 'Kendrick Lamar HUMBLE';

	beforeEach(async () => {
		await nock(GENIUS_API_URL)
			.get('/search')
			.query({ q })
			.reply(200, songData);
	});

	afterEach(() => {
		nock.cleanAll();
	});

	When(
		'genius API request for song data the response should be correct',
		async () => {
			const result = await getSongData(q);

			expect(result).toEqual(songData);
		},
	);
});

Given('getSongId', () => {
	When('parsing songData the correct songId is returned', async () => {
		const result = await getSongId(songData);

		expect(result).toEqual(3039923);
	});

	When('parsing invalid songData the songId is undefined', async () => {
		const result = await getSongId({});

		expect(result).toEqual(undefined);
	});
});

Given('getSongInfo', () => {
	When('parsing songData the id is correct', async () => {
		const { id } = await getSongInfo(songData);

		expect(id).toEqual(3039923);
	});

	When('parsing songData get the expected thumbnail', async () => {
		const { thumbnail } = await getSongInfo(songData);

		expect(thumbnail).toEqual(
			'https://images.genius.com/4387b0bcc88e07676997ba73793cc73c.300x300x1.jpg',
		);
	});

	When('parsing invalid songData the songId is undefined', async () => {
		const result = await getSongId({});

		expect(result).toEqual(undefined);
	});
});

Given('getPersonalityProfile', () => {
	When(
		'called with no lyrics, the correct error message is returned',
		async () => {
			const { profile } = await getPersonalityProfile('');

			expect(profile).toEqual(message.ERROR_LYRICS_REQUIRED_FOR_PROFILE);
		},
	);
});
