type GeniusData = {
	meta: {
		status: number;
	};
	response: {
		hits: object[];
	};
};

type SongInfo = {
	id: number;
	thumbnail: string;
};

type TrackInfo = {
	artist: string;
	track: string;
};

type WatsonProfileContentType = 'text/plain' | 'application/json';

interface WatsonProfileParams {
	content: string;
	content_type: WatsonProfileContentType;
	consumption_preferences: boolean;
}

type WatsonProfileInsights = {
	profile: object | string;
	summary: string;
};

type TrackProfile = WatsonProfileInsights & {
	lyrics: string;
};

type MongooseModel = {
	_id: string;
	save: () => Promise<any>;
	remove: () => Promise<void>;
};

type RawTopTrack = MongooseModel & {
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

type RawTopTrackJson = {
	tracks: {
		track: RawTopTrack[];
	};
};

type Track = {
	artist: string;
	title: string;
	image: string;
	lastFmUrl: string;
};

type TopTrack = Track & {
	profileUrl: string;
	profile?: string;
	summary?: string;
	lyrics?: string;
	importedDate?: number;
};

type Profile = TopTrack & {
	profile: object;
	summary: string;
	profileUrl: string;
};

type TopTrackModel = MongooseModel & TopTrack;
type ProfileModel = MongooseModel & Profile;

type SpotifyApiGrantResponse = {
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

type SpotifyApiArtistImages = [
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

type SpotifyApiArtist = {
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

type SpotifyApiArtistSearchResponse = {
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

interface Api {
	info: {
		uri: string;
		host: string;
		port: number;
	};
	start: () => Promise<void>;
	app: {
		agenda: {
			start: () => Promise<void>;
			init: () => Promise<void>;
		};
		db: {};
		logger: {};
	};
	methods: {
		korin: {
			getProfileByArtistAndTrack: () => Promise<TrackProfile>;
			getChartTopTracks: () => Promise<RawTopTrackJson>;
			getArtistImage: () => Promise<string>;
			getSpotifyAccessToken: () => Promise<string>;
		};
	};
}
