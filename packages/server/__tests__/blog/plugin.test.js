// // const Hapi = require('hapi');
// const Lab = require('lab');
// const { expect } = require('code');
// const nock = require('nock');
// const sinon = require('sinon');

// const { vars, message } = require('../../utils');
// const routes = require('../../blog/routes');
// // const methods = require('../../blog/methods');
// const api = require('../../api');

// const { baseUrl } = vars;

// const lab = Lab.script();
// const { suite, test, before, afterEach } = lab;

// exports.lab = lab;

// let server;

// suite('blog', () => {
// 	before(async () => {
// 		server = await api();
// 	});

// 	afterEach(() => {
// 		sinon.restore();
// 		nock.cleanAll();
// 	});

// 	test('posts route gets markdown files', async () => {
// 		const { method, url } = routes.get_blog_posts();
// 		/** @type {{ result: array }} */
// 		// @ts-ignore
// 		const { result } = await server.inject({
// 			method,
// 			url,
// 		});

// 		console.log(method, url, result);

// 		expect(result.length).to.be.above(0);
// 		result.forEach(file => {
// 			expect(file).to.endWith('.md');
// 		});
// 	});

// 	test.skip('posts client requests markdown files', async () => {
// 		const testData = ['blog_post.md'];
// 		const { url, client } = routes.get_blog_posts();

// 		await nock(baseUrl)
// 			.get(url)
// 			.reply(200, testData);

// 		const { body } = await client();

// 		expect(body).to.equal(testData);
// 	});

// 	test.skip('post details returns 404 with unknown file', async () => {
// 		const filename = 'the-GVDuMVROxCVNpgWy-file';
// 		const { method, url } = routes.get_blog_details({
// 			filename,
// 		});
// 		const result = await server.inject({
// 			method,
// 			url,
// 		});

// 		// @ts-ignore
// 		expect(result).to.contain({
// 			statusCode: 404,
// 			result: message.ERROR_POST_NOT_FOUND,
// 		});
// 	});

// 	test.skip('post details gets expected markdown file', async () => {
// 		const filename = 'the-ok-gatsby';
// 		const { method, url } = routes.get_blog_details({
// 			filename,
// 		});
// 		const { result } = await server.inject({
// 			method,
// 			url,
// 		});

// 		expect(result).to.contain('date: 2019-04-08');
// 	});
// });
