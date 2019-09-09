import jsonata from 'jsonata';
import PersonalityInsightsV3 from 'watson-developer-cloud/personality-insights/v3';
import PersonalityTextSummary from 'personality-text-summary';
import SpotifyWebApi from 'spotify-web-api-node';
import utils from '../utils';

const {
	vars,
	jsonParser,
	message,
	clientel: { genius, lastfm, lyricist },
} = utils;
const {
	lyricsIdPath,
	songInfoPath,
	LASTFM_API_KEY = '',
	WATSON_PI_API_KEY,
	WATSON_PI_API_URL,
	WATSON_PI_API_VERSION,
	SPOTIFY_CLIENT_KEY,
	SPOTIFY_CLIENT_SECRET,
} = vars;

const spotifyApi = new SpotifyWebApi({
	clientId: SPOTIFY_CLIENT_KEY,
	clientSecret: SPOTIFY_CLIENT_SECRET,
});

/**
 * Search Genius for info about an artist's track
 * @param {string} search Artist name and track title
 * @return {Promise<GeniusData>}
 */
const getSongData = async search => {
	const query = new URLSearchParams([['q', search]]);

	return (await genius.get(`search?${query}`)).payload;
};

const getChartTopTracks = async (): Promise<RawTopTrack[]> => {
	const query = new URLSearchParams([
		['method', 'chart.getTopTracks'],
		['format', 'json'],
		['api_key', LASTFM_API_KEY],
	]);

	return (await lastfm.get(`?${query}`)).payload;
};

const getSongId = (data: GeniusData) => {
	const expression = jsonata(lyricsIdPath);
	const songId = expression.evaluate(data);

	return songId;
};

const getSongInfo = (data: GeniusData): SongInfo =>
	jsonParser.evaluate(data, songInfoPath);

const getSongIdFromSearch = async (search: string) => {
	const songData = await getSongData(search);
	const songId = getSongId(songData);
	return songId;
};

const getLyrics = async (songId: number) => {
	const { lyrics } = await lyricist.song(songId, { fetchLyrics: true });

	return lyrics;
};

const getProfile = (options: WatsonProfileParams): Promise<string> => {
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

const getTextSummary = (profile: string) => {
	const textSummary = new PersonalityTextSummary({
		locale: 'en',
		version: 'v3',
	});

	const summary = textSummary.getSummary(profile);
	return summary;
};

const getPersonalityProfile = async (
	lyrics: string,
): Promise<WatsonProfileInsights> => {
	if (!lyrics) {
		return {
			profile: message.ERROR_LYRICS_REQUIRED_FOR_PROFILE,
			summary: '',
		};
	}

	const options: WatsonProfileParams = {
		content: lyrics,
		content_type: 'text/plain',
		consumption_preferences: true,
	};

	const profile = await getProfile(options);
	const summary = getTextSummary(profile);

	return { profile, summary };
};

const getProfileByArtistAndTrack = async ({
	artist,
	track,
}: {
	artist: string;
	track: string;
}): Promise<WatsonProfileInsights> => {
	const search = `${artist} ${track}`;
	const songData = await getSongData(search);
	const songId = await getSongId(songData);
	const lyrics = await getLyrics(songId);
	const { profile, summary } = await getPersonalityProfile(lyrics);

	return { profile, summary };
};

const getSpotifyAccessToken = async (): Promise<string> => {
	const data: SpotifyApiGrantResponse = await spotifyApi.clientCredentialsGrant();

	return data.body.access_token;
};

const getArtistImage = async (
	artist: string,
	accessToken: string,
): Promise<string> => {
	spotifyApi.setAccessToken(accessToken);
	const result: SpotifyApiArtistSearchResponse = await spotifyApi.search(
		artist,
		['artist'],
	);

	const { url } = result.body.artists.items[0].images.filter(
		image => image.height === 640,
	)[0];

	return url;
};

export default {
	getSongId,
	getSongInfo,
	getSongData,
	getSongIdFromSearch,
	getTextSummary,
	getChartTopTracks,
	getLyrics,
	getPersonalityProfile,
	getProfileByArtistAndTrack,
	getArtistImage,
	getSpotifyAccessToken,
};
