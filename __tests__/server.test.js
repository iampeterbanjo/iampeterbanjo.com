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
