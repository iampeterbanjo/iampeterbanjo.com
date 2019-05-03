const Hapi = require('hapi');
const Lab = require('lab');
const { expect } = require('code');
const Vision = require('vision');
const sinon = require('sinon');

const plugin = require('../../views/plugin');
const routes = require('../../views/routes');

const lab = Lab.script();
const { suite, test, before } = lab;

exports.lab = lab;
const server = Hapi.Server();
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
		method: sinon.stub().resolves({ content: 42 }),
	},
	{
		name: 'view.blogList',
		method: sinon.stub().resolves(posts),
	},
];

suite('view blog', async () => {
	before(async () => {
		await server.register([
			Vision,
			{
				plugin,
				options: { methods },
			},
		]);
	});

	test('requesting blog posts gives expected results', async () => {
		const { method, url } = routes.get_blog_posts();
		const result = await server.inject({
			method,
			url,
		});

		// eslint-disable-next-line no-underscore-dangle
		expect(result.statusCode).to.equal(200);
	});

	test('requesting blog posts gives expected results', async () => {
		const { method, url } = routes.get_blog_details();
		const result = await server.inject({
			method,
			url,
		});

		// eslint-disable-next-line no-underscore-dangle
		expect(result.statusCode).to.equal(200);
	});
});
