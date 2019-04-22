const { readFile } = require('fs-extra');
const { message } = require('../utils');

const routes = require('./routes');

module.exports = {
	name: 'blog',
	version: '1.0.0',
	register: server => {
		const blogPosts = routes.get_blog_posts();
		server.route({
			path: blogPosts.path,
			method: blogPosts.method,
			handler: async () => {
				const blogFiles = await server.methods.blog.getBlogFiles();

				return blogFiles;
			},
		});

		const blogDetails = routes.get_blog_details();
		server.route({
			path: blogDetails.path,
			method: blogDetails.method,
			handler: async (request, h) => {
				const { post } = request.params;
				const content = await server.methods.blog.getBlogContents(post);

				if (!content) {
					return h.response(message.ERROR_POST_NOT_FOUND).code(404);
				}

				const contents = await readFile(content);

				return contents;
			},
		});
	},
};
