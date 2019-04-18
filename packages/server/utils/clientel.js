/**
 * @constant
 * @type {object}
 * @property {function} extend
 * @property {function} get
 */
const got = require('got');
const Lyricist = require('lyricist');

const {
	baseUrl,
	GENIUS_API_ACCESS_TOKEN,
	GENIUS_API_URL,
	LASTFM_API_URL,
} = require('./vars');

const korin = got.extend({ baseUrl, json: true });

const genius = got.extend({
	baseUrl: GENIUS_API_URL,
	headers: {
		authorization: `Bearer ${GENIUS_API_ACCESS_TOKEN}`,
	},
	json: true,
});

const lastfm = got.extend({
	baseUrl: LASTFM_API_URL,
	json: true,
});

const lyricist = new Lyricist(GENIUS_API_ACCESS_TOKEN);

module.exports = {
	korin,
	genius,
	lastfm,
	lyricist,
};
