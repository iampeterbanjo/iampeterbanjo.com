const globby = require('globby');
const Path = require('path');

const path = Path.join(__dirname, '../../blog/posts');

const routes = require('./routes');

module.exports = {
	name: 'blog',
	version: '1.0.0',
	register: server => {
		const blogList = routes.get_blog_list({ globby, path });

		server.route({
			path: blogList.path,
			method: blogList.method,
			handler: blogList.handler,
		});
	},
};
