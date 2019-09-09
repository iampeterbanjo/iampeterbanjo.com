import Boom from '@hapi/boom';
import routes from './routes';

export default {
	name: 'pipeline',
	version: '1.0.0',
	dependencies: {
		'korin-api': '1.x.x',
	},
	register: (server, { methods }) => {
		server.method(methods);

		const extractTopTracks = routes.v1.extract_top_tracks();
		server.route({
			path: extractTopTracks.path,
			method: extractTopTracks.method,
			handler: async () => {
				try {
					const extracted = await server.methods.pipeline.saveRawTopTracks(
						server,
					);
					const converted = await server.methods.pipeline.convertRawTopTracks(
						server,
					);
					await server.methods.pipeline.addArtistImages(server);

					const message = `Extracted ${extracted.length} and converted ${converted.length} tracks`;

					return { message };
				} catch (error) {
					return Boom.boomify(error);
				}
			},
		});
	},
};
