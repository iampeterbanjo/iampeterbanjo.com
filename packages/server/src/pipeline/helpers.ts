import Joi from '@hapi/joi';
import * as R from 'ramda';
import jsonata from 'jsonata';
import viewRoutes from '../views/routes';
import utils from '../utils';

const { vars, slugger } = utils;
const { topTracksPath, convertTopTracksPath } = vars;

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

const checkTopTrack = (topTrack: object) => {
	return Joi.validate(topTrack, TopTrackValidator, { presence: 'required' });
};

const checkRawTopTrack = topTrackRaw => {
	return Joi.validate(topTrackRaw, RawTopTrackValidator, {
		allowUnknown: true,
		presence: 'required',
	});
};

const checkTrackProfile = trackProfile => {
	return Joi.validate(trackProfile, TrackProfileValidator, {
		presence: 'required',
	});
};

const parseRawTopTracks = (rawTopTracks): RawTopTrack[] => {
	const tracks = R.pathOr([], ['tracks', 'track'], rawTopTracks);

	if (!tracks || !tracks.length) throw new Error('No tracks found');

	return tracks.map((track: RawTopTrack) => {
		track.importedDate = Date.now();
		const { error } = checkRawTopTrack(track);
		if (error) throw error;

		return track;
	});
};

const saveRawTopTracks = async server => {
	const rawTopTracks = await server.methods.korin.getChartTopTracks();
	const tracks = parseRawTopTracks(rawTopTracks);

	await server.app.db.RawTopTrack.deleteMany();
	await server.app.db.RawTopTrack.insertMany(tracks);

	return tracks;
};

const parseTopTracks = topTracks => {
	const expression = jsonata(convertTopTracksPath);

	expression.registerFunction('getProfileUrl', (artist, title) => {
		return slugger.slugify(`${artist} ${title}`).toLowerCase();
	});
	const tracks = expression.evaluate(topTracks);

	return tracks;
};

const convertRawTopTracks = async server => {
	const rawTracks = await server.app.db.RawTopTrack.find({});
	const tracks = parseTopTracks(rawTracks);

	await server.app.db.TopTrack.deleteMany();
	await server.app.db.TopTrack.insertMany(tracks);

	return tracks;
};

const addArtistImages = async server => {
	const tracks = await server.app.db.TopTrack.find({});

	await Promise.all(
		tracks.map(async (track: TopTrack) => {
			const accessToken = await server.methods.korin.getAccessToken();
			const imageUrl = await server.methods.korin.getArtistImage(
				track.artist,
				accessToken,
			);

			track.image = imageUrl;

			await track.save();
		}),
	);
};

export default {
	checkTopTrack,
	checkRawTopTrack,
	saveRawTopTracks,
	parseTopTracks,
	parseRawTopTracks,
	convertRawTopTracks,
	checkTrackProfile,
	addArtistImages,
};
