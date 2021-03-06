import Lyricist from 'lyricist';
import Wreck from '@hapi/wreck';
import time from '@iampeterbanjo/time';
import env from '@iampeterbanjo/env';

const {
	baseUrl,
	GENIUS_API_ACCESS_TOKEN,
	GENIUS_API_URL,
	LASTFM_API_URL,
} = env;

export const wreck = Wreck.defaults({ timeout: time.oneMinute });
export const api = wreck.defaults({ baseUrl });

export const genius = wreck.defaults({
	baseUrl: `${GENIUS_API_URL}/`,
	headers: {
		authorization: `Bearer ${GENIUS_API_ACCESS_TOKEN}`,
	},
	json: true,
});

export const lastfm = wreck.defaults({
	baseUrl: `${LASTFM_API_URL}/`,
	json: true,
});

export const lyricist = new Lyricist(GENIUS_API_ACCESS_TOKEN);
