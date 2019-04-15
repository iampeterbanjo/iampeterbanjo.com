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

const getApisKorinTracks = () => {
	const method = 'GET';
	const url = '/apis/korin/tracks';
	return {
		method,
		path: url,
		url,
		client: () => request(url, { method }),
	};
};

const getApisKorinProfiles = options => {
	const { artist, track } = options;
	const artistParam = slugger.parse(artist);
	const trackParam = slugger.parse(track);
	const method = 'GET';
	const url = `/apis/korin/${artistParam}/${trackParam}`;
	const path = '/apis/korin/{artist}/{track}';
	return { method, path, url, client: () => request(url, { method }) };
};

const getKorinTracks = () => {
	const url = '/korin/tracks';
	return {
		method: 'GET',
		path: url,
		url,
	};
};

const getKorinProfiles = options => {
	const { artist = '', track = '' } = options;
	const artistParam = slugger.parse(artist);
	const trackParam = slugger.parse(track);
	return {
		method: 'GET',
		path: '/korin/profiles/{artist}/{track}',
		url: `/korin/profiles/${artistParam}/${trackParam}`,
	};
};

const routes = {
	'get.apis.korin.tracks': () => {
		return getApisKorinTracks();
	},

	'get.apis.korin.profiles': (options = {}) => {
		return getApisKorinProfiles(options);
	},

	'get.korin.tracks': () => {
		return getKorinTracks();
	},

	'get.korin.profiles': (options = {}) => {
		return getKorinProfiles(options);
	},
};

module.exports = routes;
