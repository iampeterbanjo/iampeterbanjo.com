const Hapi = require('hapi');
const { expect } = require('code');
const { test, before, after } = (exports.lab = require('lab').script());
const { options } = require('..');
const sinon = require('sinon');

let server = Hapi.server(options);
before(async () => {
	sinon.spy(server, 'register');
	require('../app')(server);
});

after(() => {
	server.register.restore();
});

test('good was registered first', () => {
	const good = require('../good');
	expect(server.register.firstCall.calledWith(good)).to.be.true();
});

test('cqc was registered', () => {
	const cqc = require('../cqc');
	expect(server.register.calledWith(cqc)).to.be.true();
});

test('https-here was registered', () => {
	const httpsHere = require('../https-here');
	expect(server.register.calledWith(httpsHere)).to.be.true();
});

test('statics was registered', () => {
	const statics = require('../statics');
	expect(server.register.calledWith(statics)).to.be.true();
});

test('korin was registered', () => {
	const korin = require('../korin');
	expect(server.register.calledWith(korin)).to.be.true();
});
