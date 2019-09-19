import * as routes from './routes';

export const handleScheduleJobs = () => {
	const { method, url } = routes.get_jobs();
	return {
		method,
		path: url,
		handler: (request, reply) => 'OK',
	};
};
