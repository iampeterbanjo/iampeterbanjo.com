const got = require('got');
const jsonata = require('jsonata');
const PersonalityInsightsV3 = require('watson-developer-cloud/personality-insights/v3');

const { vars } = require('../utils');

const {
	lyricsIdPath,
	LASTFM_API_KEY,
	LASTFM_API_URL,
	WATSON_PI_API_KEY,
	WATSON_PI_API_URL,
	WATSON_PI_API_VERSION,
} = vars;

const lastfmApi = got.extend({
	baseUrl: LASTFM_API_URL,
	json: true,
});

const getTopTracks = async () => {
	const query = new URLSearchParams([
		['method', 'chart.getTopTracks'],
		['format', 'json'],
		['api_key', LASTFM_API_KEY],
	]);

	return (await lastfmApi.get('/', { query })).body;
};

const getLyrics = async ({ geniusApi, lyricist, search }) => {
	const query = new URLSearchParams([['q', search]]);
	const data = (await geniusApi.get('/search', { query })).body;
	const expression = jsonata(lyricsIdPath);
	const songId = expression.evaluate(data);

	if (!songId) return null;
	const { lyrics } = await lyricist.song(songId, { fetchLyrics: true });

	return lyrics;
};

const getProfile = options => {
	const personalityInsights = new PersonalityInsightsV3({
		version: WATSON_PI_API_VERSION,
		iam_apikey: WATSON_PI_API_KEY,
		url: WATSON_PI_API_URL,
	});

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

module.exports = {
	getTopTracks,
	getLyrics,
	getPersonalityProfile,
};
