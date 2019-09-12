import nock from 'nock';

import utils from '../../src/utils';
import * as helpers from '../../src/korin/helpers';
import spotifyApiArtistSearch from '../../fixtures/spotify-api-artist-search.json';
import spotifyApiTokenGrant from '../../fixtures/spotify-api-token-grant.json';

import topTracksData from '../../fixtures/lastfm-topTracks.json';
import songData from '../../fixtures/genius-search.json';

const { vars, message } = utils;
const {
	getChartTopTracks,
	getSongData,
	getPersonalityProfile,
	getSongId,
	getSongInfo,
	getArtistImage,
	getSpotifyAccessToken,
} = helpers;

const { GENIUS_API_URL, LASTFM_API_URL, LASTFM_API_KEY } = vars;

afterAll(() => {
	nock.restore();
});

describe('Given getChartTopTracks', () => {
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

	it('When lastfm API request for top tracks the response should be correct', async () => {
		const result = await getChartTopTracks();

		expect(result).toEqual(topTracksData);
	});
});

describe('Given getSongData', () => {
	const q = 'Kendrick Lamar HUMBLE';

	beforeAll(async () => {
		await nock(GENIUS_API_URL)
			.get('/search')
			.query({ q })
			.reply(200, songData);
	});

	afterAll(() => {
		nock.cleanAll();
	});

	it('When genius API request for song data the response should be correct', async () => {
		const result = await getSongData(q);

		expect(result).toEqual(songData);
	});
});

describe('Given getSongData', () => {
	const q = 'Kendrick Lamar HUMBLE';

	beforeAll(async () => {
		await nock(GENIUS_API_URL)
			.get('/search')
			.query({ q })
			.reply(200, {});
	});

	afterAll(() => {
		nock.cleanAll();
	});

	it('When genius API request is invalid there is an error', async () => {
		expect(getSongData(q)).rejects.toThrow();
	});
});

describe('Given getSongId', () => {
	it('When parsing songData the correct songId is returned', async () => {
		const result = await getSongId(songData);

		expect(result).toEqual(3039923);
	});

	it('When parsing invalid songData the songId is undefined', async () => {
		const result = await getSongId({} as GeniusData);

		expect(result).toEqual(undefined);
	});
});

describe('Given getSongInfo', () => {
	it('When parsing songData the id is correct', async () => {
		const { id } = await getSongInfo(songData);

		expect(id).toEqual(3039923);
	});

	it('When parsing songData get the expected thumbnail', async () => {
		const { thumbnail } = await getSongInfo(songData);

		expect(thumbnail).toEqual(
			'https://images.genius.com/4387b0bcc88e07676997ba73793cc73c.300x300x1.jpg',
		);
	});

	it('When parsing invalid songData the songId is undefined', async () => {
		const result = await getSongId({} as GeniusData);

		expect(result).toEqual(undefined);
	});
});

describe('Given getPersonalityProfile', () => {
	it('When called with no lyrics, the correct error message is returned', async () => {
		const { profile } = await getPersonalityProfile('');

		expect(profile).toEqual(message.ERROR_LYRICS_REQUIRED_FOR_PROFILE);
	});
});

describe('Given getSpotifyAccessToken', () => {
	beforeAll(async () => {
		await nock('https://accounts.spotify.com')
			.post('/api/token', 'grant_type=client_credentials')
			.reply(200, spotifyApiTokenGrant);
	});

	afterAll(() => {
		nock.cleanAll();
	});

	it('When called returns access token', async () => {
		const accessToken = await getSpotifyAccessToken();

		expect(typeof accessToken).toEqual('string');
	});
});

describe('Given getArtistImage', () => {
	beforeAll(async () => {
		await nock('https://api.spotify.com')
			.get('/v1/search/')
			.query(true)
			.reply(200, spotifyApiArtistSearch);
	});

	afterAll(() => {
		nock.cleanAll();
	});

	it('When called with artist name, an image is returned', async () => {
		const image = await getArtistImage('Ariana Grande', 'NgCXRK...MzYjw');

		expect(image).toBeDefined();
	});
});
