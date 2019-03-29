const Hapi = require('hapi');
const { expect } = require('code');
const { test, suite, before } = (exports.lab = require('lab').script());
const R = require('ramda');
const { options } = require('../index');
const { PORT, MONGODB_ADDON_URI } = process.env;

const Server = () => Hapi.server(options);

suite('cache', () => {
	before(({ context }) => {
		const path = ['settings', 'cache', 0];
		context.provisioned = R.path(path, Server());
	});

	test('mongodb-cache is provisioned', async ({ context }) => {
		const { name } = context.provisioned;

		expect(name).to.equal(`mongodb-cache`);
	});

	test(`mongodb-cache connection`, ({ context }) => {
		const { uri } = R.path(['provider', 'options'], context.provisioned);

		expect(uri).to.equal(MONGODB_ADDON_URI);
	});
});

suite('info', () => {
	before(({ context }) => {
		context.server = Server();
	});

	test(`port value`, ({ context }) => {
		expect(context.server.info.port).to.equal(Number(PORT));
	});

	test(`host value`, ({ context }) => {
		expect(context.server.info.host).to.equal(`0.0.0.0`);
	});
});
