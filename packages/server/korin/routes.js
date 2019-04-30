/* eslint-disable camelcase */
const { slugger, clientel } = require('../utils');

const get_korin_tracks = () => {
	const method = 'GET';
	const url = '/v1/korin/tracks';
	return {
		method,
		path: url,
		url,
		client: () => clientel.korin(url, { method }),
	};
};

const get_korin_profiles = (options = {}) => {
	const { artist, track } = options;
	const artistParam = slugger.parse(artist);
	const trackParam = slugger.parse(track);
	const method = 'GET';
	const url = `/v1/korin/${artistParam}/${trackParam}`;
	const path = '/v1/korin/{artist}/{track}';
	return { method, path, url, client: () => clientel.korin(url, { method }) };
};

module.exports = {
	v1: {
		get_korin_tracks,
		get_korin_profiles,
	},
};