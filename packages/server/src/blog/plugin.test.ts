import Hapi from '@hapi/hapi';
import utils from '../utils';
import routes from './routes';
import plugin from './plugin';

const { message } = utils;

describe('Given getBlogFiles', () => {
	let server;

	beforeEach(() => {
		server = Hapi.Server();
	});

	it('When get posts route gets markdown files', async () => {
		const files = ['that.md', 'this.md'];
		const getBlogFiles = jest.fn().mockResolvedValue(files);
		const stubMethods = [{ name: 'blog.getBlogFiles', method: getBlogFiles }];

		await server.register({
			plugin,
			options: { methods: stubMethods },
		});

		const { method, url } = routes.v1.get_blog_posts();
		const { result } = await server.inject({
			method,
			url,
		});

		expect(result).toEqual(files);
	});
});

describe('Given getBlogContents', () => {
	let server;

	beforeEach(() => {
		server = Hapi.Server();
	});

	it('When a request is made the API returns 404 for an unknown file', async () => {
		const getBlogContents = jest.fn().mockResolvedValue('');
		const stubMethods = [
			{ name: 'blog.getBlogContents', method: getBlogContents },
		];

		await server.register({
			plugin,
			options: { methods: stubMethods },
		});

		const filename = 'the-GVDuMVROxCVNpgWy-file';
		const { method, url } = routes.v1.get_blog_details(filename);
		const result = await server.inject({
			method,
			url,
		});

		expect(result).toEqual(
			expect.objectContaining({
				statusCode: 404,
				result: message.ERROR_POST_NOT_FOUND,
			}),
		);
	});

	it('When a request is made the API gets the expected markdown file', async () => {
		const filename = 'the-ok-gatsby';
		const contents = 'its a wonderful world';
		const getBlogContents = jest.fn().mockResolvedValue(contents);
		const stubMethods = [
			{ name: 'blog.getBlogContents', method: getBlogContents },
		];

		await server.register({
			plugin,
			options: { methods: stubMethods },
		});
		const { method, url } = routes.v1.get_blog_details(filename);
		const { result } = await server.inject({
			method,
			url,
		});

		expect(result).toEqual(expect.stringContaining(contents));
	});
});
