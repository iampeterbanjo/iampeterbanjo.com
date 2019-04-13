const Hapi = require('hapi');
const { expect } = require('code');
const Lab = require('lab');

const lab = Lab.script();
const { test } = lab;

exports.lab = lab;

const plugin = require('../../server/https-here');

const Server = options => {
	const server = new Hapi.Server();
	server.register({ plugin, options });
	server.route({
		method: 'GET',
		path: '/',
		handler(request, h) {
			return h.response('Hello!');
		},
	});
	return server;
};

test('proxied http requests are redirected to https', async () => {
	const res = await Server().inject({
		method: 'GET',
		url: '/',
		headers: {
			host: 'host',
			'x-forwarded-proto': 'http',
		},
	});
	expect(res.statusCode).to.equal(301);
	expect(res.headers.location).to.equal('https://host/');
});

test('un-proxied http requests are redirected to https', async () => {
	const res = await Server({ proxy: false }).inject({
		url: '/',
		headers: {
			host: 'host',
		},
	});
	expect(res.statusCode).to.equal(301);
	expect(res.headers.location).to.equal('https://host/');
});

test('query string', async () => {
	const res = await Server().inject({
		url: '/?test=test&test2=test2',
		headers: {
			host: 'host',
			'x-forwarded-proto': 'http',
		},
	});
	expect(res.statusCode).to.equal(301);
	expect(res.headers.location).to.equal('https://host/?test=test&test2=test2');
});

test('ignores unmatched', async () => {
	const res = await Server().inject({
		url: '/',
		headers: {
			host: 'host',
			'x-forwarded-proto': 'https',
		},
	});
	expect(res.statusCode).to.equal(200);
	expect(res.result).to.equal('Hello!');
});

test('x-forward-host support', async () => {
	const res = await Server().inject({
		url: '/',
		headers: {
			host: 'host',
			'x-forwarded-proto': 'http',
			'x-forwarded-host': 'host2',
		},
	});
	expect(res.statusCode).to.equal(301);
	expect(res.headers.location).to.equal('https://host2/');
});