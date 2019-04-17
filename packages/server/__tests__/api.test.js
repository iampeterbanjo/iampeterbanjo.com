/* eslint-disable no-param-reassign */
const { expect } = require('code');
const Lab = require('lab');

const lab = Lab.script();
const { before, test, suite } = lab;

exports.lab = lab;

const { routes } = require('..');
const api = require('../api');

suite('korin', () => {
	let server;

	before(async () => {
		server = await api();
	});

	test('api returns tracks', async () => {
		const { method, url } = routes.get_apis_korin_tracks();
		const { result } = await server.inject({ method, url });

		expect(result.length).to.be.greaterThan(0);
	});

	['getTopTracks', 'getLyrics', 'getPersonalityProfile'].forEach(name => {
		test(`method ${name} is registered`, () => {
			const result = server.methods.korin[name];

			expect(result).to.be.a.function();
		});
	});
});
