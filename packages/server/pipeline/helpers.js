const Joi = require('@hapi/joi');
const ramda = require('ramda');

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

	const tracks = ramda.pathOr(null, ['tracks', 'track'], rawTopTracks);

	if (!tracks) throw new Error('No tracks found');

	await server.app.db.pipeline.TopTracksRaw.insertMany(tracks);
};

module.exports = {
	checkTopTrack,
	saveRawTopTracks,
};
