/* eslint-disable no-param-reassign */
const Lab = require('lab');
const { expect } = require('code');

const {
	getUrlPath,
	getBlogFiles,
	getBlogContents,
} = require('../../blog/helpers');

const lab = Lab.script();
const { suite, test, beforeEach } = lab;

exports.lab = lab;

suite('getUrlPath', () => {
	const filePath =
		'/home/iampeterbanjo/clever-cloud/iampeterbanjo.com/packages/blog/posts/graphql-eats-rest.md';

	test('url does not contain md', () => {
		const urlPath = getUrlPath(filePath);

		expect(urlPath).not.to.endWith('.md');
	});

	test('url does not contain packages/', () => {
		const urlPath = getUrlPath(filePath);

		expect(urlPath).not.contain('packages/');
		expect(urlPath).not.contain(
			'/home/iampeterbanjo/clever-cloud/iampeterbanjo.com'
		);
	});

	test('url should contain "/blog/posts"', () => {
		const urlPath = getUrlPath(filePath);

		expect(urlPath).to.startWith('/blog/posts');
	});
});

suite('getBlogFiles', () => {
	beforeEach(async ({ context }) => {
		context.result = await getBlogFiles();
	});

	test('that it returns list of relative paths', async ({ context }) => {
		expect(context.result.length).to.be.above(0);
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
