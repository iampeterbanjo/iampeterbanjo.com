type RawTopTrack = {
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

type Track = {
	artist: string;
	title: string;
	image: string;
	lastFmUrl: string;
};

type TopTrack = Track & {
	importedDate?: number;
};

type Profile = TopTrack & {
	summary: string;
	profileUrl: string;
};

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
