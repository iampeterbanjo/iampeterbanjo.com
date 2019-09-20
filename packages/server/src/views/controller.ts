import routes from './routes';

export const handleViewHomePage = () => {
	const { method, path } = routes.get_home();

	return {
		method,
		path,
		handler: (request, reply) => {
			return reply.view('misc/home');
		},
	};
};
