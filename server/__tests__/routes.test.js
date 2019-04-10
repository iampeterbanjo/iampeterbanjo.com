const { expect } = require('code');
const { routes } = require('..');
const Lab = require('lab');

const lab = Lab.script();
const { test, suite } = lab;

exports.lab = lab;

suite('korin api', () => {
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

suite('korin views', () => {
	test('when viewing tracks', () => {
		const hope = routes['get.korin.tracks']();

		expect(hope).to.include({
			method: 'GET',
			path: '/korin/tracks',
			url: '/korin/tracks',
		});
	});

	test('when viewing profiles', () => {
		const hope = routes['get.korin.profiles']({
			artist: 'Ariana Grande',
			track: 'God is a woman',
		});

		expect(hope).to.include({
			method: 'GET',
			path: '/korin/{artist}/{track}',
			url: '/korin/ariana-grande/god-is-a-woman',
		});
	});

	test('when artist and track are missing', () => {
		const hope = routes['get.korin.profiles']();

		expect(hope).to.include({
			method: 'GET',
			path: '/korin/{artist}/{track}',
			url: '/korin//',
		});
	});
});
