const jsonata = require('jsonata');

module.exports = {
	name: 'korin-api',
	version: '1.0.0',
	register: (
		server,
		{ routes, geniusApi, lyricist, lastfmApi, textSummary, getTopTracks }
	) => {
		const getTracksRoute = routes.get_apis_korin_tracks();
		server.route({
			path: getTracksRoute.path,
			method: getTracksRoute.method,
			handler: async () => {
				try {
					const data = await server.methods.korin.getTopTracks({
						getTopTracks,
						lastfmApi,
					});
					const expression = jsonata(`tracks.track.{
						"title": name,
							"image": image[3]."#text",
							"artist": artist.name,
							"url": artist.url,
							"profileUrl": $getProfileUrl(artist.name, name)
					}`);
					expression.registerFunction('getProfileUrl', (artist, track) => {
						const { url } = routes.get_korin_profiles({ artist, track });
						return url;
					});
					const tracks = expression.evaluate(data);

					return tracks;
				} catch (error) {
					// eslint-disable-next-line no-console
					return console.warn(error);
				}
			},
		});

		const getProfileRoute = routes.get_apis_korin_profiles();
		server.route({
			path: getProfileRoute.path,
			method: getProfileRoute.method,
			handler: async request => {
				try {
					const { artist, track } = request.params;
					const artistDecoded = decodeURI(artist);
					const trackDecoded = decodeURI(track);

					const lyrics = await server.methods.korin.getLyrics({
						geniusApi,
						lyricist,
						search: `${artistDecoded} ${trackDecoded}`,
					});

					const profile = await server.methods.korin.getPersonalityProfile({
						lyrics,
					});

					const summary = textSummary.getSummary(profile);
					return { profile, summary };
				} catch (error) {
					// eslint-disable-next-line no-console
					return console.warn(error);
				}
			},
		});
	},
};
