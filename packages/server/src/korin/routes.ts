import utils from '../utils';

const { clientel } = utils;
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

const get_korin_profiles = () => {
	const method = 'GET';
	const path = '/korin/{profileUrl}';

	return { method, path, client: () => clientel.api(path, { method }) };
};

export default {
	get_korin_tracks,
	get_korin_profiles,
};
