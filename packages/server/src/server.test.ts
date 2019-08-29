// import { expect } from '@hapi/code';
// import Lab from '@hapi/lab';

// import * as R from 'ramda';
// import { api } from '..';

// const { PORT, MONGODB_ADDON_URI, MONGODB_ADDON_DB } = process.env;

// export const lab = Lab.script();
// const { test, suite, before } = lab;

// const Server = async () => api();

// Given('cache', () => {
// 	before(async ({ context }) => {
// 		const path = ['settings', 'cache', 0];
// 		const server = await Server();
// 		context.provisioned = R.path(path, server);
// 	});

// 	When('mongodb-cache is provisioned', async ({ context }) => {
// 		const { name } = context.provisioned;

// 		expect(name).toEqual('mongodb-cache');
// 	});

// 	When('mongodb-cache connection', ({ context }) => {
// 		const { uri, partition } = R.path(
// 			['provider', 'options'],
// 			context.provisioned,
// 		);

// 		expect(uri).toEqual(MONGODB_ADDON_URI);
// 		expect(partition).toEqual(MONGODB_ADDON_DB);
// 	});
// });

// Given('info', () => {
// 	before(async ({ context }) => {
// 		context.server = await Server();
// 	});

// 	When('port value', ({ context }) => {
// 		expect(context.server.info.port).toEqual(Number(PORT));
// 	});

// 	When('host value', ({ context }) => {
// 		expect(context.server.info.host).toEqual('0.0.0.0');
// 	});
// });
