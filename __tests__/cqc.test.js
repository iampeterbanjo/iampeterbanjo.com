const Hapi = require('hapi');
const { expect } = require('code');
const { test, before } = (exports.lab = require('lab').script());
const sinon = require('sinon');
const got = require('got');

const response = { body: 'Done' };

let server = new Hapi.Server();
before(async () => {
  const client = got.extend({ baseUrl: '/' });
  sinon.stub(client, 'get').resolves(response);
  server.register({
    plugin: require('../server/cqc'),
    options: { client }
  });
});

test('cqc providers request returns expected', async () => {
  const { result } = await server.inject({
    method: 'GET',
    url: '/cqc/providers'
  });
  console.log(result);
  expect(result).to.equal(response.body);
});
