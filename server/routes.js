/**
 * Pragmatic REST API design
 * 1. Use nouns at the root
 * 2. Pluralise nouns
 * 2. Use correct verbs
 * 3. Try to keep it short e.g. max 3 slashes deep
 */
const got = require('got');
const { slugger } = require('./utils');

const request = got.extend({ baseUrl: 'http://0.0.0.0:8080', json: true });

const routes = {
	'get.apis.korin.tracks': () => {
		const method = 'GET';
		const url = '/apis/korin/tracks';

		return {
			method,
			path: url,
			url,
			client: () => request(url, { method }),
		};
	},

	'get.apis.korin.profiles': (options = {}) => {
		const { artist, track } = options;
		const method = 'GET';
		const url = `/apis/korin/${artist}/${track}`;
		const path = '/apis/korin/{artist}/{track}';

		return { method, path, url, client: () => request(url, { method }) };
	},

	'get.korin.tracks': () => {
		const url = '/korin/tracks';

		return {
			method: 'GET',
			path: url,
			url,
		};
	},

	'get.korin.profiles': (options = {}) => {
		const { artist = '', track = '' } = options;
		const artistParam = slugger.parse(artist);
		const trackParam = slugger.parse(track);

		return {
			method: 'GET',
			path: '/korin/profiles/{artist}/{track}',
			url: `/korin/profiles/${artistParam}/${trackParam}`,
		};
	},
};

module.exports = routes;
