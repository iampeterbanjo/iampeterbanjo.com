module.exports = {
	GENIUS_API_ACCESS_TOKEN: process.env.GENIUS_API_ACCESS_TOKEN || '',
	GENIUS_API_URL: process.env.GENIUS_API_URL || '',

	LASTFM_API_URL: process.env.LASTFM_API_URL || '',
	LASTFM_API_KEY: process.env.LASTFM_API_KEY || '',

	BASE_URL: process.env.BASE_URL || '',
	ENVIRONMENT: process.env.NODE_ENV || 'development' || '',
	PORT: process.env.PORT || '',
	DATA_PORT: process.env.DATA_PORT || '',

	MONGODB_ADDON_URI: process.env.MONGODB_ADDON_URI || '',
	MONGODB_ADDON_DB: process.env.MONGODB_ADDON_DB || '',

	WATSON_PI_API_KEY: process.env.WATSON_PI_API_KEY || '',
	WATSON_PI_API_URL: process.env.WATSON_PI_API_URL || '',
	WATSON_PI_API_VERSION: process.env.WATSON_PI_API_VERSION || '',

	ROLLBAR_ACCESS_TOKEN: process.env.ROLLBAR_ACCESS_TOKEN || '',

	SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET || '',
	SPOTIFY_CLIENT_KEY: process.env.SPOTIFY_CLIENT_KEY || '',

	SESSION_SECRET_KEY: process.env.SESSION_SECRET_KEY || '',
	AUTH0_AUDIENCE: process.env.AUTH0_AUDIENCE || '',
	AUTH0_DOMAIN: process.env.AUTH0_DOMAIN || '',
	AUTH0_PUBLIC_KEY: process.env.AUTH0_PUBLIC_KEY || '',
	AUTH0_SECRET_KEY: process.env.AUTH0_SECRET_KEY || '',
};
