const Glue = require('glue');
const { manifest, options } = require('./config');

module.exports = async () => {
	try {
		const server = await Glue.compose(
			manifest,
			options
		);
		return server;
	} catch (error) {
		console.warn(error);
	}
};