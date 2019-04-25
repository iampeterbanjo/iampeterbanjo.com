const Hapi = require('hapi');
const Lab = require('lab');
const { expect } = require('code');
const sinon = require('sinon');

const plugin = require('../../korin/plugin');
const routes = require('../../korin/routes');

const topTracksData = require('../fixtures/lastfm-topTracks.json');

const lab = Lab.script();
const { suite, test, before } = lab;

exports.lab = lab;
const server = Hapi.Server();

suite('korin tracks API', async () => {
	before(async () => {
		const methods = [
			{
				name: 'korin.getTopTracks',
				method: sinon.stub().resolves(topTracksData),
			},
		];
		await server.register({ plugin, options: { methods } });
	});

	test('requesting korin tracks gives expected results', async () => {
		const { method, url } = routes.v1.get_korin_tracks();

		const result = await server.inject({
			method,
			url,
		});

		expect(result).to.include({
			statusCode: 200,
		});
	});
});
