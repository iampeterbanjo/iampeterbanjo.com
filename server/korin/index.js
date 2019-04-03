const got = require('got');
const Lyricist = require('lyricist');
const util = require('util');

const { routes } = require('..');
const { getLyrics, getTopTracks, getPersonalityProfile } = require('./methods');

const {
	GENIUS_API_ACCESS_TOKEN,
	GENIUS_API_URL,
	LASTFM_API_URL,
	LASTFM_API_KEY,
	WATSON_PI_API_KEY,
	WATSON_PI_API_URL,
	WATSON_PI_API_VERSION,
} = process.env;
const lyricist = new Lyricist(GENIUS_API_ACCESS_TOKEN);

const geniusApi = got.extend({
	baseUrl: GENIUS_API_URL,
	headers: {
		authorization: `Bearer ${GENIUS_API_ACCESS_TOKEN}`,
	},
	json: true,
});

const lastfmApi = got.extend({
	baseUrl: LASTFM_API_URL,
	apiKey: LASTFM_API_KEY,
	json: true,
});

const PersonalityInsightsV3 = require('watson-developer-cloud/personality-insights/v3');

const personalityInsights = new PersonalityInsightsV3({
	version: WATSON_PI_API_VERSION,
	iam_apikey: WATSON_PI_API_KEY,
	url: WATSON_PI_API_URL,
});
const personalityProfileApi = util.promisify(personalityInsights.profile);

module.exports = {
	plugin: require('./api'),
	options: {
		routes,
		lastfmApi,
		geniusApi,
		lyricist,
		getLyrics,
		getTopTracks,
		getPersonalityProfile,
		personalityProfileApi,
	},
};
