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
const methods = [
	{
		name: 'view.blogPost',
		method: sinon.stub().resolves({ content: 42 }),
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
});
