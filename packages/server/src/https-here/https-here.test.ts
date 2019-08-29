// import Hapi from '@hapi/hapi';
// import { expect } from '@hapi/code';
// import Lab from '@hapi/lab';
// import plugin from '../https-here';

// export const lab = Lab.script();

// const { test, suite } = lab;

// const Server = (options?: Object) => {
// 	const server = Hapi.Server();
// 	server.register({ plugin, options });
// 	server.route({
// 		method: 'GET',
// 		path: '/',
// 		handler(request, h) {
// 			return h.response('Hello!');
// 		},
// 	});
// 	return server;
// };

// Given('https-here:', () => {
// 	When('proxied http requests are redirected to https', async () => {
// 		const res = await Server().inject({
// 			method: 'GET',
// 			url: '/',
// 			headers: {
// 				host: 'host',
// 				'x-forwarded-proto': 'http',
// 			},
// 		});
// 		expect(res.statusCode).toEqual(301);
// 		expect(res.headers.location).toEqual('https://host/');
// 	});

// 	When('un-proxied http requests are redirected to https', async () => {
// 		const res = await Server({ proxy: false }).inject({
// 			url: '/',
// 			headers: {
// 				host: 'host',
// 			},
// 		});
// 		expect(res.statusCode).toEqual(301);
// 		expect(res.headers.location).toEqual('https://host/');
// 	});

// 	When('query string', async () => {
// 		const res = await Server().inject({
// 			url: '/?test=test&test2=test2',
// 			headers: {
// 				host: 'host',
// 				'x-forwarded-proto': 'http',
// 			},
// 		});
// 		expect(res.statusCode).toEqual(301);
// 		expect(res.headers.location).toEqual(
// 			'https://host/?test=test&test2=test2',
// 		);
// 	});

// 	When('ignores unmatched', async () => {
// 		const res = await Server().inject({
// 			url: '/',
// 			headers: {
// 				host: 'host',
// 				'x-forwarded-proto': 'https',
// 			},
// 		});
// 		expect(res.statusCode).toEqual(200);
// 		expect(res.result).toEqual('Hello!');
// 	});

// 	When('x-forward-host support', async () => {
// 		const res = await Server().inject({
// 			url: '/',
// 			headers: {
// 				host: 'host',
// 				'x-forwarded-proto': 'http',
// 				'x-forwarded-host': 'host2',
// 			},
// 		});
// 		expect(res.statusCode).toEqual(301);
// 		expect(res.headers.location).toEqual('https://host2/');
// 	});
// });
