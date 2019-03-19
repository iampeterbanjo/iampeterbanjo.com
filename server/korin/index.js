const got = require('got');
const Lyricist = require('lyricist');
const { getLyrics, getArtists } = require('./methods');

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
});

const lastfmApi = got.extend({
	baseUrl: LASTFM_API_URL,
	apiKey: LASTFM_API_KEY,
});

module.exports = {
	plugin: require('./api'),
	options: { lastfmApi, geniusApi, lyricist, getLyrics, getArtists },
};
