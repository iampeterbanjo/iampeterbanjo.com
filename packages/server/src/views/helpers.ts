import jsonata from 'jsonata';

import routes from './routes';
import * as blogHelpers from '../blog/helpers';
import * as korinHelpers from '../korin/helpers';
import utils from '../utils';

export const { vars } = utils;
export const { topTracksPath } = vars;

export const viewBlogPost = (post: string): Object =>
	blogHelpers.getBlogContents(post);

export const viewBlogList = () => blogHelpers.getBlogFiles();

export const parseRawTopTrackJson = (topTracks: RawTopTrackJson) => {
	const expression = jsonata(topTracksPath);

	expression.registerFunction('getProfileUrl', (artist, track) => {
		const { url } = routes.get_korin_profiles({ artist, track });
		return url;
	});
	const tracks = expression.evaluate(topTracks);

	return tracks;
};

export const viewTopTracks = async () => {
	const topTracks = await korinHelpers.getChartTopTracks();
	return parseRawTopTrackJson(topTracks);
};

export const viewTrackProfile = async ({ artist, track }: TrackInfo) => {
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
