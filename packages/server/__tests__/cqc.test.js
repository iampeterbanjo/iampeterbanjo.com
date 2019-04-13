/* eslint-disable no-param-reassign */
const Hapi = require('hapi');
const { expect } = require('code');
const Lab = require('lab');

const lab = Lab.script();
const { test, before } = lab;

exports.lab = lab;

const sinon = require('sinon');
const got = require('got');
const plugin = require('../../server/cqc');

const server = new Hapi.Server();

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
