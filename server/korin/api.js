const Crypto = require('crypto');
const jsonata = require('jsonata');

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
				// eslint-disable-next-line no-unused-vars
				generateKey: ({ geniusApi: g, lyricist: l }, searchString) => {
					if (!searchString) return searchString;

					return Crypto.createHash('sha1')
						.update(searchString)
						.digest('hex');
				},
			});
		}

		if (getPersonalityProfile) {
			server.method('getPersonalityProfile', getPersonalityProfile, {
				cache,
				// eslint-disable-next-line no-unused-vars
				generateKey: ({ lyrics }) => {
					if (!lyrics) return 'personality-profile';

					return Crypto.createHash('sha1')
						.update(lyrics)
						.digest('hex');
				},
			});
		}

		const getTracksRoute = routes['get.apis.korin.tracks']();
		server.route({
			path: getTracksRoute.path,
			method: getTracksRoute.method,
			handler: async () => {
				try {
					const data = await server.methods.getTopTracks({
						getTopTracks,
						lastfmApi,
					});
					const expression = jsonata(`tracks.track.{
						"title": name,
							"image": image[3]."#text",
							"artist": artist.name,
							"url": artist.url
					}`);
					const tracks = expression.evaluate(data);

					return tracks;
				} catch (error) {
					// eslint-disable-next-line no-console
					return console.warn(error);
				}
			},
		});

		const getProfileRoute = routes['get.apis.korin.profiles']();
		server.route({
			path: getProfileRoute.path,
			method: getProfileRoute.method,
			handler: async request => {
				try {
					const { artist, track } = request.params;
					const artistDecoded = decodeURI(artist);
					const trackDecoded = decodeURI(track);

					const lyrics = await server.methods.getLyrics(
						{ geniusApi, lyricist },
						`${artistDecoded} ${trackDecoded}`
					);

					const profile = await server.methods.getPersonalityProfile({
						lyrics,
					});

					return profile;
				} catch (error) {
					// eslint-disable-next-line no-console
					return console.warn(error);
				}
			},
		});
	},
};
