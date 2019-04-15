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
const { suite, test } = lab;

exports.lab = lab;

const server = Hapi.server();

suite('blog', () => {
	test('blog list', async () => {
		await server.register(plugin);

		const { result } = await server.inject({
			method: 'GET',
			url: '/blog/list',
		});

		expect(result.length).to.be.above(0);
		result.forEach(file => {
			expect(file).to.endWith('.md');
		});
	});

	test('blog list client', async () => {
		const testData = ['blog_post.md'];
		const globby = sinon.stub().resolves(testData);
		const { path, client } = routes.get_blog_list({ globby, path: '/' });

		await nock(baseUrl)
			.get(path)
			.reply(200, testData);

		const { body } = await client();

		expect(body).to.equal(testData);

		sinon.restore();
		nock.cleanAll();
	});
});
