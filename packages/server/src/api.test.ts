import api from './api';

let server;

beforeEach(async () => {
	server = await api();
});

describe('Given korin API', () => {
	['getProfileByArtistAndTrack', 'getChartTopTracks'].forEach(name => {
		it(`When method ${name} is registered its a function`, () => {
			const result = server.methods.korin[name];

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
		expect(server.app.db.pipeline).toBeDefined();
	});
});
