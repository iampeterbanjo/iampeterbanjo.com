const jsonata = require('jsonata');
const PersonalityInsightsV3 = require('watson-developer-cloud/personality-insights/v3');
const PersonalityTextSummary = require('personality-text-summary');

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

/**
 * Get songId from Genius search data
 * @param {object} data Genius search data
 */
const getSongId = data => {
	const expression = jsonata(lyricsIdPath);
	const songId = expression.evaluate(data);

	return songId;
};

/**
 * Get Genius songId based on artist and track
 * @param {string} search space-separated Artist and track
 */
const getSongIdFromSearch = search => {
	const songData = getSongData(search);
	const songId = getSongId(songData);
	return songId;
};

/**
 * Get lyrics for song
 * @param {string} songId Genius songId
 */
const getLyrics = async songId => {
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

/**
 * Plain text summary of personality profile
 * @param {string} profile Watson personality profile
 */
const getTextSummary = profile => {
	const textSummary = new PersonalityTextSummary({
		locale: 'en',
		version: 'v3',
	});

	const summary = textSummary.getSummary(profile);
	return summary;
};

/**
 * Get personality profile and summary based on lyrics
 * @param {string} lyrics Track lyrics
 * @typedef {object} Insights
 * @property {object} Insights.profile
 * @property {string} Insights.summary
 * @return {Promise<Insights>} Profile and summary
 */
const getPersonalityProfile = async lyrics => {
	if (!lyrics) {
		return {
			profile: message.ERROR_LYRICS_REQUIRED_FOR_PROFILE,
			summary: '',
		};
	}

	const options = {
		content: lyrics,
		content_type: 'text/plain',
		consumption_preferences: true,
	};

	const profile = await getProfile(options);
	const summary = getTextSummary(profile);

	return { profile, summary };
};

/**
 * Get insights from artist track
 * @param {object} options
 * @property {string} options.artist artist name
 * @property {string} options.track track name
 * @return {Promise<Insights>} Profile and summary
 */
const getProfileByArtistAndTrack = async ({ artist, track }) => {
	const search = `${artist} ${track}`;
	const songData = await getSongData(search);
	const songId = await getSongId(songData);
	const lyrics = await getLyrics(songId);
	const insights = await getPersonalityProfile(lyrics);

	return insights;
};

module.exports = {
	getSongId,
	getSongData,
	getSongIdFromSearch,
	getTextSummary,
	getTopTracks,
	getLyrics,
	getPersonalityProfile,
	getProfileByArtistAndTrack,
};