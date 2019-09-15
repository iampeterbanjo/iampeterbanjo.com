import { api } from '.';

(async () => {
	try {
		const server: Api = await api();
		await server.start();
		await server.app.agenda.init();

		console.log(`Server running at: ${server.info.uri}`);
	} catch (error) {
		console.warn(error);
		throw error;
	}
})();
