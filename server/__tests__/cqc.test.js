const Hapi = require('hapi');
const { expect } = require('code');
const { test, before } = (exports.lab = require('lab').script());
const sinon = require('sinon');
const got = require('got');

let server = new Hapi.Server();

before(async ({ context }) => {
	const client = got.extend({ baseUrl: '/' });
	context.response = { body: 'Done' };
	sinon.stub(client, 'get').resolves(context.response);

	server.register({
		plugin: require('../../server/cqc'),
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
