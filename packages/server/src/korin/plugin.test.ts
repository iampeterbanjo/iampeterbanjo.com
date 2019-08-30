import Hapi from '@hapi/hapi';

import plugin from '../../src/korin/plugin';
import routes from '../../src/korin/routes';
import factory, { makeBdd } from '../../factory';

import topTracksData from '../../fixtures/lastfm-topTracks.json';
const { Given, When } = makeBdd({ describe, it });

const server = Hapi.Server();

Given('korin tracks API', () => {
	beforeEach(async () => {
		await factory.mock.method({
			server,
			name: 'korin.getChartTopTracks',
			plugin,
			fn: jest.fn().mockResolvedValue(topTracksData),
		});
	});

	When('requesting korin tracks the status code is 200', async () => {
		const { method, url } = routes.v1.get_korin_tracks();

		const response = await server.inject({
			method,
			url,
		});

		expect(response.statusCode).toEqual(200);
	});
});
