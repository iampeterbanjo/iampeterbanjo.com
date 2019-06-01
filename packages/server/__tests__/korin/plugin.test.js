const Hapi = require('@hapi/hapi');
const Lab = require('@hapi/lab');
const { expect } = require('@hapi/code');
const sinon = require('sinon');

const factory = require('../factory');
const plugin = require('../../korin/plugin');
const routes = require('../../korin/routes');

const topTracksData = require('../fixtures/lastfm-topTracks.json');

const lab = Lab.script();
const { suite, test, before } = lab;

exports.lab = lab;
const server = Hapi.Server();

suite('korin tracks API', async () => {
	before(async () => {
		await factory.mock.method({
			server,
			name: 'korin.getTopTracks',
			plugin,
			fn: sinon.stub().resolves(topTracksData),
		});
	});

	test('requesting korin tracks gives expected results', async () => {
		const { method, url } = routes.v1.get_korin_tracks();

		const response = await server.inject({
			method,
			url,
		});

		expect(response.statusCode).to.equal(200);
	});
});
