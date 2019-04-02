const { expect } = require('code');
const { test, suite } = (exports.lab = require('lab').script());
const { urls } = require('..');

suite('korin api', () => {
	[
		{
			path: 'korin.get.songs',
			result: {
				method: 'GET',
				url: '/api/korin/songs',
			},
		},
	].forEach(({ path, result }) => {
		test(`when ${path} expected ${JSON.stringify(result)}`, () => {
			const hope = urls[path]();
			expect(hope).to.equal(result);
		});
	});
});
