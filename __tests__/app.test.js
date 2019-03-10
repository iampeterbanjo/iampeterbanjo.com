const Hapi = require('hapi');
const { expect } = require('code');
const { test, before, after } = (exports.lab = require('lab').script());
const app = require('../server');
const sinon = require('sinon');

let server = Hapi.server(app.options);
before(async () => {
  sinon.spy(server, 'register');
  require('../server/app')(server);
});

after(() => {
  server.register.restore();
});

test('good was registered first', () => {
  const good = require('../server/good');
  expect(server.register.firstCall.calledWith(good)).to.be.true();
});

test('cqc was registered', () => {
  const cqc = require('../server/cqc');
  expect(server.register.calledWith(cqc)).to.be.true();
});

test('https-here was registered', () => {
  const httpsHere = require('../server/https-here');
  expect(server.register.calledWith(httpsHere)).to.be.true();
});

test('statics was registered', () => {
  const statics = require('../server/statics');
  expect(server.register.calledWith(statics)).to.be.true();
});
