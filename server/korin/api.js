module.exports = {
	name: 'korin-api',
	version: '0.0.1',
	register: (server, { client, lyricist, getLyrics }) => {
		server.method('getLyrics', getLyrics);

		server.route({
			path: '/korin',
			method: 'GET',
			handler: async (request, h) => {
				try {
					return await server.methods.getLyrics({ client, lyricist });
				} catch (error) {
					console.warn(error);
				}
			},
		});
	},
};
