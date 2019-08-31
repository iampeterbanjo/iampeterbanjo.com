import api from './api';

let server;

beforeEach(async () => {
	server = await api();
});

describe('Givenkorin API', () => {
	['getProfileByArtistAndTrack', 'getChartTopTracks'].forEach(name => {
		it(`When method ${name} is registered its a function`, () => {
			const result = server.methods.korin[name];

			expect(typeof result).toEqual('function');
		});
	});
});

describe('Givenblog API', () => {
	['getBlogContents', 'getBlogFiles'].forEach(name => {
		it(`When method ${name} is registered its`, () => {
			const result = server.methods.blog[name];

			expect(typeof result).toEqual('function');
		});
	});
});

describe('Givenview API', () => {
	['topTracks', 'trackProfile'].forEach(name => {
		it(`When method ${name} is registered its a function`, () => {
			const result = server.methods.view[name];

			expect(typeof result).toEqual('function');
		});
	});
});
