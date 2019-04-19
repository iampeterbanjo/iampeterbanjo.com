const Hapi = require('hapi');
const Lab = require('lab');
const { expect } = require('code');
const nock = require('nock');
const sinon = require('sinon');

const { vars, message } = require('../../utils');
const routes = require('../../blog/routes');
const plugin = require('../../blog/plugin');

const { baseUrl } = vars;

const lab = Lab.script();
const { suite, test, before, afterEach } = lab;

exports.lab = lab;

const server = new Hapi.Server();

suite('blog', () => {
	before(async () => {
		await server.register(plugin);
	});

	afterEach(() => {
		sinon.restore();
		nock.cleanAll();
	});

	test('posts route gets markdown files', async () => {
		const { method, url } = routes.get_blog_posts();
		/** @type {{ result: array }} */
		// @ts-ignore
		const { result } = await server.inject({
			method,
			url,
		});

		expect(result.length).to.be.above(0);
		result.forEach(file => {
			expect(file).to.endWith('.md');
		});
	});

	test('posts client requests markdown files', async () => {
		const testData = ['blog_post.md'];
		const { url, client } = routes.get_blog_posts();

		await nock(baseUrl)
			.get(url)
			.reply(200, testData);

		const { body } = await client();

		expect(body).to.equal(testData);
	});

	test('post details returns 404 with unknown file', async () => {
		const filename = 'the-GVDuMVROxCVNpgWy-file';
		const { method, url } = routes.get_blog_details({
			filename,
		});
		const result = await server.inject({
			method,
			url,
		});

		// @ts-ignore
		expect(result).to.contain({
			statusCode: 404,
			result: message.ERROR_POST_NOT_FOUND,
		});
	});

	test('post details gets expected markdown file', async () => {
		const filename = 'the-ok-gatsby';
		const { method, url } = routes.get_blog_details({
			filename,
		});
		const { result } = await server.inject({
			method,
			url,
		});

		expect(result).to.contain('date: 2019-04-08');
	});
});
