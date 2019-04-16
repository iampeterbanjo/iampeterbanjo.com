const globby = require('globby');
const Path = require('path');
const { readFile } = require('fs-extra');
const { message } = require('../utils');

const dir = Path.join(__dirname, '../../blog/posts');
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
				const blogFiles = await globby(`${dir}/*.md`);

				return blogFiles;
			},
		});

		const blogDetails = routes.get_blog_details();

		server.route({
			path: blogDetails.path,
			method: blogDetails.method,
			handler: async (request, h) => {
				const { post } = request.params;
				const [blogFile] = await globby(`${dir}/${post}.md`);

				if (!blogFile) {
					return h.response(message.ERROR_POST_NOT_FOUND).code(404);
				}

				const contents = await readFile(blogFile);

				return contents;
			},
		});
	},
};
