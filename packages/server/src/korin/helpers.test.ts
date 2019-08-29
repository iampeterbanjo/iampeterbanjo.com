// import Lab from '@hapi/lab';
// import { expect } from '@hapi/code';
// import nock from 'nock';
// import utils from '../../utils';
// import helpers from '../../korin/helpers';

// export const lab = Lab.script();
// const { vars, message } = utils;
// const {
// 	getChartTopTracks,
// 	getSongData,
// 	getPersonalityProfile,
// 	getSongId,
// 	getSongInfo,
// } = helpers;

// const topTracksData = require('../fixtures/lastfm-topTracks.json');
// const songData = require('../fixtures/genius-search.json');

// const { suite, test, before, after, beforeEach, afterEach } = lab;
// const { GENIUS_API_URL, LASTFM_API_URL, LASTFM_API_KEY } = vars;

// Given('getChartTopTracks', () => {
// 	beforeEach(async () => {
// 		await nock(LASTFM_API_URL)
// 			.get('/')
// 			.query({
// 				method: 'chart.getTopTracks',
// 				format: 'json',
// 				api_key: LASTFM_API_KEY,
// 			})
// 			.reply(200, topTracksData);
// 	});

// 	afterEach(() => {
// 		nock.cleanAll();
// 	});

// 	When('lastfm API request for top tracks', async () => {
// 		const result = await getChartTopTracks();

// 		expect(result).toEqual(topTracksData);
// 	});
// });

// Given('getSongData', () => {
// 	const q = 'Kendrick Lamar HUMBLE';

// 	before(async () => {
// 		await nock(GENIUS_API_URL)
// 			.get('/search')
// 			.query({ q })
// 			.reply(200, songData);
// 	});

// 	after(() => {
// 		nock.cleanAll();
// 	});

// 	When('genius API request for song data', async () => {
// 		const result = await getSongData(q);

// 		expect(result).toEqual(songData);
// 	});
// });

// Given('getSongId', async () => {
// 	When('get expected songId', async () => {
// 		const result = await getSongId(songData);

// 		expect(result).toEqual(3039923);
// 	});

// 	When('get undefined songId', async () => {
// 		const result = await getSongId({});

// 		expect(result).toEqual(undefined);
// 	});
// });

// Given('getSongInfo', async () => {
// 	When('get expected id', async () => {
// 		const { id } = await getSongInfo(songData);

// 		expect(id).toEqual(3039923);
// 	});

// 	When('get expected thumbnail', async () => {
// 		const { thumbnail } = await getSongInfo(songData);

// 		expect(thumbnail).toEqual(
// 			'https://images.genius.com/4387b0bcc88e07676997ba73793cc73c.300x300x1.jpg',
// 		);
// 	});

// 	When('get undefined songId', async () => {
// 		const result = await getSongId({});

// 		expect(result).toEqual(undefined);
// 	});
// });

// Given('getPersonalityProfile', () => {
// 	When('when called with no lyrics', async () => {
// 		const { profile } = await getPersonalityProfile('');

// 		expect(profile).toEqual(message.ERROR_LYRICS_REQUIRED_FOR_PROFILE);
// 	});
// });
