const Glue = require('glue');
const { manifest, options } = require('./config');
const korin = require('./korin/methods');

module.exports = async () => {
	try {
		const server = await Glue.compose(
			manifest,
			options
		);

		server.method(korin);

		return server;
	} catch (error) {
		// eslint-disable-next-line no-console
		return console.warn(error);
	}
};
