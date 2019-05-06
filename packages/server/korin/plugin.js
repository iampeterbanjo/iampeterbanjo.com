const jsonata = require('jsonata');
const routes = require('./routes');
const { vars } = require('../utils');

const { topTracksPath } = vars;

module.exports = {
	name: 'korin-api',
	version: '1.0.0',
	register: (server, { methods }) => {
		server.method(methods);

		const getTracksRoute = routes.v1.get_korin_tracks();
		server.route({
			path: getTracksRoute.path,
			method: getTracksRoute.method,
			handler: async () => {
				try {
					const data = await server.methods.korin.getTopTracks();
					const expression = jsonata(topTracksPath);
					expression.registerFunction('getProfileUrl', (artist, track) => {
						const { url } = routes.v1.get_korin_profiles({ artist, track });
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

		const getProfileRoute = routes.v1.get_korin_profiles();
		server.route({
			path: getProfileRoute.path,
			method: getProfileRoute.method,
			handler: async request => {
				try {
					const { artist, track } = request.params;
					const artistDecoded = decodeURI(artist);
					const trackDecoded = decodeURI(track);

					const {
						profile,
						summary,
					} = await server.methods.korin.getProfileByArtistAndTrack({
						artist: artistDecoded,
						track: trackDecoded,
					});

					return { profile, summary };
				} catch (error) {
					// eslint-disable-next-line no-console
					return console.warn(error);
				}
			},
		});
	},
};
