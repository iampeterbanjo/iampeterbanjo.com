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
