/* eslint-disable no-param-reassign */
const Hapi = require('@hapi/hapi');
const { expect } = require('@hapi/code');
const Lab = require('@hapi/lab');

const lab = Lab.script();
const { test, before, suite } = lab;

exports.lab = lab;

const sinon = require('sinon');
const got = require('got');
const plugin = require('../../server/cqc');

const server = Hapi.Server();

suite('cqc:', () => {
	before(async ({ context }) => {
		const client = got.extend({ baseUrl: '/' });
		context.response = { body: 'Done' };
		sinon.stub(client, 'get').resolves(context.response);

		server.register({
			plugin,
			options: { client },
		});
	});

	test('cqc providers request returns expected', async ({ context }) => {
		const { result } = await server.inject({
			method: 'GET',
			url: '/cqc/providers',
		});
		expect(result).to.equal(context.response.body);
	});
});
