const { expect } = require('code');
const { test } = (exports.lab = require('lab').script());
const R = require('ramda');

const { urls } = require('..');
const api = require('../api');

test('api returns tracks', async () => {
	const server = await api();
	const { method, url } = urls['korin.get.songs']();
	const { result } = await server.inject({ method, url });
	const tracks = R.path(['tracks', 'track'], result);

	expect(tracks.length).to.be.greaterThan(0);
});
