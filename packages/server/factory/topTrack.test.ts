import factory from '.';

describe('Givenfactory', () => {
	describe('And topTracks', () => {
		const count = Math.ceil((1 - Math.random()) * 10);
		const topTracks = factory.topTrack(count);

		it('When topTracks are created count is correct', () => {
			expect(topTracks).toHaveProperty('length', count);
		});

		topTracks.forEach(topTrack => {
			const { artist, title, image, lastFmUrl, profileUrl } = topTrack as any;
			it(`when ${artist} - ${title}`, () => {
				expect(typeof artist).toEqual('string');
				expect(typeof title).toEqual('string');
				expect(typeof image).toEqual('string');
				expect(typeof lastFmUrl).toEqual('string');
				expect(profileUrl).toBeUndefined();
			});
		});
	});
});
