const Lab = require('lab');
const { expect } = require('code');

const { getBlogFiles, getBlogContents } = require('../../blog/helpers');

const lab = Lab.script();
const { suite, test } = lab;

exports.lab = lab;

suite('getBlogFiles', () => {
	test('that it returns list of md files', async () => {
		const result = await getBlogFiles();

		expect(result.length).to.be.above(0);
		result.forEach(file => {
			expect(file).to.endWith('.md');
		});
	});
});

suite('getBlogContents', () => {
	['', 'the-GVDuMVROxCVNpgWy-file'].forEach(post => {
		test(`when empty ${post}, content is also empty`, async () => {
			const result = await getBlogContents(post);

			expect(result).to.equal('');
		});
	});

	['graphql-eats-rest', 'i-like-jsonata'].forEach(post => {
		test(`when ${post} is NOT empty, the content is found`, async () => {
			const result = await getBlogContents(post);

			expect(result).to.be.a.buffer();
		});
	});
});
