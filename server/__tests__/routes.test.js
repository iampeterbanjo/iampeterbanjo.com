const { expect } = require('code');
const Lab = require('lab');
const { slugger } = require('../utils');
const { routes } = require('..');

const lab = Lab.script();
const { test, suite } = lab;

exports.lab = lab;

suite('routes: korin api', () => {
	test('when requesting tracks', () => {
		const hope = routes['get.apis.korin.tracks']();

		expect(hope).to.include({
			method: 'GET',
			path: '/apis/korin/tracks',
			url: '/apis/korin/tracks',
		});
	});

	test('when requesting artist profile', () => {
		const artist = 'Sofia Reyes';
		const track = 'R.I.P';
		const hope = routes['get.apis.korin.profiles']({ artist, track });

		expect(hope).to.include({
			method: 'GET',
			path: '/apis/korin/{artist}/{track}',
			url: `/apis/korin/${artist}/${track}`,
		});
	});
});

suite('routes: korin views', () => {
	test('when viewing tracks', () => {
		const hope = routes['get.korin.tracks']();

		expect(hope).to.include({
			method: 'GET',
			path: '/korin/tracks',
			url: '/korin/tracks',
		});
	});

	test('when viewing profiles', () => {
		const artist = 'Ariana Grande';
		const track = 'God is a woman';
		const { method, path, url } = routes['get.korin.profiles']({
			artist,
			track,
		});

		expect(method).to.equal('GET');
		expect(path).to.equal('/korin/profiles/{artist}/{track}');
		expect(url).to.include('/korin/profiles/');
		expect(url).to.include(slugger.parse(artist));
		expect(url).to.include(slugger.parse(track));
	});

	test('when artist and track are missing', () => {
		const result = routes['get.korin.profiles']();

		expect(result).to.include({
			method: 'GET',
			path: '/korin/profiles/{artist}/{track}',
			url: '/korin/profiles//',
		});
	});
});
