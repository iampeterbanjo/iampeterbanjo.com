const ejs = require('ejs');
const Vision = require('vision');

module.exports = {
	name: 'views',
	version: '0.0.1',
	register: async (server, { path }) => {
		const config = {
			engines: { ejs },
			path,
		};
		await server.register(Vision);
		server.views(config);
	},
};
