const { expect } = require('code');
const { test } = (exports.lab = require('lab').script());
const R = require('ramda');
const api = require('../api');

test('api returns tracks', async () => {
	const server = await api();
	const { result } = await server.inject({
		method: 'GET',
		url: '/korin/songs',
	});
	const tracks = R.path(['tracks', 'track'], result);

	expect(tracks.length).to.be.greaterThan(0);
});
