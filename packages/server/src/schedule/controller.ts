import * as routes from './routes';

export const handleScheduleJobs = () => {
	const { method, url } = routes.get_jobs();
	return {
		method,
		path: url,
		config: {
			auth: {
				strategy: 'session',
				mode: 'required',
			},
		},
		handler: (request, reply) => 'OK',
	};
};
