import Joi from '@hapi/joi';
import * as R from 'ramda';

export const TopTrackValidator = Joi.object({
	title: Joi.string(),
	image: Joi.string().uri(),
	artist: Joi.string(),
	lastFmUrl: Joi.string().uri(),
});

export const RawTopTrackValidator = Joi.object({
	name: Joi.string(),
	duration: Joi.string(),
	playcount: Joi.string(),
	listeners: Joi.string(),
	url: Joi.string().uri(),
	artist: Joi.object(),
	image: Joi.array(),
});

const checkTopTrack = (topTrack: object) => {
	return Joi.validate(topTrack, TopTrackValidator, { presence: 'required' });
};

const checkRawTopTrack = topTrackRaw => {
	return Joi.validate(topTrackRaw, RawTopTrackValidator, {
		allowUnknown: true,
		presence: 'required',
	});
};

/**
 * Check track profile. Combines data for chart track info
 * and profile summary
 * @param {object} trackProfile
 */
const checkTrackProfile = trackProfile => {
	const schema = {};

	return Joi.validate(trackProfile, schema);
};

const saveRawTopTracks = async server => {
	const rawTopTracks = await server.methods.korin.getChartTopTracks();

	const tracks = R.pathOr(null, ['tracks', 'track'], rawTopTracks) || [];

	if (!tracks) throw new Error('No tracks found');

	tracks.forEach(track => {
		const { error } = checkRawTopTrack(track);
		if (error) throw error;
	});

	await server.app.db.pipeline.TopTracksRaw.insertMany(tracks);
};

export default {
	checkTopTrack,
	checkRawTopTrack,
	saveRawTopTracks,
	checkTrackProfile,
};
