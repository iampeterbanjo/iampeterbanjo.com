import { Model } from 'mongoose';
import {
	TrackProfile,
	RequestProfileApi,
	RequestSpotifyArtistApi,
} from '../../@types';
import { IChartTrack } from '../database/ChartTrack';
import { ITrackProfile } from '../database/TrackProfile';

export type TransformChartTracksParams = {
	source: Model<IChartTrack>;
	transformation: (
		tracks: IChartTrack[],
		param: {
			spotifyApi: RequestSpotifyArtistApi;
			profileApi: RequestProfileApi;
		},
	) => Promise<TrackProfile[]>;
	target: Model<ITrackProfile>;
	spotifyApi: RequestSpotifyArtistApi;
	profileApi: RequestProfileApi;
};

export default async function transformChartTracks({
	source,
	transformation,
	target,
	spotifyApi,
	profileApi,
}: TransformChartTracksParams) {
	const rawTracks = await source.find();
	const profiles = await transformation(rawTracks, { spotifyApi, profileApi });

	await target.deleteMany({});
	return target.insertMany(profiles);
}
