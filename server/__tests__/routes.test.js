const { expect } = require('code');
const { test, suite } = (exports.lab = require('lab').script());
const { routes } = require('..');

suite('korin api', () => {
	test(`when requesting tracks`, () => {
		const hope = routes['korin.get.songs']();

		expect(hope).to.equal({
			method: 'GET',
			path: '/api/korin/songs',
			url: '/api/korin/songs',
		});
	});

	test(`when requesting artist profile`, () => {
		const artist = 'Sofia Reyes';
		const track = 'R.I.P';
		const hope = routes['korin.get.profile']({ artist, track });

		expect(hope).to.equal({
			method: 'GET',
			path: `/api/korin/profile/{artist}/{track}`,
			url: `/api/korin/profile/${artist}/${track}`,
		});
	});
});
