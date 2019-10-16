import { getDbConnection } from './helpers';
import modelsPlugin from '../src/models/plugin';
import korinPlugin from '../src/korin/plugin';
import pipelinePlugin from '../src/pipeline/plugin';
import schedulePlugin from '../src/scheduler/plugin';
import Scheduler from '../src/scheduler/Scheduler';

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
				name: 'korin.getSpotifyData',
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

export const mockPipelinePlugin = {
	plugin: pipelinePlugin,
	options: {
		methods: [
			{
				name: 'pipeline.saveRawTopTracks',
				method: () => ({
					isMock: true,
				}),
			},
			{
				name: 'pipeline.convertRawTopTracks',
				method: () => ({
					isMock: true,
				}),
			},
			{
				name: 'pipeline.addTrackProfile',
				method: () => ({
					isMock: true,
				}),
			},
			{
				name: 'pipeline.addSpotifyData',
				method: () => ({
					isMock: true,
				}),
			},
		],
	},
};

type MockAgendaParams = {
	start?: () => void;
	define?: () => void;
	every?: () => void;
};

export const mockAgenda = (params?: MockAgendaParams) => {
	const defaultFn = () => undefined;
	const { start = defaultFn, define = defaultFn, every = defaultFn } =
		params || {};

	return jest.fn().mockImplementation(() => {
		return {
			start: start,
			define: define,
			every: every,
			jobs: () => ({ isMock: true }),
			now: () => ({ isMock: true }),
		};
	});
};

export const mockSchedulePlugin = {
	plugin: {
		...schedulePlugin,
		register: server => {
			server.app.scheduler = new Scheduler({
				server,
				Agenda: mockAgenda(),
				options: {},
			});

			server.auth.scheme('jwt', () => ({
				authenticate: async (request, reply) => {
					return reply.authenticated({
						credentials: 'test',
					});
				},
			}));
			server.auth.strategy('jwt', 'jwt');
		},
	},
};
