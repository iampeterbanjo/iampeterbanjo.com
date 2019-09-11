import * as helpers from './helpers';

const {
	saveRawTopTracks,
	convertRawTopTracks,
	addArtistImages,
	addTrackProfile,
} = helpers;

export default [
	{
		name: 'pipeline.saveRawTopTracks',
		method: saveRawTopTracks,
	},
	{
		name: 'pipeline.convertRawTopTracks',
		method: convertRawTopTracks,
	},
	{
		name: 'pipeline.addArtistImages',
		method: addArtistImages,
	},
	{
		name: 'pipeline.addTrackProfile',
		method: addTrackProfile,
	},
];
