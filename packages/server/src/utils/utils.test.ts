import utils from '.';
import { makeBdd } from '../../factory';

const { Given, When } = makeBdd({ describe, it });
const { time, getCache } = utils;

Given('getCache', () => {
	When('its called the default cache is expected', () => {
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
		When(`cache is called with ${options} the cache contains them `, () => {
			const cache = getCache(options);

			expect(cache).toEqual(expect.objectContaining(options));
		});
	});
});
