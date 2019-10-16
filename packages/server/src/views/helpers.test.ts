import * as helpers from './helpers';
import topTracksData from '../../fixtures/lastfm-topTracks.json';

const { parseRawTopTrackJson } = helpers;

describe('Given View helpers:', () => {
	test('When data is valid top tracks are parsed correctly', () => {
		const [track] = parseRawTopTrackJson(topTracksData);
		const { title, image, artist, url } = track;

		expect(title).toBeDefined();
		expect(image).toBeDefined();
		expect(artist).toBeDefined();
		expect(url).toBeDefined();
	});
});
