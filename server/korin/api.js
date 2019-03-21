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
			path: '/korin/songs',
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
			path: '/korin/profile/{artist}/{song}',
			method: 'GET',
			handler: async (request, h) => {
				try {
					const { artist, song } = request.params;
					const lyrics = await server.methods.getLyrics(
						{ geniusApi, lyricist },
						`${artist} ${song}`
					);
					return await server.methods.getPersonalityProfile({
						personalityProfileApi,
						lyrics,
					});
				} catch (error) {
					console.warn(error);
				}
			},
		});
	},
};
