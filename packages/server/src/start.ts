import start from '.';

(async () => {
	try {
		const server = await start.api();
		await server.start();

		console.log(`Server running at: ${server.info.uri}`);
	} catch (error) {
		console.warn(error);
		throw error;
	}
})();
