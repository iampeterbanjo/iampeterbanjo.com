/**
 * @type {object}
 * @property {function} extend
 * @property {function} get
 */
const Lyricist = require('lyricist');
const Wreck = require('@hapi/wreck');
const time = require('./time');

const {
	baseUrl,
	GENIUS_API_ACCESS_TOKEN,
	GENIUS_API_URL,
	LASTFM_API_URL,
} = require('./vars');

const wreck = Wreck.defaults({ timeout: time.oneMinute });
const api = wreck.defaults({ baseUrl });

const genius = wreck.defaults({
	baseUrl: `${GENIUS_API_URL}/`,
	headers: {
		authorization: `Bearer ${GENIUS_API_ACCESS_TOKEN}`,
	},
	json: true,
});

const lastfm = wreck.defaults({
	baseUrl: `${LASTFM_API_URL}/`,
	json: true,
});

const lyricist = new Lyricist(GENIUS_API_ACCESS_TOKEN);

module.exports = {
	api,
	genius,
	lastfm,
	lyricist,
};
