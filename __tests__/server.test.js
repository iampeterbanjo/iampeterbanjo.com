const { expect } = require('code');
const { test, before } = (exports.lab = require('lab').script());

let server;
before(async () => {
  return require('../server/server')((err, s) => {
    server = s;
  });
});

test('returns true when 1 + 1 equals 2', () => {
  expect(1 + 1).to.equal(2);
});
