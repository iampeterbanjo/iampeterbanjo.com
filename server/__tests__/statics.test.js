const Hapi = require('hapi');
const { expect } = require('code');
const { test, beforeEach } = (exports.lab = require('lab').script());
const Inert = require('inert');
const { rootPath } = require('../../server');

let server;
beforeEach(async () => {
	server = Hapi.server();
	await server.register(Inert);
});

test('/ rootPath is served', async () => {
	await server.register({
		plugin: require('../../server/statics'),
		options: { rootPath },
	});
	const res = await server.inject({
		method: 'GET',
		url: '/',
	});

	expect(res.statusCode).to.equal(200);
});
