const { expect } = require('code');
const { test, suite } = (exports.lab = require('lab').script());
const { urls } = require('..');

suite('korin api', () => {
	test(`when requesting tracks`, () => {
		const hope = urls['korin.get.songs']();
		expect(hope).to.equal({
			method: 'GET',
			path: '/api/korin/songs',
			url: '/api/korin/songs',
		});
	});

	test(`when requesting artist profile`, () => {
		const artist = 'Sofia Reyes';
		const track = 'R.I.P';
		const hope = urls['korin.get.profile']({ artist, track });
		expect(hope).to.equal({
			method: 'GET',
			path: `/api/korin/profile/{artist}/{track}`,
			url: `/api/korin/profile/${artist}/${track}`,
		});
	});
});
