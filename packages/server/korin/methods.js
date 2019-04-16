const Crypto = require('crypto');
const jsonata = require('jsonata');
const PersonalityInsightsV3 = require('watson-developer-cloud/personality-insights/v3');

const { time, vars } = require('../utils');

const {
	lyricsIdPath,
	WATSON_PI_API_KEY,
	WATSON_PI_API_URL,
	WATSON_PI_API_VERSION,
} = vars;

const cache = {
	expiresIn: time.oneDay,
	staleIn: time.tenSeconds,
	staleTimeout: time.oneHundredMilliseconds,
	generateTimeout: time.oneMinute,
	cache: 'mongodb-cache',
};

const getTopTracks = {
	name: 'korin.getTopTracks',
	method: async ({ lastfmApi }) => {
		const query = new URLSearchParams([
			['method', 'chart.getTopTracks'],
			['format', 'json'],
			['api_key', lastfmApi.defaults.options.apiKey],
		]);

		return (await lastfmApi.get('/', { query })).body;
	},
	options: {
		cache,
		generateKey: () => 'getTopTracks',
	},
};

const getLyrics = {
	name: 'korin.getLyrics',
	method: async ({ geniusApi, lyricist }, term) => {
		const query = new URLSearchParams([['q', term]]);
		const data = (await geniusApi.get('/search', { query })).body;
		const expression = jsonata(lyricsIdPath);
		const songId = expression.evaluate(data);

		if (!songId) return null;
		const { lyrics } = await lyricist.song(songId, { fetchLyrics: true });

		return lyrics;
	},
	options: {
		cache,
		generateKey: ({ searchString }) => {
			if (!searchString) return searchString;

			return Crypto.createHash('sha1')
				.update(searchString)
				.digest('hex');
		},
	},
};

const personalityInsights = new PersonalityInsightsV3({
	version: WATSON_PI_API_VERSION,
	iam_apikey: WATSON_PI_API_KEY,
	url: WATSON_PI_API_URL,
});

const getProfile = options => {
	return new Promise((resolve, reject) => {
		personalityInsights.profile(options, (error, response) => {
			if (error) {
				return reject(error);
			}
			return resolve(response);
		});
	});
};

const getPersonalityProfile = async ({ lyrics }) => {
	if (!lyrics) return 'No lyrics found for profile';

	const options = {
		content: lyrics,
		content_type: 'text/plain',
		consumption_preferences: true,
	};

	const profile = await getProfile(options);

	if (!profile) return 'No profile could be generated';

	return profile;
};

module.exports = [getTopTracks, getLyrics, getPersonalityProfile];
