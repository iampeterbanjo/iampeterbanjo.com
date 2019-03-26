const ejs = require('ejs');
const Vision = require('vision');

module.exports = {
	name: 'views',
	version: '0.0.1',
	register: async (server, { path }) => {
		await server.register({
			plugin: Vision,
			options: {
				engines: { ejs },
				path,
			},
		});
	},
};
