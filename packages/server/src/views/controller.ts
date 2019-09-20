import routes from './routes';

export const handleHomePage = server => {
	const { method, path } = routes.get_home();

	server.route({
		method,
		path,
		handler: (request, reply) => {
			return reply.view('misc/home');
		},
	});
};
