import api from './api';

import { makeBdd } from '../factory';
const { Given, When } = makeBdd({ describe, it });

let server;

beforeEach(async () => {
	server = await api();
});

Given('korin API', () => {
	['getProfileByArtistAndTrack', 'getChartTopTracks'].forEach(name => {
		When(`method ${name} is registered its a function`, () => {
			const result = server.methods.korin[name];

			expect(typeof result).toEqual('function');
		});
	});
});

Given('blog API', () => {
	['getBlogContents', 'getBlogFiles'].forEach(name => {
		When(`method ${name} is registered its`, () => {
			const result = server.methods.blog[name];

			expect(typeof result).toEqual('function');
		});
	});
});

Given('view API', () => {
	['topTracks', 'trackProfile'].forEach(name => {
		When(`method ${name} is registered its a function`, () => {
			const result = server.methods.view[name];

			expect(typeof result).toEqual('function');
		});
	});
});
