import utils from '../../src/utils';
import routes from '../../src/korin/routes';

const { slugger } = utils;

describe('Given routes: korin api', () => {
	test('When requesting tracks the route details are correct', () => {
		const result = routes.get_korin_tracks();

		expect(result).toEqual(
			expect.objectContaining({
				method: 'GET',
				path: '/korin/tracks',
				url: '/korin/tracks',
			}),
		);
	});

	test('When requesting artist profile the route details are correct', () => {
		const artist = 'Sofia Reyes';
		const track = 'R.I.P';
		const result = routes.get_korin_profiles({ artist, track });
		const artistParam = slugger.parse(artist);
		const trackParam = slugger.parse(track);

		expect(result).toEqual(
			expect.objectContaining({
				method: 'GET',
				path: '/korin/{artist}/{track}',
				url: `/korin/${artistParam}/${trackParam}`,
			}),
		);
	});

	test('When when requesting artist profile the method and path are correct', () => {
		const result = routes.get_korin_profiles();

		expect(result).toEqual(
			expect.objectContaining({
				method: 'GET',
				path: '/korin/{artist}/{track}',
			}),
		);
	});
});
