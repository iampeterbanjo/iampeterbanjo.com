const { expect } = require('@hapi/code');
const Lab = require('@hapi/lab');
const routes = require('../../pipeline/routes');

const lab = Lab.script();
const { test, suite } = lab;

exports.lab = lab;

suite('Given pipeline routes', () => {
	test('/topTracks/extract', () => {
		const result = routes.v1.extract_top_tracks();

		// @ts-ignore
		expect(result).to.include({
			method: 'GET',
			path: '/v1/pipeline/extract/topTracks',
			url: '/v1/pipeline/extract/topTracks',
		});
	});
});
