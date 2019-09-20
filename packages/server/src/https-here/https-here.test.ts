import Hapi from '@hapi/hapi';
import plugin from '../https-here';

const Server = (options?: Object) => {
	const server = Hapi.Server();
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

describe('Given https-here:', () => {
	test('When a proxied http request is made, its redirected to https', async () => {
		const res = await Server().inject({
			method: 'GET',
			url: '/',
			headers: {
				host: 'host',
				'x-forwarded-proto': 'http',
			},
		});

		expect(res.statusCode).toEqual(301);
		expect(res.headers.location).toEqual('https://host/');
	});

	test('When an unproxied http request is made, its redirected to https', async () => {
		const res = await Server({ proxy: false }).inject({
			url: '/',
			headers: {
				host: 'host',
			},
		});

		expect(res.statusCode).toEqual(301);
		expect(res.headers.location).toEqual('https://host/');
	});

	test('When a request is redirected the query string is preserved', async () => {
		const res = await Server().inject({
			url: '/?test=test&test2=test2',
			headers: {
				host: 'host',
				'x-forwarded-proto': 'http',
			},
		});

		expect(res.statusCode).toEqual(301);
		expect(res.headers.location).toEqual('https://host/?test=test&test2=test2');
	});

	test('When a https request is made it is not redirected', async () => {
		const res = await Server().inject({
			url: '/',
			headers: {
				host: 'host',
				'x-forwarded-proto': 'https',
			},
		});
		expect(res.statusCode).toEqual(200);
		expect(res.result).toEqual('Hello!');
	});

	test('When a request is redirected the x-forward-host support is used', async () => {
		const res = await Server().inject({
			url: '/',
			headers: {
				host: 'host',
				'x-forwarded-proto': 'http',
				'x-forwarded-host': 'host2',
			},
		});
		expect(res.statusCode).toEqual(301);
		expect(res.headers.location).toEqual('https://host2/');
	});
});
