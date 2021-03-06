import fecha from 'fecha';
import { getUrlPath, getBlogFiles, getBlogContents } from './helpers';

describe('Given getUrlPath', () => {
	describe('And a blog post filePath', () => {
		const filePath =
			'/home/iampeterbanjo/clever-cloud/iampeterbanjo.com/packages/blog/posts/graphql-eats-rest.md';

		test('When filePath ends in `.md` the url does not contain md', () => {
			const urlPath = getUrlPath(filePath);

			expect(urlPath).not.toEqual(expect.stringContaining('.md'));
		});

		test('When filePath has /packages the url does not contain packages/', () => {
			const urlPath = getUrlPath(filePath);

			expect(urlPath).not.toEqual(expect.stringContaining('packages/'));
			expect(urlPath).not.toEqual(
				expect.stringContaining(
					'/home/iampeterbanjo/clever-cloud/iampeterbanjo.com',
				),
			);
		});

		test('When filPath is a blog post the url should contain "/blog/posts"', () => {
			const urlPath = getUrlPath(filePath);

			expect(urlPath.indexOf('/blog/posts')).toEqual(0);
		});
	});
});

describe('Given getBlogFiles', () => {
	test('When its called it returns list of relative paths', async () => {
		const results = await getBlogFiles();
		expect(results.length).toBeGreaterThan(0);
	});

	test('When result is blog frontmatter, it has required properties', async () => {
		const results = await getBlogFiles();

		results.forEach(result => {
			const { description, title, url, date } = result as any;
			expect(url).toBeDefined();
			expect(title).toBeDefined();
			expect(description).toBeDefined();
			expect(date).toBeDefined();
		});
	});
});

describe('Given getBlogContents', () => {
	['', 'the-GVDuMVROxCVNpgWy-file'].forEach(post => {
		it(`When empty ${post}, content is also empty`, async () => {
			const result = await getBlogContents(post);

			expect(result).toBeNull();
		});
	});

	['graphql-eats-rest', 'i-like-jsonata'].forEach(post => {
		it(`When ${post} is NOT empty, the content is found`, async () => {
			const result = await getBlogContents(post);
			if (!result) return;
			const { title, content, date } = result;
			const validDate = fecha.format(new Date(date), 'mediumDate');

			expect(content).toBeDefined();
			expect(title).toBeDefined();
			expect(date).toBeDefined();
			expect(date).toEqual(validDate);
			expect(content.length).toBeGreaterThan(1);
		});
	});

	test('When markdown content is parsed it returns HTML', async () => {
		expect.assertions(1);

		const result = await getBlogContents('i-like-jsonata');
		const { content = '' } = result || {};
		const isHTML = content.indexOf('</p>') > -1;

		expect(isHTML).toBeTruthy();
	});
});
