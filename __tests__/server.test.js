const { expect } = require('code');
const { test, before } = (exports.lab = require('lab').script());

before(async ({ context }) => {
  return require('../server')((err, s) => {
    context.server = s;
  });
});

test('returns true when 1 + 1 equals 2', ({ context }) => {
  context.server.inject(
    {
      method: 'GET',
      url: '/'
    },
    res => {
      expect(res.statusCode).to.equal(200);
    }
  );
});
