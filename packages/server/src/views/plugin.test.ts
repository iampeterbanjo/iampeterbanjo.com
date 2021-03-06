import Hapi from '@hapi/hapi';
import Vision from '@hapi/vision';
import cheerio from 'cheerio';

import plugin from './plugin';
import routes from './routes';
import * as data from './context';

const posts = [
	{
		title: 'this',
		url: '/this',
		description: 'this thing',
		date: '2019-12-01',
	},
	{
		title: 'that',
		url: '/that',
		description: 'that thing',
		date: '2019-11-01',
	},
];
const methods = [
	{
		name: 'view.blogContent',
		method: jest.fn().mockResolvedValue({ content: 42 }),
	},
	{
		name: 'view.blogList',
		method: jest.fn().mockResolvedValue(posts),
	},
];
const Server = async () => {
	const server = Hapi.Server({ debug: { request: ['error'] } });

	await server.register([
		Vision,
		{
			plugin,
			options: { methods },
		},
	]);

	return server;
};

describe('Given Berserker route', () => {
	describe('And server', () => {
		let server;

		beforeEach(async () => {
			server = await Server();
		});

		afterEach(jest.restoreAllMocks);

		test('When GET /berserker is requested status is 200', async () => {
			const { method, url } = routes.get_berserker();
			const response = await server.inject({
				method,
				url,
			});

			expect(response.statusCode).toEqual(200);
		});
	});
});

describe('Given view blog', () => {
	let server;

	beforeEach(async () => {
		server = await Server();
	});

	afterEach(jest.restoreAllMocks);

	test('When GET /blog/posts requested status code is 200', async () => {
		const { method, url } = routes.get_blog_posts();
		const response = await server.inject({
			method,
			url,
		});

		expect(response.statusCode).toEqual(200);
	});

	test('When GET /blog/posts/:id requested status code is 200', async () => {
		const { method, url } = routes.get_blog_details();
		const response = await server.inject({
			method,
			url,
		});

		expect(response.statusCode).toEqual(200);
	});

	test('When GET / requested status is 200', async () => {
		const { method, url } = routes.get_home();
		const response = await server.inject({
			method,
			url,
		});

		expect(response.statusCode).toEqual(200);
	});
});

describe('Given Home page: SEO', () => {
	let $;
	let result;

	beforeAll(async () => {
		const server = await Server();
		const { method, url } = routes.get_home();
		const { payload } = await server.inject({
			method,
			url,
		});

		$ = cheerio.load(payload);
		result = payload;
	});

	afterAll(jest.resetAllMocks);

	test('When parsed page is HTML5 doctype', () => {
		expect(result).toEqual(expect.stringMatching(/^\<!DOCTYPE html\>/));
	});

	test('When parsed page has title tag', () => {
		const result = $('title').text();
		expect(result).toEqual(data.title);
	});

	test('When parsed page has meta charset', () => {
		const result = $('meta[charset="utf-8"]');
		expect(result).toBeDefined();
	});

	test('When parsed page has meta viewport', () => {
		const result = $('meta[name="viewport"]').attr('content');
		expect(result).toBeDefined();
	});

	test('When parsed page has meta description', () => {
		const result = $('meta[name="description"]').attr('content');
		expect(result).toEqual(data.description);
	});

	test('When parsed page has html language', () => {
		const result = $('html').attr('lang');
		expect(result).toEqual('en');
	});

	test('When parsed page has css in head element', () => {
		const result = $('head').has('[rel="stylesheet"]');
		expect(result.length).toBeGreaterThan(0);
	});

	test('When parsed page has favicon link', () => {
		const result = $('[rel="icon"]').attr('href');
		expect(result).toBeDefined();
	});
});
