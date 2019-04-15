/**
 * Pragmatic REST API design
 * 1. Use nouns at the root
 * 2. Pluralise nouns
 * 2. Use correct verbs
 * 3. Try to keep it short e.g. max 3 slashes deep
 */
const got = require('got');
const { slugger, vars } = require('./utils');

const { baseUrl } = vars;
const request = got.extend({ baseUrl, json: true });

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

module.exports = {
	get_apis_korin_tracks: () => {
		return getApisKorinTracks();
	},

	get_apis_korin_profiles: (options = {}) => {
		return getApisKorinProfiles(options);
	},

	get_korin_tracks: () => {
		return getKorinTracks();
	},

	get_korin_profiles: (options = {}) => {
		return getKorinProfiles(options);
	},
};
