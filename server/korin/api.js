module.exports = {
	name: 'korin-api',
	version: '0.0.1',
	register: (
		server,
		{ geniusApi, lyricist, getLyrics, lastfmApi, getArtists }
	) => {
		server.method('getArtists', getArtists);
		server.method('getLyrics', getLyrics);

		server.route({
			path: '/korin/lyrics',
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

		server.route({
			path: '/korin/artists',
			method: 'GET',
			handler: async (request, h) => {
				try {
					return await server.methods.getArtists({ getArtists, lastfmApi });
				} catch (error) {
					console.warn(error);
				}
			},
		});
	},
};
