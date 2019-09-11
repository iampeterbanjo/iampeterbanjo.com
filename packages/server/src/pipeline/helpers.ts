import Joi from '@hapi/joi';
import * as R from 'ramda';
import jsonata from 'jsonata';
import utils from '../utils';

export const { vars, slugger } = utils;
export const { convertTopTracksPath } = vars;

export const TopTrackValidator = Joi.object({
	title: Joi.string(),
	image: Joi.string().uri(),
	artist: Joi.string(),
	lastFmUrl: Joi.string().uri(),
	profileUrl: Joi.string(),
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

export const TrackProfileValidator = Joi.object({
	title: Joi.string(),
	image: Joi.string().uri(),
	artist: Joi.string(),
	lastFmUrl: Joi.string().uri(),
	profileUrl: Joi.string(),
	summary: Joi.string(),
});

export const checkTopTrack = (topTrack: object) => {
	return Joi.validate(topTrack, TopTrackValidator, { presence: 'required' });
};

export const checkRawTopTrack = topTrackRaw => {
	return Joi.validate(topTrackRaw, RawTopTrackValidator, {
		allowUnknown: true,
		presence: 'required',
	});
};

export const checkTrackProfile = trackProfile => {
	return Joi.validate(trackProfile, TrackProfileValidator, {
		presence: 'required',
	});
};

export const parseRawTopTracks = (rawTopTracks): RawTopTrack[] => {
	const tracks = R.pathOr([], ['tracks', 'track'], rawTopTracks);

	if (!tracks || !tracks.length) throw new Error('No tracks found');

	return tracks.map((track: RawTopTrack) => {
		track.importedDate = Date.now();
		const { error } = checkRawTopTrack(track);
		if (error) throw error;

		return track;
	});
};

export const saveRawTopTracks = async server => {
	const rawTopTracks = await server.methods.korin.getChartTopTracks();
	const tracks = parseRawTopTracks(rawTopTracks);

	await server.app.db.RawTopTrack.deleteMany();
	await server.app.db.RawTopTrack.insertMany(tracks);

	return tracks;
};

export const parseTopTracks = topTracks => {
	const expression = jsonata(convertTopTracksPath);

	expression.registerFunction('getProfileUrl', (artist, title) => {
		return slugger.slugify(`${artist} ${title}`).toLowerCase();
	});
	const tracks = expression.evaluate(topTracks);

	return tracks;
};

export const convertRawTopTracks = async server => {
	const rawTracks = await server.app.db.RawTopTrack.find({});
	const tracks = parseTopTracks(rawTracks);

	await server.app.db.TopTrack.deleteMany();
	await server.app.db.TopTrack.insertMany(tracks);

	return tracks;
};

export const addArtistImages = async server => {
	const tracks = await server.app.db.TopTrack.find({});

	await Promise.all(
		tracks.map(async (track: TopTrackModel) => {
			const accessToken = await server.methods.korin.getSpotifyAccessToken();
			const imageUrl = await server.methods.korin.getArtistImage(
				track.artist,
				accessToken,
			);

			track.image = imageUrl;

			await track.save();
		}),
	);
};
