const Hapi = require('hapi');
const Lab = require('lab');
const { expect } = require('code');
const Vision = require('vision');
const plugin = require('../../views/plugin');
const routes = require('../../views/routes');

const lab = Lab.script();
const { suite, test, before } = lab;

exports.lab = lab;
const server = Hapi.Server();

suite('view blog', async () => {
	before(async () => {
		await server.register([
			Vision,
			{
				plugin,
			},
		]);
	});

	test('requesting blog posts gives expected results', async () => {
		const { method, url } = routes.get_blog_posts();

		const result = await server.inject({
			method,
			url,
		});

		expect(result).to.include({
			statusCode: 200,
		});
	});
});
