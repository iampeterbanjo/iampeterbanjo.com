import factory from '.';

describe('Givenfactory', () => {
	describe('And profile', () => {
		const count = Math.ceil((1 - Math.random()) * 10);
		const profiles = factory.profile(count);

		it('When profile length is equal to count parameter', () => {
			expect(profiles.length).toEqual(count);
		});

		profiles.forEach(profile => {
			const {
				artist,
				title,
				image,
				lastFmUrl,
				profileUrl,
				summary,
			} = profile as any;
			it(`When ${artist} - ${title}`, () => {
				expect(typeof artist).toEqual('string');
				expect(typeof title).toEqual('string');
				expect(typeof summary).toEqual('string');
				expect(typeof image).toEqual('string');
				expect(typeof lastFmUrl).toEqual('string');
				expect(typeof profileUrl).toEqual('string');
			});
		});
	});
});
