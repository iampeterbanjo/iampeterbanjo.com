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

export const handleStartJobPost = server => {
	const { method, url } = routes.post_jobs_start();

	return server.route({
		method,
		path: url,
		config: {
			auth: 'jwt',
		},
		handler: async request => {
			return server.app.scheduler.agenda.now(request.params.name);
		},
	});
};
