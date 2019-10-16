import * as helpers from './helpers';

const methods = [
	'saveRawTopTracks',
	'convertRawTopTracks',
	'addSpotifyData',
	'addTrackProfile',
].map((name: string) => {
	return {
		name: `pipeline.${name}`,
		method: helpers[name],
	};
});

export default methods;
