const jsonata = require('jsonata');

const lyricsIdPath = 'response.hits[0].result.id';
const PersonalityInsightsV3 = require('watson-developer-cloud/personality-insights/v3');

const {
	WATSON_PI_API_KEY,
	WATSON_PI_API_URL,
	WATSON_PI_API_VERSION,
} = process.env;
const personalityInsights = new PersonalityInsightsV3({
	version: WATSON_PI_API_VERSION,
	iam_apikey: WATSON_PI_API_KEY,
	url: WATSON_PI_API_URL,
});

exports.lyricsIdPath = lyricsIdPath;

exports.getTopTracks = async ({ lastfmApi }) => {
	const query = new URLSearchParams([
		['method', 'chart.getTopTracks'],
		['format', 'json'],
		['api_key', lastfmApi.defaults.options.apiKey],
	]);

	return (await lastfmApi.get('/', { query })).body;
};

exports.getLyrics = async ({ geniusApi, lyricist }, term) => {
	const query = new URLSearchParams([['q', term]]);
	const data = (await geniusApi.get('/search', { query })).body;
	const expression = jsonata(lyricsIdPath);
	const songId = expression.evaluate(data);

	if (!songId) return null;
	const { lyrics } = await lyricist.song(songId, { fetchLyrics: true });

	return lyrics;
};

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

exports.getPersonalityProfile = async ({ lyrics }) => {
	if (!lyrics) return 'No lyrics found for profile';

	const options = {
		content: lyrics,
		content_type: 'text/plain',
		consumption_preferences: true,
	};

	const profile = await getProfile(options);

	return profile;
};
