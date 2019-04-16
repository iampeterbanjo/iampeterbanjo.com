const globby = require('globby');
const Path = require('path');

const dir = Path.join(__dirname, '../../blog/posts');

const routes = require('./routes');

module.exports = {
	name: 'blog',
	version: '1.0.0',
	register: server => {
		const blogPosts = routes.get_blog_posts({ globby, dir });

		server.route({
			path: blogPosts.path,
			method: blogPosts.method,
			handler: blogPosts.handler,
		});
	},
};
