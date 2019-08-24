const Crypto = require('crypto');
const { getBlogFiles, getBlogContents } = require('./helpers');
const { time, getCache } = require('../utils');

export default [
	{
		name: 'blog.getBlogFiles',
		method: getBlogFiles,
		options: {
			cache: getCache({ expiresIn: time.oneWeek }),
			generateKey: () => `getBlogFiles-${Date.now()}`,
		},
	},
	{
		name: 'blog.getBlogContents',
		method: getBlogContents,
		options: {
			cache: getCache({ expiresIn: time.oneWeek }),
			generateKey: filename => {
				return Crypto.createHash('sha1')
					.update(filename)
					.digest('hex');
			},
		},
	},
];
