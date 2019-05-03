const Crypto = require('crypto');
const { viewBlogPost, viewBlogList } = require('./helpers');
const { time, getCache } = require('../utils');

module.exports = [
	{
		name: 'view.blogContent',
		method: viewBlogPost,
		options: {
			cache: getCache({ expiresIn: time.oneWeek }),
			generateKey: post => {
				return Crypto.createHash('sha1')
					.update(post)
					.digest('hex');
			},
		},
	},
	{
		name: 'view.blogList',
		method: viewBlogList,
		options: {
			cache: getCache({ expiresIn: time.oneWeek }),
			generateKey: () => `viewBlogList-${Date.now()}`,
		},
	},
];
