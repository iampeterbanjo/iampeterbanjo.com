const Hapi = require('hapi');
const app = require('.');

(async () => {
	try {
		let server = Hapi.server(app.options);

		await require('./app')(server);
		await server.start();

		console.log(`Server running at: ${server.info.uri}`);
	} catch (error) {
		console.warn(error);
		throw error;
	}
})();
