module.exports = {
	name: 'korin-api',
	version: '0.0.1',
	register: (server, { geniusApi, lyricist, getLyrics }) => {
		server.method('getLyrics', getLyrics);

		server.route({
			path: '/korin',
			method: 'GET',
			handler: async (request, h) => {
				try {
					return await server.methods.getLyrics(
						{ geniusApi, lyricist },
						'Humble Kendric Lamar'
					);
				} catch (error) {
					console.warn(error);
				}
			},
		});
	},
};
