const Hapi = require('hapi');
const sinon = require('sinon');
const got = require('got');
const Lyricist = require('lyricist');
const jsonata = require('jsonata');
const nock = require('nock');
const { expect } = require('code');
const {
	test,
	after,
	afterEach,
	before,
	beforeEach,
	suite,
} = (exports.lab = require('lab').script());
const cache = require('../../server/cache/plugin');
const Catbox = require('catbox');
const CatboxMongoDB = require('catbox-mongodb');
// const client = new Catbox.Client(Connection);
// await client.start();
// new Catbox.Policy(config, client, '');

let server;
beforeEach(() => {
	server = new Hapi.Server();
	sinon.spy(Catbox, 'Client');
});

test('cache called with correct options', async () => {
	await server.register({
		plugin: cache,
		options: { Catbox },
	});

	const [first] = Catbox.Client.args[0];
	expect(first).to.equal(CatboxMongoDB);
});
