import factory from '.';

describe('Given builder', () => {
	test('When count is 2 there should be 2 topTracks', () => {
		const topTracks = factory.topTrack(2);

		expect(topTracks).toHaveProperty('length', 2);
	});

	test('When count is 4 there should be 4 profiles', () => {
		const profiles = factory.profile(4);

		expect(profiles).toHaveProperty('length', 4);
	});
});
