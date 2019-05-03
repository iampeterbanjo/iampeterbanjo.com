const Crypto = require('crypto');
const { viewBlogPost } = require('./helpers');
const { time, getCache } = require('../utils');

module.exports = [
	{
		name: 'views.getBlogContents',
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
];
