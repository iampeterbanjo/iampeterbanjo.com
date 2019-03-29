const Hapi = require('hapi');
const { expect } = require('code');
const { test, suite } = (exports.lab = require('lab').script());

const { options } = require('../index');
const Server = () => Hapi.server(options);

suite('cache', () => {
	test('mongodb-cache is provisioned', async ({ context }) => {
		const [provisioned] = Server().settings.cache;

		expect(provisioned.name).to.equal(`mongodb-cache`);
	});
});
