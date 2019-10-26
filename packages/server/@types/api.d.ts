import Scheduler from '../src/scheduler/Scheduler';
import {
	TrackProfile,
	RawTopTrackJson,
	RawTopTrack,
	ConvertedTrack,
} from './database';

export type Route = {
	path: string;
	method: '*' | 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'OPTIONS';
	vhost?: string;
	handler: (request, reply) => any;
	options: object;
	rules: object;
};

export interface Api {
	inject: (Route) => Promise<{ [key: string]: any }>;
	info: {
		uri: string;
		host: string;
		port: number;
	};
	start: () => Promise<void>;
	app: {
		scheduler: Scheduler;
		db: {};
		logger: {};
	};
	methods: {
		korin: {
			getProfileByArtistAndTrack: () => Promise<TrackProfile>;
			getChartTopTracks: () => Promise<RawTopTrackJson>;
			getSpotifyData: () => Promise<string>;
			getSpotifyAccessToken: () => Promise<string>;
		};
		pipeline: {
			saveRawTopTracks: (server: Api) => Promise<RawTopTrack[]>;
			convertRawTopTracks: (server: Api) => Promise<ConvertedTrack[]>;
			addSpotifyData: (server: Api) => Promise<void>;
			addTrackProfile: (server: Api) => Promise<void>;
		};
	};
}
