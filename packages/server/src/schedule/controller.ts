import * as routes from './routes';

export const handleScheduleJobsGet = server => {
	const { method, url } = routes.get_jobs();

	return server.route({
		method,
		path: url,
		config: {
			auth: {
				strategy: 'session',
				mode: 'required',
			},
		},
		handler: (request, reply) => 'OK',
	});
};
