import { fileDir } from '.';
import { getBlogContents, getBlogFiles, getFilename } from './posts';

describe('Given getFilename', () => {
	describe('And a blog post filePath', () => {
		const filePath =
			'/home/iampeterbanjo/clever-cloud/iampeterbanjo.com/packages/blog/posts/graphql-eats-rest.md';

		test('When filePath ends in `.md` the filename contains md', () => {
			const filename = getFilename(filePath);

			expect(filename).toEqual(expect.stringContaining('.md'));
		});

		test('When filePath has /packages the filename does not contain packages/', () => {
			const filename = getFilename(filePath);

			expect(filename).not.toEqual(expect.stringContaining('packages/'));
			expect(filename).not.toEqual(
				expect.stringContaining(
					'/home/iampeterbanjo/clever-cloud/iampeterbanjo.com',
				),
			);
		});
	});
});

describe('Given getBlogFiles', () => {
	test('When its called it returns list of relative paths', async () => {
		const results = await getBlogFiles(fileDir);
		expect(results.length).toBeGreaterThan(0);
	});

	test('When result is blog frontmatter, it has required properties', async () => {
		const results = await getBlogFiles(fileDir);

		results.forEach(result => {
			const { description, title, filename, date } = result as any;
			expect(filename).toBeDefined();
			expect(title).toBeDefined();
			expect(description).toBeDefined();
			expect(date).toBeDefined();
		});
	});
});

describe('Given getBlogContents', () => {
	test.each(['', 'the-GVDuMVROxCVNpgWy-file'])(
		`When empty "%s", content is also empty`,
		async post => {
			const result = await getBlogContents(post);

			expect(result).toBeNull();
		},
	);

	test(`When file is found, the content is found`, async () => {
		const files = await getBlogFiles(fileDir);
		const first = files[0];
		const second = files[1];
		const third = files[2];

		expect(second.content).toEqual(expect.any(String));
		expect(second.title).toEqual(expect.any(String));
		expect(second.date).toEqual(expect.any(Date));
		expect(second.prev.title).toEqual(first.title);
		expect(second.next.title).toEqual(third.title);
	});

	test('When markdown content is parsed it returns HTML', async () => {
		expect.assertions(1);
		const [file] = await getBlogFiles(fileDir);
		const result = await getBlogContents(file.filePath);
		const { content = '' } = result || {};

		expect(content.indexOf('</p>')).not.toEqual(-1);
	});
});
