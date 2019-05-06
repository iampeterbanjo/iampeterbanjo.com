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
const Server = async () => {
	const server = Hapi.Server();

	await server.register([
		Vision,
		{
			plugin,
			options: { methods },
		},
	]);

	return server;
};

suite('view blog', async () => {
	let server;

	before(async () => {
		server = await Server();
	});

	test('requesting blog posts gives 200 status', async () => {
		const { method, url } = routes.get_blog_posts();
		const result = await server.inject({
			method,
			url,
		});

		// eslint-disable-next-line no-underscore-dangle
		expect(result.statusCode).to.equal(200);
	});

	test('requesting blog posts gives 200 status', async () => {
		const { method, url } = routes.get_blog_details();
		const result = await server.inject({
			method,
			url,
		});

		// eslint-disable-next-line no-underscore-dangle
		expect(result.statusCode).to.equal(200);
	});

	test('requesting home page gives 200 status', async () => {
		const { method, url } = routes.get_home();
		const result = await server.inject({
			method,
			url,
		});

		expect(result.statusCode).to.equal(200);
	});
});

suite('view korin', () => {
	let server;

	before(async () => {
		server = await Server();
	});

	test('requesting tracks gives 200', async () => {
		const { method, url } = routes.get_korin_tracks();
		const response = await server.inject({
			method,
			url,
		});

		expect(response.statusCode).to.equal(200);
	});
});
