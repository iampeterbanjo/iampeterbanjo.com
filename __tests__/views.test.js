const Hapi = require('hapi');
const { expect } = require('code');
const {
	test,
	afterEach,
	beforeEach,
	suite,
} = (exports.lab = require('lab').script());
const sinon = require('sinon');

suite('views', () => {
	let server;
	beforeEach(() => {
		server = Hapi.Server();
	});

	afterEach(() => {
		sinon.restore();
	});

	test('adds views function to server', async () => {
		const path = `${__dirname}/templates`;
		await server.register({
			plugin: require('../server/views'),
			options: { path },
		});

		expect(typeof server.views).to.equal('function');
	});
});
