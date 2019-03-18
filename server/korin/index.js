const got = require('got');
const Lyricist = require('lyricist');
const { getLyrics } = require('./methods');

const { GENIUS_API_ACCESS_TOKEN, GENIUS_API_URL } = process.env;
const lyricist = new Lyricist(GENIUS_API_ACCESS_TOKEN);

const geniusApi = got.extend({
	baseUrl: GENIUS_API_URL,
	headers: {
		authorization: `Bearer ${GENIUS_API_ACCESS_TOKEN}`,
	},
});

module.exports = {
	plugin: require('./api'),
	options: { geniusApi, lyricist, getLyrics },
};
