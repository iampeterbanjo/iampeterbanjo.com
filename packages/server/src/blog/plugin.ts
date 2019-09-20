import * as controller from './controller';

export default {
	name: 'blog',
	version: '1.0.0',
	register: (server, { methods }) => {
		server.method(methods);

		controller.handleBlogPostsGet(server);
		controller.handleBlogDetailsGet(server);
	},
};
