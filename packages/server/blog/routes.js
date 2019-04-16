/* eslint-disable camelcase */
const { clientel } = require('../utils');

const get_blog_posts = ({ globby, dir }) => {
	const url = '/blog/posts';
	const method = 'GET';

	return {
		url,
		path: url,
		method,
		handler: async () => {
			const blogFiles = await globby(`${dir}/*.md`);

			return blogFiles;
		},
		client: () => clientel(url, { method }),
	};
};

const get_blog_details = ({ globby, dir, post = '' }) => {
	const path = '/blog/posts/{post}';
	const url = `/blog/posts/${post}`;
	const method = 'GET';

	return {
		url,
		path,
		method,
		handler: async request => {
			const blogFile = await globby(`${dir}/${request.params.post}`);

			return blogFile;
		},
	};
};

module.exports = {
	get_blog_posts,
	get_blog_details,
};
