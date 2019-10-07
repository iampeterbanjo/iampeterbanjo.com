import * as routes from './routes';

export const handleListJobsGet = server => {
	const { method, url } = routes.get_jobs();

	return server.route({
		method,
		path: url,
		config: {
			auth: 'jwt',
		},
		handler: async (request, reply) => {
			return server.app.scheduler.agenda.jobs({});
		},
	});
};
