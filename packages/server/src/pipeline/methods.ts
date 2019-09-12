import * as helpers from './helpers';

const methods = [
	'saveRawTopTracks',
	'convertRawTopTracks',
	'addArtistImages',
	'addTrackProfile',
].map((name: string) => {
	return {
		name: `pipeline.${name}`,
		method: helpers[name],
	};
});

export default methods;
