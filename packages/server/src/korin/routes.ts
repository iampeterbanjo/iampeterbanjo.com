import utils from '../utils';

const { slugger, clientel } = utils;
const get_korin_tracks = () => {
	const method = 'GET';
	const url = '/korin/tracks';
	return {
		method,
		path: url,
		url,
		client: () => clientel.api(url, { method }),
	};
};

const get_korin_profiles = (
	options = {} as { artist: string; track: string },
) => {
	const { artist, track } = options;
	const artistParam = slugger.parse(artist);
	const trackParam = slugger.parse(track);
	const method = 'GET';
	const url = `/korin/${artistParam}/${trackParam}`;
	const path = '/korin/{artist}/{track}';
	return { method, path, url, client: () => clientel.api(url, { method }) };
};

export default {
	get_korin_tracks,
	get_korin_profiles,
};
