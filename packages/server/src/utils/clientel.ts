/**
 * @type {object}
 * @property {function} extend
 * @property {function} get
 */
import Lyricist from 'lyricist';
import Wreck from '@hapi/wreck';
import time from './time';

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

export default {
	api,
	genius,
	lastfm,
	lyricist,
};
