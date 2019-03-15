const Hapi = require('hapi');
const { expect } = require('code');
const { test, before } = (exports.lab = require('lab').script());
const sinon = require('sinon');
const got = require('got');
const lyricist = require('lyricist');

let server = new Hapi.Server();

before(async ({ context }) => {
	context.lyrics = 'We wish you a merry christmas';
	const client = got.extend({ baseUrl: '/' });
	const getLyrics = sinon.stub().resolves(context.lyrics);

	await server.register({
		plugin: require('../server/korin/api'),
		options: { client, getLyrics },
	});
});

test('korin api request returns expected response', async ({ context }) => {
	const { result } = await server.inject({
		method: 'GET',
		url: '/korin',
	});
	expect(result).to.equal(context.lyrics);
});
