const Inert = require('inert')
const httpsHere = require('./https-here')
const cqc = require('./cqc')
const statics = require('./statics')
const good = require('./good')

module.exports = async server => {
	try {
		// good needs to be first
		// https://github.com/hapijs/oppsy/issues/17#issuecomment-430633689
		await server.register(good)
		await server.register(Inert)
		await server.register(statics)
		await server.register(cqc)
		await server.register(httpsHere)

		return server
	} catch (error) {
		console.warn(error)
		throw error
	}
}
