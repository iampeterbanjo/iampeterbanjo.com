import Boom from 'boom';
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
					const count = await server.methods.pipeline.saveRawTopTracks(server);

					return { message: `Extracted ${count} tracks` };
				} catch (error) {
					return Boom.boomify(error);
				}
			},
		});
	},
};
