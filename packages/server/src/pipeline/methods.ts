import helpers from './helpers';

const { saveRawTopTracks, convertRawTopTracks, addArtistImages } = helpers;

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
];
