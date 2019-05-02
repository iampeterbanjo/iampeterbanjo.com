const { message } = require('../utils');

const routes = require('./routes');

module.exports = {
	name: 'blog',
	version: '1.0.0',
	register: (server, { methods }) => {
		server.method(methods);

		const blogPosts = routes.v1.get_blog_posts();
		server.route({
			path: blogPosts.path,
			method: blogPosts.method,
			handler: async () => {
				try {
					const blogFiles = await server.methods.blog.getBlogFiles();

					return blogFiles;
				} catch (error) {
					// eslint-disable-next-line no-console
					return console.warn(error);
				}
			},
		});

		const blogDetails = routes.v1.get_blog_details();
		server.route({
			path: blogDetails.path,
			method: blogDetails.method,
			handler: async (request, h) => {
				try {
					const { post } = request.params;
					const contents = await server.methods.blog.getBlogContents(post);

					if (!contents) {
						return h.response(message.ERROR_POST_NOT_FOUND).code(404);
					}

					return contents;
				} catch (error) {
					// eslint-disable-next-line no-console
					return console.warn(error);
				}
			},
		});
	},
};
