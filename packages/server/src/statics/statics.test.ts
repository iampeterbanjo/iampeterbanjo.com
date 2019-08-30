import Hapi from '@hapi/hapi';

import Inert from '@hapi/inert';
import path from 'path';

import plugin from './plugin';
import { makeBdd } from '../../factory';

const { Given, When } = makeBdd({ describe, it });
const cssPath = '../../../css';
const jsPath = '../../../js';
const imagePath = '../../../images';
const rootPath = path.join(__dirname, '../../fixtures');

let server;
beforeEach(async () => {
	server = Hapi.server();
	await server.register(Inert);
});

Given('statics', () => {
	When('/ rootPath is served statusCode is 200', async () => {
		await server.register({
			plugin,
			options: { rootPath, cssPath, jsPath, imagePath },
		});
		const res = await server.inject({
			method: 'GET',
			url: '/',
		});

		expect(res.statusCode).toEqual(200);
	});
});
