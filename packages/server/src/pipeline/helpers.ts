import Joi from '@hapi/joi';
import * as R from 'ramda';
import jsonata from 'jsonata';

import utils from '../utils';
import {
	RawTopTrack,
	TopTrackModel,
	AddTrackProfileDataParams,
	AddTrackSpotifyDataParams,
} from '../../@types';
import { IChartTrack } from '../database/ChartTrack';

export const { vars } = utils;
export const { convertTopTracksPath } = vars;

const topTrackPartialProps = {
	title: Joi.string(),
	artist: Joi.string(),
	lastFmUrl: Joi.string().uri(),
};

const topTrackProps = {
	...topTrackPartialProps,
	profileUrl: Joi.string(),
	spotify: { image: Joi.string().uri(), href: Joi.string().uri() },
};

const rawTopTrackProps = {
	name: Joi.string(),
	duration: Joi.string(),
	playcount: Joi.string(),
	listeners: Joi.string(),
	url: Joi.string().uri(),
	artist: Joi.object(),
	image: Joi.array(),
};

export const TopTrackPartialValidator = Joi.object(topTrackPartialProps);
export const TopTrackValidator = Joi.object(topTrackProps);
export const RawTopTrackValidator = Joi.object(rawTopTrackProps);

export const TrackProfileValidator = Joi.object({
	...topTrackProps,
	summary: Joi.string(),
});

export const checkTopTrackPartial = (topTrack: object) => {
	return Joi.validate(topTrack, TopTrackPartialValidator, {
		presence: 'required',
	});
};

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

export const parseTopTracksPartial = topTracks => {
	const expression = jsonata(convertTopTracksPath);
	const tracks = expression.evaluate(topTracks);

	return tracks;
};

export const addProfileAndSpotifyData = async (
	chartTracks: IChartTrack[],
	{ spotifyApi, profileApi },
) => {
	const tracks = parseTopTracksPartial(chartTracks);
	const withProfileData = await addTrackProfileData({
		tracks,
		request: profileApi,
	});
	const withSpotifyData = await addTrackSpotifyData({
		tracks: withProfileData,
		request: spotifyApi,
	});

	return withSpotifyData;
};

export const convertRawTopTracks = async server => {
	const rawTracks = await server.app.db.RawTopTrack.find({});
	const tracks = parseTopTracksPartial(rawTracks);

	await server.app.db.TopTrack.deleteMany();
	await server.app.db.TopTrack.insertMany(tracks);

	return tracks;
};

export const addTrackProfile = async server => {
	const tracks = await server.app.db.TopTrack.find({});

	await Promise.all(
		tracks.map(async (track: TopTrackModel) => {
			const {
				profile,
				summary,
				lyrics,
			} = await server.methods.korin.getProfileByArtistAndTrack({
				artist: track.artist,
				track: track.title,
			});

			const updated = Object.assign(track, { profile, summary, lyrics });

			await updated.save();
		}),
	);
};

export const addTrackProfileData = async ({
	tracks,
	request,
}: AddTrackProfileDataParams) => {
	return Promise.all(
		tracks.map(async (track: RawTopTrack) => {
			const { profile, summary, lyrics } = await request({
				artist: track.artist.name,
				track: track.name,
			});

			return {
				...track,
				profile,
				summary,
				lyrics,
			};
		}),
	);
};

export const addTrackSpotifyData = async ({
	tracks,
	request,
}: AddTrackSpotifyDataParams) => {
	await Promise.all(
		tracks.map(async (track: RawTopTrack) => {
			const spotify = await request(track.artist.name);

			return {
				...track,
				spotify,
			};
		}),
	);
};

export const addSpotifyData = async server => {
	const tracks = await server.app.db.TopTrack.find({});

	await Promise.all(
		tracks.map(async (track: TopTrackModel) => {
			const accessToken = await server.methods.korin.getSpotifyAccessToken();
			const spotifyData = await server.methods.korin.getSpotifyData(
				track.artist,
				accessToken,
			);

			track.spotify = spotifyData;

			await track.save();
		}),
	);
};
