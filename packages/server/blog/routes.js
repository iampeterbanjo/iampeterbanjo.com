/* eslint-disable camelcase */

const get_blog_list = ({ globby, path }) => {
	return {
		path: '/blog/{path*}',
		method: 'GET',
		handler: async () => {
			const blogFiles = await globby(`${path}/*.md`);

			return blogFiles;
		},
	};
};

module.exports = {
	get_blog_list,
};
