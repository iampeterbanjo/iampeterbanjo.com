import { RawTopTrackJson } from '../types';

import utils from '../utils';

const {
	vars: { LASTFM_API_KEY },
	clientel: { lastfm },
} = utils;

export const lastFmApi = {
	chart: {
		getTopTracks: async (): Promise<RawTopTrackJson> => {
			const query = new URLSearchParams([
				['method', 'chart.getTopTracks'],
				['format', 'json'],
				['api_key', LASTFM_API_KEY],
			]);

			return (await lastfm.get(`?${query}`)).payload;
		},
	},
};
