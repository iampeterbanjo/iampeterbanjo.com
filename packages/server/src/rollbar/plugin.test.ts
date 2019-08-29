// import Hapi from '@hapi/hapi';
// import { expect } from '@hapi/code';
// import Lab from '@hapi/lab';

// import plugin from '../../rollbar/plugin';

// export const lab = Lab.script();
// const { test, suite } = lab;

// const Server = async () => {
// 	const server = Hapi.Server();

// 	await server.register({
// 		plugin,
// 	});

// 	return server;
// };

// Given('rollbar plugin', () => {
// 	Given('Given plugin', () => {
// 		When('server exposes rollbar', async () => {
// 			const server = await Server();

// 			expect(server.plugins.rollbar).to.exist();
// 		});
// 	});
// });
