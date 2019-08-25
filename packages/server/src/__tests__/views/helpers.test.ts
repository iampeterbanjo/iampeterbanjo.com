const Lab = require('@hapi/lab');
const { expect } = require('@hapi/code');

export const lab = Lab.script();
const { test, suite } = lab;

const { parseTopTracks } = require('../../views/helpers');

const topTracksData = require('../fixtures/lastfm-topTracks.json');



suite('View helpers:', () => {
	test('top tracks are parsed correctly', () => {
		const [track] = parseTopTracks(topTracksData);
		const { title, image, artist, url, profileUrl } = track;

		expect(title, 'given title').to.exist();
		expect(image, 'given image').to.exist();
		expect(artist, 'given artist').to.exist();
		expect(url, 'given url').to.exist();

		expect(profileUrl, 'given profileUrl').to.exist();
		expect(profileUrl, 'given profileUrl').not.to.contain('/v1');
	});
});
