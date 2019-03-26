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
		const views = require('../../server/views');
		await server.register(views);

		expect(typeof server.views).to.equal('function');
	});
});
