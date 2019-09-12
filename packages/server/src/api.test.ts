import * as R from 'ramda';
import api from './api';
import utils from './utils';

const { vars } = utils;
const { PORT, MONGODB_ADDON_URI, MONGODB_ADDON_DB } = vars;

let server;

beforeEach(async () => {
	server = await api();
});

describe('Given server info', () => {
	it('When server is set port value is correct', () => {
		expect(server.info.port).toEqual(Number(PORT));
	});

	it('When server is set host value is correct', () => {
		expect(server.info.host).toEqual('0.0.0.0');
	});
});

describe('Given korin API', () => {
	[
		'getProfileByArtistAndTrack',
		'getChartTopTracks',
		'getArtistImage',
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
		'addArtistImages',
		'addTrackProfile',
		'addTrackLyrics',
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
	it('When expect pipeline to be defined', () => {
		expect(server.app.db).toBeDefined();
	});
});

describe('Given server cache', () => {
	let provisioned;

	beforeEach(async () => {
		const path = ['settings', 'cache', 0];
		provisioned = R.path(path, server);
	});

	it('When mongodb-cache is provisioned the name is correct', async () => {
		expect(provisioned.name).toEqual('mongodb-cache');
	});

	it('When mongodb-cache connection is made the details are correct', () => {
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
	it('When server is started it has logger attached', () => {
		expect(server.logger).toBeDefined();
	});
});
