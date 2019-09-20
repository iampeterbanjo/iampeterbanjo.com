export const baseUrl = 'http://0.0.0.0:8080';
export const lyricsIdPath = 'response.hits[0].result.id';
export const songInfoPath = `response.hits[0].result.{
	"id": id,
	"thumbnail": song_art_image_thumbnail_url
}`;
export const topTracksPath = `tracks.track.{
	"title": name,
		"image": image[3]."#text",
		"artist": artist.name,
		"url": artist.url,
		"profileUrl": $getProfileUrl(artist.name, name)
}`;
export const convertTopTracksPath = `
	$.{
		"title": name,
		"lastFmUrl": url,
		"artist": artist.name,
		"profileUrl": $getProfileUrl(artist.name, name),
		"image": "https://test.com"
	}`;
export const GENIUS_API_ACCESS_TOKEN =
	process.env.GENIUS_API_ACCESS_TOKEN || '';
export const GENIUS_API_URL = process.env.GENIUS_API_URL || '';
export const LASTFM_API_URL = process.env.LASTFM_API_URL || '';
export const LASTFM_API_KEY = process.env.LASTFM_API_KEY || '';
export const PORT = process.env.PORT || '';

export const MONGODB_ADDON_URI = process.env.MONGODB_ADDON_URI || '';
export const MONGODB_ADDON_DB = process.env.MONGODB_ADDON_DB || '';

export const WATSON_PI_API_KEY = process.env.WATSON_PI_API_KEY || '';
export const WATSON_PI_API_URL = process.env.WATSON_PI_API_URL || '';
export const WATSON_PI_API_VERSION = process.env.WATSON_PI_API_VERSION || '';

export const ENVIRONMENT = process.env.NODE_ENV || 'development';
export const BASE_URL = process.env.BASE_URL || '';
export const ROLLBAR_ACCESS_TOKEN = process.env.ROLLBAR_ACCESS_TOKEN || '';
export const PACKAGE_VERSION = process.env.npm_package_version;
export const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET || '';
export const SPOTIFY_CLIENT_KEY = process.env.SPOTIFY_CLIENT_KEY || '';
export const SESSION_SECRET_KEY = process.env.SESSION_SECRET_KEY || '';

export const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN || '';
export const AUTH0_PUBLIC_KEY = process.env.AUTH0_PUBLIC_KEY || '';
export const AUTH0_SECRET_KEY = process.env.AUTH0_SECRET_KEY || '';
