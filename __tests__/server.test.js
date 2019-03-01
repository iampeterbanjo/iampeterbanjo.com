const Hapi = require('hapi');
const { expect } = require('code');
const { test, before } = (exports.lab = require('lab').script());

let server;
before(() => {
  return require('../server')((err, s) => {
    server = s;
  });
});

test('/ returns 200 statusCode', async () => {
  const res = await server.inject({
    method: 'GET',
    url: '/'
  });
  expect(res.statusCode).to.equal(200);
});

test('http requests are redirected to https', async () => {
  const res = await server.inject({
    method: 'GET',
    url: '/',
    headers: {
      host: 'host',
      'x-forwarded-proto': 'http'
    }
  });
  expect(res.statusCode).to.equal(301);
});
