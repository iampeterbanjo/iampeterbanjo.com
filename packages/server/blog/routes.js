/* eslint-disable camelcase */
const { clientel } = require('../utils');

const get_blog_list = ({ globby, path }) => {
	const url = '/blog/list';
	const method = 'GET';
	return {
		path: url,
		method,
		handler: async () => {
			const blogFiles = await globby(`${path}/*.md`);

			return blogFiles;
		},
		client: () => clientel(url, { method }),
	};
};

module.exports = {
	get_blog_list,
};
