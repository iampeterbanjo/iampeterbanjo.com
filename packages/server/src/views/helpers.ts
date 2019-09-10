import jsonata from 'jsonata';

import routes from './routes';
import * as blogHelpers from '../blog/helpers';
import * as korinHelpers from '../korin/helpers';
import utils from '../utils';

const { vars } = utils;
const { topTracksPath } = vars;

const viewBlogPost = (post: string): Object =>
	blogHelpers.getBlogContents(post);

const viewBlogList = () => blogHelpers.getBlogFiles();

const parseTopTracks = (topTracks: RawTopTrack[]) => {
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

const viewTrackProfile = async ({ artist, track }: TrackInfo) => {
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

export default {
	viewBlogPost,
	viewBlogList,
	viewTopTracks,
	viewTrackProfile,
	parseTopTracks,
};
