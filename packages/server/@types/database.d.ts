import * as mongoose from 'mongoose';

export type WatsonProfileInsights = {
	profile: object | string;
	summary: string;
};

export type TrackProfile = WatsonProfileInsights & {
	lyrics: string;
};

export type MongooseModel = {
	_id: string;
	save: () => Promise<any>;
	remove: () => Promise<void>;
};

export type RawTopTrack = MongooseModel & {
	name: string;
	duration: string;
	playcount: string;
	subscribers: string;
	mbid: string;
	url: string;
	streamable: {
		'#text': string;
		fulltrack: string;
	};
	artist: {
		name: string;
		mbid: string;
		url: string;
	};
	image: [
		{
			'#text': string;
			size: string;
		},
	];
	importedDate?: number;
};

export type RawTopTrackJson = {
	tracks: {
		track: RawTopTrack[];
	};
};

export type Track = {
	artist: string;
	title: string;
	spotify: {
		image: string;
		href: string;
	};
	lastFmUrl: string;
};

export type ConvertedTrack = Track & {
	profileUrl: string;
};

export type TopTrack = Track & {
	profileUrl: string;
	profile?: string;
	summary?: string;
	lyrics?: string;
	importedDate?: number;
};

export type Profile = TopTrack & {
	profile: object;
	summary: string;
	profileUrl: string;
};

export type RequestProfileApi = (param: {
	artist: string;
	track: string;
}) => Promise<TrackProfile>;

type AddTrackProfileDataParams = {
	tracks: RawTopTrack[];
	request: RequestProfileApi;
};

export type RequestSpotifyArtistApi = (
	artist: string,
) => Promise<{ image: string; href: string }>;

type AddTrackSpotifyDataParams = {
	tracks: RawTopTrack[];
	request: RequestSpotifyArtistApi;
};

export type TopTrackModel = MongooseModel & TopTrack;
export type ProfileModel = MongooseModel & Profile;

export interface Connection {
	uri: string;
	connection: mongoose.Connection;
}

export type DbConnector = () => Promise<Connection>;
