import utils from '.';

const { time, getCache } = utils;

describe('Given getCache', () => {
	test('When its called the default cache is expected', () => {
		const defaultCache = {
			expiresIn: time.oneDay,
			staleIn: time.tenSeconds,
			staleTimeout: time.oneHundredMilliseconds,
			generateTimeout: time.oneMinute,
			cache: 'mongodb-cache',
		};

		expect(defaultCache).toEqual(getCache());
	});

	[
		{
			expiresIn: 100,
		},
		{
			staleIn: 0,
		},
		{
			cache: 'random',
		},
	].forEach(options => {
		it(`When cache is called with ${options} the cache contains them `, () => {
			const cache = getCache(options);

			expect(cache).toEqual(expect.objectContaining(options));
		});
	});
});
