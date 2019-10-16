import * as R from 'ramda';
import Scheduler from './scheduler/Scheduler';

import api from './api';
import utils from './utils';

const { vars } = utils;
const { PORT, MONGODB_ADDON_URI, MONGODB_ADDON_DB } = vars;

let server;

beforeEach(async () => {
	server = await api();
});

describe('Given server info', () => {
	test('When server is set port value is correct', () => {
		expect(server.info.port).toEqual(Number(PORT));
	});

	test('When server is set host value is correct', () => {
		expect(server.info.host).toEqual('0.0.0.0');
	});
});

describe('Given korin API', () => {
	[
		'getProfileByArtistAndTrack',
		'getChartTopTracks',
		'getSpotifyData',
		'getSpotifyAccessToken',
	].forEach(name => {
		it(`When method ${name} is registered its a function`, () => {
			const result = server.methods.korin[name];

			expect(typeof result).toEqual('function');
		});
	});
});

describe('Given pipeline API', () => {
	[
		'convertRawTopTracks',
		'saveRawTopTracks',
		'addSpotifyData',
		'addTrackProfile',
	].forEach(name => {
		it(`When method ${name} is registered its a function`, () => {
			const result = server.methods.pipeline[name];

			expect(typeof result).toEqual('function');
		});
	});
});

describe('Given blog API', () => {
	['getBlogContents', 'getBlogFiles'].forEach(name => {
		it(`When method ${name} is registered its`, () => {
			const result = server.methods.blog[name];

			expect(typeof result).toEqual('function');
		});
	});
});

describe('Given view API', () => {
	['topTracks', 'trackProfile'].forEach(name => {
		it(`When method ${name} is registered its a function`, () => {
			const result = server.methods.view[name];

			expect(typeof result).toEqual('function');
		});
	});
});

describe('Given models plugin', () => {
	test('When expect pipeline to be defined', () => {
		expect(server.app.db).toBeDefined();
	});
});

describe('Given server cache', () => {
	let provisioned;

	beforeEach(async () => {
		const path = ['settings', 'cache', 0];
		provisioned = R.path(path, server);
	});

	test('When mongodb-cache is provisioned the name is correct', async () => {
		expect(provisioned.name).toEqual('mongodb-cache');
	});

	test('When mongodb-cache connection is made the details are correct', () => {
		const { uri, partition } = R.pathOr(
			{} as any,
			['provider', 'options'],
			provisioned,
		);

		expect(uri).toEqual(MONGODB_ADDON_URI);
		expect(partition).toEqual(MONGODB_ADDON_DB);
	});
});

describe('Given hapi-pino', () => {
	test('When server is started it has logger attached', () => {
		expect(server.logger).toBeDefined();
	});
});

describe('Given scheduler', () => {
	test('When server, it has scheduler start defined', () => {
		expect(server.app.scheduler).toBeInstanceOf(Scheduler);
	});
});
