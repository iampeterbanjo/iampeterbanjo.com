const Hapi = require('hapi');
const { expect } = require('code');
const Lab = require('lab');

const Inert = require('inert');
const path = require('path');
const plugin = require('../statics/plugin');

const lab = Lab.script();
const { test, beforeEach } = lab;

exports.lab = lab;

const rootPath = path.join(__dirname, './fixtures');

let server;
beforeEach(async () => {
	server = Hapi.server();
	await server.register(Inert);
});

test('/ rootPath is served', async () => {
	await server.register({
		plugin,
		options: { rootPath },
	});
	const res = await server.inject({
		method: 'GET',
		url: '/',
	});

	expect(res.statusCode).to.equal(200);
});
