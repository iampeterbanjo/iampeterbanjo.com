import helpers from './helpers';
import topTracksData from '../../fixtures/lastfm-topTracks.json';

const { parseTopTracks } = helpers;

describe('GivenGiven View helpers:', () => {
	it('When data is valid top tracks are parsed correctly', () => {
		const [track] = parseTopTracks(topTracksData);
		const { title, image, artist, url, profileUrl } = track;

		expect(title).toBeDefined();
		expect(image).toBeDefined();
		expect(artist).toBeDefined();
		expect(url).toBeDefined();

		expect(profileUrl).toBeDefined();
		expect(profileUrl).not.toEqual(expect.stringContaining('/v1'));
	});
});
