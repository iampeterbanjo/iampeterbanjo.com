/* eslint-disable no-param-reassign */
const { expect } = require('code');
const Lab = require('lab');

const lab = Lab.script();
const { before, test, suite } = lab;

exports.lab = lab;

const api = require('../api');

suite('korin', () => {
	let server;

	before(async () => {
		server = await api();
	});

	['getTopTracks', 'getProfileByArtistAndTrack'].forEach(name => {
		test(`method ${name} is registered`, () => {
			const result = server.methods.korin[name];

			expect(result).to.be.a.function();
		});
	});
});
