/* eslint-disable no-param-reassign */
const { expect } = require('code');
const Lab = require('lab');

const lab = Lab.script();
const { before, test, suite } = lab;

exports.lab = lab;

const api = require('../api');

let server;

before(async () => {
	server = await api();
});

suite('korin API', () => {
	['getProfileByArtistAndTrack'].forEach(name => {
		test(`method ${name} is registered`, () => {
			const result = server.methods.korin[name];

			expect(result).to.be.a.function();
		});
	});
});

suite('blog API', () => {
	['getBlogContents', 'getBlogFiles'].forEach(name => {
		test(`method ${name} is registered`, () => {
			const result = server.methods.blog[name];

			expect(result).to.be.a.function();
		});
	});
});

suite('view API', () => {
	['topTracks'].forEach(name => {
		test(`method ${name} is registered`, () => {
			const result = server.methods.view[name];

			expect(result).to.be.a.function();
		});
	});
});
