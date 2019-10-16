import Scheduler from './scheduler/Scheduler';

export type GeniusData = {
	meta: {
		status: number;
	};
	response: {
		hits: object[];
	};
};

export type SongInfo = {
	id: number;
	thumbnail: string;
};

export type TrackInfo = {
	artist: string;
	track: string;
};

export type WatsonProfileContentType = 'text/plain' | 'application/json';

export type WatsonProfileParams = {
	content: string;
	content_type: WatsonProfileContentType;
	consumption_preferences: boolean;
};

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

export type TopTrackModel = MongooseModel & TopTrack;
export type ProfileModel = MongooseModel & Profile;

export type SpotifyApiGrantResponse = {
	body: {
		access_token: string;
		token_type: 'Bearer';
		expires_in: 3600;
		scope: '';
	};
	headers: {
		server: 'nginx';
		date: string;
		'content-type': 'application/json';
		'transfer-encoding': 'chunked';
		connection: 'close';
		vary: 'Accept-Encoding';
		'x-content-type-options': 'nosniff';
		'strict-transport-security': 'max-age=31536000';
		'content-encoding': 'gzip';
	};
	statusCode: number;
};

export type SpotifyApiArtistImages = [
	{
		height: 640;
		url: string;
		width: 640;
	},
	{
		height: 320;
		url: string;
		width: 320;
	},
	{
		height: 160;
		url: string;
		width: 160;
	},
];

export type SpotifyApiArtist = {
	external_urls: {
		spotify: string;
	};
	followers: { href: null; total: number };
	genres: string[];
	href: string;
	id: string;
	images: SpotifyApiArtistImages;
	name: string;
	popularity: number;
	type: 'artist';
	uri: string;
};

export type SpotifyApiArtistSearchResponse = {
	body: {
		artists: {
			href: string;
			items: SpotifyApiArtist[];
			limit: number;
			next: null;
			offset: number;
			previous: number | null;
			total: number;
		};
	};
};

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
