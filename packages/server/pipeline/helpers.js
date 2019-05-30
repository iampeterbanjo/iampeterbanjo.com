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

module.exports = {
	checkTopTrack,
};
