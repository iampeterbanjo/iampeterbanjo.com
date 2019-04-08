const { expect } = require('code');
const { routes } = require('..');
const Lab = require('lab');

const lab = Lab.script();
const { test, suite } = lab;

exports.lab = lab;

suite('korin api', () => {
	test('when requesting tracks', () => {
		const hope = routes['korin.get.tracks']();

		expect(hope).to.equal({
			method: 'GET',
			path: '/api/korin/tracks',
			url: '/api/korin/tracks',
		});
	});

	test('when requesting artist profile', () => {
		const artist = 'Sofia Reyes';
		const track = 'R.I.P';
		const hope = routes['korin.get.profiles']({ artist, track });

		expect(hope).to.equal({
			method: 'GET',
			path: '/api/korin/profiles/{artist}/{track}',
			url: `/api/korin/profiles/${artist}/${track}`,
		});
	});
});
