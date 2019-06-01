const Joi = require('@hapi/joi');

/**
 * Check TopTrack schema
 * @param {object} topTrack
 */
const checkTopTrack = topTrack => {
	const schema = Joi.object({
		title: Joi.string(),
		image: Joi.string().uri(),
		artist: Joi.string(),
		lastFmUrl: Joi.string().uri(),
	});

	return Joi.validate(topTrack, schema, { presence: 'required' });
};

const saveRawTopTracks = async server => {
	const rawTopTracks = await server.methods.korin.getTopTracks();
	const tracks = rawTopTracks.tracks.track;

	await server.app.db.pipeline.TopTracksRaw.insertMany(tracks);
};

module.exports = {
	checkTopTrack,
	saveRawTopTracks,
};
