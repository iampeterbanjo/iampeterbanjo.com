const { expect } = require('code');
const Lab = require('lab');
const { slugger } = require('../utils');
const { routes } = require('..');

const lab = Lab.script();
const { test, suite } = lab;

exports.lab = lab;

suite('routes: korin api', () => {
	test('when requesting tracks', () => {
		const hope = routes.get_apis_korin_tracks();

		expect(hope).to.include({
			method: 'GET',
			path: '/apis/korin/tracks',
			url: '/apis/korin/tracks',
		});
	});

	test('when requesting artist profile', () => {
		const artist = 'Sofia Reyes';
		const track = 'R.I.P';
		const hope = routes.get_apis_korin_profiles({ artist, track });
		const artistParam = slugger.parse(artist);
		const trackParam = slugger.parse(track);

		expect(hope).to.include({
			method: 'GET',
			path: '/apis/korin/{artist}/{track}',
			url: `/apis/korin/${artistParam}/${trackParam}`,
		});
	});
});

suite('routes: korin views', () => {
	test('when viewing tracks', () => {
		const hope = routes.get_korin_tracks();

		expect(hope).to.include({
			method: 'GET',
			path: '/korin/tracks',
			url: '/korin/tracks',
		});
	});

	test('when viewing profiles', () => {
		const artist = 'Ariana Grande';
		const track = 'God is a woman';
		const { method, path, url } = routes.get_korin_profiles({
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
		const result = routes.get_korin_profiles();

		expect(result).to.include({
			method: 'GET',
			path: '/korin/profiles/{artist}/{track}',
			url: '/korin/profiles//',
		});
	});
});
