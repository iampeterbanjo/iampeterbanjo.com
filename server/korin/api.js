const Crypto = require('crypto');

module.exports = {
	name: 'korin-api',
	version: '0.0.1',
	register: (
		server,
		{
			routes,
			geniusApi,
			lyricist,
			getLyrics,
			lastfmApi,
			getTopTracks,
			getPersonalityProfile,
			personalityProfileApi,
		}
	) => {
		// resolve all requests in 100ms
		// and expire in an hour
		const cache = {
			expiresIn: 60 * 60 * 1000,
			staleIn: 10 * 1000,
			staleTimeout: 100,
			generateTimeout: 10 * 1000,
			cache: 'mongodb-cache',
		};

		if (getTopTracks) {
			server.method('getTopTracks', getTopTracks, {
				cache,
				generateKey: () => 'getTopTracks',
			});
		}

		if (getLyrics) {
			server.method('getLyrics', getLyrics, {
				cache,
				generateKey: ({ geniusApi, lyricist }, searchString) => {
					return Crypto.createHash('sha1')
						.update(searchString)
						.digest('hex');
				},
			});
		}

		if (getPersonalityProfile) {
			server.method('getPersonalityProfile', getPersonalityProfile, {
				cache,
				generateKey: ({ personalityProfileApi, lyrics }) => {
					return Crypto.createHash('sha1')
						.update(lyrics)
						.digest('hex');
				},
			});
		}

		const getTracksRoute = routes['korin.get.tracks']();
		server.route({
			path: getTracksRoute.path,
			method: getTracksRoute.method,
			handler: async (request, h) => {
				try {
					const data = await server.methods.getTopTracks({
						getTopTracks,
						lastfmApi,
					});

					return data;
				} catch (error) {
					console.warn(error);
				}
			},
		});

		const getProfileRoute = routes['korin.get.profile']();
		server.route({
			path: getProfileRoute.path,
			method: getProfileRoute.method,
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
