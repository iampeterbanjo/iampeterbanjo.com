const Hapi = require('hapi')
const { expect } = require('code')
const { test, before } = (exports.lab = require('lab').script())
const sinon = require('sinon')
const got = require('got')

let server = new Hapi.Server()

before(async ({ context }) => {
	const client = got.extend({ baseUrl: '/' })
	context.response = { body: 'Korin' }
	sinon.stub(client, 'get').resolves(context.response)

	server.register({
		plugin: require('../server/korin'),
		options: { client },
	})
})

test('korin api request returns expected response', async ({ context }) => {
	const { result } = await server.inject({
		method: 'GET',
		url: '/korin',
	})
	expect(result).to.equal(context.response.body)
})
