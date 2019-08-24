const { api } = require('.');

(async () => {
	try {
		const server = await api();
		await server.start();

		// eslint-disable-next-line no-console
		console.log(`Server running at: ${server.info.uri}`);
	} catch (error) {
		// eslint-disable-next-line no-console
		console.warn(error);
		throw error;
	}
})();
