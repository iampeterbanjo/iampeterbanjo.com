/**
 * Pragmatic REST API design
 * 1. Use nouns at the root
 * 2. Pluralise nouns
 * 2. Use correct verbs
 * 3. Try to keep it short e.g. max 3 slashes deep
 */
const slugify = require('slugify');
const got = require('got');

const client = got.extend({ baseUrl: 'http://0.0.0.0:8080', json: true });

const routes = {
	'get.apis.korin.tracks': () => {
		const method = 'GET';
		const url = '/apis/korin/tracks';

		return {
			method,
			path: url,
			url,
			client: () => client(url, { method }),
		};
	},

	'get.apis.korin.profiles': (options = {}) => {
		const { artist, track } = options;
		return {
			method: 'GET',
			path: '/apis/korin/{artist}/{track}',
			url: `/apis/korin/${artist}/${track}`,
		};
	},

	'get.korin.tracks': () => {
		return {
			method: 'GET',
			path: '/korin/tracks',
			url: '/korin/tracks',
		};
	},

	'get.korin.profiles': (options = {}) => {
		const { artist = '', track = '' } = options;
		const artistParam = slugify(artist).toLowerCase();
		const trackParam = slugify(track).toLowerCase();

		return {
			method: 'GET',
			path: '/korin/{artist}/{track}',
			url: `/korin/${artistParam}/${trackParam}`,
		};
	},
};

module.exports = routes;
