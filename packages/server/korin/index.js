const got = require('got');
const Lyricist = require('lyricist');

const api = require('./api');
const { getLyrics, getTopTracks, getPersonalityProfile } = require('./methods');
const PersonalityTextSummary = require('personality-text-summary');

const textSummary = new PersonalityTextSummary({
	locale: 'en',
	version: 'v3',
});
const { routes } = require('..');

const {
	GENIUS_API_ACCESS_TOKEN,
	GENIUS_API_URL,
	LASTFM_API_URL,
	LASTFM_API_KEY,
} = process.env;
const lyricist = new Lyricist(GENIUS_API_ACCESS_TOKEN);

const geniusApi = got.extend({
	baseUrl: GENIUS_API_URL,
	headers: {
		authorization: `Bearer ${GENIUS_API_ACCESS_TOKEN}`,
	},
	json: true,
});

const lastfmApi = got.extend({
	baseUrl: LASTFM_API_URL,
	apiKey: LASTFM_API_KEY,
	json: true,
});

module.exports = {
	plugin: api,
	options: {
		routes,
		lastfmApi,
		geniusApi,
		lyricist,
		getLyrics,
		textSummary,
		getTopTracks,
		getPersonalityProfile,
	},
};
