module.exports = {
	name: 'korin-api',
	version: '0.0.1',
	register: (
		server,
		{
			geniusApi,
			lyricist,
			getLyrics,
			lastfmApi,
			getArtists,
			getPersonalityProfile,
			personalityProfileApi,
		}
	) => {
		if (getArtists) {
			server.method('getArtists', getArtists);
		}
		if (getLyrics) {
			server.method('getLyrics', getLyrics);
		}
		if (getPersonalityProfile) {
			server.method('getPersonalityProfile', getPersonalityProfile);
		}

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

		server.route({
			path: '/korin/personality-profile',
			method: 'GET',
			handler: async (request, h) => {
				try {
					return await server.methods.getPersonalityProfile({
						personalityProfileApi,
					});
				} catch (error) {
					console.warn(error);
				}
			},
		});
	},
};
