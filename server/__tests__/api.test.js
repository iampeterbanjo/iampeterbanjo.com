const { expect } = require('code');
const Lab = require('lab');

const lab = Lab.script();
const { test } = lab;

exports.lab = lab;

const { routes } = require('..');
const api = require('../api');

test('api returns tracks', async () => {
	const server = await api();
	const { method, url } = routes['get.apis.korin.tracks']();
	const { result } = await server.inject({ method, url });

	expect(result.length).to.be.greaterThan(0);
});
