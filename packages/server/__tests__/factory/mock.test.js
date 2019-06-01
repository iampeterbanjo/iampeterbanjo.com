/* eslint-disable no-param-reassign */
const Lab = require('@hapi/lab');
const { expect } = require('@hapi/code');
const Hapi = require('@hapi/hapi');
const sinon = require('sinon');

const factory = require('.');
const korinPlugin = require('../../korin/plugin');

const lab = Lab.script();
const { test, suite } = lab;

exports.lab = lab;

suite('Given factory', () => {
	suite('And mock.method', () => {
		['korin.getTopTracks'].forEach(name => {
			suite(`When param is ${name}`, () => {
				test(`server has method ${name} as function`, async () => {
					const server = Hapi.Server();
					await factory.mock.method({
						server,
						name,
						plugin: korinPlugin,
						fn: sinon.stub().resolves('test'),
					});
					const [app, method] = name.split('.');

					expect(server.methods[app][method]).to.be.a.function();
				});
			});
		});

		test('null is default', async () => {
			const server = Hapi.Server();
			const result = await factory.mock.method({
				server,
				name: 'unknown',
				plugin: korinPlugin,
				fn: sinon.stub().resolves('test'),
			});

			expect(result).to.equal(null);
		});

		test('dont overwrite existing methods', async () => {
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
				name: 'korin.getTopTracks',
				plugin: korinPlugin,
				fn: sinon.stub().resolves('test'),
			});

			expect(server.methods.korin.getTopTracks).to.exist();
			expect(server.methods.test.method).to.exist();
		});
	});
});
