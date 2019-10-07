import * as routes from './routes';

export const handleListJobsGet = server => {
	const { method, url } = routes.get_jobs();

	return server.route({
		method,
		path: url,
		config: {
			auth: 'jwt',
		},
		handler: async () => {
			return server.app.scheduler.agenda.jobs({});
		},
	});
};

export const handleListJobsFailedGet = server => {
	const { method, url } = routes.get_jobs_failed();

	return server.route({
		method,
		path: url,
		config: {
			auth: 'jwt',
		},
		handler: async () => {
			return server.app.scheduler.agenda.jobs({
				failReason: { $exists: true },
			});
		},
	});
};
