const jsonata = require('jsonata');

const routes = require('./routes');
const blogHelpers = require('../blog/helpers');
const korinHelpers = require('../korin/helpers');
const { vars } = require('../utils');

const { topTracksPath } = vars;

/**
 * View blog post
 * @param {string} post filename
 * @return {object} data
 */
const viewBlogPost = post => blogHelpers.getBlogContents(post);

const viewBlogList = () => blogHelpers.getBlogFiles();

/**
 * Parse top tracks to get artist, track, image etc.
 * @typedef Tracks
 * @property {string} artist name
 * @property {string} title track title
 * @property {string} image url to track image
 * @property {string} url uri to LastFM track
 * @property {string} profileUrl url to personality profile
 *
 * @return {Array<Tracks>} topTracks Top 50 tracks from LastFM API
 */
const parseTopTracks = topTracks => {
	const expression = jsonata(topTracksPath);

	expression.registerFunction('getProfileUrl', (artist, track) => {
		const { url } = routes.get_korin_profiles({ artist, track });
		return url;
	});
	const tracks = expression.evaluate(topTracks);

	return tracks;
};

const viewTopTracks = async () => {
	const topTracks = await korinHelpers.getChartTopTracks();
	return parseTopTracks(topTracks);
};

/**
 * Get track profile
 * @typedef ViewTrack
 * @property {string} artist name
 * @property {string} track title
 *
 * @param {ViewTrack} info
 */
const viewTrackProfile = async ({ artist, track }) => {
	const { profile, summary } = await korinHelpers.getProfileByArtistAndTrack({
		artist,
		track,
	});

	return {
		profile: JSON.stringify(profile),
		summary,
		artist,
		track,
	};
};

module.exports = {
	viewBlogPost,
	viewBlogList,
	viewTopTracks,
	viewTrackProfile,
	parseTopTracks,
};
