import routes from './routes';

describe('Given pipeline routes', () => {
	test('When called /topTracks/extract is correct', () => {
		const result = routes.extract_top_tracks();

		expect(result).toEqual(
			expect.objectContaining({
				method: 'POST',
				path: '/pipeline/extract/topTracks',
				url: '/pipeline/extract/topTracks',
			}),
		);
	});
});
