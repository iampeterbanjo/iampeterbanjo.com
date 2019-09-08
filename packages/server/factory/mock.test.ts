import Hapi from '@hapi/hapi';

import factory from '.';
import korinPlugin from '../src/korin/plugin';

describe('Givenfactory', () => {
	describe('And mock.method', () => {
		['korin.getChartTopTracks'].forEach(name => {
			it(`When param is ${name} server has method ${name} as function`, async () => {
				const server = Hapi.Server();
				await factory.mock.method({
					server,
					name,
					plugin: korinPlugin,
					fn: jest.fn().mockResolvedValue('test'),
				});
				const [app, method] = name.split('.');

				expect(typeof server.methods[app][method]).toEqual('function');
			});
		});

		it('When null is default result should be null', async () => {
			const server = Hapi.Server();
			const result = await factory.mock.method({
				server,
				name: 'unknown',
				plugin: korinPlugin,
				fn: jest.fn().mockResolvedValue('test'),
			});

			expect(result).toEqual(null);
		});

		it('When creating mock dont overwrite existing methods', async () => {
			const server = Hapi.Server();
			await server.register({
				plugin: {
					name: 'test',
					version: '1.0.0',
					register: s => {
						s.method([
							{
								name: 'test.method',
								method: () => 42,
							},
						]);
					},
				},
			});

			await factory.mock.method({
				server,
				name: 'korin.getChartTopTracks',
				plugin: korinPlugin,
				fn: jest.fn().mockResolvedValue('test'),
			});

			expect(server.methods.korin.getChartTopTracks).toBeDefined();
			expect(server.methods.test.method).toBeDefined();
		});
	});
});