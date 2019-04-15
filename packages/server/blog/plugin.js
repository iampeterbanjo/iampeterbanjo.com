const globby = require('globby');
const Path = require('path');

const path = Path.join(__dirname, '../../blog/posts');

module.exports = {
	name: 'blog',
	version: '1.0.0',
	register: server => {
		server.route({
			path: '/blog/{path*}',
			method: 'GET',
			handler: async () => {
				const blogFiles = await globby(`${path}/*.md`);

				return blogFiles;
			},
		});
	},
};
