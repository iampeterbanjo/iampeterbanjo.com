import helpers from './helpers';

const { saveRawTopTracks, convertRawTopTracks } = helpers;

export default [
	{
		name: 'pipeline.saveRawTopTracks',
		method: saveRawTopTracks,
	},
	{
		name: 'pipeline.convertRawTopTracks',
		method: convertRawTopTracks,
	},
];
