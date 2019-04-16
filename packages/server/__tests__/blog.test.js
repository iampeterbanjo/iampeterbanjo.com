const Hapi = require('hapi');
const Lab = require('lab');
const { expect } = require('code');
const nock = require('nock');
const sinon = require('sinon');

const { vars } = require('../utils');
const routes = require('../blog/routes');
const plugin = require('../blog/plugin');

const { baseUrl } = vars;

const lab = Lab.script();
const { suite, test, afterEach } = lab;

exports.lab = lab;

const server = Hapi.server();

const globbyMock = sinon.stub().resolves(42);
const dir = '';

suite('blog', () => {
	afterEach(() => {
		sinon.restore();
		nock.cleanAll();
	});

	test('posts route gets markdown files', async () => {
		await server.register(plugin);

		const { method, url } = routes.get_blog_posts({ globby: globbyMock, dir });
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
		// const globby = sinon.stub().resolves(testData);
		const { path, client } = routes.get_blog_posts({ globby: globbyMock, dir });

		await nock(baseUrl)
			.get(path)
			.reply(200, testData);

		const { body } = await client();

		expect(body).to.equal(testData);
	});
});
