const got = require('got');
const Lyricist = require('lyricist');
const { LYRICS_API_ACCESS_TOKEN, LYRICS_API_URL } = process.env;
const lyricist = new Lyricist(LYRICS_API_ACCESS_TOKEN);

const client = got.extend({
	baseUrl: LYRICS_API_URL,
	headers: {
		authorization: `Bearer ${LYRICS_API_ACCESS_TOKEN}`,
	},
});

module.exports = {
	plugin: require('./api'),
	options: { client, lyricist },
};
