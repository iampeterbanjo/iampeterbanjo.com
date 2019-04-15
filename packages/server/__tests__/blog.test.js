const Hapi = require('hapi');
const Lab = require('lab');
const { expect } = require('code');
const plugin = require('../blog/plugin');

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
});
