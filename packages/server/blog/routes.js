/* eslint-disable camelcase */
const { clientel } = require('../utils');

const get_blog_posts = () => {
	const url = '/blog/posts';
	const method = 'GET';

	return {
		url,
		path: url,
		method,
		client: () => clientel(url, { method }),
	};
};

const get_blog_details = (options = {}) => {
	const { filename } = options;
	const path = '/blog/posts/{post}';
	const url = `/blog/posts/${filename}`;
	const method = 'GET';

	return {
		url,
		path,
		method,
	};
};

module.exports = {
	get_blog_posts,
	get_blog_details,
};
