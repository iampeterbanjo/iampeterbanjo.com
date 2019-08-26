/* eslint-disable camelcase */
const {
	GENIUS_API_ACCESS_TOKEN,
	GENIUS_API_URL,
	LASTFM_API_URL,
	LASTFM_API_KEY,
	PORT,
	MONGODB_ADDON_URI,
	MONGODB_ADDON_DB,
	WATSON_PI_API_KEY,
	WATSON_PI_API_URL,
	WATSON_PI_API_VERSION,
	NODE_ENV,
	BASE_URL,
	SENTRY_DSN,
	ROLLBAR_ACCESS_TOKEN,
	npm_package_version,
} = process.env;

module.exports = {
	baseUrl: 'http://0.0.0.0:8080',
	lyricsIdPath: 'response.hits[0].result.id',
	songInfoPath: `response.hits[0].result.{
		"id": id,
		"thumbnail": song_art_image_thumbnail_url
	}`,
	topTracksPath: `tracks.track.{
		"title": name,
			"image": image[3]."#text",
			"artist": artist.name,
			"url": artist.url,
			"profileUrl": $getProfileUrl(artist.name, name)
	}`,
	GENIUS_API_ACCESS_TOKEN,
	GENIUS_API_URL,
	LASTFM_API_URL,
	LASTFM_API_KEY,
	PORT,
	MONGODB_ADDON_URI,
	MONGODB_ADDON_DB,
	WATSON_PI_API_KEY,
	WATSON_PI_API_URL,
	WATSON_PI_API_VERSION,
	ENVIRONMENT: NODE_ENV || 'development',
	BASE_URL,
	SENTRY_DSN,
	ROLLBAR_ACCESS_TOKEN,
	PACKAGE_VERSION: npm_package_version,
};
