import Hapi from '@hapi/hapi';
import { expect } from '@hapi/code';
import Lab from '@hapi/lab';

const Inert = require('@hapi/inert');
const path = require('path');
const plugin = require('../statics/plugin');

export const lab = Lab.script();
const { test, beforeEach, suite } = lab;

const cssPath = '../css';
const jsPath = '../js';
const imagePath = '../images';
const rootPath = path.join(__dirname, './fixtures');

let server;
beforeEach(async () => {
	server = Hapi.server();
	await server.register(Inert);
});

suite('statics', () => {
	test('/ rootPath is served', async () => {
		await server.register({
			plugin,
			options: { rootPath, cssPath, jsPath, imagePath },
		});
		const res = await server.inject({
			method: 'GET',
			url: '/',
		});

		expect(res.statusCode).to.equal(200);
	});
});
