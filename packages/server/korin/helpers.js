const jsonata = require('jsonata');
const PersonalityInsightsV3 = require('watson-developer-cloud/personality-insights/v3');
const {
	message,
	clientel: { genius, lastfm, lyricist },
} = require('../utils');

const { vars } = require('../utils');

const {
	lyricsIdPath,
	LASTFM_API_KEY,
	WATSON_PI_API_KEY,
	WATSON_PI_API_URL,
	WATSON_PI_API_VERSION,
} = vars;

const getSongData = async search => {
	const query = new URLSearchParams([['q', search]]);

	return (await genius.get('/search', { query })).body;
};

const getTopTracks = async () => {
	const query = new URLSearchParams([
		['method', 'chart.getTopTracks'],
		['format', 'json'],
		['api_key', LASTFM_API_KEY],
	]);

	return (await lastfm.get('/', { query })).body;
};

const getLyrics = async data => {
	const expression = jsonata(lyricsIdPath);
	const songId = expression.evaluate(data);

	if (!songId) return null;
	const { lyrics } = await lyricist.song(songId, { fetchLyrics: true });

	return lyrics;
};

/**
 * Watson profile request options.
 * @typedef {Object<string, any>} options
 * @property {string} content Content to process.
 * @property {'text/plain' | 'application/json'} content_type data content type
 * @property {boolean} consumption_preferences Add consumption analysis
 */
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

const getPersonalityProfile = async lyrics => {
	if (!lyrics) return message.ERROR_LYRICS_REQUIRED_FOR_PROFILE;

	const options = {
		content: lyrics,
		content_type: 'text/plain',
		consumption_preferences: true,
	};

	const profile = await getProfile(options);
	return profile;
};

module.exports = {
	getSongData,
	getTopTracks,
	getLyrics,
	getPersonalityProfile,
};
