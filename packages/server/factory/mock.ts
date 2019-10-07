import { getDbConnection } from './helpers';
import modelsPlugin from '../src/models/plugin';
import korinPlugin from '../src/korin/plugin';
import schedulePlugin from '../src/schedule/plugin';

export const korinGetTopTracks = async ({ server, plugin, fn }) => {
	const methods = [
		{
			name: 'korin.getChartTopTracks',
			method: fn,
		},
	];
	await server.register({
		plugin,
		options: { methods },
	});
};

export const method = async ({ server, plugin, name, fn }) => {
	switch (name) {
		case 'korin.getChartTopTracks':
			return korinGetTopTracks({ server, plugin, fn });
		default:
			return null;
	}
};

export const mockModelPlugin = {
	plugin: modelsPlugin,
	options: { getDbConnection },
};

export const mockKorinPlugin = {
	plugin: korinPlugin,
	options: {
		methods: [
			{
				name: 'korin.getProfileByArtistAndTrack',
				method: () => ({
					isMock: true,
				}),
			},
			{
				name: 'korin.getChartTopTracks',
				method: () => ({
					isMock: true,
				}),
			},
			{
				name: 'korin.getArtistImage',
				method: () => ({
					isMock: true,
				}),
			},
			{
				name: 'korin.getSpotifyAccessToken',
				method: () => ({
					isMock: true,
				}),
			},
		],
	},
};

export const mockSchedulePlugin = {
	plugin: {
		...schedulePlugin,
		register: server => {
			server.app.schedule = {
				agenda: {
					jobs: () => ({ isMock: true }),
				},
			};
		},
	},
};
