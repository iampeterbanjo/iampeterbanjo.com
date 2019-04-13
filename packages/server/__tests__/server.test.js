/* eslint-disable no-param-reassign */
const { expect } = require('code');
const Lab = require('lab');

const R = require('ramda');
const { api } = require('..');

const { PORT, MONGODB_ADDON_URI, MONGODB_ADDON_DB } = process.env;

const lab = Lab.script();
const { test, suite, before } = lab;

exports.lab = lab;

const Server = async () => api();

suite('cache', () => {
	before(async ({ context }) => {
		const path = ['settings', 'cache', 0];
		const server = await Server();
		context.provisioned = R.path(path, server);
	});

	test('mongodb-cache is provisioned', async ({ context }) => {
		const { name } = context.provisioned;

		expect(name).to.equal('mongodb-cache');
	});

	test('mongodb-cache connection', ({ context }) => {
		const { uri, partition } = R.path(
			['provider', 'options'],
			context.provisioned
		);

		expect(uri).to.equal(MONGODB_ADDON_URI);
		expect(partition).to.equal(MONGODB_ADDON_DB);
	});
});

suite('info', () => {
	before(async ({ context }) => {
		context.server = await Server();
	});

	test('port value', ({ context }) => {
		expect(context.server.info.port).to.equal(Number(PORT));
	});

	test('host value', ({ context }) => {
		expect(context.server.info.host).to.equal('0.0.0.0');
	});
});