import routes from '../../src/korin/routes';

describe('Given routes: korin api', () => {
	test('When requesting tracks the route details are correct', () => {
		const result = routes.get_korin_tracks();

		expect(result).toEqual(
			expect.objectContaining({
				method: 'GET',
				path: '/korin/tracks',
			}),
		);
	});

	test('When requesting artist profile the route details are correct', () => {
		const result = routes.get_korin_profiles();

		expect(result).toEqual(
			expect.objectContaining({
				method: 'GET',
				path: '/korin/{profileUrl}',
			}),
		);
	});

	test('When requesting artist profile the method and path are correct', () => {
		const result = routes.get_korin_profiles();

		expect(result).toEqual(
			expect.objectContaining({
				method: 'GET',
				path: '/korin/{profileUrl}',
			}),
		);
	});
});
