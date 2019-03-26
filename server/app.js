const Inert = require('inert');
const httpsHere = require('./https-here');
const cqc = require('./cqc');
const statics = require('./statics');
const korin = require('./korin');
const good = require('./good');
const views = require('./views');

module.exports = async server => {
	try {
		// good needs to be first
		// https://github.com/hapijs/oppsy/issues/17#issuecomment-430633689
		await server.register(good);
		await server.register(views);
		await server.register(Inert);
		await server.register(statics);
		await server.register(korin);
		await server.register(cqc);
		await server.register(httpsHere);

		return server;
	} catch (error) {
		console.warn(error);
		throw error;
	}
};
