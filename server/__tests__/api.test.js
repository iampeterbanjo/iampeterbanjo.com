const { expect } = require('code');
const R = require('ramda');
const Lab = require('lab');

const lab = Lab.script();
const { test } = lab;

exports.lab = lab;

const { routes } = require('..');
const api = require('../api');

test('api returns tracks', async () => {
	const server = await api();
	const { method, url } = routes['api.korin.get.tracks']();
	const { result } = await server.inject({ method, url });
	const tracks = R.path(['tracks', 'track'], result);

	expect(tracks.length).to.be.greaterThan(0);
});
