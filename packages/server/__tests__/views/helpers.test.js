const Lab = require('lab');
const { expect } = require('code');

const lab = Lab.script();
const { test, suite } = lab;

const { viewTopTracks } = require('../../views/helpers');
const topTracksData = require('../fixtures/lastfm-topTracks.json');

exports.lab = lab;

suite('View helpers:', () => {
	test('top tracks are transformed correctly', () => {
		const [track] = viewTopTracks(topTracksData);
		const { title, image, artist, url, profileUrl } = track;

		expect(title, 'given title').to.exist();
		expect(image, 'given image').to.exist();
		expect(artist, 'given artist').to.exist();
		expect(url, 'given url').to.exist();

		expect(profileUrl, 'given profileUrl').to.exist();
		expect(profileUrl, 'given profileUrl').not.to.contain('/v1');
	});
});
